import type { Field } from 'payload'

const serverSet = (description: string) => ({ readOnly: true, position: 'sidebar' as const, description })

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
    admin: serverSet('Single-use discount code issued for this sign-up (newsletter forms only).'),
  },
  { name: 'discountPercent', type: 'number', admin: serverSet('Percent off the code gives.') },
  { name: 'discountExpiresAt', type: 'date', admin: { ...serverSet('The code stops working at this time.'), date: { pickerAppearance: 'dayAndTime' } } },
  { name: 'discountRedeemedAt', type: 'date', admin: { ...serverSet('Set when the shop redeemed the code.'), date: { pickerAppearance: 'dayAndTime' } } },
]
