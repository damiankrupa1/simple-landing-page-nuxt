import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  validateAnchor,
  validateSizeGuideRows,
  validateStorePath,
  validateStringArray,
  validateUniqueAnchors,
} from './validators.ts'

describe('validateStringArray', () => {
  it('accepts arrays of text only', () => {
    assert.equal(validateStringArray(['a', 'b']), true)
    assert.equal(validateStringArray([]), true)
    assert.notEqual(validateStringArray('a'), true)
    assert.notEqual(validateStringArray(['a', 1]), true)
  })
})

describe('validateSizeGuideRows', () => {
  it('accepts rows with one value per column', () => {
    assert.equal(validateSizeGuideRows([{ size: 'S', values: ['1', '2'] }, { size: 'M', values: ['3', '4'] }], 2), true)
  })

  it('names the first row with the wrong number of values', () => {
    const result = validateSizeGuideRows([{ size: 'S', values: ['1', '2'] }, { size: 'M', values: ['3'] }], 2)
    assert.match(String(result), /Row 2 has 1 value\(s\) but the table has 2 column\(s\)/)
  })

  it('does not compare when the column count is unknown or there are no rows', () => {
    assert.equal(validateSizeGuideRows([{ size: 'S', values: ['1'] }], undefined), true)
    assert.equal(validateSizeGuideRows(undefined, 2), true)
    assert.equal(validateSizeGuideRows([], 2), true)
  })
})

describe('validateAnchor', () => {
  it('accepts a letter followed by letters, digits and dashes', () => {
    assert.equal(validateAnchor('delivery'), true)
    assert.equal(validateAnchor('Step-2'), true)
  })

  it('rejects empty, spaced, leading digit or non-text values', () => {
    for (const value of ['', 'a b', '1a', '-a', 'a_b', undefined, 3]) assert.notEqual(validateAnchor(value), true)
  })
})

describe('validateStorePath', () => {
  it('accepts paths inside the store, with an optional fragment', () => {
    for (const value of ['/store', '/account', '/#studio-story', '/help/faq']) assert.equal(validateStorePath(value), true)
  })

  it('rejects external, protocol-relative, relative and non-text values', () => {
    for (const value of ['https://x.example', '//x.example', 'store', '/a b', '', undefined]) {
      assert.notEqual(validateStorePath(value), true)
    }
  })
})

describe('validateUniqueAnchors', () => {
  it('accepts distinct anchors and ignores rows without one', () => {
    assert.equal(validateUniqueAnchors([{ anchor: 'a' }, { anchor: 'b' }, {}]), true)
    assert.equal(validateUniqueAnchors(undefined), true)
  })

  it('names a repeated anchor', () => {
    assert.match(String(validateUniqueAnchors([{ anchor: 'a' }, { anchor: 'b' }, { anchor: 'a' }])), /"a"/)
  })
})
