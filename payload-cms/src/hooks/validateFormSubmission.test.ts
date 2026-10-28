import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { ValidationError } from 'payload'

import { validateFormSubmission } from './validateFormSubmission.ts'

const form = {
  id: 1,
  fields: [
    { blockType: 'email', name: 'email', required: true },
    { blockType: 'checkbox', name: 'consent', required: true },
  ],
}

type FindByID = (args: Record<string, unknown>) => Promise<unknown>

/** Runs the hook with a stand-in for `req.payload.findByID`; the hook only touches that and `req`. */
const run = (data: Record<string, unknown> | undefined, findByID: FindByID, operation = 'create') =>
  (validateFormSubmission as unknown as (args: unknown) => Promise<unknown>)({
    data,
    operation,
    req: { payload: { findByID } },
  })

const valid = {
  form: 1,
  submissionData: [
    { field: 'email', value: ' a@b.pl ' },
    { field: 'consent', value: true },
  ],
}

describe('validateFormSubmission hook', () => {
  it('saves a valid submission in the normalised plugin format', async () => {
    const result = (await run(valid, async () => form)) as typeof valid
    assert.deepEqual(result.submissionData, [
      { field: 'email', value: 'a@b.pl' },
      { field: 'consent', value: 'true' },
    ])
    assert.equal(result.form, 1)
  })

  it('looks the form up with the access override and without swallowing errors', async () => {
    let args: Record<string, unknown> = {}
    await run(valid, async (received) => {
      args = received
      return form
    })
    assert.equal(args.collection, 'forms')
    assert.equal(args.id, 1)
    assert.equal(args.overrideAccess, true)
    assert.equal(args.disableErrors, true)
  })

  it('rejects an invalid submission with a ValidationError', async () => {
    await assert.rejects(
      run({ form: 1, submissionData: [{ field: 'email', value: 'nope' }] }, async () => form),
      ValidationError,
    )
  })

  it('does not bypass validation when the form lookup fails', async () => {
    const outage = new Error('database unavailable')
    await assert.rejects(
      run(valid, async () => {
        throw outage
      }),
      outage,
    )
  })

  it('leaves a missing form (null) to the plugin field validation', async () => {
    const data = { form: 999, submissionData: [{ field: 'x', value: 'y' }] }
    assert.equal(await run(data, async () => null), data)
  })

  it('leaves an absent form reference to the required-relationship validation', async () => {
    const data = { submissionData: [] }
    assert.equal(await run(data, async () => assert.fail('must not look up a form')), data)
  })

  it('rejects a malformed form reference', async () => {
    for (const bad of [{ id: 1 }, ['1'], true]) {
      await assert.rejects(
        run({ form: bad, submissionData: [] }, async () => assert.fail('must not look up a form')),
        ValidationError,
      )
    }
  })

  it('only validates on create', async () => {
    const data = { form: 1, submissionData: 'not a list' }
    assert.equal(
      await run(data, async () => assert.fail('must not look up a form'), 'update'),
      data,
    )
  })

  it('passes through when there is no data', async () => {
    assert.equal(
      await run(undefined, async () => assert.fail('must not look up a form')),
      undefined,
    )
  })
})
