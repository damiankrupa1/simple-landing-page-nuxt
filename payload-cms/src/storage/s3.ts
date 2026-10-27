import { s3Storage } from '@payloadcms/storage-s3'

const REQUIRED_VARS = ['S3_BUCKET', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY'] as const

/**
 * S3-compatible storage (Railway Bucket, AWS S3, Cloudflare R2, MinIO, ...) for the Media collection.
 * Opt-in through the same S3_* variables the Medusa backend uses, so both apps can share a bucket.
 * Without them, uploads stay on the local disk (ephemeral on Railway).
 *
 * - S3_FILE_URL: public base URL of the bucket. When set, files are linked to it directly; when
 *   unset, Payload serves them through /api/media/file/... so the bucket can stay private.
 * - S3_PREFIX: optional folder inside the bucket (use it when sharing a bucket with Medusa).
 */
export function s3StoragePlugin(env: NodeJS.ProcessEnv = process.env) {
  const missing = REQUIRED_VARS.filter((name) => !env[name])
  const enabled = missing.length === 0

  if (!enabled && (env.S3_ENDPOINT || missing.length < REQUIRED_VARS.length)) {
    console.warn(
      `S3 media storage is only partially configured - missing: ${missing.join(', ')}. Falling back to local disk, which is ephemeral on Railway!`,
    )
  }

  const fileUrl = env.S3_FILE_URL?.replace(/\/+$/, '')

  return s3Storage({
    enabled,
    // Keeps the media schema (and migrations) identical with and without S3.
    alwaysInsertFields: true,
    bucket: env.S3_BUCKET ?? '',
    config: {
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID ?? '',
        secretAccessKey: env.S3_SECRET_ACCESS_KEY ?? '',
      },
      // Railway Bucket and R2 want the literal "auto".
      region: env.S3_REGION || 'us-east-1',
      endpoint: env.S3_ENDPOINT,
      // Only MinIO and older Railway buckets need path-style requests.
      forcePathStyle: ['true', '1', 'yes'].includes((env.S3_FORCE_PATH_STYLE ?? '').toLowerCase()),
    },
    collections: {
      media: {
        prefix: env.S3_PREFIX || undefined,
        ...(fileUrl && {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            [fileUrl, prefix, filename].filter(Boolean).join('/'),
        }),
      },
    },
  })
}
