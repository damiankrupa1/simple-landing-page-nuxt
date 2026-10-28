/**
 * @fileoverview Seeds the storefront home page content into Payload.
 *
 * The nuxtMedusa storefront already reads these Globals from Payload and shows its own i18n copy and
 * `public/images/home/*` files when Payload has nothing. This script copies exactly that fallback content
 * (en + pl) and the ten images into Payload, so the storefront renders from the CMS.
 *
 * Read-only on the storefront side: files are read with `git show <ref>:<path>` from a checkout and
 * nothing in that repository is touched.
 *
 *   SEED_SOURCE=../../nuxtMedusa pnpm seed:home
 *
 * Env:
 *   SEED_SOURCE   path to the nuxtMedusa checkout (required)
 *   SEED_REF      git ref to read the content from (default origin/main)
 *   SEED_CONFIRM  must be "yes" when DATABASE_URL does not point at localhost
 *
 * It also creates the "Newsletter" form (form-builder) that the storefront's newsletter box should submit to.
 *
 * Idempotent: images are matched by filename and reused, Globals and the form are overwritten with the same content.
 */
import { execFileSync } from 'node:child_process'
import { getPayload } from 'payload'

import config from '../src/payload.config'

type Locale = 'en' | 'pl'
const LOCALES: Locale[] = ['en', 'pl']

const source = process.env.SEED_SOURCE
const ref = process.env.SEED_REF || 'origin/main'

function fail(message: string): never {
  console.error(`seed-home: ${message}`)
  process.exit(1)
}

if (!source) fail('set SEED_SOURCE to the path of the nuxtMedusa checkout')

const gitShow = (path: string): Buffer =>
  execFileSync('git', ['-C', source, 'show', `${ref}:${path}`], {
    maxBuffer: 64 * 1024 * 1024,
  })

const readJson = (path: string) => JSON.parse(gitShow(path).toString('utf8'))

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
    `DATABASE_URL points at ${dbHost}, not localhost. This writes to that database and, if S3_* is set, to its bucket. ` +
      'Re-run with SEED_CONFIRM=yes to proceed.',
  )
}

const messages: Record<Locale, any> = {
  en: readJson('i18n/locales/en.json'),
  pl: readJson('i18n/locales/pl.json'),
}

// The i18n files interpolate the shop name and escape '@'; Payload content is final text.
const shopTitle: string = messages.pl.pages.home.title
const text = (value: string): string => value.replaceAll('{title}', shopTitle).replaceAll("{'@'}", '@')

const IMAGES = {
  campaign: 'autumn-campaign.jpg',
  knitwear: 'category-knitwear.jpg',
  shirts: 'category-shirts.jpg',
  coats: 'category-coats.jpg',
  accessories: 'category-accessories.jpg',
  shopTheLook: 'shop-the-look.jpg',
  studio: 'studio-craft.jpg',
  capsuleWardrobe: 'journal-capsule-wardrobe.jpg',
  merinoWool: 'journal-merino-wool.jpg',
  autumnWalk: 'journal-autumn-walk.jpg',
} as const
type ImageKey = keyof typeof IMAGES

// Alt text per image and locale, from the same i18n keys the fallback components use.
const altKeys: Record<ImageKey, (home: any) => string> = {
  campaign: (h) => h.campaign.imageAlt,
  knitwear: (h) => h.categories.knitwear.imageAlt,
  shirts: (h) => h.categories.shirts.imageAlt,
  coats: (h) => h.categories.coats.imageAlt,
  accessories: (h) => h.categories.accessories.imageAlt,
  shopTheLook: (h) => h.shopTheLook.imageAlt,
  studio: (h) => h.studioStory.imageAlt,
  capsuleWardrobe: (h) => h.journal.capsuleWardrobe.imageAlt,
  merinoWool: (h) => h.journal.merinoWool.imageAlt,
  autumnWalk: (h) => h.journal.autumnWalk.imageAlt,
}

// Same defaults as the storefront components: every link goes to /store until the target pages exist.
const URL_PLACEHOLDER = '/store'
const CATEGORY_HANDLES = {
  knitwear: 'sweaters-cardigans',
  shirts: 'shirts',
  coats: 'jackets-coats',
  accessories: 'accessories',
} as const
const OTHER_BRANDS = ['SELECTED', 'Samsøe Samsøe', "MARC O'POLO", 'BIRKENSTOCK']

const productHandles = (): string[] => {
  const appConfig = gitShow('app/app.config.ts').toString('utf8')
  const block = appConfig.match(/shopTheLookProductHandles:\s*\[([^\]]*)\]/)?.[1]
  const handles = [...(block?.matchAll(/['"]([^'"]+)['"]/g) ?? [])].map((match) => match[1])
  if (handles.length === 0) fail('could not read shopTheLookProductHandles from app/app.config.ts')
  return handles
}

