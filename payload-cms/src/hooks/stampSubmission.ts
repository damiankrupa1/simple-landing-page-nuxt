/**
 * @fileoverview Server-side facts for a form submission: e-mail key, consent snapshot, one sign-up per e-mail
 * @module stampSubmission
 */

import { ValidationError } from 'payload'
import type { CollectionBeforeChangeHook } from 'payload'

import { consentSnapshot, emailFromSubmission } from '../submissions/stamp.utils.ts'

/**
 * `beforeChange` on `form-submissions` (runs after `validateFormSubmission`). On create it always overwrites
 * `email`, `consentText`, `consentHash` and `consentLocale` with values derived on the server, so a client cannot
 * forge them.
 *
 * A second sign-up of the same e-mail on the same form is rejected with a `400` whose error has
 * `path: 'email'` (the storefront proxy should treat it as success so it does not reveal who is subscribed).
 * The unique index on `(form, email)` is the safety net for two requests racing past this check.
 */
export const stampSubmission: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data

  const email = emailFromSubmission(data.submissionData)

  const form =
    typeof data.form === 'number' || typeof data.form === 'string'
      ? await req.payload.findByID({
          collection: 'forms',
          id: data.form,
          depth: 0,
          locale: req.locale ?? undefined,
          disableErrors: true,
          overrideAccess: true,
          req,
        })
      : null

  if (email && form) {
    const existing = await req.payload.find({
      collection: 'form-submissions',
      where: { and: [{ form: { equals: form.id } }, { email: { equals: email } }] },
      limit: 1,
      depth: 0,
      pagination: false,
      overrideAccess: true,
      req,
    })
    if (existing.docs.length > 0) {
      throw new ValidationError({
        errors: [{ message: 'This e-mail address is already signed up.', path: 'email' }],
        req,
      })
    }
  }

  return {
    ...data,
    email,
    ...consentSnapshot(form?.fields as Parameters<typeof consentSnapshot>[0]),
    consentLocale: req.locale ?? null,
  }
}
