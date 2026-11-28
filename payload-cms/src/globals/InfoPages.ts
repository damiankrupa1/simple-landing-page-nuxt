import type { Block, Field, GlobalConfig } from 'payload'

import { enforcePublishRole, globalRead, globalReadVersions, globalUpdate } from '../access/globalDrafts'

import { INFO_PAGE_DEFINITIONS, INFO_PAGE_GROUP_LABEL, type InfoPageDefinition } from './infoPageList'
import { globalPreview } from './preview'
import { validateAnchor, validateStorePath, validateUniqueAnchors } from './validators'
import { globalVersions } from './versions'

const text = (name: string): Field => ({ name, type: 'textarea', localized: true, required: true })

/**
 * The block types of the storefront's information pages (`InfoBlock` in nuxtMedusa `app/types/info-page.ts`). The
 * slug is the block's `kind` there. Plain text only: the pages render paragraphs, lists and accordions, not rich text.
 * `placeholder` stands in for a fact only the owner knows (a return address, a price, a vacancy): replace it with a
 * paragraph once the fact is known, never invent it. `sizeTable`, `contact` and `journal` have nothing to enter; the
 * storefront fills them from the `size-guide`, `footer-content` and `journal-section` Globals.
 */
const blockConfigs: Block[] = [
  {
    slug: 'text',
    labels: {
      singular: { en: 'Paragraph', pl: 'Akapit' },
      plural: { en: 'Paragraphs', pl: 'Akapity' },
    },
    fields: [text('text')],
  },
  {
    slug: 'placeholder',
    labels: {
      singular: {
        en: 'Pending fact (owner to supply)',
        pl: 'Brakująca informacja (do uzupełnienia)',
      },
      plural: { en: 'Pending facts', pl: 'Brakujące informacje' },
    },
    fields: [text('text')],
  },
  {
    slug: 'list',
    labels: { singular: { en: 'List', pl: 'Lista' }, plural: { en: 'Lists', pl: 'Listy' } },
    fields: [
      {
        name: 'ordered',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: {
            en: 'Numbered instead of bulleted.',
            pl: 'Numerowana zamiast wypunktowanej.',
          },
        },
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        minRows: 1,
        fields: [text('text')],
      },
    ],
  },
  {
    slug: 'link',
    labels: { singular: { en: 'Link', pl: 'Link' }, plural: { en: 'Links', pl: 'Linki' } },
    fields: [
      text('label'),
      {
        name: 'to',
        type: 'text',
        required: true,
        validate: validateStorePath,
        admin: {
          description: {
            en: 'A page of the store, relative to the country (/store, /account). Not an external address.',
            pl: 'Strona sklepu, względem kraju (/store, /account). Nie adres zewnętrzny.',
          },
        },
      },
    ],
  },
  {
    slug: 'faq',
    labels: {
      singular: { en: 'Questions and answers', pl: 'Pytania i odpowiedzi' },
      plural: { en: 'Questions and answers', pl: 'Pytania i odpowiedzi' },
    },
    fields: [
      {
        name: 'items',
        type: 'array',
        required: true,
        minRows: 1,
        admin: {
          description: {
            en: 'Shown as an accordion and, on a published page, as FAQ structured data for search engines.',
            pl: 'Pokazywane jako rozwijana lista, a na opublikowanej stronie także jako dane strukturalne FAQ dla wyszukiwarek.',
          },
        },
        fields: [text('question'), text('answer')],
      },
    ],
  },
  {
    slug: 'sizeTable',
    labels: {
      singular: {
        en: 'Size table (from the Size guide global)',
        pl: 'Tabela rozmiarów (z globala Poradnik rozmiarów)',
      },
      plural: { en: 'Size tables', pl: 'Tabele rozmiarów' },
    },
    fields: [],
  },
  {
    slug: 'contact',
    labels: {
      singular: { en: 'Contact details (from the footer)', pl: 'Dane kontaktowe (ze stopki)' },
      plural: { en: 'Contact details', pl: 'Dane kontaktowe' },
    },
    fields: [],
  },
  {
    slug: 'journal',
    labels: {
      singular: {
        en: 'Journal articles (from the Journal global)',
        pl: 'Artykuły dziennika (z globala Dziennik)',
      },
      plural: { en: 'Journal articles', pl: 'Artykuły dziennika' },
    },
    fields: [],
  },
]

// One named type per block (`InfoTextBlock`, ...) instead of a copy inside every page's generated type
const pascal = (slug: string) => slug.charAt(0).toUpperCase() + slug.slice(1)
const blocks: Block[] = blockConfigs.map((block) => ({ ...block, interfaceName: `Info${pascal(block.slug)}Block` }))

const fields: Field[] = [
  {
    name: 'title',
    type: 'text',
    localized: true,
    required: true,
    admin: {
      description: {
        en: 'Browser tab title and search result title.',
        pl: 'Tytuł karty przeglądarki i wyniku wyszukiwania.',
      },
    },
  },
  {
    name: 'description',
    type: 'textarea',
    localized: true,
    required: true,
    admin: {
      description: {
        en: 'Search result description, about 150 characters.',
        pl: 'Opis w wynikach wyszukiwania, około 150 znaków.',
      },
    },
  },
  {
    name: 'eyebrow',
    type: 'text',
    localized: true,
    required: true,
    admin: {
      description: {
        en: 'Small label above the heading, for example "HELP".',
        pl: 'Mała etykieta nad nagłówkiem, na przykład „POMOC”.',
      },
    },
  },
  { name: 'heading', type: 'text', localized: true, required: true },
  {
    name: 'lead',
    type: 'textarea',
    localized: true,
    required: true,
    admin: { description: { en: 'Introduction under the heading.', pl: 'Wstęp pod nagłówkiem.' } },
  },
  {
    name: 'sections',
    type: 'array',
    required: true,
    minRows: 1,
    validate: validateUniqueAnchors,
    admin: { initCollapsed: true },
    fields: [
      {
        name: 'anchor',
        type: 'text',
        required: true,
        validate: validateAnchor,
        admin: {
          description: {
            en: 'Part of the section link (#delivery) and of the table of contents. Not translated; do not change it on a published page, links to it would break.',
            pl: 'Część linku do sekcji (#delivery) i spisu treści. Nie jest tłumaczona; nie zmieniaj jej na opublikowanej stronie, bo linki przestaną działać.',
          },
        },
      },
      { name: 'heading', type: 'text', localized: true, required: true },
      { name: 'blocks', type: 'blocks', required: true, minRows: 1, blocks },
    ],
  },
]

const infoPage = ({ slug, path, label }: InfoPageDefinition): GlobalConfig => ({
  slug,
  label,
  // Drafts: the public read only matches the published document (see access/globalDrafts.ts), staff and the
  // storefront service account can read drafts, editors save drafts, publishers publish.
  access: {
    read: globalRead,
    readVersions: globalReadVersions,
    update: globalUpdate,
  },
  hooks: { beforeValidate: [enforcePublishRole] },
  versions: globalVersions,
  admin: { group: INFO_PAGE_GROUP_LABEL, ...globalPreview(slug, path) },
  fields,
})

export const InfoPages: GlobalConfig[] = INFO_PAGE_DEFINITIONS.map(infoPage)
