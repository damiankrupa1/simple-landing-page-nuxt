/**
 * @fileoverview Users collection configuration for Payload CMS
 * @module Users
 */

import { APIError, type Access, type CollectionConfig, type FieldAccess } from 'payload'
import { medusaRevoke } from '../endpoints/medusaRevoke'
import { medusaSso } from '../endpoints/medusaSso'
import { ROLES, isAdmin, normalizeRole, roleOf, userAtLeast } from '../access/roles'

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

/** Identity fields are owned by Medusa once the account is linked, so the account view shows them read-only. */
const notLinkedToMedusa: FieldAccess = ({ doc }) => !doc?.medusaUserId

/** Admins see and change every account; everybody else only their own. */
const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  return roleOf(user) === 'admin' ? true : { id: { equals: user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Default deny: only a user with a role from Medusa gets into the admin panel (`none` sees /admin/unauthorized).
    admin: ({ req }) => userAtLeast(req.user, 'viewer'),
    create: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      // A fresh database has no Medusa to hand out roles: the first account (create-first-user) becomes admin,
      // otherwise it would be locked out of its own panel.
      async ({ data, operation, req }) => {
        if (operation !== 'create' || normalizeRole(data.role) !== 'none') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
        return totalDocs === 0 ? { ...data, role: 'admin' } : data
      },
    ],
    beforeLogin: [
      // The password of a linked account is meaningless (random, never shown). Letting it sign in with one would
      // create a session Medusa knows nothing about, so a Medusa logout or removal could not end it.
      ({ user }) => {
        if (user.medusaUserId) throw new APIError('This account signs in through the Medusa admin.', 403)
        return user
      },
    ],
  },
  auth: {
    cookies: {
      // 'None' cookies are only accepted when Secure.
      secure: process.env.NODE_ENV === 'production' || cookieSameSite === 'None',
      sameSite: cookieSameSite,
      domain: process.env.PAYLOAD_COOKIE_DOMAIN || undefined,
    },
  },
  endpoints: [medusaSso, medusaRevoke],
  fields: [
    // Email is added by auth; it is declared here only to make it read-only once linked to Medusa.
    { name: 'email', type: 'email', access: { update: notLinkedToMedusa } },
    {
      name: 'name',
      type: 'text',
      admin: { description: 'Display name. Owned by Medusa for linked accounts (read-only there).' },
      access: { update: notLinkedToMedusa },
    },
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
    {
      name: 'medusaUserId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Stable id of the Medusa user this account is linked to. Set by SSO, never by hand.',
      },
      access: { create: () => false, update: () => false },
    },
    {
      name: 'role',
      type: 'select',
      options: ROLES.map((role) => ({ label: role, value: role })),
      defaultValue: 'none',
      required: true,
      admin: {
        position: 'sidebar',
        description:
          'Owned by Medusa (`payload_role`) and refreshed at every SSO sign-in. `none` means no access. Only editable on accounts that are not linked to Medusa.',
      },
      access: {
        create: ({ req }) => userAtLeast(req.user, 'admin'),
        update: ({ req, doc }) => userAtLeast(req.user, 'admin') && !doc?.medusaUserId,
      },
    },
  ],
}
