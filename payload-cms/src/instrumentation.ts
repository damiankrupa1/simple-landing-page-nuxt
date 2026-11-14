import type { Instrumentation } from 'next'

// Sentry runs on the Node.js server only (the API, the admin and Payload itself). The edge middleware only sets
// headers; its errors are still logged by Next. Without SENTRY_DSN nothing is initialised.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initSentry } = await import('./utils/captureError')
    initSentry()
  }
}

/**
 * Errors Next itself sees: admin pages (server components), server functions and route handlers that Payload does
 * not answer itself. Only the route template, its type and the method are passed on, never the request path with
 * its query string, the headers or the body.
 */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  const { captureError } = await import('./utils/captureError')
  captureError(error, { source: 'next', route: context.routePath, routeType: context.routeType, method: request.method })
}
