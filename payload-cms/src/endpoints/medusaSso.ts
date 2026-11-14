import { randomBytes } from 'node:crypto'
import { getFieldsToSign, jwtSign, type Endpoint, type TypedUser, type Where } from 'payload'
import { addSessionToUser, generateCookie, generatePayloadCookie, getCookieExpiration } from 'payload/shared'

import { parseSsoClaims, resolveAccount, type Account } from './ssoClaims.ts'
import { SSO_AUDIENCE, clearSessions, consumeTokenId, verifyMedusaToken } from './ssoShared.ts'

const fail = (status: number, error: string) => Response.json({ error }, { status })

const LNG_COOKIE_SECONDS = 365 * 24 * 60 * 60

/**
 * Single sign-on for the Medusa admin dashboard (contract v2).
 *
 * Medusa mints a short-lived HS256 JWT (`iss: medusa-admin`, `aud: payload`) signed with
 * MEDUSA_SSO_SECRET with the claims `sub` (stable Medusa user id), `email`, `name`, `role`, `jti`
 * (single use), `redirect` (path under /admin) and `lng` (en | pl). We verify it, link or create the
 * matching account (Medusa owns e-mail, name and role, and they are overwritten at every sign-in),
 * start a session and redirect with the regular Payload auth cookie.
 */
export const medusaSso: Endpoint = {
  path: '/sso/medusa',
  method: 'get',
  handler: async (req) => {
    const secret = process.env.MEDUSA_SSO_SECRET
    if (!secret) return fail(503, 'Medusa SSO is not configured')

    const token = req.searchParams.get('token')
    if (!token) return fail(400, 'Missing token')

    const verified = await verifyMedusaToken(token, secret, SSO_AUDIENCE)
    const parsed = verified ? parseSsoClaims(verified) : null
    if (!parsed?.ok) return fail(401, 'Invalid or expired token')
    const claims = parsed.claims

    const { payload } = req
    const collectionConfig = payload.collections.users.config

    // The token is only good once. A replay (for example from a Railway log line) is refused.
    if (!(await consumeTokenId(payload, claims.jti, claims.exp))) return fail(401, 'Token already used')

    const findOne = (where: Where) =>
      payload.db.findOne<TypedUser & Account>({ collection: 'users', where, req })
    const [byId, byEmail] = await Promise.all([
      findOne({ medusaUserId: { equals: claims.sub } }),
      findOne({ email: { equals: claims.email } }),
    ])

    // Default deny: no role in Medusa means no access. Take the role away from the linked account and end
    // its sessions right away instead of waiting for them to expire.
    if (claims.role === 'none') {
      if (byId) {
        await payload.update({ collection: 'users', id: byId.id, data: { role: 'none' }, overrideAccess: true })
        await clearSessions(payload, byId.id)
      }
      return fail(403, 'No access: the Medusa user has no Payload role')
    }

    const decision = resolveAccount({ sub: claims.sub, byId, byEmail })
    if (decision.action === 'conflict') {
      payload.logger.warn({ sub: claims.sub, reason: decision.reason }, 'Medusa SSO refused: account conflict')
      return fail(409, 'Account conflict: this Medusa user cannot be matched to a single Payload account')
    }

    // Medusa owns identity: e-mail, name and role are overwritten, and the account is linked to the Medusa id.
    const identity = { email: claims.email, name: claims.name, role: claims.role, medusaUserId: claims.sub }
    let userId: number | string
    if (decision.action === 'create') {
      // The password is required by the auth collection but never used: SSO users sign in through Medusa.
      const created = await payload.create({
        collection: 'users',
        data: { ...identity, password: randomBytes(32).toString('hex'), ssoManaged: true },
        overrideAccess: true,
      })
      userId = created.id
    } else {
      userId = decision.account.id
      await payload.update({ collection: 'users', id: userId, data: identity, overrideAccess: true })
    }

    const user = await findOne({ id: { equals: userId } })
    if (!user) return fail(500, 'Could not load the user')

    // Same steps as payload.login(), minus the password check.
    const { sid } = await addSessionToUser({ collectionConfig, payload, req, user })
    const { token: sessionToken } = await jwtSign({
      fieldsToSign: getFieldsToSign({ collectionConfig, email: user.email, sid, user }),
      secret: payload.secret,
      tokenExpiration: collectionConfig.auth.tokenExpiration,
    })

    const authConfig = collectionConfig.auth
    const headers = new Headers({ Location: claims.redirect })
    headers.append(
      'Set-Cookie',
      generatePayloadCookie({ collectionAuthConfig: authConfig, cookiePrefix: payload.config.cookiePrefix, token: sessionToken }),
    )
    if (claims.lng) {
      // Admin language, same flags as the session cookie because this runs inside a cross-site iframe.
      headers.append(
        'Set-Cookie',
        generateCookie<false>({
          name: `${payload.config.cookiePrefix}-lng`,
          value: claims.lng,
          domain: authConfig.cookies.domain ?? undefined,
          expires: getCookieExpiration({ seconds: LNG_COOKIE_SECONDS }),
          path: '/',
          returnCookieAsObject: false,
          sameSite: typeof authConfig.cookies.sameSite === 'string' ? authConfig.cookies.sameSite : undefined,
          secure: authConfig.cookies.secure,
        }),
      )
    }

    return new Response(null, { status: 302, headers })
  },
}
