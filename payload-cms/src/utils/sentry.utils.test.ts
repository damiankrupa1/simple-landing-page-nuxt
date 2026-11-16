import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import type { Breadcrumb, ErrorEvent } from '@sentry/nextjs'

import {
  SENTRY_FILTERED,
  buildSentryOptions,
  isExpectedError,
  scrubBreadcrumb,
  scrubEvent,
  scrubSpan,
  scrubSpanData,
  scrubSql,
  scrubString,
  scrubText,
  scrubUrl,
  secretValues,
  toSentryContext,
  tracesSampleRate,
  withSource,
} from './sentry.utils.ts'

const SSO_JWT =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyXzEiLCJlbWFpbCI6ImFAYi5wbCJ9.c2lnbmF0dXJlLXNpZ25hdHVyZQ'
const NEWSLETTER_TOKEN = 'nl-token-0123456789abcdef'
const PAYLOAD_SECRET = 'payload-secret-value-42'
const EMAIL = 'jan.kowalski+news@example.pl'
const CODE = 'ABCD-EFGH-JK23'

const leaks = (value: unknown, ...needles: string[]) => {
  const json = JSON.stringify(value)
  return needles.filter((needle) => json.toLowerCase().includes(needle.toLowerCase()))
}

describe('isExpectedError', () => {
  it('treats 4xx from validation, SSO and duplicates as expected', () => {
    for (const status of [400, 401, 403, 404, 409]) assert.equal(isExpectedError({ status }), true, String(status))
    assert.equal(isExpectedError({ statusCode: 401 }), true)
    assert.equal(isExpectedError({ response: { status: 409 } }), true)
  })

  it('treats 5xx, 408, 429 and plain errors as unexpected', () => {
    for (const status of [408, 429, 500, 503]) assert.equal(isExpectedError({ status }), false, String(status))
    assert.equal(isExpectedError(new Error('boom')), false)
    assert.equal(isExpectedError('boom'), false)
    assert.equal(isExpectedError(null), false)
  })
})

describe('toSentryContext', () => {
  it('turns known keys into tags and keeps the rest as extra', () => {
    const { tags, extra } = toSentryContext({ source: 'sso', status: 503, method: 'GET', jti: 'x', skip: undefined })
    assert.deepEqual(tags, { source: 'sso', http_status: '503', http_method: 'GET' })
    assert.deepEqual(extra, { jti: 'x' })
  })

  it('does not turn objects into tags', () => {
    const { tags, extra } = toSentryContext({ source: { nested: true } })
    assert.deepEqual(tags, {})
    assert.deepEqual(extra, { source: { nested: true } })
  })
})

describe('secretValues', () => {
  it('collects secret-looking variables and skips short or public ones', () => {
    const values = secretValues({
      PAYLOAD_SECRET,
      NEWSLETTER_SUBMIT_TOKEN: NEWSLETTER_TOKEN,
      DATABASE_URL: 'postgresql://postgres:local@localhost:5435/payload',
      S3_ACCESS_KEY_ID: 'AKIAEXAMPLEKEY',
      NEWSLETTER_DISCOUNT_PERCENT: '10',
      PAYLOAD_PUBLIC_SERVER_URL: 'https://cms.example.com',
      PREVIEW_SECRET: 'short',
      __NEXT_PRIVATE_ORIGIN: 'http://127.0.0.1:3013',
    })
    assert.ok(values.includes(PAYLOAD_SECRET))
    assert.ok(values.includes(NEWSLETTER_TOKEN))
    assert.ok(values.includes('AKIAEXAMPLEKEY'))
    assert.ok(values.includes('postgresql://postgres:local@localhost:5435/payload'))
    assert.ok(!values.includes('10'))
    assert.ok(!values.includes('https://cms.example.com'))
    assert.ok(!values.includes('short'))
    assert.ok(!values.includes('http://127.0.0.1:3013'))
  })
})

