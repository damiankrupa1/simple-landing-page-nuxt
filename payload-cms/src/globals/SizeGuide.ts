import type { GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { globalPreview } from './preview'
import { validateSizeGuideRows, validateStringArray } from './validators'
import { globalVersions } from './versions'

export const SizeGuide: GlobalConfig = {
  slug: 'size-guide',
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
  admin: globalPreview('size-guide'),
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'intro',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional: how to measure.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      required: true,
      admin: {
        description: 'Measurement columns. State the unit in the label, for example "Chest (cm)".',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      admin: {
        description: 'One row per size, with one value for each column, in the same order as the columns.',
      },
      validate: (value: unknown, { data }: { data: { columns?: unknown } }) =>
        validateSizeGuideRows(value, Array.isArray(data?.columns) ? data.columns.length : undefined),
      fields: [
        {
          name: 'size',
          type: 'text',
          required: true,
          admin: {
            description: 'Must match the size option value in Medusa (XS, S, M, ...).',
          },
        },
        {
          name: 'values',
          type: 'json',
          required: true,
          defaultValue: [],
          validate: validateStringArray,
          admin: {
            description: 'Enter a JSON array of text values, one per column, for example ["88-92", "72-76"].',
          },
        },
      ],
    },
  ],
}
