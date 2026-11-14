/** True when the page runs inside another page's frame. Cross-origin access to `top` is fine for a comparison. */
export const isFramed = (win: { self: unknown; top: unknown }): boolean => {
  try {
    return win.self !== win.top
  } catch {
    // Reading `top` can throw in sandboxed frames; that only happens when we are framed.
    return true
  }
}

/**
 * CSS that hides every way to leave the session from the Payload UI: the user icon (which links to the account
 * page), the nav logout icon and the "Log out" button of the unauthorized view. It is only rendered when embed
 * mode is on and applies until `data-embed="direct"` is set on <html> (page not framed), so the UI is hidden
 * from the first paint, not after hydration (fail closed).
 *
 * The class names come from @payloadcms/ui 3.92 (`nav__log-out`, `app-header__account`, `unauthorized__button`);
 * re-check them when upgrading Payload.
 */
export const EMBED_HIDE_CSS =
  'html:not([data-embed="direct"]) :is(.nav__log-out,.app-header__account,.unauthorized__button){display:none!important}' +
  // Framed or not yet known: the login / inactivity / unauthorized pages (all use the minimal template) are
  // never shown; the host gets a message and the page shows a status text instead.
  'html:not([data-embed="direct"]) .template-minimal__wrap{visibility:hidden}'

export type EmbedScreen = { kind: 'renew'; reason: 'expired' | 'logout' | 'inactivity' } | { kind: 'denied' }

/**
 * Which "no Payload login form here" screen a framed page must show for the current admin path:
 * the login form and the logout pages mean the Payload session is gone (the host ends the Medusa session and
 * shows the Medusa login), the unauthorized page means the user has no role.
 */
export const screenForPath = (pathname: string): EmbedScreen | null => {
  const path = pathname.replace(/\/+$/, '')
  if (path === '/admin/logout-inactivity') return { kind: 'renew', reason: 'inactivity' }
  if (path === '/admin/logout') return { kind: 'renew', reason: 'logout' }
  if (path === '/admin/login' || path === '/admin/forgot' || path === '/admin/create-first-user') {
    return { kind: 'renew', reason: 'expired' }
  }
  if (path === '/admin/unauthorized') return { kind: 'denied' }
  return null
}
