import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'

import { newsletterDiscountRedeem, newsletterDiscountValidate } from './newsletterDiscount.ts'

const SECRET = 'disc-secret'
const CODE = 'ABCD-EFGH-JKMN'

type Row = Record<string, unknown>
const call = (
  endpoint: typeof newsletterDiscountValidate,
  { auth, body, row, updated = 0 }: { auth?: string; body?: unknown; row?: Row | null; updated?: number },
) => {
  const queries: unknown[][] = []
  const req = {
    headers: new Headers(auth ? { authorization: auth } : {}),
    json: async () => {
      if (body === 'invalid') throw new SyntaxError('bad')
      return body
    },
    payload: {
      find: async () => ({ docs: row ? [row] : [] }),
      db: {
        pool: {
          query: async (_sql: string, params: unknown[]) => {
            queries.push(params)
            return { rows: updated ? [{ discount_percent: '10' }] : [] }
          },
        },
      },
    },
  }
  const response = (endpoint.handler as unknown as (r: unknown) => Promise<Response>)(req)
  return { response, queries }
}

const json = async (response: Promise<Response>) => {
  const res = await response
  return { status: res.status, body: (await res.json()) as Row }
}

const future = new Date(Date.now() + 86_400_000).toISOString()
const past = new Date(Date.now() - 86_400_000).toISOString()

describe('newsletter discount endpoints', () => {
  const saved = process.env.NEWSLETTER_DISCOUNT_SECRET
  beforeEach(() => {
    process.env.NEWSLETTER_DISCOUNT_SECRET = SECRET
  })
  afterEach(() => {
    if (saved === undefined) delete process.env.NEWSLETTER_DISCOUNT_SECRET
    else process.env.NEWSLETTER_DISCOUNT_SECRET = saved
  })

  for (const [name, endpoint] of [['validate', newsletterDiscountValidate], ['redeem', newsletterDiscountRedeem]] as const) {
    it(`${name}: fails closed with 503 when the secret is unset, even for an empty bearer`, async () => {
      delete process.env.NEWSLETTER_DISCOUNT_SECRET
      assert.equal((await json(call(endpoint, { auth: 'Bearer ', body: { code: CODE } }).response)).status, 503)
    })
    it(`${name}: 401 without or with a wrong bearer`, async () => {
      assert.equal((await json(call(endpoint, { body: { code: CODE } }).response)).status, 401)
      assert.equal((await json(call(endpoint, { auth: 'Bearer nope', body: { code: CODE } }).response)).status, 401)
    })
    it(`${name}: 400 for a bad body or code`, async () => {
      assert.equal((await json(call(endpoint, { auth: `Bearer ${SECRET}`, body: 'invalid' }).response)).status, 400)
      assert.equal((await json(call(endpoint, { auth: `Bearer ${SECRET}`, body: { code: 'short' } }).response)).status, 400)
      assert.equal((await json(call(endpoint, { auth: `Bearer ${SECRET}`, body: null }).response)).status, 400)
    })
  }

  it('validate: reports valid, unknown, redeemed and expired without leaking the e-mail', async () => {
    const auth = `Bearer ${SECRET}`
    const row = { discountPercent: 10, discountExpiresAt: future, email: 'a@b.pl' }
    const ok = await json(call(newsletterDiscountValidate, { auth, body: { code: 'abcd efgh jkmn' }, row }).response)
    assert.deepEqual(ok.body, { valid: true, percent: 10, expiresAt: future })
    const reason = async (r: Row | null) =>
      (await json(call(newsletterDiscountValidate, { auth, body: { code: CODE }, row: r }).response)).body
    assert.deepEqual(await reason(null), { valid: false, reason: 'unknown' })
    assert.deepEqual(await reason({ ...row, discountRedeemedAt: past }), { valid: false, reason: 'redeemed' })
    assert.deepEqual(await reason({ ...row, discountExpiresAt: past }), { valid: false, reason: 'expired' })
  })

  it('redeem: 200 with the percent when the conditional update hit the row, using the normalised code', async () => {
    const { response, queries } = call(newsletterDiscountRedeem, { auth: `Bearer ${SECRET}`, body: { code: 'abcdefghjkmn' }, updated: 1 })
    assert.deepEqual(await json(response), { status: 200, body: { redeemed: true, percent: 10 } })
    assert.deepEqual(queries, [[CODE]])
  })

  it('redeem: explains a refusal (404 unknown, 409 redeemed or expired)', async () => {
    const auth = `Bearer ${SECRET}`
    const refuse = async (row: Row | null) => json(call(newsletterDiscountRedeem, { auth, body: { code: CODE }, row }).response)
    assert.deepEqual(await refuse(null), { status: 404, body: { redeemed: false, reason: 'unknown' } })
    assert.deepEqual(await refuse({ discountRedeemedAt: past, discountExpiresAt: future }), { status: 409, body: { redeemed: false, reason: 'redeemed' } })
    assert.deepEqual(await refuse({ discountExpiresAt: past }), { status: 409, body: { redeemed: false, reason: 'expired' } })
  })
})