describe('scrubString', () => {
  it('masks e-mails, JWTs, bearer and API keys, discount codes and env secrets', () => {
    const text = scrubString(
      `user ${EMAIL} token ${SSO_JWT} Bearer abc.def-123 users API-Key k3y-value code ${CODE.toLowerCase()} secret ${PAYLOAD_SECRET}`,
      [PAYLOAD_SECRET],
    )
    assert.deepEqual(leaks(text, EMAIL, SSO_JWT, 'abc.def-123', 'k3y-value', CODE, PAYLOAD_SECRET), [])
    assert.match(text, /\[email\]/)
    assert.match(text, /\[discount-code\]/)
    assert.match(text, /\[Filtered\]/)
  })

  it('masks credentials in connection strings and sensitive query or cookie values', () => {
    const text = scrubString(
      'connect postgres://postgres:hunter2@db:5432/payload failed; /api/users/sso/medusa?token=abc&x=1; payload-token=zzz; email=a',
    )
    assert.deepEqual(leaks(text, 'hunter2', 'token=abc', 'payload-token=zzz', 'email=a'), [])
    assert.match(text, /postgres:\/\/\[credentials\]@db:5432/)
  })

  it('masks the parameters of a failed database query but keeps the SQL', () => {
    const text = scrubString('Failed query: insert into "users" ("email", "hash", "salt") values ($1, $2, $3)\nparams: x,9f8e7d6c5b4a,a1b2c3d4e5f6')
    assert.deepEqual(leaks(text, '9f8e7d6c5b4a', 'a1b2c3d4e5f6'), [])
    assert.match(text, /^Failed query: insert into "users"/)
    assert.match(text, /params: \[Filtered\]$/)
  })

  it('leaves ordinary text alone', () => {
    assert.equal(scrubString('Something went wrong in GET /admin/globals/navigation'), 'Something went wrong in GET /admin/globals/navigation')
  })
})

describe('scrubUrl', () => {
  it('drops the query string and the fragment (SSO token)', () => {
    assert.equal(scrubUrl(`https://cms.example.com/api/users/sso/medusa?token=${SSO_JWT}#x`), 'https://cms.example.com/api/users/sso/medusa')
  })
})

const event = (): ErrorEvent =>
  ({
    type: undefined,
    message: `failed for ${EMAIL}`,
    user: { id: '1', email: EMAIL, ip_address: '1.2.3.4' },
    request: {
      method: 'POST',
      url: `https://cms.example.com/api/users/sso/medusa?token=${SSO_JWT}`,
      query_string: `token=${SSO_JWT}`,
      data: { submissionData: [{ field: 'email', value: EMAIL }], discountCode: CODE },
      cookies: { 'payload-token': 'session-jwt' },
      env: { PAYLOAD_SECRET },
      headers: {
        'User-Agent': 'node',
        Cookie: 'payload-token=session-jwt',
        Authorization: 'Bearer revoke-jwt-value',
        'x-newsletter-token': NEWSLETTER_TOKEN,
        'x-api-key': 'api-key-value',
      },
    },
    exception: {
      values: [
        {
          type: 'Error',
          value: `duplicate key (form_id, email)=(1, ${EMAIL}) code ${CODE} secret ${PAYLOAD_SECRET}`,
          stacktrace: { frames: [{ filename: 'a.js', vars: { token: SSO_JWT, body: EMAIL } }] },
        },
      ],
    },
    tags: { source: 'newsletter', note: `for ${EMAIL}` },
    extra: { email: EMAIL, discountCode: CODE, nested: { deep: { apiKey: 'api-key-value', text: `x ${EMAIL}` } } },
    contexts: { response: { headers: { 'set-cookie': 'payload-token=session-jwt' } } },
    breadcrumbs: [
      { category: 'http', data: { url: `https://cms.example.com/api/users/sso/medusa?token=${SSO_JWT}`, method: 'GET' } },
      { category: 'console', message: `signed up ${EMAIL} with ${CODE}` },
    ],
  }) as unknown as ErrorEvent

