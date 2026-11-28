import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  ROLES,
  atLeast,
  isAdmin,
  isSuperAdmin,
  normalizeRole,
  parseSuperAdmins,
  roleAtLeast,
  roleOf,
  userAtLeast,
} from './roles.ts'

type AccessFn = (args: unknown) => unknown
const run = (access: unknown, user: unknown) => (access as AccessFn)({ req: { user } })

describe('roles', () => {
  it('normalizes unknown values to none (default deny)', () => {
    assert.equal(normalizeRole(undefined), 'none')
    assert.equal(normalizeRole(null), 'none')
    assert.equal(normalizeRole(5), 'none')
    assert.equal(normalizeRole('root'), 'none')
    assert.equal(normalizeRole('Admin'), 'none')
    assert.equal(normalizeRole('editor'), 'editor')
  })

  it('reads the role of a user and treats a missing user as none', () => {
    assert.equal(roleOf(null), 'none')
    assert.equal(roleOf({}), 'none')
    assert.equal(roleOf({ role: 'publisher' }), 'publisher')
    assert.equal(roleOf({ collection: 'users', role: 'editor' }), 'editor')
    assert.equal(roleOf({ collection: 'service-users', role: 'admin' }), 'none')
  })

  it('orders roles by privilege', () => {
    assert.deepEqual([...ROLES], ['none', 'viewer', 'editor', 'publisher', 'admin'])
    assert.equal(roleAtLeast('editor', 'viewer'), true)
    assert.equal(roleAtLeast('viewer', 'editor'), false)
    assert.equal(userAtLeast({ role: 'admin' }, 'publisher'), true)
    assert.equal(userAtLeast({ role: 'none' }, 'viewer'), false)
  })

  it('builds access functions', () => {
    assert.equal(run(atLeast('editor'), { role: 'editor' }), true)
    assert.equal(run(atLeast('editor'), { role: 'viewer' }), false)
    assert.equal(run(atLeast('editor'), undefined), false)
    assert.equal(run(isAdmin, { role: 'publisher' }), false)
    assert.equal(run(isAdmin, { role: 'admin' }), true)
  })
})

describe('super admins', () => {
  const env = { PAYLOAD_SUPER_ADMIN_EMAILS: ' Me@Example.com, other@example.com ,,' }

  it('parses a comma separated, case-insensitive list', () => {
    assert.deepEqual(parseSuperAdmins(env), ['me@example.com', 'other@example.com'])
    assert.deepEqual(parseSuperAdmins({}), [])
    assert.deepEqual(parseSuperAdmins({ PAYLOAD_SUPER_ADMIN_EMAILS: '  ' }), [])
  })

  it('is true only for a listed e-mail', () => {
    assert.equal(isSuperAdmin({ email: 'me@example.com' }, env), true)
    assert.equal(isSuperAdmin({ collection: 'users', email: 'ME@example.com' }, env), true)
    assert.equal(isSuperAdmin({ email: 'someone@example.com', role: 'admin' }, env), false)
  })

  it('is false without a list, a user, an e-mail or for another auth collection', () => {
    assert.equal(isSuperAdmin({ email: 'me@example.com' }, {}), false)
    assert.equal(isSuperAdmin(null, env), false)
    assert.equal(isSuperAdmin({}, env), false)
    assert.equal(isSuperAdmin({ collection: 'service-users', email: 'me@example.com' }, env), false)
  })
})
