/**
 * @fileoverview Role model shared by every access rule.
 *
 * Roles come from the Medusa admin (`user.metadata.payload_role`, delivered in the SSO token) and are
 * stored on `users.role`. Anything missing or unknown is `none` (default deny). The order of `ROLES`
 * is the order of privilege: a higher role can do everything a lower one can.
 *
 * Kept free of runtime imports from `payload` so it can be unit tested with `node --test`.
 */
import type { Access, FieldAccess } from 'payload'

export const ROLES = ['none', 'viewer', 'editor', 'publisher', 'admin'] as const
export type Role = (typeof ROLES)[number]

/** Anything that is not a known role (including non-strings) is `none`. */
export const normalizeRole = (value: unknown): Role =>
  typeof value === 'string' && (ROLES as readonly string[]).includes(value) ? (value as Role) : 'none'

/** Role of a request user; no user, or a user of another collection without `role`, is `none`. */
export const roleOf = (user: unknown): Role =>
  user && typeof user === 'object' ? normalizeRole((user as { role?: unknown }).role) : 'none'

export const roleAtLeast = (role: Role, min: Role): boolean => ROLES.indexOf(role) >= ROLES.indexOf(min)

export const userAtLeast = (user: unknown, min: Role): boolean => roleAtLeast(roleOf(user), min)

/** Collection/global access: allowed for `min` and above. `atLeast('viewer')` means "has any role". */
export const atLeast =
  (min: Role): Access =>
  ({ req }) =>
    userAtLeast(req.user, min)

export const isAdmin: Access = atLeast('admin')

/** Same as `atLeast`, for field-level access. */
export const fieldAtLeast =
  (min: Role): FieldAccess =>
  ({ req }) =>
    userAtLeast(req.user, min)
