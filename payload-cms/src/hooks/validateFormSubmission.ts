/**
 * @fileoverview Server-side validation for form-builder submissions
 * @module validateFormSubmission
 */

import { ValidationError } from 'payload'
import type { CollectionBeforeValidateHook } from 'payload'

import { validateSubmissionData } from './validateFormSubmission.utils.ts'

/**
 * The form-builder plugin stores whatever `submissionData` it receives, so anyone could POST a malformed
 * e-mail, skip a required consent or send fields the form does not have. This loads the form a submission
 * targets and checks the data against it (rules: `validateFormSubmission.utils.ts`).
 *
 * A form that does not exist, or a missing `form`, is left to the plugin's own `form` field validation.
 * Any other failure to read the form is rethrown, so a database problem can never skip validation.
 */
export const validateFormSubmission: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' || !data) return data

  const formId = data.form
  if (formId == null) return data
  if (typeof formId !== 'string' && typeof formId !== 'number') {
    throw new ValidationError({
      errors: [{ message: 'Form reference is invalid.', path: 'form' }],
      req,
    })
  }

  const form = await req.payload.findByID({
    collection: 'forms',
    id: formId,
    depth: 0,
    disableErrors: true, // only "not found" becomes null; other errors still throw
    overrideAccess: true,
    req,
  })
  if (!form) return data

  const result = validateSubmissionData(data.submissionData, form.fields ?? [])
  if (!result.valid) throw new ValidationError({ errors: result.errors, req })

  return { ...data, submissionData: result.rows }
}
