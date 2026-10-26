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

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const baseUrl = process.env.FRONTEND_URL
const nuxtPayloadUrl = process.env.NUXT_PUBLIC_PAYLOAD_URL

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
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [nuxtPayloadUrl ?? '', baseUrl ?? ''],
  admin: {
    user: Users.slug,
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
  collections: [Users, Media, Pages],
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
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    formBuilderPlugin({}),
  ],
})
