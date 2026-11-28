import { NextResponse, type NextRequest } from 'next/server'

import { frameAncestors, isEmbedEnabled, parseAllowedOrigins } from './embed/config'
import { DEBUG_COOKIE, DEBUG_PARAM, standaloneBlockedHtml, standaloneDecision } from './embed/gate'

// Lets the Medusa admin dashboard (and only the origins listed in MEDUSA_ADMIN_URLS / MEDUSA_ADMIN_URL) embed
// this app in an iframe. Independent of PAYLOAD_EMBEDDED so that switching the flag off keeps the iframe working.
export function middleware(request: NextRequest) {
  // In embed mode a hard load of the logout page inside a frame is bounced to the admin home. Soft navigations
  // and REST calls send `Sec-Fetch-Dest: empty`, so the REST logout stays available by design.
  if (
    isEmbedEnabled(process.env) &&
    request.nextUrl.pathname === '/admin/logout' &&
    request.headers.get('sec-fetch-dest') === 'iframe'
  ) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  const origins = parseAllowedOrigins(process.env)
  const csp = `frame-ancestors ${frameAncestors(origins)}`

  // The embedded admin is not meant to be opened as a standalone page (`?enableDebug=1` is the way around it).
  const standalone = standaloneDecision({
    embedded: isEmbedEnabled(process.env),
    pathname: request.nextUrl.pathname,
    secFetchDest: request.headers.get('sec-fetch-dest'),
    debugParam: request.nextUrl.searchParams.get(DEBUG_PARAM),
    hasDebugCookie: request.cookies.get(DEBUG_COOKIE)?.value === '1',
  })
  if (standalone === 'block') {
    return new NextResponse(standaloneBlockedHtml(origins[0]), {
      status: 403,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Security-Policy': csp },
    })
  }

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', csp)
  if (standalone === 'allow-and-remember') {
    // A session cookie the page can read, so the client side check agrees with this one.
    response.cookies.set(DEBUG_COOKIE, '1', { path: '/', sameSite: 'lax', secure: request.nextUrl.protocol === 'https:' })
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
