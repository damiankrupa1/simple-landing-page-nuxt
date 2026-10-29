import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { ValidationError } from 'payload'

import { stampSubmission } from './stampSubmission.ts'
import { sha256 } from '../submissions/stamp.utils.ts'

const form = {
  id: 7,
  fields: [
    { blockType: 'email', name: 'email', required: true },
    { blockType: 'checkbox', name: 'consent', required: true, label: 'I agree.' },
  ],
}

type Call = Record<string, unknown>

/** Runs the hook with stand-ins for `findByID` and `find`; the hook only touches those and `req`. */
const run = (
  data: Record<string, unknown>,
  { existing = [] as unknown[], operation = 'create', locale = 'pl' as string | undefined } = {},
) => {
  const calls: { findByID: Call[]; find: Call[] } = { findByID: [], find: [] }
  const req = {
    locale,
    payload: {
      findByID: async (args: Call) => (calls.findByID.push(args), form),
      find: async (args: Call) => (calls.find.push(args), { docs: existing }),
    },
  }
  const result = (stampSubmission as unknown as (args: unknown) => Promise<Record<string, unknown>>)({
    data,
    operation,
    req,
  })
  return { result, calls }
}

const submission = {
  form: 7,
  submissionData: [
    { field: 'email', value: 'Ala@Example.pl' },
    { field: 'consent', value: 'true' },
  ],
}

describe('stampSubmission hook', () => {
  it('derives email and the consent snapshot on the server', async () => {
    const { result, calls } = run(submission)
    const data = await result
    assert.equal(data.email, 'ala@example.pl')
    assert.equal(data.consentText, 'I agree.')
    assert.equal(data.consentHash, sha256('I agree.'))
    assert.equal(data.consentLocale, 'pl')
    assert.equal(calls.findByID[0].locale, 'pl')
    assert.equal(calls.findByID[0].overrideAccess, true)
  })

  it('discards values the client sent for the server-set fields', async () => {
    const forged = { ...submission, email: 'x@y.pl', consentText: 'fake', consentHash: 'fake', consentLocale: 'xx' }
    const data = await run(forged).result
    assert.equal(data.email, 'ala@example.pl')
    assert.equal(data.consentText, 'I agree.')
    assert.notEqual(data.consentHash, 'fake')
    assert.equal(data.consentLocale, 'pl')
  })

  it('rejects a second sign-up with an error on the email field', async () => {
    await assert.rejects(run(submission, { existing: [{ id: 1 }] }).result, (error: unknown) => {
      assert.ok(error instanceof ValidationError)
      assert.equal((error as ValidationError).data.errors[0].path, 'email')
      return true
    })
  })

  it('looks for an existing sign-up on the same form with the normalised e-mail', async () => {
    const { result, calls } = run(submission)
    await result
    assert.deepEqual(calls.find[0].where, {
      and: [{ form: { equals: 7 } }, { email: { equals: 'ala@example.pl' } }],
    })
    assert.equal(calls.find[0].overrideAccess, true)
  })

  it('leaves email empty and skips the duplicate check for a form without an e-mail field', async () => {
    const { result, calls } = run({ form: 7, submissionData: [{ field: 'consent', value: 'true' }] })
    assert.equal((await result).email, null)
    assert.equal(calls.find.length, 0)
  })

  it('does nothing on update', async () => {
    const data = { email: 'keep@me.pl' }
    const { result, calls } = run(data, { operation: 'update' })
    assert.equal(await result, data)
    assert.equal(calls.findByID.length + calls.find.length, 0)
  })
})
