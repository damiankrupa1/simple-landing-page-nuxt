import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { validateStringArray } from './validators'
import { globalVersions } from './versions'

export const StudioStory: GlobalConfig = {
  slug: 'studio-story',
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
