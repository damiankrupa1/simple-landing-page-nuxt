import { roleOf } from './roles.ts'

type User = {
  collection?: string
  id: number | string
  medusaUserId?: string | null
  role?: unknown
}

export const userUpdateAccess = (user: User | null | undefined) => {
  if (!user || user.collection !== 'users') return false

  if (roleOf(user) === 'admin') {
    return user.medusaUserId ? { id: { not_equals: user.id } } : true
  }

  if (user.medusaUserId) return false
  return { id: { equals: user.id } }
}
