/**
 * @fileoverview Pure validation of form-builder submissions against a form definition
 * @module validateFormSubmission.utils
 *
 * No Payload imports on purpose: this runs on untrusted request data and is unit-tested with `node:test`.
 */

export const MAX_FIELDS = 50
export const MAX_VALUE_LENGTH = 5000
export const MAX_EMAIL_LENGTH = 254

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TEXT_TYPES = new Set(['text', 'textarea', 'country', 'state'])
const SUPPORTED_TYPES = new Set([...TEXT_TYPES, 'email', 'number', 'checkbox', 'select'])

/** The parts of a stored form field this validator reads (a subset of the plugin's field blocks). */
export type FormFieldDefinition = {
  blockType: string
  name?: string | null
  required?: boolean | null
  options?: { value: string }[] | null
}

export type SubmissionError = { message: string; path: string }

/** Normalised row in the shape the plugin stores; properties other than `field` and `value` are kept. */
export type SubmissionRow = Record<string, unknown> & { field: string; value: string }

export type SubmissionValidation =
  | { valid: true; rows: SubmissionRow[] }
  | { valid: false; errors: SubmissionError[] }

type FieldValue = { ok: true; empty: boolean; value: string } | { ok: false; message: string }

const isPlainObject = (input: unknown): input is Record<string, unknown> =>
  typeof input === 'object' && input !== null && !Array.isArray(input)

/** Quotes a client-supplied name for error messages without echoing arbitrarily long input. */
const quote = (name: string) => JSON.stringify(name.length > 64 ? `${name.slice(0, 64)}...` : name)

const ok = (value: string, empty = value === ''): FieldValue => ({ ok: true, empty, value })

/**
 * Accepted input per field type (anything else is rejected, never coerced):
 * - checkbox: `true`/`false` or `"true"`/`"false"`, stored as `"true"`/`"false"`;
 * - number: a finite number or a numeric string, stored as text;
 * - email: a string, trimmed, at most 254 characters and `local@domain.tld` shaped;
 * - select: a string equal to one of the stored options;
 * - text, textarea, country, state: a string, stored as sent (not trimmed).
 * A blank string, `null` or a missing value means "not provided" for every type.
 */
function normalizeValue(definition: FormFieldDefinition, raw: unknown): FieldValue {
  const type = definition.blockType
  if (!SUPPORTED_TYPES.has(type))
    return { ok: false, message: 'has a type that cannot be submitted.' }
  if (raw === undefined || raw === null) return ok('')

  if (type === 'checkbox') {
    if (typeof raw === 'boolean') return ok(String(raw))
    if (typeof raw === 'string' && raw.trim() === '') return ok('')
    if (raw === 'true' || raw === 'false') return ok(raw)
    return { ok: false, message: 'must be true or false.' }
  }

  if (type === 'number') {
    if (typeof raw === 'number') {
      return Number.isFinite(raw) ? ok(String(raw)) : { ok: false, message: 'must be a number.' }
    }
    if (typeof raw !== 'string') return { ok: false, message: 'must be a number.' }
    const trimmed = raw.trim()
    if (trimmed === '') return ok('')
    return Number.isFinite(Number(trimmed))
      ? ok(trimmed)
      : { ok: false, message: 'must be a number.' }
  }

  if (typeof raw !== 'string') return { ok: false, message: 'must be text.' }
  if (raw.length > MAX_VALUE_LENGTH) return { ok: false, message: 'is too long.' }
  if (raw.trim() === '') return ok('')

  if (type === 'email') {
    const email = raw.trim()
    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
      return { ok: false, message: 'must be a valid e-mail address.' }
    }
    return ok(email)
  }

  if (type === 'select') {
    return definition.options?.some((option) => option.value === raw)
      ? ok(raw)
      : { ok: false, message: 'is not one of the options.' }
  }

  return ok(raw) // text, textarea, country, state
}

/**
 * Checks `submissionData` against the fields of the form it was sent for.
 *
 * Policy: the data must be a list (a missing value counts as an empty list); every row an object with a
 * non-empty string `field` that exists on the form, at most once; field types this file does not know are
 * refused rather than waved through; blank optional values are dropped; required fields must be present
 * (a required checkbox must be `true`). All problems are returned together, one per field where possible.
 */
export function validateSubmissionData(
  submissionData: unknown,
  fields: readonly FormFieldDefinition[],
): SubmissionValidation {
  if (submissionData != null && !Array.isArray(submissionData)) {
    return {
      valid: false,
      errors: [{ message: 'Submission data must be a list.', path: 'submissionData' }],
    }
  }
  const rawRows: unknown[] = submissionData ?? []
  if (rawRows.length > MAX_FIELDS) {
    return {
      valid: false,
      errors: [{ message: `Too many fields (max ${MAX_FIELDS}).`, path: 'submissionData' }],
    }
  }

  const definitions = new Map<string, FormFieldDefinition>()
  for (const field of fields) {
    if (typeof field.name === 'string' && field.name !== '') definitions.set(field.name, field)
  }

  const errors: SubmissionError[] = []
  const rows: SubmissionRow[] = []
  const seen = new Set<string>()
  const invalid = new Set<string>()
  const values = new Map<string, string>()

  rawRows.forEach((row, index) => {
    const path = `submissionData.${index}`
    if (!isPlainObject(row)) {
      errors.push({ message: 'Each entry must be an object with "field" and "value".', path })
      return
    }
    const { field: name, value: raw } = row
    if (typeof name !== 'string' || name === '') {
      errors.push({ message: 'Entry is missing a field name.', path: `${path}.field` })
      return
    }
    const definition = definitions.get(name)
    if (!definition) {
      errors.push({ message: `Unknown field ${quote(name)}.`, path: `${path}.field` })
      return
    }
    if (seen.has(name)) {
      errors.push({
        message: `Field ${quote(name)} was sent more than once.`,
        path: `${path}.field`,
      })
      return
    }
    seen.add(name)

    const result = normalizeValue(definition, raw)
    if (!result.ok) {
      invalid.add(name)
      errors.push({ message: `Field ${quote(name)} ${result.message}`, path: `${path}.value` })
      return
    }
    values.set(name, result.value)
    if (!result.empty) rows.push({ ...row, field: name, value: result.value })
  })

  for (const [name, definition] of definitions) {
    if (!definition.required || invalid.has(name)) continue
    const value = values.get(name) ?? ''
    const missing = definition.blockType === 'checkbox' ? value !== 'true' : value === ''
    if (missing)
      errors.push({ message: `Field ${quote(name)} is required.`, path: 'submissionData' })
  }

  return errors.length > 0 ? { valid: false, errors } : { valid: true, rows }
}
