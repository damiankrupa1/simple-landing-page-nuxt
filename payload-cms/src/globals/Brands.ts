import type { GlobalConfig } from 'payload'

import { validateStringArray } from './validators'

export const Brands: GlobalConfig = {
  slug: 'brands',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'otherBrands',
      type: 'json',
      required: true,
      defaultValue: [],
      validate: validateStringArray,
      admin: {
        description: 'Enter a JSON array of brand names.',
      },
    },
  ],
}
