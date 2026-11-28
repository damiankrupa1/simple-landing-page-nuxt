---
name: payload-backend-todo
description: 'Tracks the Payload CMS backend contract (Collections/Globals, fields, locales, access rules) this Nuxt storefront assumes but does not itself implement — Payload lives in a separate repo/instance. Use when setting up or configuring that Payload instance, or when adding a new app/repository/cms.repository.ts fetcher that needs a new Global/Collection.'
---

# Payload backend TODO

> Copied from the `nuxtMedusa` storefront repo. In *this* repo the Payload backend lives in `payload-cms/`, so read "this repo" below as "the storefront" and treat the entries as the contract `payload-cms/src/globals/*` must satisfy. The globals are implemented on branch `agents/payload-backend-todo` (not yet on `main`). `missing-cms-content` and the `app/...` paths mentioned below exist only in the storefront repo.

This repo only contains the Nuxt-side consumption layer for Payload CMS (`app/repository/cms.repository.ts`, `app/composables/cms.ts`, `app/types/cms.ts`) — see "Payload CMS integration" in `CLAUDE.md`. No Payload backend is configured here. Each entry below is a Global/Collection that `cms.repository.ts` already calls and that a connected Payload instance must provide with this exact REST shape for the storefront to show real content instead of its static i18n fallback.

Conventions used throughout:

- Base contract: `GET {NUXT_PUBLIC_PAYLOAD_URL}/api/globals/<slug>?locale=<en|pl>&depth=<n>` for Globals (standard Payload REST, no custom endpoints). `cms.repository.ts`'s `fetchGlobal()` defaults `depth` to `0`; any Global with an upload/relationship field (an `image`) is fetched with `depth=1` instead, so `image.url`/`image.alt` come back populated rather than a bare Media id — check each entry below for which it uses.
- Every text field listed must have `localized: true` and the Payload instance's `localization` config must declare exactly `{ locales: ['en', 'pl'], defaultLocale: 'en' }` to match this app's `i18n.locales`.
- Public read on each, with **drafts** (`versions: { drafts: true, max: 30 }`): `access.read` is `globalRead` (`src/access/globalDrafts.ts`), which returns `{ _status: { equals: 'published' } }` for everybody except staff (role viewer+) and the `service-users` account. So an anonymous `GET /api/globals/<slug>`, even with `?draft=true`, returns the **published** document only; no API key is sent for published reads. Before first publication, or after "Unpublish", the response is `{}` (HTTP 200): treat it as "no content" and use the static fallback. Responses now carry `_status`. Draft reads (storefront preview) use `?draft=true` plus `Authorization: service-users API-Key <key>`; see `payload-medusa-integration`.
- A field named `url`/`to` should be a storefront-relative path (e.g. `/store`) or an absolute URL — `cms.repository.ts` doesn't rewrite it.
- `nuxt.config.ts` adds `NUXT_PUBLIC_PAYLOAD_URL`'s hostname to `image.domains` at build/start time so `@nuxt/image`'s `NuxtImg` (used for every `image.url`/`image.alt` field below, same as the rest of the app) actually optimizes Payload-hosted images instead of silently serving them unoptimized. Changing `NUXT_PUBLIC_PAYLOAD_URL` to a different host needs a restart (dev) or redeploy (prod) to pick up the new domain — it isn't runtime-reactive.

## `Navigation` (Global) — implemented

- **Slug**: `navigation`
- **Fields**: `primaryNav` — array of `{ label: text (localized), url: text }`.
- **Consumed by**: `useFetchNavigation()` → `app/components/app/header/category-nav.vue`.
- **Type**: `CmsNavigation` in `app/types/cms.ts`.

## `FooterContent` (Global) — implemented

- **Slug**: `footer-content`
- **Fields**:
  - `helpLinks`, `worldLinks`, `legalLinks` — each an array of `{ label: text (localized), url: text }`.
  - `contact` — group `{ email: text, phone: text, hours: text (localized) }`.
  - `social` — group `{ handle: text }`.
- **Consumed by**: `useFetchFooterContent()` → `app/components/app/footer/menu/help.vue`, `menu/world.vue`, `menu/brand.vue`, `copyright.vue`.
- **Type**: `CmsFooterContent` in `app/types/cms.ts`.

