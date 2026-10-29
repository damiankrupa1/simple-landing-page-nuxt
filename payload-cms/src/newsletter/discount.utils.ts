/**
 * @fileoverview Pure helpers for the newsletter discount code (random single-use code per sign-up).
 *
 * Kept free of Payload imports so it can be unit tested with `node --test`.
 */
import { randomBytes } from 'node:crypto'

export const DEFAULT_PERCENT = 10
export const DEFAULT_DAYS = 30

// 31 characters without 0/O/1/I/L: easy to read out or type from an e-mail or a screen. 12 characters are about
// 59 bits, which cannot be guessed; characters come from random bytes by rejection sampling (no modulo bias).
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 12

export type DiscountSettings = { percent: number; days: number }

const intInRange = (raw: string | undefined, min: number, max: number, fallback: number): number => {
  if (raw === undefined || raw.trim() === '') return fallback
  const value = Number(raw)
  return Number.isInteger(value) && value >= min && value <= max ? value : fallback
}

/**
 * `NEWSLETTER_DISCOUNT_PERCENT` (1-100, default 10; `0` turns the discount off) and `NEWSLETTER_DISCOUNT_DAYS`
 * (1-365, default 30). An invalid value falls back to the default rather than silently disabling or inflating it.
 */
export const discountSettings = (env: Record<string, string | undefined>): DiscountSettings | null => {
  const percent = intInRange(env.NEWSLETTER_DISCOUNT_PERCENT, 0, 100, DEFAULT_PERCENT)
  if (percent === 0) return null
  return { percent, days: intInRange(env.NEWSLETTER_DISCOUNT_DAYS, 1, 365, DEFAULT_DAYS) }
}

/** `XXXX-XXXX-XXXX`. */
export const generateCode = (): string => {
  let code = ''
  while (code.length < CODE_LENGTH) {
    for (const byte of randomBytes(CODE_LENGTH * 2)) {
      const index = byte & 31
      if (index < ALPHABET.length && code.length < CODE_LENGTH) code += ALPHABET[index]
    }
  }
  return `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8)}`
}

/** Brings user input (`abcd efgh-ijkl`, lowercase, stray spaces) to the stored form; null when it cannot be a code. */
export const normalizeCode = (input: unknown): string | null => {
  if (typeof input !== 'string' || input.length > 64) return null
  const compact = input.toUpperCase().replace(/[\s-]/g, '')
  if (compact.length !== CODE_LENGTH || [...compact].some((char) => !ALPHABET.includes(char))) return null
  return `${compact.slice(0, 4)}-${compact.slice(4, 8)}-${compact.slice(8)}`
}

export const expiresAt = (from: Date, days: number): Date => new Date(from.getTime() + days * 24 * 60 * 60 * 1000)

/** A form is a newsletter form when it collects an `email` and a required `consent` checkbox (the title is localised). */
export const isNewsletterForm = (
  fields: readonly { blockType?: string; name?: string | null; required?: boolean | null }[] | null | undefined,
): boolean =>
  Boolean(
    fields?.some((field) => field.blockType === 'email' && field.name === 'email') &&
      fields.some((field) => field.blockType === 'checkbox' && field.name === 'consent' && field.required),
  )

export type DiscountRow = { discountExpiresAt?: string | null; discountRedeemedAt?: string | null } | null | undefined
export type DiscountState = 'valid' | 'unknown' | 'redeemed' | 'expired'

export const discountState = (row: DiscountRow, now: Date): DiscountState => {
  if (!row) return 'unknown'
  if (row.discountRedeemedAt) return 'redeemed'
  if (!row.discountExpiresAt || new Date(row.discountExpiresAt).getTime() <= now.getTime()) return 'expired'
  return 'valid'
}
