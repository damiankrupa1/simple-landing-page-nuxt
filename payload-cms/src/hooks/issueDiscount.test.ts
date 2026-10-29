import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'

import { issueDiscount } from './issueDiscount.ts'

const newsletter = {
  id: 7,
  fields: [
    { blockType: 'email', name: 'email', required: true },
    { blockType: 'checkbox', name: 'consent', required: true },
  ],
}
const contact = { id: 8, fields: [{ blockType: 'email', name: 'email', required: true }] }

const run = (data: Record<string, unknown>, form: unknown, operation = 'create') =>
  (issueDiscount as unknown as (args: unknown) => Promise<Record<string, unknown>>)({
    data,
    operation,
    req: { payload: { findByID: async () => form } },
  })

const saved = { p: process.env.NEWSLETTER_DISCOUNT_PERCENT, d: process.env.NEWSLETTER_DISCOUNT_DAYS }
afterEach(() => {
  for (const [key, value] of [['NEWSLETTER_DISCOUNT_PERCENT', saved.p], ['NEWSLETTER_DISCOUNT_DAYS', saved.d]] as const) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})

describe('issueDiscount hook', () => {
  it('issues a code with the default 10 percent for 30 days', async () => {
    const before = Date.now()
    const data = await run({ form: 7 }, newsletter)
    assert.match(String(data.discountCode), /^[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/)
    assert.equal(data.discountPercent, 10)
    assert.equal(data.discountRedeemedAt, null)
    const days = (new Date(String(data.discountExpiresAt)).getTime() - before) / 86_400_000
    assert.ok(days > 29.99 && days < 30.01, String(days))
  })

  it('discards a code, percent or redeemed date sent by the client', async () => {
    const forged = { form: 7, discountCode: 'AAAA-AAAA-AAAA', discountPercent: 100, discountRedeemedAt: 'x', discountExpiresAt: '2999-01-01' }
    const data = await run(forged, newsletter)
    assert.notEqual(data.discountCode, 'AAAA-AAAA-AAAA')
    assert.equal(data.discountPercent, 10)
    assert.equal(data.discountRedeemedAt, null)
    assert.notEqual(data.discountExpiresAt, '2999-01-01')
  })

  it('reads percent and days from the environment', async () => {
    process.env.NEWSLETTER_DISCOUNT_PERCENT = '20'
    process.env.NEWSLETTER_DISCOUNT_DAYS = '3'
    const data = await run({ form: 7 }, newsletter)
    assert.equal(data.discountPercent, 20)
  })

  it('issues nothing for another form, when switched off, or for an unknown form, and wipes client values', async () => {
    const forged = { form: 8, discountCode: 'AAAA-AAAA-AAAA', discountPercent: 100 }
    const other = await run(forged, contact)
    assert.deepEqual([other.discountCode, other.discountPercent, other.discountExpiresAt], [null, null, null])
    assert.equal((await run({ form: 99, discountCode: 'x' }, null)).discountCode, null)
    process.env.NEWSLETTER_DISCOUNT_PERCENT = '0'
    assert.equal((await run({ form: 7, discountCode: 'x' }, newsletter)).discountCode, null)
  })

  it('does nothing on update', async () => {
    const data = { discountRedeemedAt: 'x' }
    assert.equal(await run(data, newsletter, 'update'), data)
  })
})
