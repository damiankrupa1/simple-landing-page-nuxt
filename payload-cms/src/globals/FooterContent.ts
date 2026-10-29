import type { GlobalConfig } from 'payload'

import { atLeast } from '../access/roles'

const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
    localized: true,
    required: true,
  },
  {
    name: 'url',
    type: 'text' as const,
    required: true,
  },
]

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  access: {
    read: () => true,
    // Writes need a role from Medusa; `read` stays public because the storefront depends on it.
    update: atLeast('editor'),
  },
  fields: [
    {
      name: 'helpLinks',
      type: 'array',
      fields: linkFields,
    },
    {
      name: 'worldLinks',
      type: 'array',
      fields: linkFields,
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: linkFields,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'hours',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'handle',
          type: 'text',
        },
      ],
    },
  ],
}
