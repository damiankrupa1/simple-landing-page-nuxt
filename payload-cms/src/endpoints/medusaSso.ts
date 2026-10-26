import { randomBytes } from 'node:crypto'
import { jwtVerify } from 'jose'
import type { Endpoint } from 'payload'
import { generatePayloadCookie } from 'payload/shared'

const MAX_TOKEN_LIFETIME_SECONDS = 120

const fail = (status: number, error: string) => Response.json({ error }, { status })

/**
 * Single sign-on for the Medusa admin dashboard.
 *
 * Medusa mints a short-lived HS256 JWT (`iss: medusa-admin`, `aud: payload`, `email` claim) signed
 * with MEDUSA_SSO_SECRET and sends the browser here. We verify it, find or create the matching
 * user, log them in and redirect to /admin with the regular Payload auth cookie.
 */
export const medusaSso: Endpoint = {
  path: '/sso/medusa',
  method: 'get',
  handler: async (req) => {
    const secret = process.env.MEDUSA_SSO_SECRET
    if (!secret) return fail(503, 'Medusa SSO is not configured')

    const token = req.searchParams.get('token')
    if (!token) return fail(400, 'Missing token')

    let email: string
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
        algorithms: ['HS256'],
        issuer: 'medusa-admin',
        audience: 'payload',
        requiredClaims: ['exp', 'iat'],
      })
      if (typeof payload.email !== 'string' || !payload.email) throw new Error('missing email')
      if (payload.exp! - payload.iat! > MAX_TOKEN_LIFETIME_SECONDS) throw new Error('token lives too long')
      email = payload.email.toLowerCase()
    } catch {
      return fail(401, 'Invalid or expired token')
    }

    const { payload } = req
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })
    const user = existing.docs[0]

    // Never take over an account that was created in Payload directly.
    if (user && !user.ssoManaged) return fail(403, 'This account is not managed by Medusa SSO')

    // SSO users never use their password, so a fresh random one per login is enough to get a
    // regular Payload session (token, sessions, hooks) out of payload.login().
    const password = randomBytes(32).toString('hex')
    if (user) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { password },
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'users',
        data: { email, password, ssoManaged: true },
        overrideAccess: true,
      })
    }

    const login = await payload.login({ collection: 'users', data: { email, password } })
    if (!login.token) return fail(500, 'Login failed')

    const cookie = generatePayloadCookie({
      collectionAuthConfig: payload.collections.users.config.auth,
      cookiePrefix: payload.config.cookiePrefix,
      token: login.token,
    })

    return new Response(null, { status: 302, headers: { Location: '/admin', 'Set-Cookie': cookie } })
  },
}
