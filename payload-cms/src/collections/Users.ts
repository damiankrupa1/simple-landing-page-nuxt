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
// Medusa admin embeds /admin in an iframe. On sibling subdomains of one domain that is same-site and
// 'Lax' works. When the two apps are on unrelated sites (for example two *.up.railway.app domains)
// the browser drops a 'Lax' cookie set inside the iframe, so set PAYLOAD_COOKIE_SAMESITE=None.
const cookieSameSite = process.env.PAYLOAD_COOKIE_SAMESITE === 'None' ? 'None' : 'Lax'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      // 'None' cookies are only accepted when Secure.
      secure: process.env.NODE_ENV === 'production' || cookieSameSite === 'None',
      sameSite: cookieSameSite,
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
        description: 'Created by Medusa admin SSO (signs in through Medusa instead of a password).',
      },
      access: { create: () => false, update: () => false },
    },
  ],
}
