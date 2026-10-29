import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { validateStringArray } from './validators'
import { globalVersions } from './versions'

const localizedText = (name: string) => ({
  name,
  type: 'text' as const,
  localized: true,
  required: true,
})

export const ShopTheLook: GlobalConfig = {
  slug: 'shop-the-look',
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
