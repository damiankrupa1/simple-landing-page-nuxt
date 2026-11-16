/**
 * @fileoverview Pure helpers behind `captureError` and the Sentry init: which errors are expected, how a context
 * becomes tags, and the scrubbing of personal data and secrets from every event and breadcrumb.
 *
 * Kept free of the Sentry runtime (type imports only) so it can be unit tested with `node --test`.
 */
import type { Breadcrumb, ErrorEvent, NodeOptions } from '@sentry/nextjs'

export const SENTRY_FILTERED = '[Filtered]'

/** `req.context` key through which `withErrorCapture` tells the `afterError` hook which endpoint failed. */
export const ERROR_SOURCE_KEY = 'errorSource'

type Env = Record<string, string | undefined>

// Keys whose value never goes to Sentry, wherever they show up (extra data, contexts, breadcrumb data):
// credentials, sessions, newsletter sign-ups (e-mail, submission data, consent) and discount codes.
const SENSITIVE_KEY =
  /e-?mail|passw|token|secret|authori[sz]ation|cookie|jwt|api[-_]?key|session|salt|hash|credential|discount|submission|consent|^code$|^sid$|^dsn$/i

// Request headers that may stay on an event; everything else (Cookie, Authorization, x-newsletter-token, API keys,
// forwarded IPs, ...) is dropped.
const ALLOWED_HEADERS = ['user-agent', 'accept', 'accept-language', 'content-type', 'host']

// Environment variables whose values are masked wherever they appear in a string (PAYLOAD_SECRET,
// MEDUSA_SSO_SECRET, NEWSLETTER_SUBMIT_TOKEN, S3_SECRET_ACCESS_KEY, DATABASE_URL, ...). Not "PRIVATE": Next sets
// __NEXT_PRIVATE_ORIGIN to the public origin, which would mask every URL.
const SECRET_ENV_NAME = /SECRET|TOKEN|PASSWORD|_KEY|KEY_ID|DATABASE_URL|DSN/i
// Shorter values ("true", "10") would mask unrelated text and are not secrets anyway.
const MIN_SECRET_LENGTH = 8

const MAX_DEPTH = 6

// A 4xx is the client's to fix (invalid token, validation, duplicate e-mail). 408 and 429 are not: they mean the
// server is struggling.
const NOT_EXPECTED_STATUSES = [408, 429]

const SECRET_PATTERNS: [RegExp, string][] = [
  // Drizzle's "Failed query: <sql>\nparams: <values>": the values are row data (e-mails, password hash and salt,
  // codes). The SQL itself stays.
  [/\bparams:[^\n]*/g, 'params: [Filtered]'],
  // Credentials inside a URL (postgres://user:password@host)
  [/\b([a-z][a-z0-9+.-]*:\/\/)[^\s/@:]+:[^\s/@]+@/gi, '$1[credentials]@'],
  [/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, '[email]'],
  [/\bBearer\s+[\w.~+/=-]+/gi, 'Bearer [token]'],
  // `Authorization: <collection> API-Key <key>` (service-users)
  [/\bAPI-Key\s+[^\s,;]+/gi, 'API-Key [key]'],
  [/\beyJ[\w-]+\.[\w-]+\.[\w-]+/g, '[jwt]'],
  // Sensitive query or cookie values: ?token=..., payload-token=..., code=...
  [/\b(token|code|secret|password|api[-_]?key|e-?mail)=[^&#\s;"']+/gi, '$1=[Filtered]'],
  // Newsletter discount codes (XXXX-XXXX-XXXX from the alphabet of `discount.utils.ts`, any letter case)
  [/\b[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}\b/gi, '[discount-code]'],
]

const toNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined

/** The HTTP status of a Payload `APIError`/`ValidationError`, a fetch-like error or an `EndpointError`. */
export const getStatus = (error: unknown): number | undefined => {
  if (typeof error !== 'object' || error === null) return undefined
  const candidate = error as Record<string, unknown>
  const response = candidate.response as Record<string, unknown> | undefined
  return toNumber(candidate.status) ?? toNumber(candidate.statusCode) ?? toNumber(response?.status)
}

/**
 * Whether an error is the client's to fix and not ours: a 4xx (validation, invalid or replayed SSO token, role
 * none, account conflict, duplicate e-mail). Those must not raise alerts; `captureError` keeps them as breadcrumbs.
 */
export const isExpectedError = (error: unknown): boolean => {
  const status = getStatus(error)
  return status !== undefined && status >= 400 && status < 500 && !NOT_EXPECTED_STATUSES.includes(status)
}

const TAG_KEYS: Record<string, string> = {
  source: 'source',
  status: 'http_status',
  method: 'http_method',
  collection: 'collection',
  global: 'cms_global',
  route: 'route',
  routeType: 'route_type',
  type: 'error_type',
}

/**
 * Maps the context a `captureError` caller passes: the known keys become searchable tags (`source`, `status`,
 * `method`, `collection`, `global`, `route`, `routeType`, `type`), anything else goes to `extra` (and through the
 * key filter of `scrubEvent`).
 */
export const toSentryContext = (
  context: Record<string, unknown>,
): { tags: Record<string, string>; extra: Record<string, unknown> } => {
  const tags: Record<string, string> = {}
  const extra: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(context)) {
    if (value === undefined) continue
    const tag = TAG_KEYS[key]
    if (tag && (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')) {
      tags[tag] = String(value).slice(0, 200)
    } else {
      extra[key] = value
    }
  }
  return { tags, extra }
}

/** The values of secret-looking environment variables, longest first (so a value containing another is masked whole). */
export const secretValues = (env: Env): string[] =>
  Object.entries(env)
    .filter(([name, value]) => SECRET_ENV_NAME.test(name) && typeof value === 'string' && value.length >= MIN_SECRET_LENGTH)
    .map(([, value]) => value as string)
    .sort((a, b) => b.length - a.length)

/** Masks secret environment values, e-mails, tokens, credentials and discount codes inside a string. */
export const scrubString = (value: string, secrets: readonly string[] = []): string => {
  const withoutSecrets = secrets.reduce((text, secret) => text.split(secret).join(SENTRY_FILTERED), value)
  return SECRET_PATTERNS.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), withoutSecrets)
}

