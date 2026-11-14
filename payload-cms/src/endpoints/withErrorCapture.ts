import type { Endpoint } from 'payload'

import { captureError } from '../utils/captureError.ts'
import { ERROR_SOURCE_KEY } from '../utils/sentry.utils.ts'

/** A failure an endpoint answered itself (it returns `fail(status, ...)` instead of throwing). */
export class EndpointError extends Error {
  readonly status: number

  constructor(source: string, status: number) {
    super(`${source} endpoint answered ${status}`)
    this.name = 'EndpointError'
    this.status = status
  }
}

/**
 * Reports the failures of one of our endpoints with a `source` tag, without changing its response:
 * - an answered 4xx (invalid token, conflict, unknown code, ...) becomes a breadcrumb, a 5xx (secret not
 *   configured, user not loaded) an event; only the status is reported, never the body or the request;
 * - a thrown error is not caught here: Payload turns it into its usual error response and the root `afterError`
 *   hook (`hooks/reportError.ts`) reports it, tagged with the source this wrapper leaves on `req.context`.
 */
export const withErrorCapture = (source: string, endpoint: Endpoint): Endpoint => ({
  ...endpoint,
  handler: async (req) => {
    req.context[ERROR_SOURCE_KEY] = source
    const response = await endpoint.handler(req)
    if (response.status >= 400) {
      captureError(new EndpointError(source, response.status), { source, status: response.status, method: req.method })
    }
    return response
  },
})
