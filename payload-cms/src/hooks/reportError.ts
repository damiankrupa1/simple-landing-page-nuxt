/**
 * @fileoverview Root `afterError` hook: reports every error Payload's REST/GraphQL handlers turn into a response
 * @module reportError
 */
import type { AfterErrorHook } from 'payload'

import { captureError } from '../utils/captureError.ts'
import { ERROR_SOURCE_KEY } from '../utils/sentry.utils.ts'

/**
 * Payload catches errors thrown by collection operations, hooks and endpoints (ours included), logs them and
 * answers with its error response; this hook sees each of them once. It returns nothing, so the response (status
 * and body) stays exactly what Payload would send. 4xx errors (validation, duplicate e-mail, forbidden) are
 * breadcrumbs, the rest events tagged with `source`: the one `withErrorCapture` left on the request, otherwise
 * `form-submission` for the newsletter collection and `payload` for everything else.
 */
export const reportError: AfterErrorHook = ({ collection, error, req }) => {
  const fromEndpoint = req.context?.[ERROR_SOURCE_KEY]
  const source =
    typeof fromEndpoint === 'string'
      ? fromEndpoint
      : collection?.slug === 'form-submissions'
        ? 'form-submission'
        : 'payload'
  captureError(error, { source, collection: collection?.slug, method: req.method })
}
