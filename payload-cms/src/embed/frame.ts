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
 * In embed mode, hide the account/logout controls and language controls until `data-embed="direct"` is set
 * (the page is not framed). The background follows the value supplied by the Medusa host.
 *
 * The class names come from @payloadcms/ui 3.92 (`nav__log-out`, `app-header__account`, `unauthorized__button`);
 * re-check them when upgrading Payload.
 */
export const EMBED_HIDE_CSS =
  'html:not([data-embed="direct"]) :is(.nav__log-out,.app-header__account,.unauthorized__button){display:none!important}' +
  'html:not([data-embed="direct"]) .app-header :is([aria-label*="language" i],[aria-label*="język" i],[title*="language" i],[title*="język" i]){display:none!important}' +
  'html[data-embed="frame"]{background-color:var(--payload-host-background,var(--theme-bg))}' +
  'html[data-embed="frame"] body{background-color:var(--payload-host-background,var(--theme-bg))}' +
  // Framed or not yet known: login, inactivity and unauthorized pages are replaced by a status message.
  'html:not([data-embed="direct"]) .template-minimal__wrap{visibility:hidden}'

export type EmbedScreen =
  | { kind: 'renew'; reason: 'expired' | 'logout' | 'inactivity' }
  | { kind: 'denied' }
  | { kind: 'managed-account' }

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
  if (path === '/admin/account') return { kind: 'managed-account' }
  return null
}
