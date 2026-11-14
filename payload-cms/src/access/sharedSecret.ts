/**
 * @fileoverview Constant-time check of a shared secret sent by another server.
 *
 * Fails closed: when the expected secret is not configured nothing matches, not even an empty value.
 * Kept free of runtime imports from `payload` so it can be unit tested with `node --test`.
 */
import { createHash, timingSafeEqual } from 'node:crypto'

const digest = (value: string) => createHash('sha256').update(value, 'utf8').digest()

/** Compares SHA-256 digests with `timingSafeEqual`, so the length and the content of the secret do not leak. */
export const secretMatches = (provided: string | null | undefined, expected: string | null | undefined): boolean => {
  if (!expected || !provided) return false
  return timingSafeEqual(digest(provided), digest(expected))
}

/** The token of an `Authorization: Bearer <token>` header, or an empty string. */
export const bearerToken = (header: string | null | undefined): string =>
  header?.startsWith('Bearer ') ? header.slice(7).trim() : ''
