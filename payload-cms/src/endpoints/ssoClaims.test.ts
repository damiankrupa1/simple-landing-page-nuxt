import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { parseSsoClaims, resolveAccount, safeAdminRedirect } from './ssoClaims.ts'

const base = { sub: 'user_1', jti: 'j1', email: ' Ann@Example.PL ', iat: 1000, exp: 1060, role: 'editor' }

describe('safeAdminRedirect', () => {
  it('keeps paths under /admin and normalises them', () => {
    assert.equal(safeAdminRedirect('/admin'), '/admin')
    assert.equal(safeAdminRedirect('/admin/globals/navigation?locale=pl'), '/admin/globals/navigation?locale=pl')
    assert.equal(safeAdminRedirect('/admin/../etc'), '/admin')
  })

  it('falls back to /admin for everything else', () => {
    for (const bad of [
      undefined,
      42,
      '',
      '/',
      '/administrator',
      '/api/users',
      '//evil.com',
      '/\\evil.com',
      'https://evil.com/admin',
      'javascript:alert(1)',
      '/admin\n/x',
    ]) {
      assert.equal(safeAdminRedirect(bad), '/admin', String(bad))
    }
  })
})

describe('parseSsoClaims', () => {
  it('accepts a v2 token and normalises it', () => {
    const result = parseSsoClaims({ ...base, name: ' Ann ', lng: 'pl', redirect: '/admin/collections/pages' })
    assert.ok(result.ok)
    assert.deepEqual(result.claims, {
      sub: 'user_1',
      jti: 'j1',
      email: 'ann@example.pl',
      name: 'Ann',
      role: 'editor',
      exp: 1060,
      redirect: '/admin/collections/pages',
      lng: 'pl',
    })
  })

  it('defaults role to none and ignores bad optional claims', () => {
    const result = parseSsoClaims({ ...base, role: 'root', lng: 'de', redirect: '//x', name: 7 })
    assert.ok(result.ok)
    assert.equal(result.claims.role, 'none')
    assert.equal(result.claims.lng, undefined)
    assert.equal(result.claims.redirect, '/admin')
    assert.equal(result.claims.name, undefined)
    const noRole = parseSsoClaims({ ...base, role: undefined })
    assert.ok(noRole.ok)
    assert.equal(noRole.claims.role, 'none')
  })

  it('rejects missing or invalid mandatory claims', () => {
    for (const patch of [
      { sub: undefined },
      { sub: '' },
      { jti: undefined },
      { email: undefined },
      { email: 'not-an-email' },
      { exp: undefined },
      { iat: undefined },
      { exp: 1000 + 121 },
    ]) {
      assert.equal(parseSsoClaims({ ...base, ...patch }).ok, false, JSON.stringify(patch))
    }
  })
})

describe('resolveAccount', () => {
  const ann = { id: 1, email: 'ann@example.pl', medusaUserId: 'user_1' }
  const bob = { id: 2, email: 'bob@example.pl', medusaUserId: 'user_2' }
  const manual = { id: 3, email: 'ann@example.pl', medusaUserId: null }

  it('uses the account linked to the id, even after an e-mail change', () => {
    assert.deepEqual(resolveAccount({ sub: 'user_1', byId: ann, byEmail: null }), {
      action: 'use',
      account: ann,
      link: false,
    })
  })

  it('refuses an e-mail that belongs to another account (swapped e-mails, no merge)', () => {
    assert.equal(resolveAccount({ sub: 'user_1', byId: ann, byEmail: bob }).action, 'conflict')
  })

  it('links an unlinked account with the same e-mail once', () => {
    assert.deepEqual(resolveAccount({ sub: 'user_1', byId: null, byEmail: manual }), {
      action: 'use',
      account: manual,
      link: true,
    })
  })

  it('never takes over an account linked to another id (recreated user)', () => {
    assert.equal(resolveAccount({ sub: 'user_9', byId: null, byEmail: ann }).action, 'conflict')
  })

  it('creates an account when nothing matches', () => {
    assert.deepEqual(resolveAccount({ sub: 'user_1', byId: null, byEmail: null }), { action: 'create' })
  })
})
