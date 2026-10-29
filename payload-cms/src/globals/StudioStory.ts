import type { GlobalConfig } from 'payload'

import { atLeast } from '../access/roles'

import { validateStringArray } from './validators'

export const StudioStory: GlobalConfig = {
  slug: 'studio-story',
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
      name: 'headlineLine1',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'headlineLine2',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'paragraph1',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'paragraph2',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'values',
      type: 'json',
      localized: true,
      required: true,
      defaultValue: [],
      validate: validateStringArray,
      admin: {
        description: 'Enter a JSON array of short value markers.',
      },
    },
    {
      name: 'signatureLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'signatureTagline',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'collectionLinkLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'collectionUrl',
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
}
