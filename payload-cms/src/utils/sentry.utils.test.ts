import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import type { Breadcrumb, ErrorEvent } from '@sentry/nextjs'

import {
  SENTRY_FILTERED,
  buildSentryOptions,
  isExpectedError,
  scrubBreadcrumb,
  scrubEvent,
  scrubString,
  scrubUrl,
  secretValues,
  toSentryContext,
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

  it('sends no PII, no traces, and scrubs with the secrets from the environment', () => {
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
    assert.equal(options.tracesSampleRate, 0)
    assert.deepEqual(options.tracePropagationTargets, [])
    assert.equal(options.enableOpenTelemetrySetup, false)
    assert.equal(options.environment, 'staging')
    assert.equal(options.release, 'abc123')
    const sent = options.beforeSend?.({ message: `boom ${PAYLOAD_SECRET}` } as ErrorEvent, {}) as ErrorEvent
    assert.equal(sent.message, `boom ${SENTRY_FILTERED}`)
  })

  it('falls back to the Railway environment name, then NODE_ENV', () => {
    assert.equal(buildSentryOptions({ SENTRY_DSN: 'https://k@h/1', RAILWAY_ENVIRONMENT_NAME: 'production' })?.environment, 'production')
    assert.equal(buildSentryOptions({ SENTRY_DSN: 'https://k@h/1', NODE_ENV: 'development' })?.environment, 'development')
    assert.equal(buildSentryOptions({ SENTRY_DSN: 'https://k@h/1' })?.release, undefined)
  })
})