describe('scrubEvent', () => {
  const scrubbed = scrubEvent(event(), [PAYLOAD_SECRET, NEWSLETTER_TOKEN])

  it('leaks no token, e-mail, discount code, cookie, header secret or env value', () => {
    assert.deepEqual(
      leaks(scrubbed, SSO_JWT, NEWSLETTER_TOKEN, EMAIL, CODE, PAYLOAD_SECRET, 'session-jwt', 'revoke-jwt-value', 'api-key-value'),
      [],
    )
  })

  it('drops the user, body, cookies, query string and env, and keeps only harmless headers', () => {
    assert.equal(scrubbed.user, undefined)
    assert.deepEqual(scrubbed.request, {
      method: 'POST',
      url: 'https://cms.example.com/api/users/sso/medusa',
      headers: { 'User-Agent': 'node' },
    })
  })

  it('removes local variables from stack frames', () => {
    assert.deepEqual(scrubbed.exception?.values?.[0].stacktrace?.frames, [{ filename: 'a.js' }])
  })

  it('filters sensitive keys in extra data', () => {
    assert.equal(scrubbed.extra?.email, SENTRY_FILTERED)
    assert.equal(scrubbed.extra?.discountCode, SENTRY_FILTERED)
    assert.deepEqual(scrubbed.extra?.nested, { deep: { apiKey: SENTRY_FILTERED, text: 'x [email]' } })
    assert.equal(scrubbed.tags?.source, 'newsletter')
  })

  it('does not modify the original event', () => {
    const original = event()
    scrubEvent(original)
    assert.equal(original.user?.email, EMAIL)
  })
})

describe('scrubBreadcrumb', () => {
  it('drops the query of an http breadcrumb and masks its message', () => {
    const crumb = scrubBreadcrumb(
      { category: 'http', message: `GET ?token=${SSO_JWT}`, data: { url: `https://x.test/a?token=${SSO_JWT}` } } as Breadcrumb,
    )
    assert.deepEqual(leaks(crumb, SSO_JWT), [])
    assert.equal(crumb.data?.url, 'https://x.test/a')
  })
})

describe('buildSentryOptions', () => {
  it('returns null without a DSN, so Sentry is not initialised', () => {
    assert.equal(buildSentryOptions({}), null)
    assert.equal(buildSentryOptions({ SENTRY_DSN: '  ' }), null)
  })

  it('sends no PII, traces whole transactions, and scrubs with the secrets from the environment', () => {
    const options = buildSentryOptions({
      SENTRY_DSN: 'https://key@o1.ingest.sentry.io/1',
      SENTRY_ENVIRONMENT: 'staging',
      RAILWAY_GIT_COMMIT_SHA: 'abc123',
      PAYLOAD_SECRET,
    })
    assert.ok(options)
    // Sentry 11 collects everything by default: every category must be switched off explicitly.
    assert.deepEqual(options.dataCollection, {
      userInfo: false,
      cookies: false,
      httpHeaders: { request: { allow: ['user-agent', 'accept', 'accept-language', 'content-type', 'host'] }, response: false },
      httpBodies: [],
      urlQueryParams: false,
      graphQL: { document: false, variables: false },
      genAI: { inputs: false, outputs: false },
      mcp: { inputs: false, outputs: false },
      databaseQueryData: false,
      queues: false,
      stackFrameVariables: false,
    })
    assert.equal(options.includeLocalVariables, false)
    assert.equal(options.tracesSampleRate, 1)
    assert.equal(options.traceLifecycle, 'static')
    assert.deepEqual(options.tracePropagationTargets, [])
    assert.equal(options.enableOpenTelemetrySetup, undefined)
    assert.equal(options.beforeSendLog?.({ level: 'info', message: 'x' } as never), null)
    assert.equal(options.environment, 'staging')
    assert.equal(options.release, 'abc123')
    const sent = options.beforeSend?.({ message: `boom ${PAYLOAD_SECRET}` } as ErrorEvent, {}) as ErrorEvent
    assert.equal(sent.message, `boom ${SENTRY_FILTERED}`)
    const transaction = options.beforeSendTransaction?.(
      { type: 'transaction', transaction: `GET /api/users/sso/medusa?token=${SSO_JWT}`, spans: [] } as never,
      {},
    ) as { transaction: string }
    assert.equal(transaction.transaction, 'GET /api/users/sso/medusa')
  })

  it('falls back to the Railway environment name, then NODE_ENV', () => {
    assert.equal(buildSentryOptions({ SENTRY_DSN: 'https://k@h/1', RAILWAY_ENVIRONMENT_NAME: 'production' })?.environment, 'production')
    assert.equal(buildSentryOptions({ SENTRY_DSN: 'https://k@h/1', NODE_ENV: 'development' })?.environment, 'development')
    assert.equal(buildSentryOptions({ SENTRY_DSN: 'https://k@h/1' })?.release, undefined)
  })
})

