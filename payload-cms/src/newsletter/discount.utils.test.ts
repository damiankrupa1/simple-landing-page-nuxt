import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  DEFAULT_DAYS,
  DEFAULT_PERCENT,
  discountSettings,
  discountState,
  expiresAt,
  generateCode,
  isNewsletterForm,
  normalizeCode,
} from './discount.utils.ts'

describe('generateCode', () => {
  it('has the XXXX-XXXX-XXXX shape from the readable alphabet and survives normalizeCode', () => {
    for (let i = 0; i < 200; i++) {
      const code = generateCode()
      assert.match(code, /^[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}$/)
      assert.equal(normalizeCode(code), code)
    }
  })
  it('does not repeat', () => {
    const codes = new Set(Array.from({ length: 5000 }, generateCode))
    assert.equal(codes.size, 5000)
  })
})

describe('normalizeCode', () => {
  it('accepts lowercase, spaces and missing dashes', () => {
    assert.equal(normalizeCode(' abcd efgh-jkmn '), 'ABCD-EFGH-JKMN')
    assert.equal(normalizeCode('abcdefghjkmn'), 'ABCD-EFGH-JKMN')
  })
  it('rejects anything that cannot be a code', () => {
    for (const input of [undefined, null, 5, {}, '', 'ABCD-EFGH', 'ABCD-EFGH-JKMN-PQRS', 'ABCD-EFGH-JKM0', 'x'.repeat(100)])
      assert.equal(normalizeCode(input), null, String(input))
  })
})

describe('discountSettings', () => {
  it('defaults to 10 percent for 30 days', () => {
    assert.deepEqual(discountSettings({}), { percent: DEFAULT_PERCENT, days: DEFAULT_DAYS })
    assert.deepEqual(discountSettings({ NEWSLETTER_DISCOUNT_PERCENT: '', NEWSLETTER_DISCOUNT_DAYS: ' ' }), { percent: 10, days: 30 })
  })
  it('reads the variables', () =>
    assert.deepEqual(discountSettings({ NEWSLETTER_DISCOUNT_PERCENT: '15', NEWSLETTER_DISCOUNT_DAYS: '7' }), { percent: 15, days: 7 }))
  it('turns off with 0', () => assert.equal(discountSettings({ NEWSLETTER_DISCOUNT_PERCENT: '0' }), null))
  it('falls back to the defaults for invalid values', () => {
    for (const bad of ['abc', '-5', '1.5', '1e1x'])
      assert.deepEqual(discountSettings({ NEWSLETTER_DISCOUNT_PERCENT: bad, NEWSLETTER_DISCOUNT_DAYS: bad }), { percent: 10, days: 30 }, bad)
    assert.equal(discountSettings({ NEWSLETTER_DISCOUNT_PERCENT: '101' })?.percent, 10)
    assert.equal(discountSettings({ NEWSLETTER_DISCOUNT_DAYS: '0' })?.days, 30)
    assert.equal(discountSettings({ NEWSLETTER_DISCOUNT_DAYS: '366' })?.days, 30)
  })
})

describe('isNewsletterForm', () => {
  const email = { blockType: 'email', name: 'email', required: true }
  const consent = { blockType: 'checkbox', name: 'consent', required: true }
  it('needs an email field and a required consent checkbox', () => {
    assert.equal(isNewsletterForm([email, consent]), true)
    assert.equal(isNewsletterForm([email]), false)
    assert.equal(isNewsletterForm([consent]), false)
    assert.equal(isNewsletterForm([email, { ...consent, required: false }]), false)
    assert.equal(isNewsletterForm([email, { blockType: 'text', name: 'consent', required: true }]), false)
    assert.equal(isNewsletterForm(null), false)
  })
})

describe('discountState', () => {
  const now = new Date('2026-01-10T12:00:00Z')
  const future = '2026-01-20T00:00:00.000Z'
  it('classifies a row', () => {
    assert.equal(discountState(null, now), 'unknown')
    assert.equal(discountState({ discountExpiresAt: future }, now), 'valid')
    assert.equal(discountState({ discountExpiresAt: future, discountRedeemedAt: '2026-01-11T00:00:00Z' }, now), 'redeemed')
    assert.equal(discountState({ discountExpiresAt: '2026-01-10T11:59:59Z' }, now), 'expired')
    assert.equal(discountState({ discountExpiresAt: '2026-01-10T12:00:00Z' }, now), 'expired')
    assert.equal(discountState({}, now), 'expired')
  })
  it('computes the expiry in days', () =>
    assert.equal(expiresAt(now, 30).toISOString(), '2026-02-09T12:00:00.000Z'))
})
