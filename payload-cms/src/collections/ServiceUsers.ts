import type { CollectionConfig } from 'payload'

import { SERVICE_USERS_SLUG } from '../access/globalDrafts'
import { isAdmin, roleOf } from '../access/roles'

/**
 * Machine account for the storefront's preview mode. It authenticates with an API key
 * (`Authorization: service-users API-Key <key>`), has no password and cannot sign in to the admin.
 *
 * Least privilege: it has no `role`, so every role based rule treats it as `none` (default deny), and it only
 * gets what is spelled out for it: reading draft Globals (`globalRead`). Rules that look at `req.user.id`
 * must also check the collection, ids are not unique across collections.
 *
 * Create one account in the admin (Service Users, admin only), tick "Enable API key" and generate the key. The key
 * goes into the storefront's private server configuration, never into a browser. Rotating `PAYLOAD_SECRET`
 * invalidates it (the key index is an HMAC of the secret).
 */
export const ServiceUsers: CollectionConfig = {
  slug: SERVICE_USERS_SLUG,
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => roleOf(user) !== 'admin',
    description: 'API key accounts for the storefront preview. They can only read draft Globals.',
  },
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [{ name: 'name', type: 'text', required: true }],
}
