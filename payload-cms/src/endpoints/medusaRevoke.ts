import type { Endpoint, TypedUser } from 'payload'

import { parseRevokeClaims } from './ssoClaims.ts'
import { REVOKE_AUDIENCE, clearSessions, consumeTokenId, verifyMedusaToken } from './ssoShared.ts'

const fail = (status: number, error: string) => Response.json({ error }, { status })

/**
 * Server-to-server: Medusa tells Payload that a user's session is over, so a Medusa logout (or a deleted /
 * disabled user) ends the Payload session immediately instead of at its own expiry.
 *
 * `POST /api/users/sso/revoke` with `Authorization: Bearer <jwt>`, HS256 with MEDUSA_SSO_SECRET,
 * `iss: medusa-admin`, `aud: payload-session`, claims `sub`, `jti` (single use), `action`
 * (`logout` | `revoke`), lifetime at most 120 s. `revoke` also sets the role to none. An unknown `sub` is
 * a success with `revoked: false`, so repeated calls are harmless and the endpoint is no user oracle.
 */
export const medusaRevoke: Endpoint = {
  path: '/sso/revoke',
  method: 'post',
  handler: async (req) => {
    const secret = process.env.MEDUSA_SSO_SECRET
    if (!secret) return fail(503, 'Medusa SSO is not configured')

    const header = req.headers.get('authorization') ?? ''
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
    if (!token) return fail(401, 'Missing bearer token')

    const verified = await verifyMedusaToken(token, secret, REVOKE_AUDIENCE)
    const parsed = verified ? parseRevokeClaims(verified) : null
    if (!parsed?.ok) return fail(401, 'Invalid or expired token')
    const { sub, jti, exp, action } = parsed.claims

    const { payload } = req
    if (!(await consumeTokenId(payload, jti, exp))) return fail(401, 'Token already used')

    const user = await payload.db.findOne<TypedUser>({
      collection: 'users',
      where: { medusaUserId: { equals: sub } },
      req,
    })
    if (!user) return Response.json({ revoked: false })

    if (action === 'revoke') {
      await payload.update({ collection: 'users', id: user.id, data: { role: 'none' }, overrideAccess: true })
    }
    await clearSessions(payload, user.id)
    return Response.json({ revoked: true })
  },
}