## `StudioStory` (Global) — implemented

- **Slug**: `studio-story`
- **Fields**: `eyebrow`, `headlineLine1`, `headlineLine2`, `paragraph1`, `paragraph2` — localized text; `values` — array of localized text (3 short value markers); `signatureLabel`, `signatureTagline` — localized text; `collectionLinkLabel` — localized text; `collectionUrl` — text (storefront-relative path); `image` — upload relationship to `Media`, resolved with `depth=1`+ so `image.url`/`image.alt` come back populated (plain strings, not a `Media` id).
- **Consumed by**: `useFetchStudioStory()` → `app/components/home/studio-story.vue`.
- **Type**: `CmsStudioStory` in `app/types/cms.ts`.
- **Note**: all editorial copy here is final, localized text written by an editor — it does not need `{title}` brand-name interpolation the way the i18n fallback does, since Payload content is never a template.

## `Brands` (Global) — implemented

- **Slug**: `brands`
- **Fields**: `eyebrow`, `viewAllLabel` — localized text; `viewAllUrl` — text (storefront-relative path); `otherBrands` — array of text, **not localized** (brand wordmarks are proper nouns).
- **Consumed by**: `useFetchBrands()` → `app/components/home/brands.vue`.
- **Type**: `CmsBrands` in `app/types/cms.ts`.
- **Note**: the storefront's own name shown alongside `otherBrands` comes from this app's `useAppConfig().title`, not from Payload — don't add a field for it.

## `JournalSection` (Global) — implemented

- **Slug**: `journal-section`
- **Fields**: `eyebrow`, `heading`, `viewAllLabel` — localized text; `viewAllUrl` — text; `articles` — array (fixed at 3 today) of `{ category: text (localized), readingTime: text (localized), title: text (localized), summary: text (localized), image: upload relationship to Media, url: text }`.
- **Consumed by**: `useFetchJournalSection()` → `app/components/home/journal.vue`.
- **Type**: `CmsJournalSection` in `app/types/cms.ts`.
- **Note**: deliberately a Global with an array field, not a `JournalArticles` Collection — the home page only ever shows a fixed curated set of cards, not a paginated/browsable blog. If a real article-per-page blog is wanted later, that's a bigger, separate feature (a true `Collection` with slugs and detail pages) and should replace this, not extend it.

## `CampaignSlides` (Global) — implemented

- **Slug**: `campaign-slides`
- **Fields**: `slides` — array of `{ seasonLabel, editionLabel, headlineLine1, headlineLine2, description, shopCtaLabel, secondaryCtaLabel, tagline, captionEyebrow, captionHeadline: text, all localized; image: upload relationship to Media }`.
- **Consumed by**: `useFetchCampaignSlides()` → `app/components/home/campaign.vue` (real clickable pagination over `slides.length`).
- **Type**: `CmsCampaignSlides`/`CmsCampaignSlide` in `app/types/cms.ts`.
- **Note**: neither slide field carries a CTA URL — the primary CTA always goes to `/store` and the secondary CTA always goes to the real men's-department category (`useDepartmentCategories()`); both are live commerce routing the Nuxt app owns, not Payload. Don't add `shopCtaUrl`/`secondaryCtaUrl` fields without also changing the component to use them.

## `CategoryTiles` (Global) — implemented

- **Slug**: `category-tiles`
- **Fields**: `eyebrow`, `heading`, `description` — localized text; `cards` — array of `{ title: text (localized), subtitle: text (localized), categoryHandle: text, image: upload relationship to Media }`.
- **Consumed by**: `useFetchCategoryTiles()` → `app/components/home/categories.vue`. Resolved against real Medusa categories by `app/services/cms.service.ts`'s `getResolvedCategoryTiles()` before reaching the composable — any card whose `categoryHandle` doesn't match a real category is dropped.
- **Type**: `CmsCategoryTiles`/`CmsCategoryTile` in `app/types/cms.ts`.
- **Note**: `categoryHandle` must be a real, existing Medusa category handle (e.g. `sweaters-cardigans`) — a stale or typo'd value just makes that card silently disappear from the grid rather than linking to a 404. Payload never stores the category's own name/data; `title`/`subtitle` are free-form editorial copy that doesn't need to match the real category name (see missing-cms-content for why — curated groupings don't map 1:1 to raw categories).

