/**
 * @fileoverview Keeps the embedded admin from being opened as a standalone page.
 *
 * With PAYLOAD_EMBEDDED=true the admin is meant to live in the Medusa admin's iframe. A top-level load of
 * `/admin...` is refused unless the URL carries `enableDebug=1` once; the middleware then remembers it in a
 * cookie for the rest of the browser session, so following links and reloading keeps working.
 *
 * This is a guard against the wrong entry point, not a security boundary: `Sec-Fetch-Dest` is set by the browser
 * and a script outside a browser can send anything, and authentication and the access rules still apply to
 * every request. The check looks only at document loads (`Sec-Fetch-Dest: document`): the iframe, soft
 * navigations and REST calls send other values and pass.
 *
 * Pure, with no Payload or Next imports, so the edge middleware, the client and the unit tests share it.
 */

/** The URL parameter that lets a standalone load through (`?enableDebug=1`). */
export const DEBUG_PARAM = 'enableDebug'
/** Remembers the parameter for the browser session; readable by the page so the client check agrees. */
export const DEBUG_COOKIE = 'payload-embed-debug'

export type StandaloneDecision = 'allow' | 'allow-and-remember' | 'block'

export type StandaloneRequest = {
  embedded: boolean
  pathname: string
  /** `Sec-Fetch-Dest` header, `null` when absent (older browsers, scripts). */
  secFetchDest: string | null
  /** Value of the `enableDebug` query parameter, `null` when absent. */
  debugParam: string | null
  hasDebugCookie: boolean
}

export const isAdminPath = (pathname: string): boolean => pathname === '/admin' || pathname.startsWith('/admin/')

export const standaloneDecision = ({
  embedded,
  pathname,
  secFetchDest,
  debugParam,
  hasDebugCookie,
}: StandaloneRequest): StandaloneDecision => {
  if (!embedded || !isAdminPath(pathname)) return 'allow'
  // Only a top-level document load is a standalone window. Without the header we cannot tell; the client check
  // in EmbedProvider covers that case.
  if (secFetchDest !== 'document') return 'allow'
  if (debugParam === '1') return 'allow-and-remember'
  return hasDebugCookie ? 'allow' : 'block'
}

/** Client side twin of the decision: the URL parameter or the cookie the middleware set. */
export const isDebugRequested = (search: string, cookie: string): boolean =>
  new URLSearchParams(search).get(DEBUG_PARAM) === '1' ||
  cookie.split(';').some((part) => part.trim() === `${DEBUG_COOKIE}=1`)

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)

/** The page a refused standalone load gets (403). `adminUrl` is the first Medusa admin origin, when configured. */
export const standaloneBlockedHtml = (adminUrl?: string): string => {
  const link = adminUrl
    ? `<p><a href="${escapeHtml(adminUrl)}">${escapeHtml(adminUrl)}</a></p>`
    : ''
  return (
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex"><title>CMS</title>' +
    '<style>body{font-family:system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;text-align:center;color:#111;background:#fff}' +
    '@media(prefers-color-scheme:dark){body{color:#eee;background:#111}a{color:#8ab4ff}}</style></head><body><main>' +
    '<p>The CMS opens inside the Medusa admin.</p><p>CMS otwiera się w panelu Medusy.</p>' +
    link +
    '</main></body></html>'
  )
}
