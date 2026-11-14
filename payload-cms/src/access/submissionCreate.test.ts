import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'

import { NEWSLETTER_TOKEN_HEADER, canCreateSubmission } from './submissionCreate.ts'

const run = (user: unknown, token?: string) =>
  (canCreateSubmission as unknown as (args: unknown) => unknown)({
    req: { user, headers: new Headers(token === undefined ? {} : { [NEWSLETTER_TOKEN_HEADER]: token }) },
  })

describe('canCreateSubmission', () => {
  const saved = process.env.NEWSLETTER_SUBMIT_TOKEN
  beforeEach(() => {
    process.env.NEWSLETTER_SUBMIT_TOKEN = 'tok-123'
  })
  afterEach(() => {
    if (saved === undefined) delete process.env.NEWSLETTER_SUBMIT_TOKEN
    else process.env.NEWSLETTER_SUBMIT_TOKEN = saved
  })

  it('denies an anonymous request without a token', () => assert.equal(run(null), false))
  it('denies a wrong token', () => assert.equal(run(null, 'nope'), false))
  it('allows the right token', () => assert.equal(run(null, 'tok-123'), true))

  it('fails closed when the variable is unset, even with an empty header', () => {
    delete process.env.NEWSLETTER_SUBMIT_TOKEN
    assert.equal(run(null, ''), false)
    assert.equal(run(null, 'tok-123'), false)
  })

  it('allows staff from editor up and not viewers, none or service accounts', () => {
    const user = (role: string, collection = 'users') => ({ collection, role })
    assert.equal(run(user('editor')), true)
    assert.equal(run(user('admin')), true)
    assert.equal(run(user('viewer')), false)
    assert.equal(run(user('none')), false)
    assert.equal(run(user('admin', 'service-users')), false)
  })
})
