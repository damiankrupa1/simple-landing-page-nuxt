import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { globalPreview } from './preview'
import { globalVersions } from './versions'

export const ProductPageInfo: GlobalConfig = {
  slug: 'product-page-info',
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
  admin: globalPreview('product-page-info'),
  fields: [
    {
      name: 'freeShipping',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'carriers',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'returns',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'priceNote',
      type: 'text',
      localized: true,
    },
    {
      name: 'shippingTime',
      type: 'text',
      localized: true,
    },
  ],
}
