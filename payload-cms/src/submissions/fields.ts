import type { Field } from 'payload'

const serverSet = (description: Record<'en' | 'pl', string>) => ({
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
    // No own index: the unique (form, email) index in payload.config.ts serves the lookups.
    admin: serverSet({
      en: 'Normalised (lowercase) e-mail of the submission. One per form (unique); older rows are empty.',
      pl: 'Znormalizowany (małe litery) e-mail zgłoszenia. Jeden na formularz (unikalny); starsze wiersze są puste.',
    }),
  },
  {
    name: 'consentText',
    type: 'textarea',
    admin: serverSet({
      en: 'The consent wording the visitor saw (label of the consent checkbox in the request locale).',
      pl: 'Treść zgody, którą widział odwiedzający (etykieta pola zgody w języku żądania).',
    }),
  },
  {
    name: 'consentHash',
    type: 'text',
    admin: serverSet({
      en: 'SHA-256 of the consent wording: equal hashes mean the same text was shown.',
      pl: 'SHA-256 treści zgody: równe skróty oznaczają, że pokazano ten sam tekst.',
    }),
  },
  {
    name: 'consentLocale',
    type: 'text',
    admin: serverSet({
      en: 'Locale of the request, so the wording can be found in the form.',
      pl: 'Język żądania, aby można było znaleźć treść w formularzu.',
    }),
  },
]
