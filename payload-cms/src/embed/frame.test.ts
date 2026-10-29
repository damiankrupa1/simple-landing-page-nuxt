import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { EMBED_HIDE_CSS, isFramed, screenForPath } from './frame.ts'

describe('isFramed', () => {
  it('is false for the top window and true inside a frame', () => {
    const top = {}
    assert.equal(isFramed({ self: top, top }), false)
    assert.equal(isFramed({ self: {}, top }), true)
  })

  it('treats a throwing top as framed', () => {
    const win = {
      self: {},
      get top(): unknown {
        throw new Error('blocked')
      },
    }
    assert.equal(isFramed(win), true)
  })
})

describe('EMBED_HIDE_CSS', () => {
  it('hides the account icon, the logout icon and the unauthorized logout button', () => {
    for (const selector of ['.nav__log-out', '.app-header__account', '.unauthorized__button']) {
      assert.ok(EMBED_HIDE_CSS.includes(selector), selector)
    }
  })
})

describe('screenForPath', () => {
  it('maps the pages that would show a Payload login or logout to the renewing screen', () => {
    assert.deepEqual(screenForPath('/admin/login'), { kind: 'renew', reason: 'expired' })
    assert.deepEqual(screenForPath('/admin/logout-inactivity'), { kind: 'renew', reason: 'inactivity' })
    assert.deepEqual(screenForPath('/admin/logout/'), { kind: 'renew', reason: 'logout' })
  })

  it('maps unauthorized to denied and everything else to nothing', () => {
    assert.deepEqual(screenForPath('/admin/unauthorized'), { kind: 'denied' })
    assert.equal(screenForPath('/admin'), null)
    assert.equal(screenForPath('/admin/globals/navigation'), null)
    assert.equal(screenForPath('/admin/account'), null)
  })
})
