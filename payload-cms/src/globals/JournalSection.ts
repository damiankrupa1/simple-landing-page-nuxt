import type { GlobalConfig } from 'payload'

import { atLeast } from '../access/roles'

export const JournalSection: GlobalConfig = {
  slug: 'journal-section',
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
      name: 'articles',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'category',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'readingTime',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'summary',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
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
