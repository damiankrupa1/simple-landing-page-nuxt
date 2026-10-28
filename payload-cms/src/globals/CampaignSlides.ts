import type { GlobalConfig } from 'payload'

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
