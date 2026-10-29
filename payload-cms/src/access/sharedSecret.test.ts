import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { bearerToken, secretMatches } from './sharedSecret.ts'

describe('secretMatches', () => {
  it('accepts the exact secret', () => assert.equal(secretMatches('s3cret', 's3cret'), true))
  it('rejects a different, longer or shorter value', () => {
    assert.equal(secretMatches('s3cre', 's3cret'), false)
    assert.equal(secretMatches('s3cret!', 's3cret'), false)
    assert.equal(secretMatches('S3CRET', 's3cret'), false)
  })
  it('fails closed when the expected secret is unset or empty', () => {
    assert.equal(secretMatches('', ''), false)
    assert.equal(secretMatches('x', undefined), false)
    assert.equal(secretMatches('x', ''), false)
    assert.equal(secretMatches(undefined, undefined), false)
  })
  it('rejects a missing value', () => {
    assert.equal(secretMatches(null, 's3cret'), false)
    assert.equal(secretMatches('', 's3cret'), false)
  })
})

describe('bearerToken', () => {
  it('extracts the token', () => assert.equal(bearerToken('Bearer abc '), 'abc'))
  it('returns an empty string for anything else', () => {
    assert.equal(bearerToken(null), '')
    assert.equal(bearerToken('Basic abc'), '')
    assert.equal(bearerToken('bearer abc'), '')
  })
})
