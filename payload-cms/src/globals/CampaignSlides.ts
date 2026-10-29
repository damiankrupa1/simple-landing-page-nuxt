import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { globalPreview } from './preview'
import { globalVersions } from './versions'

const localizedText = (name: string) => ({
  name,
  type: 'text' as const,
  localized: true,
  required: true,
})

export const CampaignSlides: GlobalConfig = {
  slug: 'campaign-slides',
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
  admin: globalPreview('campaign-slides'),
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        localizedText('seasonLabel'),
        localizedText('editionLabel'),
        localizedText('headlineLine1'),
        localizedText('headlineLine2'),
        localizedText('description'),
        localizedText('shopCtaLabel'),
        localizedText('secondaryCtaLabel'),
        localizedText('tagline'),
        localizedText('captionEyebrow'),
        localizedText('captionHeadline'),
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
