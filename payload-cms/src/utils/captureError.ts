/**
 * @fileoverview The only module of our code that talks to Sentry; everything else reports through `captureError`.
 * The SDK itself also reports what our code never sees: errors thrown in Next route handlers and server components
 * (wrapped by `withSentryConfig`), uncaught exceptions, and the traces. All of it goes through the same scrubbing
 * (`sentry.utils.ts`).
 */
import * as Sentry from '@sentry/nextjs'

import { buildSentryOptions, isExpectedError, toSentryContext } from './sentry.utils.ts'

/**
 * Starts Sentry on the Node.js server (called from `instrumentation.ts`). Without `SENTRY_DSN` nothing is
 * initialised and `captureError` only logs to the console.
 */
export function initSentry(): void {
  const options = buildSentryOptions(process.env)
  if (options) Sentry.init(options)
}

// An error passed twice (a hook that reports and rethrows, then Next's onRequestError) is reported once. Sentry
// itself also skips an error object it already captured, whichever path came first.
const reported = new WeakSet<object>()

/**
 * Reports an error the team should look into. `context` becomes searchable tags (`source`, `status`, `method`,
 * `collection`, `global`, `route`, `routeType`, `type`) plus extra data; never put request bodies, e-mails,
 * tokens or codes in it (they are scrubbed anyway, see `sentry.utils.ts`). Without a DSN it only logs to the
 * console, as does development.
 *
 * Errors the client caused (4xx: validation, invalid SSO token, role none, account conflict, duplicate e-mail)
 * raise no alert: they stay as breadcrumbs on the next real event of the same request.
 */
export function captureError(error: unknown, context: Record<string, unknown> = {}): void {
  if (typeof error === 'object' && error !== null) {
    if (reported.has(error)) return
    reported.add(error)
  }

  const enabled = Sentry.isEnabled()
  const expected = isExpectedError(error)
  const message = error instanceof Error ? error.message : String(error)

  if (!enabled || process.env.NODE_ENV !== 'production') {
    if (expected) console.warn(`[expected] ${message}`, context)
    else console.error(error, context)
  }
  if (!enabled) return

  const { tags, extra } = toSentryContext(context)
  if (expected) {
    Sentry.addBreadcrumb({ category: 'expected-error', level: 'info', message, data: tags })
    return
  }
  Sentry.captureException(error, { tags, extra })
}
