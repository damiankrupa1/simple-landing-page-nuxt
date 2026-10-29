/**
 * @fileoverview Issues the single-use newsletter discount code with a sign-up
 * @module issueDiscount
 */
import type { CollectionBeforeChangeHook } from 'payload'

import { discountSettings, expiresAt, generateCode, isNewsletterForm } from '../newsletter/discount.utils.ts'

const none = { discountCode: null, discountPercent: null, discountExpiresAt: null, discountRedeemedAt: null }

/**
 * `beforeChange` on `form-submissions`, after `stampSubmission` (a rejected duplicate never gets a code). On
 * create it always overwrites the four discount fields: a random code for a newsletter form (see
 * `isNewsletterForm`) while the discount is switched on, nothing otherwise, so the client cannot choose a code,
 * a percentage or a redeemed date. The code is part of the create response and is not readable afterwards
 * except by staff.
 */
export const issueDiscount: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data

  const settings = discountSettings(process.env)
  const form =
    settings && (typeof data.form === 'number' || typeof data.form === 'string')
      ? await req.payload.findByID({
          collection: 'forms',
          id: data.form,
          depth: 0,
          disableErrors: true,
          overrideAccess: true,
          req,
        })
      : null

  if (!settings || !form || !isNewsletterForm(form.fields)) return { ...data, ...none }

  return {
    ...data,
    discountCode: generateCode(),
    discountPercent: settings.percent,
    discountExpiresAt: expiresAt(new Date(), settings.days).toISOString(),
    discountRedeemedAt: null,
  }
}
