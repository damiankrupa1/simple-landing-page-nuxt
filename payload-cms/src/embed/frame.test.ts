import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { EMBED_HIDE_CSS, isFramed } from './frame.ts'

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
