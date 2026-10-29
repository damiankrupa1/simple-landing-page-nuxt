import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { globalVersions } from './versions'

export const JournalSection: GlobalConfig = {
  slug: 'journal-section',
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
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
