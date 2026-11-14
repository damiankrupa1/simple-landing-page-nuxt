import type { CollectionConfig } from 'payload'

/**
 * Ledger of used Medusa token ids (`jti`) so every SSO / revocation token works exactly once.
 *
 * Only the server writes here (local API with `overrideAccess`); the unique index on `jti` makes the
 * "use" atomic, so two parallel requests with the same token cannot both succeed. Rows are only
 * needed until the token would have expired anyway and are pruned on each use.
 */
export const SsoTokenUses: CollectionConfig = {
  slug: 'sso-token-uses',
  admin: { hidden: true },
  access: {
    create: () => false,
    read: () => false,
    update: () => false,
    delete: () => false,
  },
  lockDocuments: false,
  timestamps: false,
  fields: [
    { name: 'jti', type: 'text', required: true, unique: true, index: true },
    { name: 'expiresAt', type: 'date', required: true, index: true },
  ],
}
