import { randomBytes } from 'node:crypto'
import { jwtVerify } from 'jose'
import { getFieldsToSign, jwtSign, type Endpoint, type TypedUser } from 'payload'
import { addSessionToUser, generatePayloadCookie } from 'payload/shared'

const MAX_TOKEN_LIFETIME_SECONDS = 120

const fail = (status: number, error: string) => Response.json({ error }, { status })

/**
 * Single sign-on for the Medusa admin dashboard.
 *
 * Medusa mints a short-lived HS256 JWT (`iss: medusa-admin`, `aud: payload`, `email` claim) signed
 * with MEDUSA_SSO_SECRET and sends the browser here. We verify it, find or create the matching
 * user, start a session and redirect to /admin with the regular Payload auth cookie.
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
    const collectionConfig = payload.collections.users.config

    // Accounts are matched by email. Medusa admins are trusted to be Payload admins, so an existing
    // account (for example one created by hand) is signed in as is, without touching its password.
    const lookup = () =>
      payload.db.findOne<TypedUser>({ collection: 'users', where: { email: { equals: email } }, req })
    let user = await lookup()
    if (!user) {
      // The password is required by the auth collection but never used: SSO users sign in through Medusa.
      await payload.create({
        collection: 'users',
        data: { email, password: randomBytes(32).toString('hex'), ssoManaged: true },
        overrideAccess: true,
      })
      user = await lookup()
    }
    if (!user) return fail(500, 'Could not create the user')

    // Same steps as payload.login(), minus the password check.
    const { sid } = await addSessionToUser({ collectionConfig, payload, req, user })
    const { token: sessionToken } = await jwtSign({
      fieldsToSign: getFieldsToSign({ collectionConfig, email: user.email, sid, user }),
      secret: payload.secret,
      tokenExpiration: collectionConfig.auth.tokenExpiration,
    })

    const cookie = generatePayloadCookie({
      collectionAuthConfig: payload.collections.users.config.auth,
      cookiePrefix: payload.config.cookiePrefix,
      token: sessionToken,
    })

    return new Response(null, { status: 302, headers: { Location: '/admin', 'Set-Cookie': cookie } })
  },
}