## `ShopTheLook` (Global) — implemented

- **Slug**: `shop-the-look`
- **Fields**: `eyebrow`, `headlineLine1`, `headlineLine2`, `description`, `captionLabel`, `bottomTagline`, `shopSetCtaLabel`, `totalLabel`, `sizeHint` — localized text; `productHandles` — array of text (real Medusa product handles); `image` — upload relationship to Media.
- **Consumed by**: `useFetchShopTheLook()` → `app/components/home/shop-the-look.vue`. Resolved against real Medusa products by `app/services/cms.service.ts`'s `getResolvedShopTheLook()` before reaching the composable — any handle that doesn't match a real product is dropped, and the matching `StoreProduct`s are attached as `products` for live price/total rendering.
- **Type**: `CmsShopTheLook` in `app/types/cms.ts`; the resolved shape (`CmsShopTheLook & { products: StoreProduct[] }`) is `ResolvedShopTheLook` in `app/services/cms.service.ts`.
- **Note**: Payload never stores price/stock — those always come live from the resolved Medusa products. A stale or typo'd handle just drops that product from the look instead of showing a broken price.

## `SizeGuide` (Global) — implemented

- **Slug**: `size-guide` (one table for the whole store, not per category).
- **Fields**: `title` — localized text; `intro` — localized text, optional (how to measure); `columns` — array of `{ label: text (localized) }` (state the unit in the label, e.g. "Chest (cm)"); `rows` — array of `{ size: text, values: array of text }`. `size` is **not** localized and must match the Medusa size option value (XS, S, M, ...); `values` is a plain JSON array of strings (not `[{ value }]`), **not** localized, one entry per column in column order.
- **Validation**: on publish, every row must have exactly as many `values` as there are `columns` (`validateSizeGuideRows`); drafts skip it. Fetch with `depth=0`.
- **REST shape**: `{ title, intro?, columns: [{ id, label }], rows: [{ id, size, values: string[] }], _status }`. Before first publication the response is `{}`.
- **Consumed by** (storefront, nuxtMedusa#58): the "Tabela rozmiarów" modal on the product page (`ProductSizeGuide`).

## `ProductPageInfo` (Global) — implemented

- **Slug**: `product-page-info`
- **Fields**: `freeShipping`, `carriers`, `returns` — localized text, required; `priceNote`, `shippingTime` — localized text, optional (empty means hide the line). Fetch with `depth=0`.
- **Consumed by** (storefront, nuxtMedusa#58): the reassurance block under the add-to-cart button. The help line reuses `FooterContent.contact.email`, so there is no field for it.

## Information pages (14 Globals) — implemented (nuxtMedusa#118, #119)

The copy of the footer's information pages: ten help and "Świat Fashion" pages (#118) and four legal pages (#119). The routes are the storefront's to decide in `INFO_PAGES` (the legal ones are the proposal in `src/globals/infoPageList.ts`); Payload only uses them to open the preview, so change both together. The storefront keeps the **structure** (which pages exist, route, footer group, `status` draft/published, `toc`, `contact`) in `INFO_PAGES`; Payload holds the **copy**. One Global per page, from one factory (`src/globals/InfoPages.ts`, list in `src/globals/infoPageList.ts`), all with the same fields, so a page is a slug plus a migration. Globals rather than a collection because the draft preview, the public proxy and `CMS_GLOBAL_SLUGS` only know Globals.

| Slug | Storefront route |
|---|---|
| `info-shipping` | `/help/shipping-and-payments` |
| `info-returns` | `/help/returns` |
| `info-size-guide` | `/help/size-guide` |
| `info-track-order` | `/help/track-order` |
| `info-faq` | `/help/faq` |
| `info-about` | `/about` |
| `info-studio` | `/studio` |
| `info-journal` | `/journal` |
| `info-materials` | `/materials-and-care` |
| `info-careers` | `/careers` |
| `info-terms` | `/terms` (terms of sale) |
| `info-privacy` | `/privacy` (privacy notice) |
| `info-cookies` | `/cookies` (cookie policy) |
| `info-accessibility` | `/accessibility` (accessibility statement) |

- **Fields** (all text localized unless noted; required to publish, a draft may miss them):
  - `title`, `description` (search result), `eyebrow`, `heading`, `lead`.
  - `sections` — array of `{ anchor, heading, blocks }`. `anchor` is **not** localized: it is the old section id (`delivery`), the `#fragment` and the table of contents key; unique per page. `blocks` is a Payload blocks field, `blockType` = the storefront's `InfoBlock.kind`:
    - `text` `{ text }`, `placeholder` `{ text }` (a fact only the owner knows: shown in neutral wording, replace with `text` once known, never invent it)
    - `list` `{ ordered: boolean, items: [{ text }] }`
    - `link` `{ label, to }` (`to`: a path inside the store, validated: starts with `/`, not `//`, no spaces)
    - `faq` `{ items: [{ question, answer }] }`
    - `sizeTable`, `contact`, `journal` `{}`: no fields; the storefront fills them from the `size-guide`, `footer-content` and `journal-section` Globals.
- **REST shape**: `{ title, description, eyebrow, heading, lead, sections: [{ id, anchor, heading, blocks: [{ id, blockType, ... }] }], _status }`. Fetch with `depth=0`. Row ids are shared by `en` and `pl`: the two locales always have the same sections and blocks, only the text differs. Before first publication, or after "Unpublish", the response is `{}`.
- **Status**: stays in the storefront (`INFO_PAGES[].status`), so a page is still `noindex` and out of the sitemap until the owner flips it there. Payload's `_status` only says whether the copy is available; with no published copy the storefront has nothing to render and should answer 404 (no static fallback).
- **Preview**: each Global has its own Preview button / Live Preview pane that opens the page's own route (`path` in the preview link), so the storefront's preview must accept each slug as `global` and serve its draft.
- **Placeholders**: the `TODO(owner)` facts become `placeholder` blocks; seeded with the same neutral wording the storefront shows today.
- **Seed** (the ten help and world pages): `SEED_SOURCE=<nuxtMedusa checkout> SEED_REF=<last commit with the copy in i18n> pnpm seed:info-pages` (see `seed-home-content`). It reads `INFO_PAGES` and `pages.<id>.*` and skips a page that already has content unless `SEED_OVERWRITE=yes`.
- **Legal pages** (`info-terms`, `info-privacy`, `info-cookies`, `info-accessibility`): same fields and blocks, **nothing seeded**. The texts are legal documents, so the owner or a lawyer writes them in the admin; neither the storefront nor this repo invents them. Until one is published its response is `{}` and the storefront renders nothing for it. The footer links are entered by the owner in `footer-content.legalLinks`. What the texts have to state truthfully (the owner confirms each): Stripe payments, InPost Geowidget, Sentry (storefront #39; Payload also reports errors to Sentry without personal data), the cookies the storefront sets (`cart_id`, `country_code`), and the newsletter: Payload stores the e-mail, the consent wording the visitor saw (text, hash, locale) and the sign-up date as proof of consent, plus the discount code it issued; the 3-year retention in `newsletter-storefront` is an assumption for whoever handles data protection to confirm, and nothing deletes old rows yet. The returns and complaints copy (`info-returns`) needs the same legal review.
- **Storefront side** (outside this repo): add the fourteen slugs to `CMS_GLOBAL_SLUGS` with zod schemas in `app/types/cms.ts`, fetch them with cache keys `cms:<slug>:${locale}`, render the blocks, and drop the copy from i18n once the CMS is seeded. The size table stays on the product page's data until #58.

## Not yet implemented (see `missing-cms-content` for the product-side need)

These are still mocked with static i18n/hardcoded content; no `cms.repository.ts` fetcher exists for them yet. Add the Payload Global/Collection and the matching entry above in the same change as the Nuxt fetcher, so this file never drifts from `cms.repository.ts`.

- `Pages` + `blocks` (Collection) — generic CMS pages for legal/about/FAQ content, following the `blocks`-union pattern seen in `simple-landing-page-nuxt`'s `payload-cms/src/collections/Pages.tsx`.
