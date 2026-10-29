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

/** Role of a request user; no user, or a user of another collection, is `none`. */
export const roleOf = (user: unknown): Role => {
  if (!user || typeof user !== 'object') return 'none'
  const { collection, role } = user as { collection?: unknown; role?: unknown }
  // Only `users` carry roles; an account of another auth collection (API key accounts) is `none` even if a
  // field called `role` ever appears on it.
  if (typeof collection === 'string' && collection !== 'users') return 'none'
  return normalizeRole(role)
}

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
