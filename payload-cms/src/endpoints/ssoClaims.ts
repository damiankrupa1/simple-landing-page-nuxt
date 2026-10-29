/**
 * @fileoverview Parsing of the Medusa token claims (SSO v2) and the account matching rules.
 *
 * Pure functions on purpose: the token signature is verified by the endpoints, everything else that
 * decides who gets in is here and unit tested.
 */
import { getSafeRedirect } from 'payload/shared'

import { normalizeRole, type Role } from '../access/roles.ts'

export const MAX_TOKEN_LIFETIME_SECONDS = 120
export const SSO_LOCALES = ['en', 'pl'] as const
export type SsoLocale = (typeof SSO_LOCALES)[number]

export type SsoClaims = {
  /** Stable Medusa user id. */
  sub: string
  email: string
  name?: string
  role: Role
  jti: string
  /** Expiry of the token (seconds since epoch), used to prune the used-token ledger. */
  exp: number
  /** Normalised in-app path, always under /admin. */
  redirect: string
  lng?: SsoLocale
}

export const normalizeEmail = (value: string): string => value.trim().toLowerCase()

const text = (value: unknown, max: number): string | undefined =>
  typeof value === 'string' && value.trim() && value.length <= max ? value.trim() : undefined

/** Only paths below /admin; anything else (absolute URLs, `//`, backslashes, other prefixes) becomes /admin. */
export const safeAdminRedirect = (value: unknown): string => {
  const safe = getSafeRedirect({ fallbackTo: '/admin', redirectTo: typeof value === 'string' ? value : '' })
  const url = new URL(safe, 'http://localhost')
  return /^\/admin(\/|$)/.test(url.pathname) ? `${url.pathname}${url.search}` : '/admin'
}

export type ParsedClaims = { ok: true; claims: SsoClaims } | { ok: false; reason: string }

/** Validates the claims of a signature-checked token. Unknown or missing role means `none`. */
export const parseSsoClaims = (payload: Record<string, unknown>): ParsedClaims => {
  const sub = text(payload.sub, 128)
  if (!sub) return { ok: false, reason: 'missing sub' }
  const jti = text(payload.jti, 128)
  if (!jti) return { ok: false, reason: 'missing jti' }
  const rawEmail = text(payload.email, 320)
  if (!rawEmail || !/^[^\s@]+@[^\s@]+$/.test(rawEmail)) return { ok: false, reason: 'missing email' }
  if (typeof payload.exp !== 'number' || typeof payload.iat !== 'number') {
    return { ok: false, reason: 'missing exp or iat' }
  }
  if (payload.exp - payload.iat > MAX_TOKEN_LIFETIME_SECONDS) return { ok: false, reason: 'token lives too long' }

  return {
    ok: true,
    claims: {
      sub,
      jti,
      email: normalizeEmail(rawEmail),
      name: text(payload.name, 200),
      role: normalizeRole(payload.role),
      exp: payload.exp,
      redirect: safeAdminRedirect(payload.redirect),
      lng: (SSO_LOCALES as readonly string[]).includes(payload.lng as string) ? (payload.lng as SsoLocale) : undefined,
    },
  }
}

export type Account = { id: number | string; email: string; medusaUserId?: string | null }

export type AccountDecision =
  | { action: 'use'; account: Account; link: boolean }
  | { action: 'create' }
  | { action: 'conflict'; reason: string }

/**
 * Which Payload account does this Medusa user sign in as?
 * 1. The account already linked to `sub` (survives an e-mail change in Medusa).
 * 2. Otherwise an unlinked account with the same e-mail, linked once (how existing accounts migrate).
 * 3. Otherwise a new account.
 * An account linked to another Medusa id is never taken over, and an e-mail that belongs to another
 * account is a conflict, never a merge.
 */
export const resolveAccount = ({
  sub,
  byId,
  byEmail,
}: {
  sub: string
  byId: Account | null
  byEmail: Account | null
}): AccountDecision => {
  if (byId) {
    if (byEmail && byEmail.id !== byId.id) return { action: 'conflict', reason: 'email belongs to another account' }
    return { action: 'use', account: byId, link: false }
  }
  if (byEmail) {
    if (byEmail.medusaUserId && byEmail.medusaUserId !== sub) {
      return { action: 'conflict', reason: 'account is linked to another Medusa user' }
    }
    return { action: 'use', account: byEmail, link: true }
  }
  return { action: 'create' }
}