const payload = await getPayload({ config })
console.log(`seed-home: ${isLocal ? 'local' : 'REMOTE'} database ${dbHost}, content from ${source}@${ref}`)

// ── Media ──────────────────────────────────────────────────────────────────
const mediaIds = {} as Record<ImageKey, number>

for (const key of Object.keys(IMAGES) as ImageKey[]) {
  const name = IMAGES[key]
  const alt = (locale: Locale) => text(altKeys[key](messages[locale].pages.home))

  // Payload may store the upload as `name-1.jpg` (it does on the S3 bucket), so match the base name too.
  const [base, extension] = [name.replace(/\.[^.]+$/, ''), name.replace(/^.*(\.[^.]+)$/, '$1')]
  const sameFile = new RegExp(`^${base}(-\\d+)?${extension.replace('.', '\\.')}$`)
  const candidates = await payload.find({
    collection: 'media',
    where: { filename: { like: base } },
    sort: 'id',
    limit: 50,
    depth: 0,
    locale: 'en',
  })
  const existing = candidates.docs.filter((doc) => sameFile.test(doc.filename ?? ''))

  let id: number
  if (existing[0]) {
    id = existing[0].id
    await payload.update({ collection: 'media', id, locale: 'en', data: { alt: alt('en') } })
    console.log(`  media ${name}: reused #${id}`)
  } else {
    const data = gitShow(`public/images/home/${name}`)
    const created = await payload.create({
      collection: 'media',
      locale: 'en',
      data: { alt: alt('en') },
      file: { data, mimetype: 'image/jpeg', name, size: data.length },
    })
    id = created.id
    console.log(`  media ${name}: uploaded #${id} (${data.length} bytes)`)
  }
  await payload.update({ collection: 'media', id, locale: 'pl', data: { alt: alt('pl') } })
  mediaIds[key] = id
}

// ── Globals ────────────────────────────────────────────────────────────────
type Row = Record<string, unknown>
type GlobalSlug =
  | 'navigation'
  | 'footer-content'
  | 'campaign-slides'
  | 'category-tiles'
  | 'shop-the-look'
  | 'brands'
  | 'studio-story'
  | 'journal-section'

/**
 * Array rows are shared between locales, only their localized fields differ. The `pl` pass must therefore
 * carry the row ids created by the `en` pass; without them Payload would replace the rows and drop the
 * English values.
 */
const withRowIds = (rows: Row[] | undefined, saved: Row[] | undefined): Row[] | undefined =>
  rows?.map((row, index) => ({ ...row, id: saved?.[index]?.id }))

async function seedGlobal(
  slug: GlobalSlug,
  build: (locale: Locale, h: any, m: any) => Row,
  arrayFields: string[] = [],
) {
  let saved: Row | undefined
  for (const locale of LOCALES) {
    const home = messages[locale].pages.home
    const data = build(locale, home, messages[locale])
    if (saved) {
      for (const field of arrayFields) {
        data[field] = withRowIds(data[field] as Row[], saved[field] as Row[])
      }
    }
    saved = (await payload.updateGlobal({ slug, locale, data, depth: 0 })) as unknown as Row
  }
  console.log(`  global ${slug}: en + pl`)
}

const link = (label: string): Row => ({ label: text(label), url: URL_PLACEHOLDER })

await seedGlobal(
  'navigation',
  (_l, _h, m) => {
    const nav = m.app.header.nav
    return {
      primaryNav: [
        nav.newIn,
        nav.clothing,
        nav.shoes,
        nav.bagsAndAccessories,
        nav.brands,
        nav.studio,
        nav.inspiration,
        nav.lastPieces,
      ].map(link),
    }
  },
  ['primaryNav'],
)

await seedGlobal(
  'footer-content',
  (_l, _h, m) => {
    const f = m.app.footer
    return {
      helpLinks: [f.help.shippingAndPayments, f.help.returns, f.help.sizeGuide, f.help.trackOrder, f.help.faq].map(link),
      worldLinks: [f.world.about, f.world.studio, f.world.journal, f.world.materials, f.world.careers].map(link),
      legalLinks: [f.legal.terms, f.legal.privacy, f.legal.cookies, f.legal.accessibility].map(link),
      contact: { email: text(f.contact.email), phone: f.contact.phone, hours: f.contact.hours },
      social: { handle: text(f.social.handle) },
    }
  },
  ['helpLinks', 'worldLinks', 'legalLinks'],
)

await seedGlobal(
  'campaign-slides',
  (_l, h) => {
    const c = h.campaign
    return {
      slides: [
        {
          seasonLabel: c.seasonLabel,
          editionLabel: c.editionLabel,
          headlineLine1: c.headlineLine1,
          headlineLine2: c.headlineLine2,
          description: c.description,
          shopCtaLabel: c.shopCta,
          secondaryCtaLabel: c.secondaryCta,
          tagline: c.tagline,
          captionEyebrow: c.captionEyebrow,
          captionHeadline: c.captionHeadline,
          image: mediaIds.campaign,
        },
      ],
    }
  },
  ['slides'],
)

