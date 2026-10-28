/**
 * @fileoverview Pages collection configuration for Payload CMS
 * @module Pages
 */

import type { CollectionConfig } from 'payload'

import { ContentBlock } from '../blocks/ContentBlock'
import { HeroBlock } from '../blocks/HeroBlock'
import { NewsletterFormBlock } from '../blocks/NewsletterFormBlock'

/**
 * Pages collection configuration
 * Defines the structure and fields for pages in Payload CMS
 *
 * @type {CollectionConfig}
 * @property {string} slug - Unique identifier for the collection
 * @property {Array<Object>} fields - Field definitions for the collection
 * @property {Object} fields.title - Text field for page title
 * @property {Object} fields.slug - Text field for page URL slug
 * @property {Object} fields.layout - Blocks field for page layout components
 */
const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    livePreview: {
      url: ({ data }) => {
        return `${process.env.FRONTEND_URL}/${data.slug}`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      required: true,
      blocks: [HeroBlock, ContentBlock, NewsletterFormBlock],
    },
  ],
}

export default Pages
