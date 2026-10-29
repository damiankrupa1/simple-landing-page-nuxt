import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  MAX_MESSAGE_BYTES,
  buildMessage,
  isAdminPath,
  isTrustedEvent,
  parseFrameMessage,
  parseHostMessage,
} from './protocol.ts'

const env = (type: string, payload?: unknown, extra: Record<string, unknown> = {}) => ({
  ns: 'payload-embed',
  v: 1,
  type,
  payload,
  ...extra,
})

describe('isAdminPath', () => {
  it('accepts /admin paths only', () => {
    for (const ok of ['/admin', '/admin/', '/admin/globals/navigation', '/admin/collections/pages?locale=pl']) {
      assert.equal(isAdminPath(ok), true, ok)
    }
    for (const bad of [
      '',
      '/',
      '/administrator',
      '/api/users',
      'admin',
      'https://evil.com/admin',
      '//evil.com',
      '/admin//evil',
      '/admin\\evil',
      '/admin/\nx',
      '/admin/' + 'a'.repeat(600),
      42,
      null,
    ]) {
      assert.equal(isAdminPath(bad), false, String(bad))
    }
  })
})

describe('parseHostMessage', () => {
  it('accepts the v1 host messages', () => {
    assert.deepEqual(parseHostMessage(env('hello', { lng: 'pl' })), { type: 'hello', payload: { lng: 'pl' } })
    assert.deepEqual(parseHostMessage(env('nav:goto', { path: '/admin/globals/brands' })), {
      type: 'nav:goto',
      payload: { path: '/admin/globals/brands' },
    })
    assert.deepEqual(parseHostMessage(env('locale:changed', { lng: 'en' }, { id: 'a1' })), {
      type: 'locale:changed',
      payload: { lng: 'en' },
    })
    assert.deepEqual(parseHostMessage(env('session:logout')), { type: 'session:logout', payload: {} })
    assert.deepEqual(parseHostMessage(env('session:keepalive', {})), { type: 'session:keepalive', payload: {} })
  })

  it('ignores unknown namespace, version, type and bad shapes', () => {
    assert.equal(parseHostMessage(null), null)
    assert.equal(parseHostMessage('hello'), null)
    assert.equal(parseHostMessage({ ...env('hello', { lng: 'pl' }), ns: 'other' }), null)
    assert.equal(parseHostMessage({ ...env('hello', { lng: 'pl' }), v: 2 }), null)
    assert.equal(parseHostMessage(env('unknown', {})), null)
    assert.equal(parseHostMessage(env('hello', { lng: 'de' })), null)
    assert.equal(parseHostMessage(env('hello', 'pl')), null)
    assert.equal(parseHostMessage(env('nav:goto', { path: 'https://evil.com' })), null)
    assert.equal(parseHostMessage(env('nav:goto', { path: '//evil.com' })), null)
    assert.equal(parseHostMessage(env('hello', { lng: 'pl' }, { id: 5 })), null)
  })

  it('ignores oversized and non-serialisable messages', () => {
    assert.equal(parseHostMessage(env('hello', { lng: 'pl', junk: 'x'.repeat(MAX_MESSAGE_BYTES) })), null)
    const cyclic: Record<string, unknown> = env('hello', { lng: 'pl' })
    cyclic.self = cyclic
    assert.equal(parseHostMessage(cyclic), null)
  })
})

describe('parseFrameMessage and buildMessage', () => {
  it('round-trips every frame message', () => {
    const messages = [
      { type: 'ready', payload: { path: '/admin', locale: 'en' } },
      { type: 'nav:changed', payload: { path: '/admin/globals/navigation', search: '?locale=pl' } },
      { type: 'session:expired', payload: { reason: 'inactivity' } },
      { type: 'access:denied', payload: { path: '/admin/unauthorized' } },
      { type: 'resize', payload: { height: 640 } },
    ] as const
    for (const message of messages) {
      assert.deepEqual(parseFrameMessage(buildMessage(message, 'id1')), message)
    }
  })

  it('rejects wrong reasons and paths', () => {
    assert.equal(parseFrameMessage(env('session:expired', { reason: 'because' })), null)
    assert.equal(parseFrameMessage(env('ready', { path: '/x', locale: 'en' })), null)
    assert.equal(parseFrameMessage(env('resize', { height: -1 })), null)
    assert.equal(parseFrameMessage(env('resize', { height: Infinity })), null)
  })
})

describe('isTrustedEvent', () => {
  const parent = {}
  const allowed = ['https://admin.example.com']

  it('needs an allow-listed origin and the parent window as source', () => {
    assert.equal(isTrustedEvent({ origin: 'https://admin.example.com', source: parent }, allowed, parent), true)
  })

  it('rejects a foreign origin, a foreign source and a missing source', () => {
    assert.equal(isTrustedEvent({ origin: 'https://evil.example.com', source: parent }, allowed, parent), false)
    assert.equal(isTrustedEvent({ origin: 'https://admin.example.com', source: {} }, allowed, parent), false)
    assert.equal(isTrustedEvent({ origin: 'https://admin.example.com', source: null }, allowed, null), false)
    assert.equal(isTrustedEvent({ origin: 'https://admin.example.com.evil.com', source: parent }, allowed, parent), false)
    assert.equal(isTrustedEvent({ origin: 'null', source: parent }, allowed, parent), false)
    assert.equal(isTrustedEvent({ origin: 'https://admin.example.com', source: parent }, [], parent), false)
  })
})
