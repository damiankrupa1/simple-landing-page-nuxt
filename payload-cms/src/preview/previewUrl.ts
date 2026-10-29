/**
 * @fileoverview Builds the storefront preview URL that the admin opens (Live Preview pane and Preview button).
 *
 * Contract with the storefront (nuxtMedusa), see `.claude/skills/payload-medusa-integration`:
 *   GET {STOREFRONT_URL}/api/preview?token=<JWT>&locale=<en|pl>&path=/&global=<slug>
 * The token proves that a signed-in Payload user asked for the preview; it is HS256, signed with PREVIEW_SECRET
 * (shared with the storefront), `iss: payload-cms`, `aud: storefront-preview`, claims `sub` (Payload user id),
 * `global`, `locale`. It only opens preview mode; the draft data itself is fetched by the storefront server with
 * its own API key (`service-users`).
 *
 * The URL must be identical between renders of the edit view: when it changes, the admin reloads the iframe and
 * restarts the handshake. So the token is quantized to the hour (same `iat`/`exp` for everybody within an hour)
 * instead of using the current second.
 */
import { SignJWT } from 'jose'

export const PREVIEW_ISSUER = 'payload-cms'
export const PREVIEW_AUDIENCE = 'storefront-preview'
export const PREVIEW_PATH = '/api/preview'
/** Token validity: the rest of the current hour plus this window, so 1 to 2 hours. */
const BUCKET_SECONDS = 60 * 60
const TTL_SECONDS = 2 * BUCKET_SECONDS

type Env = Record<string, string | undefined>

export type PreviewParams = {
  global: string
  locale: string
  userId: number | string
  /** Seconds since epoch; injectable for tests. */
  now?: number
}

/** `https://shop.example` from STOREFRONT_URL; anything that is not an http(s) URL disables previews. */
export const storefrontOrigin = (env: Env): string | null => {
  try {
    const url = new URL(env.STOREFRONT_URL ?? '')
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : null
  } catch {
    return null
  }
}

export const previewToken = async (secret: string, { global, locale, userId, now }: PreviewParams) => {
  const issuedAt = Math.floor((now ?? Date.now() / 1000) / BUCKET_SECONDS) * BUCKET_SECONDS
  return new SignJWT({ global, locale })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(PREVIEW_ISSUER)
    .setAudience(PREVIEW_AUDIENCE)
    .setSubject(String(userId))
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + TTL_SECONDS)
    .sign(new TextEncoder().encode(secret))
}

/** `null` (no preview button) when the storefront URL or the secret is missing: the CMS must keep working. */
export const buildPreviewUrl = async (env: Env, params: PreviewParams): Promise<string | null> => {
  const origin = storefrontOrigin(env)
  const secret = env.PREVIEW_SECRET
  if (!origin || !secret) return null
  const query = new URLSearchParams({
    token: await previewToken(secret, params),
    locale: params.locale,
    path: '/',
    global: params.global,
  })
  return `${origin}${PREVIEW_PATH}?${query.toString()}`
}
