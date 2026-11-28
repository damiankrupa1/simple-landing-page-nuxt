/**
 * @fileoverview Seeds the storefront's information pages (help and "Świat Fashion") into Payload (issue #118).
 *
 * The nuxtMedusa storefront keeps the structure of these pages in `INFO_PAGES` (app/utils/info-pages.ts) and their
 * copy in i18n (`pages.<id>.*`). This script turns both into the Globals of `src/globals/InfoPages.ts` (en + pl), so
 * the copy moves to Payload without being retyped. Read-only on the storefront side: files are read with
 * `git show <ref>:<path>` from a checkout and nothing there is touched.
 *
 *   SEED_SOURCE=../../nuxtMedusa SEED_REF=<last commit with the copy in i18n> pnpm seed:info-pages
 *
 * Env:
 *   SEED_SOURCE     path to the nuxtMedusa checkout (required)
 *   SEED_REF        git ref to read from (default origin/main). Once the storefront has dropped the copy from i18n,
 *                   point it at the last commit that still has it
 *   SEED_CONFIRM    must be "yes" when DATABASE_URL does not point at localhost
 *   SEED_OVERWRITE  "yes" to replace a page that already has sections. Without it such a page is skipped, so a
 *                   re-run never throws away what the owner has edited since
 *
 * The pages are published (both locales), which only makes the copy available to the storefront. Whether a page is
 * indexed stays the storefront's `status` in INFO_PAGES.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import type { Config } from '../src/payload-types'
import { INFO_PAGE_DEFINITIONS } from '../src/globals/infoPageList'

type Locale = 'en' | 'pl'
type GlobalSlug = keyof Config['globals']
const LOCALES: Locale[] = ['en', 'pl']

const source = process.env.SEED_SOURCE
const ref = process.env.SEED_REF || 'origin/main'

function fail(message: string): never {
  console.error(`seed-info-pages: ${message}`)
  process.exit(1)
}

if (!source) fail('set SEED_SOURCE to the path of the nuxtMedusa checkout')

const gitShow = (path: string): string =>
  execFileSync('git', ['-C', source, 'show', `${ref}:${path}`], { maxBuffer: 64 * 1024 * 1024 }).toString('utf8')

const dbHost = (() => {
  try {
    return new URL(process.env.DATABASE_URL ?? '').hostname
  } catch {
    return fail('DATABASE_URL is missing or not a valid URL')
  }
})()
const isLocal = ['localhost', '127.0.0.1', '::1'].includes(dbHost)
if (!isLocal && process.env.SEED_CONFIRM !== 'yes') {
  fail(
    `DATABASE_URL points at ${dbHost}, not localhost. This writes to that database. ` +
      'Re-run with SEED_CONFIRM=yes to proceed.',
  )
}
const overwrite = process.env.SEED_OVERWRITE === 'yes'

// ── The storefront's structure (INFO_PAGES) ────────────────────────────────
// The two files are TypeScript with one relative import, so they are written to a temp directory and imported.
type InfoBlock =
  | { kind: 'text' | 'placeholder'; key: string }
  | { kind: 'list'; key: string; items: number; ordered?: boolean }
  | { kind: 'link'; key: string; to: string }
  | { kind: 'faq'; key: string; questions: string[] }
  | { kind: 'sizeTable' | 'contact' | 'journal' }
type InfoPage = {
  id: string
  path: string
  sections: { id: string; blocks: InfoBlock[] }[]
}

const loadInfoPages = async (): Promise<InfoPage[]> => {
  const dir = mkdtempSync(join(tmpdir(), 'seed-info-pages-'))
  try {
    writeFileSync(join(dir, 'info-page.ts'), gitShow('app/types/info-page.ts'))
    writeFileSync(
      join(dir, 'info-pages.ts'),
      gitShow('app/utils/info-pages.ts').replaceAll("'~/types/info-page'", "'./info-page.ts'"),
    )
    const module = await import(pathToFileURL(join(dir, 'info-pages.ts')).href)
    return module.INFO_PAGES as InfoPage[]
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

// ── The copy (i18n) ────────────────────────────────────────────────────────
const messages: Record<Locale, any> = {
  en: JSON.parse(gitShow('i18n/locales/en.json')),
  pl: JSON.parse(gitShow('i18n/locales/pl.json')),
}
const shopTitle: string = messages.pl.pages.home.title

const lookup = (locale: Locale, path: string): unknown =>
  path.split('.').reduce((node: any, key) => node?.[key], messages[locale])

/** A message as final text: vue-i18n linked messages (`@:a.b`), `{title}` and `{'@'}` are resolved. */
const resolve = (locale: Locale, value: unknown, where: string): string => {
  if (typeof value !== 'string' || value === '') fail(`${where} (${locale}) is missing in i18n`)
  return value
    .replace(/@:([\w.]+)/g, (_, path: string) => resolve(locale, lookup(locale, path), `${where} -> ${path}`))
    .replaceAll('{title}', shopTitle)
    .replaceAll("{'@'}", '@')
}

