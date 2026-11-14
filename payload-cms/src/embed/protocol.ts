/**
 * @fileoverview postMessage protocol between this app (frame) and the Medusa admin page (host), v1.
 *
 * Envelope: `{ ns: 'payload-embed', v: 1, type, id?, payload }`. Nothing secret travels here (no tokens).
 * Everything incoming is validated by hand (no schema library): unknown namespace, version, type, shape,
 * oversized or non-admin paths are ignored. Origin and source are checked separately by `isTrustedEvent`.
 *
 *   frame -> host: ready {path, locale} | nav:changed {path, search} | session:expired {reason}
 *                  | access:denied {path} | resize {height}
 *   host -> frame: hello {lng} | nav:goto {path} | locale:changed {lng} | session:logout | session:keepalive
 */

export const PROTOCOL_NAMESPACE = 'payload-embed'
export const PROTOCOL_VERSION = 1
export const MAX_MESSAGE_BYTES = 2048

export const LOCALES = ['en', 'pl'] as const
export type Lng = (typeof LOCALES)[number]
export const EXPIRED_REASONS = ['expired', 'logout', 'inactivity'] as const
export type ExpiredReason = (typeof EXPIRED_REASONS)[number]

export type FrameMessage =
  | { type: 'ready'; payload: { path: string; locale: string } }
  | { type: 'nav:changed'; payload: { path: string; search: string } }
  | { type: 'session:expired'; payload: { reason: ExpiredReason } }
  | { type: 'access:denied'; payload: { path: string } }
  | { type: 'resize'; payload: { height: number } }

export type HostMessage =
  | { type: 'hello'; payload: { lng: Lng } }
  | { type: 'nav:goto'; payload: { path: string } }
  | { type: 'locale:changed'; payload: { lng: Lng } }
  | { type: 'session:logout'; payload: Record<string, never> }
  | { type: 'session:keepalive'; payload: Record<string, never> }

export type Envelope<T extends { type: string; payload: unknown }> = T & {
  ns: typeof PROTOCOL_NAMESPACE
  v: typeof PROTOCOL_VERSION
  id?: string
}

/** Only in-app admin paths: `/admin` or `/admin/...`, no scheme, no `//`, no backslash, no control characters. */
export const isAdminPath = (value: unknown): value is string => {
  if (typeof value !== 'string' || value.length > 512) return false
  if (!/^\/admin(\/|\?|#|$)/.test(value)) return false
  if (value.includes('//') || value.includes('\\')) return false
  for (const char of value) {
    const code = char.charCodeAt(0)
    if (code <= 31 || code === 127) return false
  }
  return true
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isLng = (value: unknown): value is Lng => (LOCALES as readonly string[]).includes(value as string)

const text = (value: unknown, max: number): value is string => typeof value === 'string' && value.length <= max

const tooBig = (data: unknown): boolean => {
  try {
    return JSON.stringify(data).length > MAX_MESSAGE_BYTES
  } catch {
    return true // cyclic or otherwise not serialisable
  }
}

type Parsed = { type: string; payload: Record<string, unknown> }

const parseEnvelope = (data: unknown): Parsed | null => {
  if (!isRecord(data) || tooBig(data)) return null
  if (data.ns !== PROTOCOL_NAMESPACE || data.v !== PROTOCOL_VERSION) return null
  if (typeof data.type !== 'string') return null
  if (data.id !== undefined && !text(data.id, 64)) return null
  const payload = data.payload === undefined ? {} : data.payload
  return isRecord(payload) ? { type: data.type, payload } : null
}

/** Validates a message sent by the host to the frame. Returns null for anything that is not exactly v1. */
export const parseHostMessage = (data: unknown): HostMessage | null => {
  const message = parseEnvelope(data)
  if (!message) return null
  const { type, payload } = message
  switch (type) {
    case 'hello':
    case 'locale:changed':
      return isLng(payload.lng) ? { type, payload: { lng: payload.lng } } : null
    case 'nav:goto':
      return isAdminPath(payload.path) ? { type, payload: { path: payload.path } } : null
    case 'session:logout':
    case 'session:keepalive':
      return { type, payload: {} }
    default:
      return null
  }
}

/** Validates a message sent by the frame to the host (used by tests and by the host-side contract). */
export const parseFrameMessage = (data: unknown): FrameMessage | null => {
  const message = parseEnvelope(data)
  if (!message) return null
  const { type, payload } = message
  switch (type) {
    case 'ready':
      return isAdminPath(payload.path) && text(payload.locale, 16)
        ? { type, payload: { path: payload.path, locale: payload.locale } }
        : null
    case 'nav:changed':
      return isAdminPath(payload.path) && text(payload.search, 512)
        ? { type, payload: { path: payload.path, search: payload.search } }
        : null
    case 'session:expired':
      return (EXPIRED_REASONS as readonly string[]).includes(payload.reason as string)
        ? { type, payload: { reason: payload.reason as ExpiredReason } }
        : null
    case 'access:denied':
      return isAdminPath(payload.path) ? { type, payload: { path: payload.path } } : null
    case 'resize':
      return typeof payload.height === 'number' && Number.isFinite(payload.height) && payload.height >= 0 && payload.height < 100000
        ? { type, payload: { height: payload.height } }
        : null
    default:
      return null
  }
}

export const buildMessage = <T extends FrameMessage>(message: T, id?: string): Envelope<T> => ({
  ns: PROTOCOL_NAMESPACE,
  v: PROTOCOL_VERSION,
  ...(id ? { id } : {}),
  ...message,
})

/**
 * A message is trusted only when it comes from an allow-listed origin AND from the expected window
 * (the parent), so another page that merely knows the origin cannot inject commands.
 */
export const isTrustedEvent = (
  event: { origin: string; source: unknown },
  allowedOrigins: readonly string[],
  expectedSource: unknown,
): boolean => allowedOrigins.includes(event.origin) && event.source !== null && event.source === expectedSource
