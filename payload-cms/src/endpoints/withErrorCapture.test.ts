import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it, mock } from 'node:test'

import type { Endpoint } from 'payload'

import { reportError } from '../hooks/reportError.ts'
import { ERROR_SOURCE_KEY } from '../utils/sentry.utils.ts'
import { EndpointError, withErrorCapture } from './withErrorCapture.ts'

// Sentry is not initialised in tests (no SENTRY_DSN), so captureError only logs: capture the console instead.
let logged: unknown[][] = []
beforeEach(() => {
  logged = []
  mock.method(console, 'warn', (...args: unknown[]) => logged.push(['warn', ...args]))
  mock.method(console, 'error', (...args: unknown[]) => logged.push(['error', ...args]))
})
afterEach(() => mock.restoreAll())

const endpoint = (handler: Endpoint['handler']): Endpoint => ({ path: '/x', method: 'get', handler })
const request = () => ({ context: {} as Record<string, unknown>, method: 'GET' }) as unknown as Parameters<Endpoint['handler']>[0]

describe('withErrorCapture', () => {
  it('returns the very same response and tags the request with the source', async () => {
    const response = Response.json({ ok: true })
    const req = request()
    const wrapped = withErrorCapture('sso', endpoint(() => response))
    assert.equal(await wrapped.handler(req), response)
    assert.equal(req.context[ERROR_SOURCE_KEY], 'sso')
    assert.deepEqual(logged, [])
  })

  it('keeps path and method', () => {
    const wrapped = withErrorCapture('sso', endpoint(() => new Response()))
    assert.equal(wrapped.path, '/x')
    assert.equal(wrapped.method, 'get')
  })

  it('reports an answered 4xx as expected and a 5xx as unexpected, response unchanged', async () => {
    const unauthorized = Response.json({ error: 'Invalid or expired token' }, { status: 401 })
    assert.equal(await withErrorCapture('sso', endpoint(() => unauthorized)).handler(request()), unauthorized)
    const unavailable = Response.json({ error: 'not configured' }, { status: 503 })
    assert.equal(await withErrorCapture('revoke', endpoint(() => unavailable)).handler(request()), unavailable)

    assert.equal(logged.length, 2)
    assert.equal(logged[0][0], 'warn')
    assert.match(String(logged[0][1]), /sso endpoint answered 401/)
    assert.equal(logged[1][0], 'error')
    assert.ok(logged[1][1] instanceof EndpointError)
    assert.deepEqual(logged[1][2], { source: 'revoke', status: 503, method: 'GET' })
  })

  it('lets a thrown error through untouched (Payload answers it, the afterError hook reports it)', async () => {
    const boom = new Error('database down')
    const wrapped = withErrorCapture('newsletter-discount', endpoint(() => Promise.reject(boom)))
    await assert.rejects(async () => wrapped.handler(request()), boom)
    assert.deepEqual(logged, [])
  })
})

describe('reportError (afterError hook)', () => {
  const run = (args: Record<string, unknown>) => (reportError as unknown as (a: unknown) => unknown)(args)

  it('uses the source left by withErrorCapture and changes nothing in the response', () => {
    const error = new Error('db failed')
    const result = run({ error, req: { context: { [ERROR_SOURCE_KEY]: 'sso' }, method: 'GET' }, collection: { slug: 'users' } })
    assert.equal(result, undefined)
    assert.deepEqual(logged[0].slice(1), [error, { source: 'sso', collection: 'users', method: 'GET' }])
  })

  it('tags form-submission errors and keeps 4xx as expected', () => {
    const duplicate = Object.assign(new Error('The following field is invalid: email'), { status: 400 })
    run({ error: duplicate, req: { context: {}, method: 'POST' }, collection: { slug: 'form-submissions' } })
    assert.equal(logged[0][0], 'warn')
    assert.deepEqual(logged[0][2], { source: 'form-submission', collection: 'form-submissions', method: 'POST' })
  })

  it('reports the same error object only once', () => {
    const error = new Error('once')
    run({ error, req: { context: {}, method: 'GET' } })
    run({ error, req: { context: {}, method: 'GET' } })
    assert.equal(logged.length, 1)
    assert.deepEqual(logged[0][2], { source: 'payload', collection: undefined, method: 'GET' })
  })
})
