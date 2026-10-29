/**
 * @fileoverview Main configuration file for Payload CMS
 * @module payload.config
 */

// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import Pages from './collections/Pages'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { ServiceUsers } from './collections/ServiceUsers'
import { SsoTokenUses } from './collections/SsoTokenUses'
import { Users } from './collections/Users'
import { Brands } from './globals/Brands'
import { CampaignSlides } from './globals/CampaignSlides'
import { CategoryTiles } from './globals/CategoryTiles'
import { FooterContent } from './globals/FooterContent'
import { JournalSection } from './globals/JournalSection'
import { Navigation } from './globals/Navigation'
import { ShopTheLook } from './globals/ShopTheLook'
import { StudioStory } from './globals/StudioStory'
import { atLeast, isAdmin } from './access/roles'
import { isEmbedEnabled, parseAllowedOrigins } from './embed/config'
import { migrations } from './migrations'
import { validateFormSubmission } from './hooks/validateFormSubmission'
import { s3StoragePlugin } from './storage/s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const baseUrl = process.env.FRONTEND_URL
const nuxtPayloadUrl = process.env.NUXT_PUBLIC_PAYLOAD_URL

// Payload only accepts cookie-authenticated browser requests whose Origin is its own serverURL
// (the csrf allowlist). With the localhost fallback on a deployed instance, every admin API
// call (uploads, saves) is treated as anonymous and fails with "You are not allowed to perform
// this action" even though the admin pages render logged in.
const serverURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  (process.env.RAILWAY_PUBLIC_DOMAIN
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
    : 'http://localhost:3000')

// Embed mode (the admin runs in an iframe of the Medusa admin). Read at runtime on the server and passed to the
// client as props, so changing PAYLOAD_EMBEDDED needs a restart but no rebuild.
const embedded = isEmbedEnabled(process.env)
const embedOrigins = parseAllowedOrigins(process.env)

/**
 * Payload CMS configuration
 * Defines the core settings and features of the CMS
 *
 * @type {import('payload').Config}
 * @property {Object} admin - Admin panel configuration
 * @property {string} admin.user - Collection to use for admin users
 * @property {Object} admin.importMap - Import map configuration for admin UI
 * @property {Array<CollectionConfig>} collections - Registered collections
 * @property {Function} editor - Rich text editor configuration
 * @property {string} secret - Secret key for authentication
 * @property {Object} typescript - TypeScript configuration
 * @property {Object} db - Database adapter configuration
 * @property {Function} sharp - Image processing configuration
 * @property {Array<Object>} plugins - Registered plugins
 */
export default buildConfig({
  serverURL,
  cors: [nuxtPayloadUrl ?? '', baseUrl ?? ''],
  admin: {
    user: Users.slug,
    // Embedded: refresh the session in the background instead of asking "stay logged in?" (that modal has a
    // log out button). The session still ends with the Medusa logout (revocation endpoint) or when the tab closes.
    autoRefresh: embedded,
    components: {
      // Always registered (the import map is generated from the config, not from the environment); it does
      // nothing unless `embedded` is true.
      providers: [
        {
          path: '/components/embed/EmbedProvider',
          exportName: 'EmbedProvider',
          clientProps: { embedded, origins: embedOrigins },
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data }) => {
        return `${baseUrl}/${data.slug}`
      },
      collections: ['pages'],
    },
  },
  collections: [Users, Media, Pages, SsoTokenUses, ServiceUsers],
  globals: [
    Navigation,
    FooterContent,
    StudioStory,
    Brands,
    JournalSection,
    CampaignSlides,
    CategoryTiles,
    ShopTheLook,
  ],
  localization: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    prodMigrations: migrations,
    push: false,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3StoragePlugin(),
    formBuilderPlugin({
      // `forms` stay publicly readable (the storefront renders them) and `form-submissions` stay publicly
      // creatable (the newsletter box); everything else needs a role. Submissions hold visitors' emails.
      formOverrides: {
        access: { create: atLeast('editor'), update: atLeast('editor'), delete: isAdmin },
      },
      formSubmissionOverrides: {
        access: { read: atLeast('editor'), delete: isAdmin },
        hooks: { beforeValidate: [validateFormSubmission] },
      },
    }),
  ],
})
