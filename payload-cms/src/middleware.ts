import { NextResponse } from 'next/server'

// Lets the Medusa admin dashboard (and only it) embed this app in an iframe.
export function middleware() {
  const response = NextResponse.next()
  const medusaAdminUrl = process.env.MEDUSA_ADMIN_URL
  const origin = medusaAdminUrl ? new URL(medusaAdminUrl).origin : ''
  response.headers.set('Content-Security-Policy', `frame-ancestors 'self' ${origin}`.trim())
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
