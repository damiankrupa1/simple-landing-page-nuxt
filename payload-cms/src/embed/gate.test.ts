import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { isAdminPath, isDebugRequested, standaloneBlockedHtml, standaloneDecision } from './gate.ts'

const base = {
  embedded: true,
  pathname: '/admin',
  secFetchDest: 'document',
  debugParam: null,
  hasDebugCookie: false,
}

describe('standaloneDecision', () => {
  it('blocks a top-level load of the admin in embed mode', () => {
    assert.equal(standaloneDecision(base), 'block')
    assert.equal(standaloneDecision({ ...base, pathname: '/admin/collections/pages' }), 'block')
    assert.equal(standaloneDecision({ ...base, pathname: '/admin/login' }), 'block')
  })

  it('lets the iframe, soft navigations and REST calls through', () => {
    for (const secFetchDest of ['iframe', 'empty', 'script', 'image', null]) {
      assert.equal(standaloneDecision({ ...base, secFetchDest }), 'allow', String(secFetchDest))
    }
  })

  it('does nothing outside embed mode or outside the admin', () => {
    assert.equal(standaloneDecision({ ...base, embedded: false }), 'allow')
    assert.equal(standaloneDecision({ ...base, pathname: '/api/users/me' }), 'allow')
    assert.equal(standaloneDecision({ ...base, pathname: '/administrator' }), 'allow')
  })

  it('lets enableDebug=1 through and remembers it', () => {
    assert.equal(standaloneDecision({ ...base, debugParam: '1' }), 'allow-and-remember')
  })

  it('accepts only the exact value 1', () => {
    for (const debugParam of ['0', 'true', 'yes', '', '11']) {
      assert.equal(standaloneDecision({ ...base, debugParam }), 'block', debugParam)
    }
  })

  it('lets a later load through once the cookie is set', () => {
    assert.equal(standaloneDecision({ ...base, pathname: '/admin/globals/navigation', hasDebugCookie: true }), 'allow')
  })
})

describe('isAdminPath', () => {
  it('matches /admin and its subpaths only', () => {
    assert.equal(isAdminPath('/admin'), true)
    assert.equal(isAdminPath('/admin/x'), true)
    assert.equal(isAdminPath('/administrator'), false)
    assert.equal(isAdminPath('/api/admin'), false)
  })
})

describe('isDebugRequested', () => {
  it('reads the parameter or the cookie', () => {
    assert.equal(isDebugRequested('?enableDebug=1', ''), true)
    assert.equal(isDebugRequested('', 'a=b; payload-embed-debug=1'), true)
  })

  it('is false for anything else', () => {
    assert.equal(isDebugRequested('?enableDebug=0', ''), false)
    assert.equal(isDebugRequested('', 'payload-embed-debug=0; other=1'), false)
    assert.equal(isDebugRequested('', ''), false)
  })
})

describe('standaloneBlockedHtml', () => {
  it('links the Medusa admin when known, escaped', () => {
    assert.match(standaloneBlockedHtml('https://admin.example'), /href="https:\/\/admin\.example"/)
    assert.doesNotMatch(standaloneBlockedHtml('https://a.example/"><script>'), /<script>/)
  })

  it('has no link without one', () => {
    assert.doesNotMatch(standaloneBlockedHtml(), /<a /)
  })
})
