import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { validateSizeGuideRows, validateStringArray } from './validators.ts'

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
