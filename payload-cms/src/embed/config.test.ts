import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { frameAncestors, isEmbedEnabled, parseAllowedOrigins } from './config.ts'

describe('isEmbedEnabled', () => {
  it('is on only for "true"', () => {
    assert.equal(isEmbedEnabled({ PAYLOAD_EMBEDDED: 'true' }), true)
    assert.equal(isEmbedEnabled({ PAYLOAD_EMBEDDED: ' TRUE ' }), true)
    for (const value of [undefined, '', 'false', '1', 'yes']) {
      assert.equal(isEmbedEnabled({ PAYLOAD_EMBEDDED: value }), false, String(value))
    }
  })
})

describe('parseAllowedOrigins', () => {
  it('merges the list and the legacy single URL, as origins without duplicates', () => {
    assert.deepEqual(
      parseAllowedOrigins({
        MEDUSA_ADMIN_URLS: 'https://a.example.com/app, https://b.example.com ,https://a.example.com',
        MEDUSA_ADMIN_URL: 'https://c.example.com/app/cms',
      }),
      ['https://a.example.com', 'https://b.example.com', 'https://c.example.com'],
    )
  })

  it('skips garbage instead of throwing', () => {
    assert.deepEqual(
      parseAllowedOrigins({ MEDUSA_ADMIN_URLS: 'not a url,javascript:alert(1),ftp://x.example.com,,http://localhost:9000' }),
      ['http://localhost:9000'],
    )
    assert.deepEqual(parseAllowedOrigins({}), [])
  })
})

describe('frameAncestors', () => {
  it('always includes self and never a wildcard', () => {
    assert.equal(frameAncestors([]), "'self'")
    assert.equal(frameAncestors(['https://a.example.com', 'http://localhost:9000']), "'self' https://a.example.com http://localhost:9000")
  })
})
