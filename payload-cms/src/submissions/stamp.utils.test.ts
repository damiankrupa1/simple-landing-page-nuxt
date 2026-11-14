import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { consentSnapshot, emailFromSubmission, normalizeEmail, sha256 } from './stamp.utils.ts'

describe('normalizeEmail', () => {
  it('trims and lowercases', () => assert.equal(normalizeEmail('  Ala@Example.PL '), 'ala@example.pl'))
  it('treats blanks and non-strings as no e-mail', () => {
    assert.equal(normalizeEmail(''), null)
    assert.equal(normalizeEmail('   '), null)
    assert.equal(normalizeEmail(5), null)
    assert.equal(normalizeEmail(undefined), null)
  })
})

describe('emailFromSubmission', () => {
  it('reads the email row', () => {
    const rows = [{ field: 'consent', value: 'true' }, { field: 'email', value: 'A@B.pl' }]
    assert.equal(emailFromSubmission(rows), 'a@b.pl')
  })
  it('is null without an email row or with bad input', () => {
    assert.equal(emailFromSubmission([{ field: 'name', value: 'x' }]), null)
    assert.equal(emailFromSubmission(undefined), null)
    assert.equal(emailFromSubmission('x'), null)
    assert.equal(emailFromSubmission([null, 3]), null)
  })
})

describe('consentSnapshot', () => {
  const consent = { blockType: 'checkbox', name: 'consent', label: 'I accept the policy.' }

  it('stores the text and its sha256', () => {
    const snap = consentSnapshot([{ blockType: 'email', name: 'email' }, consent])
    assert.equal(snap.consentText, 'I accept the policy.')
    assert.equal(snap.consentHash, sha256('I accept the policy.'))
    assert.match(snap.consentHash ?? '', /^[0-9a-f]{64}$/)
  })
  it('changes the hash when the wording changes', () => {
    assert.notEqual(consentSnapshot([consent]).consentHash, consentSnapshot([{ ...consent, label: 'Other' }]).consentHash)
  })
  it('is empty without a plain-text consent checkbox', () => {
    const empty = { consentText: null, consentHash: null }
    assert.deepEqual(consentSnapshot([{ blockType: 'email', name: 'email' }]), empty)
    assert.deepEqual(consentSnapshot([{ blockType: 'text', name: 'consent', label: 'x' }]), empty)
    assert.deepEqual(consentSnapshot([{ ...consent, label: { en: 'x' } }]), empty)
    assert.deepEqual(consentSnapshot([{ ...consent, label: ' ' }]), empty)
    assert.deepEqual(consentSnapshot(null), empty)
  })
})
