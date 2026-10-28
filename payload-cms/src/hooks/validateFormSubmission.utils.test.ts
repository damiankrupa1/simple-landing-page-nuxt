import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  MAX_EMAIL_LENGTH,
  MAX_FIELDS,
  MAX_VALUE_LENGTH,
  validateSubmissionData,
  type FormFieldDefinition,
} from './validateFormSubmission.utils.ts'

const newsletter: FormFieldDefinition[] = [
  { blockType: 'email', name: 'email', required: true },
  { blockType: 'checkbox', name: 'interestMen' },
  { blockType: 'checkbox', name: 'consent', required: true },
  { blockType: 'number', name: 'age' },
  { blockType: 'select', name: 'size', options: [{ value: 's' }, { value: 'm' }] },
  { blockType: 'text', name: 'note' },
  { blockType: 'message' }, // has no name, nothing to submit
  { blockType: 'payment', name: 'card' }, // a type this validator does not know
]

const valid = [
  { field: 'email', value: 'a@b.pl' },
  { field: 'consent', value: 'true' },
]

const errorsOf = (data: unknown, fields = newsletter) => {
  const result = validateSubmissionData(data, fields)
  assert.equal(result.valid, false, 'expected the submission to be rejected')
  return result.valid ? [] : result.errors
}
const rowsOf = (data: unknown, fields = newsletter) => {
  const result = validateSubmissionData(data, fields)
  assert.equal(result.valid, true, 'expected the submission to be accepted')
  return result.valid ? result.rows : []
}

describe('shape and abuse', () => {
  it('rejects submissionData that is not a list', () => {
    for (const bad of ['text', 5, true, { field: 'email' }]) {
      assert.equal(errorsOf(bad)[0]?.path, 'submissionData')
    }
  })

  it('treats a missing list as empty, so required fields report', () => {
    assert.deepEqual(
      errorsOf(undefined).map((e) => e.message),
      ['Field "email" is required.', 'Field "consent" is required.'],
    )
    assert.deepEqual(rowsOf(null, [{ blockType: 'text', name: 'note' }]), [])
  })

  it('rejects rows that are not objects without throwing', () => {
    for (const bad of [null, 'email', 7, ['email', 'a@b.pl'], undefined]) {
      const errors = errorsOf([bad, ...valid])
      assert.equal(errors[0]?.path, 'submissionData.0')
    }
  })

  it('rejects missing, empty and non-string field names', () => {
    for (const row of [
      { value: 'x' },
      { field: '', value: 'x' },
      { field: 5, value: 'x' },
      { field: null },
    ]) {
      assert.equal(errorsOf([row, ...valid])[0]?.path, 'submissionData.0.field')
    }
  })

  it('accepts exactly the field limit and rejects one more before reading rows', () => {
    const fields: FormFieldDefinition[] = Array.from({ length: MAX_FIELDS + 1 }, (_, i) => ({
      blockType: 'text',
      name: `f${i}`,
    }))
    const rows = (count: number) =>
      Array.from({ length: count }, (_, i) => ({ field: `f${i}`, value: 'x' }))
    assert.equal(rowsOf(rows(MAX_FIELDS), fields).length, MAX_FIELDS)
    const errors = errorsOf([...rows(MAX_FIELDS), null], fields)
    assert.deepEqual(errors, [
      { message: `Too many fields (max ${MAX_FIELDS}).`, path: 'submissionData' },
    ])
  })

  it('rejects overlong values', () => {
    const errors = errorsOf([...valid, { field: 'note', value: 'x'.repeat(MAX_VALUE_LENGTH + 1) }])
    assert.equal(errors[0]?.message, 'Field "note" is too long.')
    assert.equal(
      rowsOf([...valid, { field: 'note', value: 'x'.repeat(MAX_VALUE_LENGTH) }]).length,
      3,
    )
  })

  it('rejects unknown and duplicated fields', () => {
    assert.match(
      errorsOf([...valid, { field: 'evil', value: 'x' }])[0]?.message ?? '',
      /Unknown field "evil"/,
    )
    assert.match(
      errorsOf([...valid, { field: 'email', value: 'c@d.pl' }])[0]?.message ?? '',
      /more than once/,
    )
  })

  it('does not echo a very long unknown field name in full', () => {
    const message = errorsOf([...valid, { field: 'x'.repeat(500), value: 'x' }])[0]?.message ?? ''
    assert.ok(message.length < 120)
  })

  it('rejects unsupported value types and unsupported field types', () => {
    assert.equal(
      errorsOf([...valid, { field: 'note', value: { a: 1 } }])[0]?.message,
      'Field "note" must be text.',
    )
    assert.equal(
      errorsOf([...valid, { field: 'note', value: 5 }])[0]?.message,
      'Field "note" must be text.',
    )
    assert.equal(
      errorsOf([...valid, { field: 'card', value: 'x' }])[0]?.message,
      'Field "card" has a type that cannot be submitted.',
    )
  })
})

