import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { isPreviewPath } from '../preview/previewUrl.ts'

import { INFO_PAGE_DEFINITIONS } from './infoPageList.ts'

describe('INFO_PAGE_DEFINITIONS', () => {
  it('has unique slugs and routes', () => {
    const slugs = INFO_PAGE_DEFINITIONS.map((page) => page.slug)
    const paths = INFO_PAGE_DEFINITIONS.map((page) => page.path)
    assert.equal(new Set(slugs).size, slugs.length)
    assert.equal(new Set(paths).size, paths.length)
  })

  it('uses slugs the storefront proxy accepts and Postgres can hold in nested table names', () => {
    for (const { slug } of INFO_PAGE_DEFINITIONS) {
      assert.match(slug, /^info-[a-z0-9]+(-[a-z0-9]+)*$/)
      // `_<slug>_v_version_sections_blocks_list_items_locales` must stay under the 63 character identifier limit
      assert.ok(slug.length <= 20, `${slug} is too long`)
    }
  })

  it('has routes the storefront preview accepts, and a label in both languages', () => {
    for (const { path, label } of INFO_PAGE_DEFINITIONS) {
      assert.ok(isPreviewPath(path), path)
      assert.ok(label.en && label.pl)
    }
  })
})