/** Keeps the path, drops the query string and fragment (the SSO token is `?token=...`). */
export const scrubUrl = (url: string, secrets: readonly string[] = []): string =>
  scrubString(url.replace(/[?#].*$/, ''), secrets)

/** Drops every `?query` inside a longer text (span names like `GET /api/users/sso/medusa?token=...`), then scrubs it. */
export const scrubText = (value: string, secrets: readonly string[] = []): string =>
  scrubString(value.replace(/\?[^\s#"']*/g, ''), secrets)

/** SQL keeps its shape; string literals and the values of a failed query are masked. */
export const scrubSql = (sql: string, secrets: readonly string[] = []): string =>
  scrubString(sql.replace(/'(?:[^']|'')*'/g, "'?'"), secrets)

// Keys whose string value is a URL or a path that may carry a query string.
const URL_KEY = /(^|[._])(url|href|path|target|transaction)$|^(from|to)$/i

/** Deep copy with sensitive keys filtered and every string scrubbed; `url`-like keys lose their query string. */
export const scrubValue = (value: unknown, secrets: readonly string[] = [], key = '', depth = 0): unknown => {
  if (SENSITIVE_KEY.test(key)) return SENTRY_FILTERED
  if (typeof value === 'string') return URL_KEY.test(key) ? scrubUrl(value, secrets) : scrubString(value, secrets)
  if (typeof value !== 'object' || value === null) return value
  if (depth >= MAX_DEPTH) return SENTRY_FILTERED
  if (Array.isArray(value)) return value.map((item) => scrubValue(item, secrets, key, depth + 1))
  return Object.fromEntries(
    Object.entries(value).map(([name, item]) => [name, scrubValue(item, secrets, name, depth + 1)]),
  )
}

const HEADER_ATTRIBUTE = /^http\.(request|response)\.header\.(.+)$/i
const QUERY_ATTRIBUTE = /(^|\.)(query|fragment)$/i
const DB_TEXT_ATTRIBUTE = /^db\.(statement|query\.text)$/i
const DB_VALUES_ATTRIBUTE = /(^|\.)(values|params|parameters?)(\.|$)/i

// Header attributes outside the allowlist are removed with their name (which tells that a token was sent).
const isDroppedAttribute = (key: string): boolean => {
  const name = HEADER_ATTRIBUTE.exec(key)?.[2]
  return name !== undefined && !ALLOWED_HEADERS.includes(name.toLowerCase().replace(/_/g, '-'))
}

const scrubAttribute = (key: string, value: unknown, secrets: readonly string[]): unknown => {
  if (HEADER_ATTRIBUTE.test(key)) return scrubValue(value, secrets)
  if (QUERY_ATTRIBUTE.test(key) || DB_VALUES_ATTRIBUTE.test(key) || SENSITIVE_KEY.test(key)) return SENTRY_FILTERED
  if (typeof value === 'string') {
    if (DB_TEXT_ATTRIBUTE.test(key)) return scrubSql(value, secrets)
    if (/connection_string$/i.test(key)) return scrubUrl(value, secrets)
    return scrubText(value, secrets)
  }
  if (Array.isArray(value)) return value.map((item) => (typeof item === 'string' ? scrubText(item, secrets) : item))
  return scrubValue(value, secrets, key)
}

/**
 * Span attributes (`span.data`, `contexts.trace.data`): request and response headers except a harmless few are
 * removed with their names; query strings (`url.query`, `http.query`) and bound database values are filtered; URLs
 * and span names (`url.full`, `http.url`, `http.target`, `next.span_name`, ...) lose their query string; SQL (`db.statement`,
 * `db.query.text`) loses its string literals; credentials leave connection strings; everything is scrubbed.
 */
export const scrubSpanData = (
  data: Record<string, unknown> | undefined,
  secrets: readonly string[] = [],
): Record<string, unknown> | undefined =>
  data &&
  Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => !isDroppedAttribute(key))
      .map(([key, value]) => [key, scrubAttribute(key, value, secrets)]),
  )

type SpanLike = { description?: string; op?: string; data?: Record<string, unknown> }

/** One span of a transaction: its description (an URL, a route or SQL) and its attributes. */
export const scrubSpan = <S extends SpanLike>(span: S, secrets: readonly string[] = []): S => ({
  ...span,
  ...(span.description && {
    description: span.op?.startsWith('db') ? scrubSql(span.description, secrets) : scrubText(span.description, secrets),
  }),
  ...(span.data && { data: scrubSpanData(span.data, secrets) }),
})

/** `beforeBreadcrumb`: scrubs the message and the data (an http breadcrumb's `url` loses its query string). */
export const scrubBreadcrumb = (breadcrumb: Breadcrumb, secrets: readonly string[] = []): Breadcrumb => ({
  ...breadcrumb,
  ...(breadcrumb.message && { message: scrubString(breadcrumb.message, secrets) }),
  ...(breadcrumb.data && { data: scrubValue(breadcrumb.data, secrets) as Breadcrumb['data'] }),
})

type TransactionEvent = Parameters<NonNullable<NodeOptions['beforeSendTransaction']>>[0]

/**
 * `beforeSend` and `beforeSendTransaction`. An event leaves with no user, no request body, cookies, query string or
 * environment, only a few harmless headers, no local variables, and with secrets, e-mails, tokens and discount
 * codes masked in messages, exception values, URLs, the transaction name, tags, contexts (the trace context's span
 * attributes included), extra data, breadcrumbs and every span. Returns a scrubbed copy.
 */
export const scrubEvent = <T extends ErrorEvent | TransactionEvent>(event: T, secrets: readonly string[] = []): T => {
  const scrubbed: T = { ...event }
  const text = (value: string) => scrubString(value, secrets)

  delete scrubbed.user

  if (scrubbed.request) {
    const { url, headers, method } = scrubbed.request
    scrubbed.request = {
      ...(method && { method }),
      ...(url && { url: scrubUrl(url, secrets) }),
      ...(headers && {
        headers: Object.fromEntries(
          Object.entries(headers)
            .filter(([name]) => ALLOWED_HEADERS.includes(name.toLowerCase()))
            .map(([name, value]) => [name, text(String(value))]),
        ),
      }),
    }
  }

  if (scrubbed.message) scrubbed.message = text(scrubbed.message)
  if (scrubbed.logentry) scrubbed.logentry = scrubValue(scrubbed.logentry, secrets) as T['logentry']
  if (scrubbed.transaction) scrubbed.transaction = scrubUrl(scrubbed.transaction, secrets)
  if (scrubbed.exception?.values) {
    scrubbed.exception = {
      ...scrubbed.exception,
      values: scrubbed.exception.values.map((exception) => ({
        ...exception,
        ...(exception.value && { value: text(exception.value) }),
        ...(exception.stacktrace?.frames && {
          stacktrace: {
            ...exception.stacktrace,
            // Local variables can hold anything (request bodies, tokens): never send them.
            frames: exception.stacktrace.frames.map(({ vars: _vars, ...frame }) => frame),
          },
        }),
      })),
    }
  }
  if (scrubbed.tags) {
    scrubbed.tags = Object.fromEntries(
      Object.entries(scrubbed.tags).map(([name, value]) => [name, typeof value === 'string' ? text(value) : value]),
    ) as T['tags']
  }
  if (scrubbed.extra) scrubbed.extra = scrubValue(scrubbed.extra, secrets) as T['extra']
  if (scrubbed.contexts) {
    const { trace, ...others } = scrubbed.contexts
    scrubbed.contexts = {
      ...(scrubValue(others, secrets) as T['contexts']),
      ...(trace && { trace: { ...trace, data: scrubSpanData(trace.data as Record<string, unknown> | undefined, secrets) } }),
    } as T['contexts']
  }
  if (scrubbed.breadcrumbs) scrubbed.breadcrumbs = scrubbed.breadcrumbs.map((crumb) => scrubBreadcrumb(crumb, secrets))
  if (scrubbed.spans) scrubbed.spans = scrubbed.spans.map((span) => scrubSpan(span, secrets))

  return scrubbed
}

/**
 * Errors the SDK captures itself (Next route handlers and server components through the build plugin's wrappers,
 * uncaught exceptions) carry no `source` tag; derive one from the capture mechanism so every event is searchable.
 */
export const withSource = (event: ErrorEvent): ErrorEvent => {
  if (event.tags?.source) return event
  const mechanism = event.exception?.values?.find((value) => value.mechanism?.type)?.mechanism?.type ?? ''
  const source = mechanism.endsWith('nextjs.route_handler')
    ? 'next-route'
    : mechanism.endsWith('nextjs.server_component')
      ? 'next-render'
      : mechanism.startsWith('auto.function.nextjs')
        ? 'next'
        : /^auto\.node\.on(uncaughtexception|unhandledrejection)$/.test(mechanism)
          ? 'process'
          : undefined
  return source ? { ...event, tags: { ...event.tags, source } } : event
}

/**
 * Share of requests traced: `SENTRY_TRACES_SAMPLE_RATE` (0 to 1) when it is a valid number, otherwise 0.1 in
 * production and 1 everywhere else.
 */
export const tracesSampleRate = (env: Env): number => {
  const raw = env.SENTRY_TRACES_SAMPLE_RATE?.trim()
  const rate = raw ? Number(raw) : Number.NaN
  if (Number.isFinite(rate) && rate >= 0 && rate <= 1) return rate
  return env.NODE_ENV === 'production' ? 0.1 : 1
}

/**
 * What the SDK may collect by itself. Sentry 11 replaced `sendDefaultPii` with `dataCollection`, whose defaults
 * collect EVERYTHING (user, cookies, all headers, request and response bodies, query strings, database query data,
 * local variables), so every category is switched off here; `scrubEvent` is the second line of defence.
 */
export const DATA_COLLECTION: NonNullable<NodeOptions['dataCollection']> = {
  userInfo: false,
  cookies: false,
  httpHeaders: { request: { allow: ALLOWED_HEADERS }, response: false },
  httpBodies: [],
  urlQueryParams: false,
  graphQL: { document: false, variables: false },
  genAI: { inputs: false, outputs: false },
  mcp: { inputs: false, outputs: false },
  databaseQueryData: false,
  queues: false,
  stackFrameVariables: false,
}

/**
 * The Sentry options, or `null` without `SENTRY_DSN`: then Sentry is not initialised and `captureError` only logs.
 * Tracing on (`tracesSampleRate`), sent as whole transactions (`traceLifecycle: 'static'`) so that
 * `beforeSendTransaction` sees and scrubs every span; no trace headers on outgoing requests (S3 and other services
 * are untouched); no replay, logs or feedback; no data collected by the SDK itself (`DATA_COLLECTION`, the Sentry 11
 * form of `sendDefaultPii: false`). The secrets to mask are read from the environment once, here.
 */
export const buildSentryOptions = (env: Env): NodeOptions | null => {
  const dsn = env.SENTRY_DSN?.trim()
  if (!dsn) return null
  const secrets = secretValues(env)
  return {
    dsn,
    environment: env.SENTRY_ENVIRONMENT || env.RAILWAY_ENVIRONMENT_NAME || env.NODE_ENV || 'production',
    release: env.RAILWAY_GIT_COMMIT_SHA || undefined,
    dataCollection: DATA_COLLECTION,
    includeLocalVariables: false,
    tracesSampleRate: tracesSampleRate(env),
    traceLifecycle: 'static',
    tracePropagationTargets: [],
    beforeSend: (event) => scrubEvent(withSource(event), secrets),
    beforeSendTransaction: (event) => scrubEvent(event, secrets),
    beforeBreadcrumb: (breadcrumb) => scrubBreadcrumb(breadcrumb, secrets),
    // Sentry logs stay off: nothing calls Sentry.logger, and any log an integration might create is dropped.
    beforeSendLog: () => null,
  }
}