await seedGlobal(
  'category-tiles',
  (_l, h) => ({
    eyebrow: h.categories.eyebrow,
    heading: h.categories.heading,
    description: h.categories.description,
    cards: (['knitwear', 'shirts', 'coats', 'accessories'] as const).map((key) => ({
      title: h.categories[key].title,
      subtitle: h.categories[key].subtitle,
      categoryHandle: CATEGORY_HANDLES[key],
      image: mediaIds[key],
    })),
  }),
  ['cards'],
)

await seedGlobal('shop-the-look', (_l, h) => {
  const s = h.shopTheLook
  return {
    eyebrow: s.eyebrow,
    headlineLine1: s.headlineLine1,
    headlineLine2: s.headlineLine2,
    description: s.description,
    captionLabel: text(s.captionLabel),
    bottomTagline: s.bottomTagline,
    shopSetCtaLabel: s.shopSetCta,
    totalLabel: s.totalLabel,
    sizeHint: s.sizeHint,
    productHandles: productHandles(),
    image: mediaIds.shopTheLook,
  }
})

await seedGlobal('brands', (_l, h) => ({
  eyebrow: h.brands.eyebrow,
  viewAllLabel: h.brands.viewAll,
  viewAllUrl: URL_PLACEHOLDER,
  otherBrands: OTHER_BRANDS,
}))

await seedGlobal('studio-story', (_l, h) => {
  const s = h.studioStory
  return {
    eyebrow: text(s.eyebrow),
    headlineLine1: s.headlineLine1,
    headlineLine2: s.headlineLine2,
    paragraph1: text(s.paragraph1),
    paragraph2: s.paragraph2,
    values: [s.valueMade, s.valueMaterials, s.valueBatches],
    signatureLabel: text(s.signatureLabel),
    signatureTagline: s.signatureTagline,
    collectionLinkLabel: text(s.collectionLink),
    collectionUrl: URL_PLACEHOLDER,
    image: mediaIds.studio,
  }
})

await seedGlobal(
  'journal-section',
  (_l, h) => {
    const j = h.journal
    return {
      eyebrow: text(j.eyebrow),
      heading: j.heading,
      viewAllLabel: j.viewAll,
      viewAllUrl: URL_PLACEHOLDER,
      articles: (['capsuleWardrobe', 'merinoWool', 'autumnWalk'] as const).map((key) => ({
        category: j[key].category,
        readingTime: j[key].readingTime,
        title: j[key].title,
        summary: j[key].summary,
        image: mediaIds[key],
        url: URL_PLACEHOLDER,
      })),
    }
  },
  ['articles'],
)

// ── Newsletter form ────────────────────────────────────────────────────────
// Mirrors the storefront's newsletter box (email, two interests, consent). The form-builder plugin stores
// submissions in `form-submissions`; it does not validate values, so the storefront keeps its own checks.
const NEWSLETTER_TITLE = 'Newsletter'

const lexicalParagraph = (value: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', text: value, version: 1, detail: 0, format: 0, mode: 'normal', style: '' }],
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const newsletterData = (locale: Locale): Row => {
  const n = messages[locale].app.newsletter
  return {
    title: NEWSLETTER_TITLE,
    fields: [
      { blockType: 'email', name: 'email', label: n.emailPlaceholder, required: true, width: 100 },
      { blockType: 'checkbox', name: 'interestWomen', label: n.interestWomen, required: false, defaultValue: false },
      { blockType: 'checkbox', name: 'interestMen', label: n.interestMen, required: false, defaultValue: false },
      {
        blockType: 'checkbox',
        name: 'consent',
        label: text(`${n.consentPrefix} ${n.privacyPolicy}${n.consentSuffix}`),
        required: true,
        defaultValue: false,
      },
    ],
    submitButtonLabel: n.submit,
    confirmationType: 'message',
    confirmationMessage: lexicalParagraph(n.success),
    emails: [],
  }
}

{
  const found = await payload.find({
    collection: 'forms',
    where: { title: { equals: NEWSLETTER_TITLE } },
    limit: 1,
    depth: 0,
  })
  let formId: number | undefined = found.docs[0]?.id
  let savedFields: Row[] | undefined
  for (const locale of LOCALES) {
    const data: Row = newsletterData(locale)
    if (savedFields) data.fields = withRowIds(data.fields as Row[], savedFields)
    const result: any =
      formId === undefined
        ? await payload.create({ collection: 'forms', locale, data: data as any, depth: 0 })
        : await payload.update({ collection: 'forms', id: formId, locale, data: data as any, depth: 0 })
    formId = result.id
    savedFields = result.fields as Row[]
  }
  console.log(`  form ${NEWSLETTER_TITLE}: #${formId} en + pl`)
}

console.log('seed-home: done')
process.exit(0)
