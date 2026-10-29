import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { globalPreview } from './preview'
import { globalVersions } from './versions'

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
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
  admin: globalPreview('footer-content'),
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
