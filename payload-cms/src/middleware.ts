import { NextResponse, type NextRequest } from 'next/server'

import { frameAncestors, isEmbedEnabled, parseAllowedOrigins } from './embed/config'

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

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', `frame-ancestors ${frameAncestors(parseAllowedOrigins(process.env))}`)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