describe('tracesSampleRate', () => {
  it('is 1 outside production and 0.1 in production', () => {
    assert.equal(tracesSampleRate({}), 1)
    assert.equal(tracesSampleRate({ NODE_ENV: 'development' }), 1)
    assert.equal(tracesSampleRate({ NODE_ENV: 'production' }), 0.1)
  })

  it('takes a valid SENTRY_TRACES_SAMPLE_RATE and ignores an invalid one', () => {
    assert.equal(tracesSampleRate({ NODE_ENV: 'production', SENTRY_TRACES_SAMPLE_RATE: '0.25' }), 0.25)
    assert.equal(tracesSampleRate({ NODE_ENV: 'production', SENTRY_TRACES_SAMPLE_RATE: '0' }), 0)
    assert.equal(tracesSampleRate({ NODE_ENV: 'production', SENTRY_TRACES_SAMPLE_RATE: '2' }), 0.1)
    assert.equal(tracesSampleRate({ NODE_ENV: 'production', SENTRY_TRACES_SAMPLE_RATE: 'all' }), 0.1)
    assert.equal(tracesSampleRate({ SENTRY_TRACES_SAMPLE_RATE: ' ' }), 1)
  })
})

describe('scrubText and scrubSql', () => {
  it('drops a query string inside a span name', () => {
    assert.equal(scrubText(`GET /api/users/sso/medusa?token=${SSO_JWT}`), 'GET /api/users/sso/medusa')
    assert.equal(scrubText(`GET /x?email=${EMAIL}&a=1 done`), 'GET /x done')
  })

  it('keeps the SQL shape and masks string literals', () => {
    assert.equal(
      scrubSql(`select * from "form_submissions" where "email" = '${EMAIL}' and "discount_code" = $1`),
      `select * from "form_submissions" where "email" = '?' and "discount_code" = $1`,
    )
  })
})

describe('scrubSpanData', () => {
  const data = {
    'http.method': 'GET',
    'url.full': `http://127.0.0.1:3013/api/users/sso/medusa?token=${SSO_JWT}`,
    'http.url': `http://127.0.0.1:3013/api/users/sso/medusa?token=${SSO_JWT}`,
    'http.target': `/api/users/sso/medusa?token=${SSO_JWT}`,
    'next.span_name': `GET /api/users/sso/medusa?token=${SSO_JWT}`,
    'url.query': `?token=${SSO_JWT}`,
    'http.query': `token=${SSO_JWT}`,
    'url.fragment': 'x',
    'http.request.header.user_agent': 'curl',
    'http.request.header.cookie': 'payload-token=session-jwt',
    'http.request.header.authorization': 'Bearer revoke-jwt-value',
    'http.request.header.x_newsletter_token': NEWSLETTER_TOKEN,
    'http.response.header.set_cookie': ['payload-token=session-jwt'],
    'db.statement': `insert into "form_submissions" ("email") values ('${EMAIL}')`,
    'db.query.text': `select 1 from "users" where "email" = '${EMAIL}'`,
    'db.postgresql.values': [EMAIL, CODE],
    'db.query.parameter.0': CODE,
    'db.connection_string': 'postgresql://postgres:hunter2@db:5432/payload',
    'http.status_code': 302,
    'sentry.op': 'http.server',
  }
  const scrubbed = scrubSpanData(data, [PAYLOAD_SECRET]) ?? {}

  it('leaks no token, header secret, e-mail, code or DB password', () => {
    assert.deepEqual(leaks(scrubbed, SSO_JWT, NEWSLETTER_TOKEN, EMAIL, CODE, 'session-jwt', 'revoke-jwt-value', 'hunter2', 'token='), [])
  })

  it('keeps the useful parts', () => {
    assert.equal(scrubbed['url.full'], 'http://127.0.0.1:3013/api/users/sso/medusa')
    assert.equal(scrubbed['http.target'], '/api/users/sso/medusa')
    assert.equal(scrubbed['next.span_name'], 'GET /api/users/sso/medusa')
    assert.equal(scrubbed['http.request.header.user_agent'], 'curl')
    assert.equal(scrubbed['db.statement'], `insert into "form_submissions" ("email") values ('?')`)
    assert.equal(scrubbed['db.connection_string'], 'postgresql://[credentials]@db:5432/payload')
    assert.equal(scrubbed['http.status_code'], 302)
    assert.equal(scrubbed['sentry.op'], 'http.server')
  })

  it('drops queries and bound values, and removes other headers with their names', () => {
    for (const key of ['url.query', 'http.query', 'url.fragment', 'db.postgresql.values', 'db.query.parameter.0']) {
      assert.equal(scrubbed[key], SENTRY_FILTERED, key)
    }
    for (const key of [
      'http.request.header.cookie',
      'http.request.header.authorization',
      'http.request.header.x_newsletter_token',
      'http.response.header.set_cookie',
    ]) {
      assert.ok(!(key in scrubbed), key)
    }
    assert.deepEqual(leaks(scrubbed, 'authorization', 'newsletter', 'cookie'), [])
  })
})

