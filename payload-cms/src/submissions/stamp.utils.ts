/**
 * @fileoverview Pure helpers that derive the server-side facts stored with a form submission.
 *
 * No Payload imports on purpose: this runs on untrusted request data and is unit tested with `node:test`.
 */
import { createHash } from 'node:crypto'

/** Lowercased and trimmed; the unique key of a sign-up. Not a validity check (`validateFormSubmission` does that). */
export const normalizeEmail = (value: unknown): string | null => {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  return email === '' ? null : email
}

type Row = { field?: unknown; value?: unknown }

/** The value of the `email` row of `submissionData`, normalised; null when the form has no e-mail field. */
export const emailFromSubmission = (submissionData: unknown): string | null => {
  if (!Array.isArray(submissionData)) return null
  const row = submissionData.find((item: Row) => item?.field === 'email') as Row | undefined
  return normalizeEmail(row?.value)
}

type FormField = { blockType?: string; name?: string | null; label?: unknown }

/** The form's consent checkbox is the checkbox field named `consent` (the Newsletter form contract). */
export const isConsentField = (field: FormField): boolean => field.blockType === 'checkbox' && field.name === 'consent'

export const sha256 = (text: string): string => createHash('sha256').update(text, 'utf8').digest('hex')

export type ConsentSnapshot = { consentText: string | null; consentHash: string | null }

/**
 * The consent wording the visitor saw: the label of the consent checkbox in the request locale. A label that is
 * not plain text (for example when the request asked for every locale at once) is not stored, so no snapshot is
 * better than a wrong one.
 */
export const consentSnapshot = (fields: readonly FormField[] | null | undefined): ConsentSnapshot => {
  const label = fields?.find(isConsentField)?.label
  if (typeof label !== 'string' || label.trim() === '') return { consentText: null, consentHash: null }
  return { consentText: label, consentHash: sha256(label) }
}
