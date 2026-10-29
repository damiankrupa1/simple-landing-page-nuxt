import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { validateStringArray } from './validators'
import { globalPreview } from './preview'
import { globalVersions } from './versions'

export const Brands: GlobalConfig = {
  slug: 'brands',
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
  admin: globalPreview('brands'),
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
