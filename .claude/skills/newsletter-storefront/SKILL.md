---
name: newsletter-storefront
description: How the nuxtMedusa storefront's newsletter box should submit to Payload (form-builder "Newsletter" form) - contract, the storefront-side changes that live outside this repo, and what Payload does not validate. Use when wiring or debugging newsletter sign-ups, or when changing the Newsletter form in Payload.
---

# Newsletter sign-ups: storefront -> Payload

Sign-ups are stored in Payload (form-builder `forms` + `form-submissions`), not in Medusa. Medusa has no newsletter module and takes no part in this flow. The storefront box (`app/components/app/newsletter.vue` in `nuxtMedusa`) has an `onSubmit` stub that sends nothing yet; wiring it is a storefront change and is **not done from this repo**, so record the work here and hand it over.

## What Payload provides

`pnpm seed:home` (see `seed-home-content`) creates the form titled **Newsletter** in `en` and `pl`:

| Field `name` | Type | Required | Meaning |
|---|---|---|---|
| `email` | email | yes | address |
| `interestWomen` | checkbox | no | womenswear |
| `interestMen` | checkbox | no | menswear |
| `consent` | checkbox | yes | accepts the privacy policy / newsletter |

Plus `submitButtonLabel` and a rich-text `confirmationMessage`. The storefront already has its own i18n texts, so it only needs the form's `id` and the field names above.

## Contract (verified locally against Payload 3.92)

- Find the form (anonymous read works): `GET /api/forms?where[title][equals]=Newsletter&depth=0` -> `docs[0].id`. Resolve it at runtime and cache it; the id differs per environment.
- Submit: `POST /api/form-submissions` with `Content-Type: application/json` and
  `{ "form": <id>, "submissionData": [{ "field": "email", "value": "a@b.pl" }, { "field": "consent", "value": "true" }] }`.
  Values are strings; send checkboxes as `"true"`/`"false"`. Success is `201`.
- Reading submissions is admin-only (`403` anonymously). Do not expose them to the storefront.
- Invalid submissions are rejected with `400` and a list of problems (`errors[0].data.errors[].message`), see "Validation" below.
- Browser calls need the storefront origin in Payload's `cors`: set `FRONTEND_URL=https://fashion-nuxt.vercel.app` on the Payload service. A server-side call from Nuxt needs no CORS.

## Storefront changes to make (in `nuxtMedusa`, by its owner)

1. Add a Nuxt server route (for example `server/api/newsletter.post.ts`) that validates the body with the same zod schema as `app/types/newsletter.ts`, looks up the form id, and forwards to `POST {NUXT_PUBLIC_PAYLOAD_URL}/api/form-submissions`. Prefer this over calling Payload from the browser: it hides the form id, avoids CORS, and is the place for rate limiting and a honeypot.
2. Replace the `onSubmit` stub in `newsletter.vue` with a call to that route; show `app.newsletter.success` on success and an error state otherwise.
3. Keep `consent` mandatory and send it explicitly.

## Validation (Payload side)

`src/hooks/validateFormSubmission.ts` runs as a `beforeValidate` hook on `form-submissions` (wired in `payload.config.ts`) for every form-builder form; the rules are in `validateFormSubmission.utils.ts` and covered by `pnpm test`. Review and change them with the `payload-submission-validation` skill. A submission is rejected with `400` (each error has a `path`) when:

- `submissionData` is not a list, has more than 50 entries, or an entry is not an object with a non-empty string `field`;
- a field is unknown, sent twice, or its form type is not supported (anything other than text, textarea, country, state, email, number, checkbox, select);
- a value has the wrong type or is longer than 5000 characters (text only: no objects, no numbers where text is expected);
- an e-mail is malformed or over 254 characters, a number is not numeric, a checkbox is not `true`/`false` (booleans are accepted), a select value is not one of its options;
- a required field is missing or blank, or a required checkbox is not `true`.

Accepted submissions are normalised: e-mails are trimmed, checkboxes and numbers become text, blank optional values are dropped (the plugin itself rejects blank values), text is stored as sent. Properties of an entry other than `field`/`value` (such as `id`) are kept. A missing or non-existent `form` is left to the plugin's own validation; any other failure while reading the form is rethrown, so a database problem cannot skip validation. Payload itself removes `null` array entries and turns `{ "id": 1 }` into `1` before the hook runs.

The storefront should still validate first for good error messages and to avoid pointless requests.

## What Payload does NOT do (known gaps)

- **No duplicate handling** and no double opt-in. The same address can be stored repeatedly; there is no confirmation e-mail.
- **No delivery.** Payload collects sign-ups; sending newsletters needs a mailing tool (for example Brevo, MailerLite, Mailchimp) fed by an `afterChange` hook or an export.
- **No spam protection** on the public create endpoint (rate limit, honeypot, captcha).
- **GDPR:** the stored `consent` is a plain `"true"` with the submission's `createdAt`; it does not record which consent text was shown. Decide retention and deletion on request.

## Verify

1. `GET /api/forms?where[title][equals]=Newsletter&locale=pl&depth=0` returns the four fields.
2. A valid `POST` returns `201` and the row shows in the admin under Form Submissions.
3. A read of `/api/form-submissions` without a session returns `403`.
4. From the deployed storefront, the sign-up appears in Payload (not only in the browser network tab).