const buildBlock = (locale: Locale, base: string, block: InfoBlock) => {
  const get = (path: string) => resolve(locale, lookup(locale, `${base}.${path}`), `${base}.${path}`)
  switch (block.kind) {
    case 'text':
    case 'placeholder':
      return { blockType: block.kind, text: get(block.key) }
    case 'list':
      return {
        blockType: 'list',
        ordered: block.ordered ?? false,
        items: Array.from({ length: block.items }, (_, index) => ({ text: get(`${block.key}.${index + 1}`) })),
      }
    case 'link':
      return { blockType: 'link', label: get(block.key), to: block.to }
    case 'faq':
      return {
        blockType: 'faq',
        items: block.questions.map((question) => ({
          question: get(`${block.key}.${question}.q`),
          answer: get(`${block.key}.${question}.a`),
        })),
      }
    default:
      return { blockType: block.kind }
  }
}

const buildPage = (locale: Locale, page: InfoPage) => {
  const base = `pages.${page.id}`
  const get = (key: string) => resolve(locale, lookup(locale, `${base}.${key}`), `${base}.${key}`)
  return {
    title: get('title'),
    description: get('description'),
    eyebrow: get('eyebrow'),
    heading: get('heading'),
    lead: get('lead'),
    sections: page.sections.map((section) => ({
      anchor: section.id,
      heading: get(`sections.${section.id}.heading`),
      blocks: section.blocks.map((block) => buildBlock(locale, `${base}.sections.${section.id}`, block)),
    })),
  }
}

/**
 * Array and block rows are shared between locales: the second locale must reuse the row ids Payload created for the
 * first one, or it adds rows and the first locale's values are lost.
 */
const withRowIds = (data: any, saved: any): any => {
  if (Array.isArray(data)) return data.map((item, index) => withRowIds(item, saved?.[index]))
  if (data && typeof data === 'object') {
    const copy: Record<string, any> = {}
    for (const [key, value] of Object.entries(data)) copy[key] = withRowIds(value, saved?.[key])
    if (saved?.id !== undefined) copy.id = saved.id
    return copy
  }
  return data
}

// ── Seed ───────────────────────────────────────────────────────────────────
const pages = await loadInfoPages()
const missing = pages.filter((page) => !INFO_PAGE_DEFINITIONS.some((definition) => definition.path === page.path))
if (missing.length > 0) {
  fail(`no Global for ${missing.map((page) => page.path).join(', ')}: add it to src/globals/infoPageList.ts first`)
}

const payload = await getPayload({ config })
console.log(`seed-info-pages: ${isLocal ? 'local' : 'REMOTE'} database ${dbHost}, content from ${source}@${ref}`)

let written = 0
for (const page of pages) {
  const slug = INFO_PAGE_DEFINITIONS.find((definition) => definition.path === page.path)!.slug as GlobalSlug

  const existing = (await payload.findGlobal({
    slug,
    locale: 'en',
    depth: 0,
    draft: true,
    overrideAccess: true,
  })) as { sections?: unknown[] }
  if (!overwrite && (existing.sections?.length ?? 0) > 0) {
    console.log(`  skipped ${slug}: it already has content (SEED_OVERWRITE=yes replaces it)`)
    continue
  }

  let saved: any
  for (const locale of LOCALES) {
    const data = buildPage(locale, page)
    saved = await payload.updateGlobal({
      slug,
      locale,
      depth: 0,
      overrideAccess: true,
      data: { ...(locale === 'en' ? data : withRowIds(data, saved)), _status: 'published' },
    })
  }
  written += 1
  console.log(`  ${slug}: ${page.sections.length} sections, en + pl`)
}

console.log(`seed-info-pages: done, ${written} of ${pages.length} pages written`)
process.exit(0)
