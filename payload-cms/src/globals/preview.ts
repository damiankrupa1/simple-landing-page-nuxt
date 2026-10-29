import type { GlobalConfig } from 'payload'

import { buildPreviewUrl } from '../preview/previewUrl'

/**
 * Preview for a storefront Global: the Live Preview pane (iframe inside the admin, the storefront reloads on
 * `payload-document-event`) and the Preview button (opens the same URL in a new tab, which is the fallback
 * where third-party cookies or nested frames are blocked). Both need STOREFRONT_URL and PREVIEW_SECRET and
 * disappear without them. A preview link needs a signed-in staff member, so the URL is `null` for anyone else.
 */
export const globalPreview = (slug: string): NonNullable<GlobalConfig['admin']> => {
  const url = async (locale: string, user: { id?: number | string } | null | undefined) =>
    user?.id === undefined ? null : buildPreviewUrl(process.env, { global: slug, locale, userId: user.id })

  return {
    livePreview: { url: ({ locale, req }) => url(locale.code, req.user) },
    preview: (_doc, { locale, req }) => url(locale, req.user),
  }
}
