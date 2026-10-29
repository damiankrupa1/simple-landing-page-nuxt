/**
 * @fileoverview Embed mode settings read from the environment (never from user input).
 *
 * Pure and free of Payload/Next imports: used by the config, the middleware (edge runtime) and unit tests.
 */

/** Reads PAYLOAD_EMBEDDED, MEDUSA_ADMIN_URLS and MEDUSA_ADMIN_URL; `process.env` fits. */
export type EmbedEnv = Record<string, string | undefined>

/** The switch for the embed mechanisms (hidden account/logout UI, postMessage bridge, autoRefresh). */
export const isEmbedEnabled = (env: EmbedEnv): boolean => env.PAYLOAD_EMBEDDED?.trim().toLowerCase() === 'true'

/**
 * Origins of the Medusa admin that may embed this app and talk to it through postMessage:
 * `MEDUSA_ADMIN_URLS` (comma separated) plus the legacy single `MEDUSA_ADMIN_URL`. Entries that are not
 * http(s) URLs are skipped instead of breaking every request; duplicates are removed.
 */
export const parseAllowedOrigins = (env: EmbedEnv): string[] => {
  const entries = [...(env.MEDUSA_ADMIN_URLS ?? '').split(','), env.MEDUSA_ADMIN_URL ?? '']
  const origins = new Set<string>()
  for (const entry of entries) {
    const value = entry.trim()
    if (!value) continue
    try {
      const url = new URL(value)
      if (url.protocol === 'http:' || url.protocol === 'https:') origins.add(url.origin)
    } catch {
      // not a URL: skipped on purpose
    }
  }
  return [...origins]
}

/** `frame-ancestors` value: this app itself plus every allowed Medusa admin origin (never `*`). */
export const frameAncestors = (origins: string[]): string => ['\'self\'', ...origins].join(' ')
