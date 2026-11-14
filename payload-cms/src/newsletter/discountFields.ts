import type { Field } from 'payload'

const serverSet = (description: Record<'en' | 'pl', string>) => ({ readOnly: true, position: 'sidebar' as const, description })

/**
 * Discount code issued with a newsletter sign-up (`issueDiscount` sets every one of these on create and discards
 * client values). Payload only stores and validates the code; it never calls a shop. The shop redeems it through
 * `/api/newsletter-discount/redeem`. The fields carry no read restriction of their own: the collection's `read`
 * is staff only, and that is what makes the code appear in the create response for the visitor but nowhere else.
 */
export const discountFields: Field[] = [
  {
    name: 'discountCode',
    type: 'text',
    unique: true,
    index: true,
    admin: serverSet({
      en: 'Single-use discount code issued for this sign-up (newsletter forms only).',
      pl: 'Jednorazowy kod rabatowy wydany dla tego zapisu (tylko formularze newslettera).',
    }),
  },
  { name: 'discountPercent', type: 'number', admin: serverSet({ en: 'Percent off the code gives.', pl: 'Procent rabatu, jaki daje kod.' }) },
  { name: 'discountExpiresAt', type: 'date', admin: { ...serverSet({ en: 'The code stops working at this time.', pl: 'Kod przestaje działać o tej porze.' }), date: { pickerAppearance: 'dayAndTime' } } },
  { name: 'discountRedeemedAt', type: 'date', admin: { ...serverSet({ en: 'Set when the shop redeemed the code.', pl: 'Ustawiane, gdy sklep zrealizował kod.' }), date: { pickerAppearance: 'dayAndTime' } } },
]
