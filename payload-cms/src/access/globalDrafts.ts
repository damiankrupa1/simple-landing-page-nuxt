/**
 * @fileoverview Access rules and publish gate for the Globals that use drafts.
 *
 * Why this exists: with `versions.drafts` Payload's REST `?draft=true` returns the newest draft to anyone
 * `access.read` lets in, so `read: () => true` would leak unpublished content to anonymous visitors. Reads
 * therefore return a `where` for everybody except staff and the storefront service account: they only ever
 * match the published document.
 *
 * Publishing is gated in a hook, not in `access.update`: the admin evaluates `update` access with the document
 * as it is stored (for globals it does not add `_status: 'draft'`), so a `_status` based rule would make a
 * published global read-only for editors.
 *
 * Imports use the `.ts` extension so the helpers can be unit tested with `node --test`.
 */
import { Forbidden, type Access, type GlobalBeforeValidateHook } from 'payload'

import { roleOf, roleAtLeast, userAtLeast } from './roles.ts'

/** Slug of the auth collection that holds the storefront's read-only account (`ServiceUsers`). */
export const SERVICE_USERS_SLUG = 'service-users'

type UserLike = { collection?: string } | null | undefined

export const isServiceAccount = (user: unknown): boolean =>
  Boolean(user) && (user as NonNullable<UserLike>).collection === SERVICE_USERS_SLUG

/** Staff with any role (viewer and up) and the storefront service account may read drafts. */
export const canReadDrafts = (user: unknown): boolean => userAtLeast(user, 'viewer') || isServiceAccount(user)

/** Public reads see the published document only; `?draft=true` finds no newer draft to replace it with. */
export const globalRead: Access = ({ req }) =>
  canReadDrafts(req.user) ? true : { _status: { equals: 'published' } }

/** Version history (and restore) is staff only; the service account never gets it. */
export const globalReadVersions: Access = ({ req }) => userAtLeast(req.user, 'viewer')

/**
 * Editors and up may write. Restoring a version always rewrites the published document (Payload does it
 * without hooks, even for "restore as draft"), so it is publisher only.
 */
export const globalUpdate: Access = ({ req }) => {
  const role = roleOf(req.user)
  if (!roleAtLeast(role, 'editor')) return false
  if (roleAtLeast(role, 'publisher')) return true
  return !req.pathname?.includes('/versions/')
}

/**
 * A request is a draft save only when it says so (`?draft=true`) and does not carry `_status: 'published'`.
 * Everything else (publish, unpublish which posts `_status: 'draft'` without `draft`, REST without params,
 * GraphQL) counts as publishing.
 */
export const isDraftWrite = (searchParams: URLSearchParams | undefined, data: { _status?: unknown } | undefined) =>
  searchParams?.get('draft') === 'true' && data?._status !== 'published'

/** Editors save drafts; publishing and unpublishing need `publisher`. Local API calls with `overrideAccess` pass. */
export const enforcePublishRole: GlobalBeforeValidateHook = async ({ data, overrideAccess, req }) => {
  if (overrideAccess) return data
  if (userAtLeast(req.user, 'publisher')) return data
  if (!isDraftWrite(req.searchParams, data)) throw new Forbidden(req.t)
  return data
}
