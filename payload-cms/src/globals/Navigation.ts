import type { GlobalConfig } from 'payload'

import { atLeast } from '../access/roles'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    // Writes need a role from Medusa; `read` stays public because the storefront depends on it.
    update: atLeast('editor'),
  },
  fields: [
    {
      name: 'primaryNav',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
