import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  canReadDrafts,
  enforcePublishRole,
  globalRead,
  globalReadVersions,
  globalUpdate,
  isDraftWrite,
  isServiceAccount,
} from './globalDrafts.ts'

type AccessFn = (args: unknown) => unknown
const read = (user: unknown) => (globalRead as unknown as AccessFn)({ req: { user } })
const update = (user: unknown, pathname = '/api/globals/navigation') =>
  (globalUpdate as unknown as AccessFn)({ req: { user, pathname } })

const hook = (user: unknown, query: string, data: Record<string, unknown>, overrideAccess = false) =>
  (enforcePublishRole as unknown as (args: unknown) => Promise<unknown>)({
    data,
    overrideAccess,
    req: { user, searchParams: new URLSearchParams(query), t: (key: string) => key },
  })

const published = { _status: { equals: 'published' } }

describe('global draft reads', () => {
  it('limits anonymous and role-less users to the published document', () => {
    assert.deepEqual(read(undefined), published)
    assert.deepEqual(read({ collection: 'users', role: 'none' }), published)
    assert.deepEqual(read({ collection: 'users' }), published)
  })

  it('lets staff and the service account read drafts', () => {
    assert.equal(read({ collection: 'users', role: 'viewer' }), true)
    assert.equal(read({ collection: 'users', role: 'admin' }), true)
    assert.equal(read({ collection: 'service-users' }), true)
    assert.equal(canReadDrafts({ collection: 'service-users' }), true)
    assert.equal(isServiceAccount({ collection: 'users', role: 'admin' }), false)
  })

  it('keeps version history away from the service account and role-less users', () => {
    const versions = (user: unknown) => (globalReadVersions as unknown as AccessFn)({ req: { user } })
    assert.equal(versions({ collection: 'service-users' }), false)
    assert.equal(versions(undefined), false)
    assert.equal(versions({ role: 'viewer' }), true)
  })
})

describe('global update access', () => {
  it('needs editor or above and never allows the service account', () => {
    assert.equal(update({ role: 'viewer' }), false)
    assert.equal(update({ collection: 'service-users' }), false)
    assert.equal(update({ role: 'editor' }), true)
  })

  it('restricts restoring a version to publishers', () => {
    const restore = '/api/globals/navigation/versions/3'
    assert.equal(update({ role: 'editor' }, restore), false)
    assert.equal(update({ role: 'publisher' }, restore), true)
    assert.equal(update({ role: 'admin' }, restore), true)
  })
})

describe('publish gate', () => {
  it('recognizes a draft save only with draft=true and no published status', () => {
    assert.equal(isDraftWrite(new URLSearchParams('draft=true'), { _status: 'draft' }), true)
    assert.equal(isDraftWrite(new URLSearchParams('draft=true'), {}), true)
    assert.equal(isDraftWrite(new URLSearchParams('draft=true'), { _status: 'published' }), false)
    assert.equal(isDraftWrite(new URLSearchParams(''), { _status: 'draft' }), false)
    assert.equal(isDraftWrite(undefined, { _status: 'draft' }), false)
  })

  it('lets editors save drafts but not publish or unpublish', async () => {
    const editor = { role: 'editor' }
    await hook(editor, 'draft=true&locale=en', { _status: 'draft' })
    await assert.rejects(hook(editor, 'locale=en', { _status: 'published' }))
    await assert.rejects(hook(editor, 'draft=true', { _status: 'published' }))
    await assert.rejects(hook(editor, 'locale=en', { _status: 'draft' }))
    await assert.rejects(hook(editor, '', {}))
  })

  it('lets publishers publish and the local API (overrideAccess) through', async () => {
    await hook({ role: 'publisher' }, '', { _status: 'published' })
    await hook({ role: 'admin' }, '', { _status: 'draft' })
    await hook(undefined, '', { _status: 'published' }, true)
  })
})
