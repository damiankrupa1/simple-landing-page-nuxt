import type { Endpoint, PayloadRequest } from 'payload'

import { bearerToken, secretMatches } from '../access/sharedSecret.ts'
import { discountState, normalizeCode, type DiscountState } from '../newsletter/discount.utils.ts'

const fail = (status: number, error: string) => Response.json({ error }, { status })

/**
 * Server-to-server contract for the shop (Medusa checkout). Both routes need
 * `Authorization: Bearer <NEWSLETTER_DISCOUNT_SECRET>` (constant-time compare; without the variable they answer
 * 503, so an unset secret never means open). They never return the e-mail of the subscriber.
 */
const authorize = (req: PayloadRequest): Response | null => {
  const secret = process.env.NEWSLETTER_DISCOUNT_SECRET
  if (!secret) return fail(503, 'Newsletter discount is not configured')
  if (!secretMatches(bearerToken(req.headers.get('authorization')), secret)) return fail(401, 'Invalid or missing bearer token')
  return null
}

const readCode = async (req: PayloadRequest): Promise<string | Response> => {
  let body: unknown
  try {
    body = await req.json?.()
  } catch {
    return fail(400, 'Body must be JSON')
  }
  const code = normalizeCode((body as { code?: unknown } | null)?.code)
  return code ?? fail(400, 'A valid "code" is required')
}

type Found = { discountPercent?: number | null; discountExpiresAt?: string | null; discountRedeemedAt?: string | null }

const lookup = async (req: PayloadRequest, code: string): Promise<Found | null> => {
  const { docs } = await req.payload.find({
    collection: 'form-submissions',
    where: { discountCode: { equals: code } },
    limit: 1,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    req,
  })
  return (docs[0] as Found | undefined) ?? null
}

/** `POST /api/newsletter-discount/validate` `{ "code" }` -> `{ valid, percent, expiresAt }` or `{ valid: false, reason }`. Changes nothing. */
export const newsletterDiscountValidate: Endpoint = {
  path: '/newsletter-discount/validate',
  method: 'post',
  handler: async (req) => {
    const denied = authorize(req)
    if (denied) return denied
    const code = await readCode(req)
    if (typeof code !== 'string') return code

    const row = await lookup(req, code)
    const state = discountState(row, new Date())
    if (state !== 'valid' || !row) return Response.json({ valid: false, reason: state })
    return Response.json({ valid: true, percent: row.discountPercent, expiresAt: row.discountExpiresAt })
  },
}

const REASON_STATUS: Record<Exclude<DiscountState, 'valid'>, number> = { unknown: 404, redeemed: 409, expired: 409 }

/**
 * `POST /api/newsletter-discount/redeem` `{ "code" }` -> `200 { redeemed: true, percent }`, otherwise
 * `404 { redeemed: false, reason: "unknown" }` or `409 { redeemed: false, reason: "redeemed" | "expired" }`.
 *
 * The redemption is ONE conditional UPDATE (not read-then-write), so of any number of parallel calls exactly one
 * matches `discount_redeemed_at IS NULL` and gets the row back; the others find nothing to update. Payload's own
 * `update` cannot do this: it reads first, then writes.
 */
export const newsletterDiscountRedeem: Endpoint = {
  path: '/newsletter-discount/redeem',
  method: 'post',
  handler: async (req) => {
    const denied = authorize(req)
    if (denied) return denied
    const code = await readCode(req)
    if (typeof code !== 'string') return code

    const { rows } = await req.payload.db.pool.query<{ discount_percent: number | string | null }>(
      `UPDATE "form_submissions"
          SET "discount_redeemed_at" = now()
        WHERE "discount_code" = $1
          AND "discount_redeemed_at" IS NULL
          AND "discount_expires_at" > now()
        RETURNING "discount_percent"`,
      [code],
    )
    if (rows.length === 1) return Response.json({ redeemed: true, percent: Number(rows[0].discount_percent) })

    // Nothing was updated: find out why, for a useful answer (this read is not part of the atomic step).
    const state = discountState(await lookup(req, code), new Date())
    // Still "valid" can only mean the code ran out between the UPDATE (database clock) and this read (app clock).
    const reason = state === 'valid' ? 'expired' : state
    return Response.json({ redeemed: false, reason }, { status: REASON_STATUS[reason] })
  },
}
