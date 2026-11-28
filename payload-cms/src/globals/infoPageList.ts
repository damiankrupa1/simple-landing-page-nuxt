/**
 * @fileoverview The storefront's information pages (nuxtMedusa `INFO_PAGES`, issues #118 and #119) that have a Global each.
 *
 * Kept free of Payload imports so the list can be unit tested with `node --test`.
 *
 * The storefront owns the structure (which pages exist, their route, footer group and indexing); Payload owns the
 * copy. `path` is the page's storefront route, only used to open the preview on the right page. Slugs are short on
 * purpose: Postgres cuts identifiers at 63 characters and the nested table names (sections, blocks, items, versions)
 * get long. A new page is a new entry here plus a migration, and its slug goes into `CMS_GLOBAL_SLUGS` in nuxtMedusa.
 */
export type InfoPageDefinition = {
  /** Global slug, `info-<name>` */
  slug: string
  /** Route under `/[countryCode]` */
  path: string
  label: { en: string; pl: string }
}

export const INFO_PAGE_GROUP_LABEL = { en: 'Information pages', pl: 'Strony informacyjne' } as const

export const INFO_PAGE_DEFINITIONS: InfoPageDefinition[] = [
  // Help
  {
    slug: 'info-shipping',
    path: '/help/shipping-and-payments',
    label: { en: 'Shipping and payments', pl: 'Dostawa i płatności' },
  },
  {
    slug: 'info-returns',
    path: '/help/returns',
    label: { en: 'Returns and complaints', pl: 'Zwroty i reklamacje' },
  },
  {
    slug: 'info-size-guide',
    path: '/help/size-guide',
    label: { en: 'Size guide (page)', pl: 'Poradnik rozmiarów (strona)' },
  },
  {
    slug: 'info-track-order',
    path: '/help/track-order',
    label: { en: 'Track your order', pl: 'Śledzenie zamówienia' },
  },
  { slug: 'info-faq', path: '/help/faq', label: { en: 'FAQ', pl: 'Najczęstsze pytania' } },
  // The Fashion world
  { slug: 'info-about', path: '/about', label: { en: 'About us', pl: 'O nas' } },
  { slug: 'info-studio', path: '/studio', label: { en: 'The studio', pl: 'Pracownia' } },
  {
    slug: 'info-journal',
    path: '/journal',
    label: { en: 'Journal (page)', pl: 'Dziennik (strona)' },
  },
  {
    slug: 'info-materials',
    path: '/materials-and-care',
    label: { en: 'Materials and care', pl: 'Materiały i pielęgnacja' },
  },
  { slug: 'info-careers', path: '/careers', label: { en: 'Careers', pl: 'Kariera' } },
  // Legal (the footer's legal row, nuxtMedusa#119). No copy is seeded: the owner or a lawyer writes the texts.
  { slug: 'info-terms', path: '/terms', label: { en: 'Terms of sale', pl: 'Regulamin' } },
  { slug: 'info-privacy', path: '/privacy', label: { en: 'Privacy notice', pl: 'Polityka prywatności' } },
  { slug: 'info-cookies', path: '/cookies', label: { en: 'Cookie policy', pl: 'Polityka cookies' } },
  {
    slug: 'info-accessibility',
    path: '/accessibility',
    label: { en: 'Accessibility statement', pl: 'Deklaracja dostępności' },
  },
]
