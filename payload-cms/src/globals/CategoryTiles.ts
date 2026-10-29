import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { globalPreview } from './preview'
import { globalVersions } from './versions'

export const CategoryTiles: GlobalConfig = {
  slug: 'category-tiles',
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
  admin: globalPreview('category-tiles'),
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
