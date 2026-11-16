import { withPayload } from '@payloadcms/next/withPayload'
// Sentry 11 ships the build wrapper as its own entry point (`@sentry/nextjs` itself no longer exports it).
import { withSentryConfig } from '@sentry/nextjs/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

const config = withPayload(nextConfig)
const withPayloadHeaders = config.headers

// withPayload sends `Critical-CH: Sec-CH-Prefers-Color-Scheme` on every response. The first time a Chrome profile
// sees an origin it discards such a response and repeats the request with the hint. For the single-use SSO
// exchange that repeat replays the token and fails with 401 (the first response, with the session cookie, is
// thrown away). An empty value, listed after Payload's rule so it wins, opts the SSO endpoint out of the retry.
config.headers = async () => [
  ...((await withPayloadHeaders?.()) ?? []),
  { source: '/api/users/sso/medusa', headers: [{ key: 'Critical-CH', value: '' }] },
]

// Source maps go to Sentry only when SENTRY_AUTH_TOKEN is set at build time (a build secret, never in the final
// image) and do not stay in the image. Without the token no source maps are generated at all. A failed upload
// (wrong token, Sentry down) only warns: it must never fail the build. Route handlers and server components are
// wrapped by the plugin, so errors thrown there are reported although Next skips `onRequestError` while tracing.
const uploadSourceMaps = Boolean(process.env.SENTRY_AUTH_TOKEN)

export default withSentryConfig(config, {
  org: 'damian-krupa-lux',
  project: 'payload-cms',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  telemetry: false,
  // Browser maps are deleted right after the upload, also when it fails. Server maps must survive `next build` (its
  // standalone tracing copies them); the Dockerfile deletes them from the output afterwards.
  sourcemaps: { disable: !uploadSourceMaps, deleteSourcemapsAfterUpload: true },
  release: { create: false, finalize: false },
  widenClientFileUpload: false,
  // Sentry runs on the Node.js server only; the edge middleware just sets headers.
  autoInstrumentMiddleware: false,
  // The build-time injection of diagnostics channels rewrites dependencies and broke the AWS SDK used by the S3
  // adapter (`@smithy/smithy-client` lost its exports, `next build` failed). Runtime instrumentation still applies.
  buildTimeInstrumentation: false,
  errorHandler: (error) => {
    console.warn(`[sentry] source map upload failed, the build continues: ${error.message}`)
  },
})