describe('scrubSpan and transactions', () => {
  it('scrubs an http span description and a db span description', () => {
    assert.equal(scrubSpan({ op: 'http.client', description: `GET https://s3.test/a?X-Amz-Signature=abc` }).description, 'GET https://s3.test/a')
    assert.equal(scrubSpan({ op: 'db', description: `select '${EMAIL}'` }).description, `select '?'`)
  })

  it('scrubs the name, the trace context and every span of a transaction', () => {
    const transaction = {
      type: 'transaction',
      transaction: `GET /api/users/sso/medusa?token=${SSO_JWT}`,
      request: { url: `http://x/api/users/sso/medusa?token=${SSO_JWT}`, headers: { cookie: 'payload-token=session-jwt' } },
      contexts: {
        trace: { trace_id: 't', span_id: 's', op: 'http.server', data: { 'http.target': `/api/users/sso/medusa?token=${SSO_JWT}` } },
        nextjs: { request_path: `/api/users/sso/medusa?token=${SSO_JWT}` },
      },
      spans: [
        { span_id: '1', op: 'db', description: `select '${EMAIL}'`, data: { 'db.postgresql.values': [CODE] } },
        { span_id: '2', op: 'http.client', description: 'GET http://x', data: { 'http.request.header.x_newsletter_token': NEWSLETTER_TOKEN } },
      ],
    }
    const scrubbed = scrubEvent(transaction as never, [PAYLOAD_SECRET])
    assert.deepEqual(leaks(scrubbed, SSO_JWT, NEWSLETTER_TOKEN, EMAIL, CODE, 'session-jwt', 'token='), [])
    assert.equal((scrubbed as { transaction: string }).transaction, 'GET /api/users/sso/medusa')
    assert.equal((scrubbed as { contexts: { trace: { trace_id: string } } }).contexts.trace.trace_id, 't')
  })
})

describe('withSource', () => {
  const event = (type: string, tags?: Record<string, string>) =>
    ({ tags, exception: { values: [{ type: 'Error', mechanism: { type, handled: false } }] } }) as unknown as ErrorEvent

  it('derives the source of events the SDK captured itself', () => {
    assert.equal(withSource(event('auto.function.nextjs.route_handler')).tags?.source, 'next-route')
    assert.equal(withSource(event('auto.function.nextjs.server_component')).tags?.source, 'next-render')
    assert.equal(withSource(event('auto.function.nextjs.on_request_error')).tags?.source, 'next')
    assert.equal(withSource(event('auto.node.onuncaughtexception')).tags?.source, 'process')
    assert.equal(withSource(event('generic')).tags?.source, undefined)
  })

  it('keeps the source set by captureError', () => {
    assert.equal(withSource(event('auto.function.nextjs.route_handler', { source: 'sso' })).tags?.source, 'sso')
  })
})
