import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { jwtVerify } from 'jose'

import { PREVIEW_AUDIENCE, PREVIEW_ISSUER, buildPreviewUrl, previewToken, storefrontOrigin } from './previewUrl.ts'

const env = { STOREFRONT_URL: 'https://shop.example/some/path/', PREVIEW_SECRET: 'preview-secret' }
const params = { global: 'navigation', locale: 'pl', userId: 7, now: 1_800_000_000 }
const key = new TextEncoder().encode('preview-secret')

describe('storefrontOrigin', () => {
  it('keeps only the origin of an http(s) URL', () => {
    assert.equal(storefrontOrigin(env), 'https://shop.example')
    assert.equal(storefrontOrigin({ STOREFRONT_URL: 'http://localhost:3002' }), 'http://localhost:3002')
  })

  it('rejects missing or non-http values', () => {
    assert.equal(storefrontOrigin({}), null)
    assert.equal(storefrontOrigin({ STOREFRONT_URL: 'not a url' }), null)
    assert.equal(storefrontOrigin({ STOREFRONT_URL: 'javascript:alert(1)' }), null)
  })
})

describe('previewToken', () => {
  it('is a verifiable HS256 token with the documented claims', async () => {
    const token = await previewToken('preview-secret', params)
    const { payload, protectedHeader } = await jwtVerify(token, key, {
      issuer: PREVIEW_ISSUER,
      audience: PREVIEW_AUDIENCE,
      currentDate: new Date(params.now * 1000),
    })
    assert.equal(protectedHeader.alg, 'HS256')
    assert.equal(payload.sub, '7')
    assert.equal(payload.global, 'navigation')
    assert.equal(payload.locale, 'pl')
  })

  it('is identical within an hour and expires within two', async () => {
    const hourStart = Math.floor(params.now / 3600) * 3600
    const a = await previewToken('preview-secret', { ...params, now: hourStart })
    const b = await previewToken('preview-secret', { ...params, now: hourStart + 3599 })
    const c = await previewToken('preview-secret', { ...params, now: hourStart + 3600 })
    assert.equal(a, b)
    assert.notEqual(a, c)
    const { payload } = await jwtVerify(a, key, { currentDate: new Date((hourStart + 3599) * 1000) })
    assert.equal(payload.exp! - payload.iat!, 7200)
    await assert.rejects(jwtVerify(a, key, { currentDate: new Date((hourStart + 7201) * 1000) }))
  })

  it('does not verify with another secret', async () => {
    const token = await previewToken('preview-secret', params)
    await assert.rejects(jwtVerify(token, new TextEncoder().encode('other'), { currentDate: new Date(params.now * 1000) }))
  })
})

describe('buildPreviewUrl', () => {
  it('builds the entry URL of the storefront', async () => {
    const url = new URL((await buildPreviewUrl(env, params))!)
    assert.equal(url.origin, 'https://shop.example')
    assert.equal(url.pathname, '/api/preview')
    assert.equal(url.searchParams.get('locale'), 'pl')
    assert.equal(url.searchParams.get('path'), '/')
    assert.equal(url.searchParams.get('global'), 'navigation')
    assert.ok(url.searchParams.get('token'))
  })

  it('is null (no preview button) without the storefront URL or the secret', async () => {
    assert.equal(await buildPreviewUrl({ PREVIEW_SECRET: 'x' }, params), null)
    assert.equal(await buildPreviewUrl({ STOREFRONT_URL: 'https://shop.example' }, params), null)
  })
})
