import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { userUpdateAccess } from './userUpdateAccess.ts'

describe('userUpdateAccess', () => {
  it('prevents a Medusa-linked user from updating their own account', () => {
    assert.equal(
      userUpdateAccess({ collection: 'users', id: 'user_1', medusaUserId: 'medusa_1', role: 'editor' }),
      false,
    )
  })

  it('keeps admins from editing their own linked account while allowing other accounts', () => {
    assert.deepEqual(
      userUpdateAccess({ collection: 'users', id: 'admin_1', medusaUserId: 'medusa_1', role: 'admin' }),
      { id: { not_equals: 'admin_1' } },
    )
  })

  it('preserves standalone account behavior', () => {
    assert.equal(userUpdateAccess({ collection: 'users', id: 1, role: 'admin' }), true)
    assert.deepEqual(userUpdateAccess({ collection: 'users', id: 2, role: 'editor' }), { id: { equals: 2 } })
  })

  it('denies accounts from other collections', () => {
    assert.equal(userUpdateAccess({ collection: 'service-users', id: 1, role: 'admin' }), false)
  })
})
