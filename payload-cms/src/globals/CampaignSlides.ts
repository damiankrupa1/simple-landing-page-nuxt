import type { GlobalConfig } from 'payload'

import { atLeast } from '../access/roles'

const localizedText = (name: string) => ({
  name,
  type: 'text' as const,
  localized: true,
  required: true,
})

export const CampaignSlides: GlobalConfig = {
  slug: 'campaign-slides',
  access: {
    read: () => true,
    // Writes need a role from Medusa; `read` stays public because the storefront depends on it.
    update: atLeast('editor'),
  },
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
