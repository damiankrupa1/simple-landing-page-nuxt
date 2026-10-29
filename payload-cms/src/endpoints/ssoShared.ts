import { jwtVerify, type JWTPayload } from 'jose'
import { ValidationError, type Payload, type PayloadRequest } from 'payload'

import type { User } from '../payload-types'

export const SSO_ISSUER = 'medusa-admin'

/** Audience of the browser SSO token and of the server-to-server revocation token. */
export const SSO_AUDIENCE = 'payload'
export const REVOKE_AUDIENCE = 'payload-session'

/** Verifies signature, algorithm, issuer, audience and mandatory claims. Returns null for any failure. */
export const verifyMedusaToken = async (
  token: string,
  secret: string,
  audience: string,
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ['HS256'],
      issuer: SSO_ISSUER,
      audience,
      requiredClaims: ['exp', 'iat', 'jti', 'sub'],
    })
    return payload
  } catch {
    return null
  }
}

/**
 * Marks a token id as used. Returns false when it was already used (replay).
 * The unique index on `jti` makes concurrent uses race safely: only one insert succeeds.
 */
export const consumeTokenId = async (payload: Payload, jti: string, exp: number): Promise<boolean> => {
  // Expired tokens are rejected by the signature check anyway, so their rows are dead weight.
  await payload.delete({
    collection: 'sso-token-uses',
    where: { expiresAt: { less_than: new Date().toISOString() } },
    overrideAccess: true,
  })
  try {
    await payload.create({
      collection: 'sso-token-uses',
      data: { jti, expiresAt: new Date(exp * 1000).toISOString() },
      overrideAccess: true,
    })
    return true
  } catch (error) {
    if (error instanceof ValidationError) return false
    throw error
  }
}

/** Ends every session of a user: their JWTs stop working immediately (the JWT strategy needs the sid). */
export const clearSessions = async (payload: Payload, id: number | string, req?: PayloadRequest): Promise<void> => {
  const user = await payload.db.findOne<User>({ collection: 'users', where: { id: { equals: id } }, req })
  if (!user) return
  user.sessions = []
  // Same as the logout operation: do not bump updatedAt for a session-only change.
  user.updatedAt = null as unknown as string
  await payload.db.updateOne({ collection: 'users', id, data: user as unknown as Record<string, unknown>, req, returning: false })
}
