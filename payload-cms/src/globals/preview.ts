import type { GlobalConfig } from 'payload'

import { buildPreviewUrl } from '../preview/previewUrl'
import { captureError } from '../utils/captureError'

/**
 * Preview for a storefront Global: the Live Preview pane (iframe inside the admin, the storefront reloads on
 * `payload-document-event`) and the Preview button (opens the same URL in a new tab, which is the fallback
 * where third-party cookies or nested frames are blocked). Both need STOREFRONT_URL and PREVIEW_SECRET and
 * disappear without them. A preview link needs a signed-in staff member, so the URL is `null` for anyone else.
 */
export const globalPreview = (slug: string): NonNullable<GlobalConfig['admin']> => {
  const url = async (locale: string, user: { id?: number | string } | null | undefined) => {
    if (user?.id === undefined) return null
    try {
      return await buildPreviewUrl(process.env, { global: slug, locale, userId: user.id })
    } catch (error) {
      // Payload logs and swallows a failing preview URL (the buttons just disappear), so report it here. Rethrown
      // so Payload keeps doing exactly that.
      captureError(error, { source: 'preview', global: slug })
      throw error
    }
  }

  return {
    livePreview: { url: ({ locale, req }) => url(locale.code, req.user) },
    preview: (_doc, { locale, req }) => url(locale, req.user),
  }
}
