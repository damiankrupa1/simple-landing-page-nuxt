import type { Field } from 'payload'

const serverSet = (description: string) => ({
  readOnly: true,
  position: 'sidebar' as const,
  description,
})

/**
 * Facts about a sign-up that only the server may set (`stampSubmission` overwrites them on every create, so a
 * value sent by the client is discarded). The consent date is the submission's own `createdAt`; no IP address
 * is stored on purpose.
 */
export const stampFields: Field[] = [
  {
    name: 'email',
    type: 'text',
    index: true,
    admin: serverSet('Normalised (lowercase) e-mail of the submission. One per form (unique); older rows are empty.'),
  },
  {
    name: 'consentText',
    type: 'textarea',
    admin: serverSet('The consent wording the visitor saw (label of the consent checkbox in the request locale).'),
  },
  {
    name: 'consentHash',
    type: 'text',
    admin: serverSet('SHA-256 of the consent wording: equal hashes mean the same text was shown.'),
  },
  {
    name: 'consentLocale',
    type: 'text',
    admin: serverSet('Locale of the request, so the wording can be found in the form.'),
  },
]
