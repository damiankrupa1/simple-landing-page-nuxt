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
  'html:not([data-embed="direct"]) :is(.nav__log-out,.app-header__account,.unauthorized__button){display:none!important}'