describe('field behaviour', () => {
  it('validates e-mail format, trims it and enforces the length limit', () => {
    assert.equal(
      errorsOf([{ field: 'email', value: 'nope' }, valid[1]])[0]?.message,
      'Field "email" must be a valid e-mail address.',
    )
    assert.equal(rowsOf([{ field: 'email', value: '  a@b.pl ' }, valid[1]])[0]?.value, 'a@b.pl')
    const long = `${'a'.repeat(MAX_EMAIL_LENGTH)}@b.pl`
    assert.match(
      errorsOf([{ field: 'email', value: long }, valid[1]])[0]?.message ?? '',
      /valid e-mail/,
    )
  })

  it('validates numbers and never turns an empty value into zero', () => {
    const base = [...valid]
    assert.equal(
      rowsOf([...base, { field: 'age', value: '42' }]).find((r) => r.field === 'age')?.value,
      '42',
    )
    assert.equal(
      rowsOf([...base, { field: 'age', value: 7 }]).find((r) => r.field === 'age')?.value,
      '7',
    )
    assert.equal(
      errorsOf([...base, { field: 'age', value: 'abc' }])[0]?.message,
      'Field "age" must be a number.',
    )
    assert.equal(
      errorsOf([...base, { field: 'age', value: Infinity }])[0]?.message,
      'Field "age" must be a number.',
    )
    for (const blank of ['', '   ']) {
      assert.equal(
        rowsOf([...base, { field: 'age', value: blank }]).some((r) => r.field === 'age'),
        false,
      )
    }
  })

  it('accepts checkboxes as booleans or "true"/"false" and stores text', () => {
    const consent = (value: unknown) =>
      rowsOf([valid[0], { field: 'consent', value }]).find((r) => r.field === 'consent')
    assert.equal(consent(true)?.value, 'true')
    assert.equal(consent('true')?.value, 'true')
    assert.equal(
      rowsOf([...valid, { field: 'interestMen', value: false }]).find(
        (r) => r.field === 'interestMen',
      )?.value,
      'false',
    )
    assert.equal(
      errorsOf([...valid, { field: 'interestMen', value: 'yes' }])[0]?.message,
      'Field "interestMen" must be true or false.',
    )
  })

  it('requires a required checkbox to be true', () => {
    for (const value of ['false', false, '', undefined]) {
      const errors = errorsOf([valid[0], { field: 'consent', value }])
      assert.deepEqual(
        errors.map((e) => e.message),
        ['Field "consent" is required.'],
      )
    }
  })

  it('reports one error per field, not an invalid value and a missing value', () => {
    const errors = errorsOf([
      { field: 'email', value: 'nope' },
      { field: 'consent', value: 'yes' },
    ])
    assert.deepEqual(
      errors.map((e) => e.path),
      ['submissionData.0.value', 'submissionData.1.value'],
    )
  })

  it('checks select values against the stored options', () => {
    assert.equal(
      rowsOf([...valid, { field: 'size', value: 'm' }]).some((r) => r.field === 'size'),
      true,
    )
    assert.equal(
      errorsOf([...valid, { field: 'size', value: 'xl' }])[0]?.message,
      'Field "size" is not one of the options.',
    )
  })

  it('drops blank optional values and rejects blank required ones', () => {
    assert.equal(rowsOf([...valid, { field: 'note', value: '' }]).length, 2)
    assert.equal(
      errorsOf([{ field: 'email', value: '  ' }, valid[1]])[0]?.message,
      'Field "email" is required.',
    )
  })

  it('keeps text as sent, including surrounding whitespace', () => {
    assert.equal(
      rowsOf([...valid, { field: 'note', value: '  hi  ' }]).find((r) => r.field === 'note')?.value,
      '  hi  ',
    )
  })

  it('keeps properties other than field and value', () => {
    const rows = rowsOf([{ id: 'row-1', field: 'email', value: 'a@b.pl' }, valid[1]])
    assert.equal(rows[0]?.id, 'row-1')
  })

  it('reports every problem at once', () => {
    const errors = errorsOf([
      { field: 'email', value: 'nope' },
      { field: 'evil', value: 'x' },
      { field: 'size', value: 'xl' },
    ])
    assert.equal(errors.length, 4) // email, evil, size, plus the missing consent
  })
})
