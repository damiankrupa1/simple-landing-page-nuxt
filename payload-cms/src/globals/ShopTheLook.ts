import type { GlobalConfig } from 'payload'

import { validateStringArray } from './validators'

const localizedText = (name: string) => ({
  name,
  type: 'text' as const,
  localized: true,
  required: true,
})

export const ShopTheLook: GlobalConfig = {
  slug: 'shop-the-look',
  access: {
    read: () => true,
  },
  fields: [
    localizedText('eyebrow'),
    localizedText('headlineLine1'),
    localizedText('headlineLine2'),
    localizedText('description'),
    localizedText('captionLabel'),
    localizedText('bottomTagline'),
    localizedText('shopSetCtaLabel'),
    localizedText('totalLabel'),
    localizedText('sizeHint'),
    {
      name: 'productHandles',
      type: 'json',
      required: true,
      defaultValue: [],
      validate: validateStringArray,
      admin: {
        description: 'Enter a JSON array of Medusa product handles.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
