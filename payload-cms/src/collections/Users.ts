/**
 * @fileoverview Users collection configuration for Payload CMS
 * @module Users
 */

import type { CollectionConfig } from 'payload'
import { medusaSso } from '../endpoints/medusaSso'

/**
 * Users collection configuration
 * Defines the structure and fields for user accounts in Payload CMS
 *
 * @type {CollectionConfig}
 * @property {string} slug - Unique identifier for the collection
 * @property {Object} admin - Admin panel configuration
 * @property {string} admin.useAsTitle - Field to use as title in admin UI
 * @property {boolean} auth - Enables authentication functionality
 * @property {Array<Object>} fields - Additional field definitions for the collection
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      // Medusa admin embeds /admin in an iframe on a sibling subdomain, which is same-site.
      sameSite: 'Lax',
      domain: process.env.PAYLOAD_COOKIE_DOMAIN || undefined,
    },
  },
  endpoints: [medusaSso],
  fields: [
    // Email added by default
    {
      name: 'ssoManaged',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Created by Medusa admin SSO. Signs in through Medusa, not with a password.',
      },
      access: { create: () => false, update: () => false },
    },
  ],
}
