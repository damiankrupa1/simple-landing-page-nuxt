/**
 * @fileoverview Who may create a form submission.
 *
 * Sign-ups are not e-mail verified, so a public create would allow unlimited fake sign-ups (and, with the
 * newsletter discount, code farming). Creation is therefore limited to the storefront's server (header
 * `x-newsletter-token` equal to NEWSLETTER_SUBMIT_TOKEN, which is where its rate limit and honeypot live) and to
 * staff. The local API (seed scripts, hooks) is not affected: it overrides access.
 */
import type { Access } from 'payload'

import { userAtLeast } from './roles.ts'
import { secretMatches } from './sharedSecret.ts'

export const NEWSLETTER_TOKEN_HEADER = 'x-newsletter-token'

export const canCreateSubmission: Access = ({ req }) =>
  userAtLeast(req.user, 'editor') ||
  secretMatches(req.headers?.get(NEWSLETTER_TOKEN_HEADER), process.env.NEWSLETTER_SUBMIT_TOKEN)
