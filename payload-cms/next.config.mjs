import { withPayload } from '@payloadcms/next/withPayload'

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

export default config
