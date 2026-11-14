import type { GlobalConfig } from 'payload'

import { atLeast } from '../access/roles'

export const CategoryTiles: GlobalConfig = {
  slug: 'category-tiles',
  access: {
    read: () => true,
    // Writes need a role from Medusa; `read` stays public because the storefront depends on it.
    update: atLeast('editor'),
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'categoryHandle',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
