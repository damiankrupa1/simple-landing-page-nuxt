---
name: newsletter-storefront
description: How the nuxtMedusa storefront's newsletter box submits to Payload (form-builder "Newsletter" form) - contract (token header, locale, duplicate handling, discount code, validate/redeem endpoints), GDPR notes, the storefront-side changes that live outside this repo, and what Payload does and does not do. Use when wiring or debugging newsletter sign-ups, or when changing the Newsletter form in Payload.
---

# Newsletter sign-ups: storefront -> Payload

Sign-ups are stored in Payload (form-builder `forms` + `form-submissions`), not in Medusa and **not sent to any mailing tool**: this repo has no integration with Brevo, MailerLite, Mailchimp or anything else and makes no outbound calls. The storefront box (`app/components/app/newsletter.vue` in `nuxtMedusa`) has an `onSubmit` stub that sends nothing yet; wiring it is a storefront change and is **not done from this repo**, so the work is listed in "Handover" below.

Consequences of "database only":

- Addresses are **not verified** (no confirmation e-mail, no double opt-in). Anyone can sign up anyone else's address.
- **Nothing can be sent from this repo.** Sending a newsletter later means exporting from the admin or adding an integration (a new issue).
- Because addresses are unverified, creating a submission is **closed to the public** (see "Contract"); deploying this needs `NEWSLETTER_SUBMIT_TOKEN` on Payload and the same value in the storefront proxy.

## What Payload provides

`pnpm seed:home` (see `seed-home-content`) creates the form titled **Newsletter** in `en` and `pl`:

| Field `name` | Type | Required | Meaning |
|---|---|---|---|
| `email` | email | yes | address |
| `interestWomen` | checkbox | no | womenswear |
| `interestMen` | checkbox | no | menswear |
| `consent` | checkbox | yes | accepts the privacy policy / newsletter (its label is the consent wording, and it also says the discount cannot be combined with other promotions) |

Plus `submitButtonLabel` and a rich-text `confirmationMessage`. The storefront already has its own i18n texts, so it only needs the form's `id` and the field names above.

Every submission also stores, set **by the server only** (a value sent by the client is discarded):

| Field | Meaning |
|---|---|
| `email` | the e-mail, trimmed and lowercased; unique per form |
| `consentText` | the label of the `consent` checkbox in the request locale (what the visitor saw) |
| `consentHash` | SHA-256 of `consentText` (same hash = same wording) |
| `consentLocale` | the request locale |
| `createdAt` | the consent date (no separate field; no IP address is stored on purpose) |
| `discountCode`, `discountPercent`, `discountExpiresAt`, `discountRedeemedAt` | the discount code, see "Discount code" |

## Contract (verified locally against Payload 3.92)

- Find the form (anonymous read works): `GET /api/forms?where[title][equals]=Newsletter&depth=0` -> `docs[0].id`. Resolve it at runtime and cache it; the id differs per environment.
- Submit: `POST /api/form-submissions?locale=<pl|en>&depth=0` with `Content-Type: application/json`, the header **`x-newsletter-token: <NEWSLETTER_SUBMIT_TOKEN>`** and
  `{ "form": <id>, "submissionData": [{ "field": "email", "value": "a@b.pl" }, { "field": "consent", "value": "true" }] }`.
  Values are strings; send checkboxes as `"true"`/`"false"`. Success is `201` with `{ doc, message }`.
  - **Without the header, or with a wrong value, the answer is `403`** (also when the variable is unset on Payload: it fails closed). Staff logged in with the `editor` or `admin` role may also create submissions (admin panel). The token is a server secret: only the storefront's server route may know it, never the browser.
  - **`?locale=` matters**: it picks the language of the consent wording stored with the sign-up. Without it the wording is stored in `en`. Send the language the visitor is looking at.
  - `depth=0` keeps the response small (otherwise the whole form is embedded).
- Reading submissions is staff only (`403` anonymously, also for viewers). Do not expose them to the storefront.
- Invalid submissions are rejected with `400` and a list of problems (`errors[0].data.errors[].message` and `.path`), see "Validation" below.
- **Duplicate e-mail** (same address, any letter case, on the same form): `400` with an error whose `path` is `email` and message `This e-mail address is already signed up.`. When two identical requests race, the loser gets the database error instead: `path` `form_id, email`, message `Value must be unique`. **The proxy should treat both as success** (show the success message, do not show a code, do not say the address is already known), so the form does not reveal who is subscribed. Match on `path` containing `email`.
- Browser calls would need the storefront origin in Payload's `cors` (`FRONTEND_URL`) and would expose the token; do not call Payload from the browser. A server-side call from Nuxt needs no CORS.

## Discount code

The seeded copy promises 10% off. For every sign-up on a **newsletter form** Payload generates a random code (`XXXX-XXXX-XXXX`, 12 characters from an unambiguous alphabet, about 59 bits, not guessable), unique and single use:

- A form counts as a newsletter form when it has an `email` field and a **required** `consent` checkbox (the form title is localised, so it is not used). A form without them gets no code.
- Percent: `NEWSLETTER_DISCOUNT_PERCENT` (default 10; `0` turns the feature off). Validity: `NEWSLETTER_DISCOUNT_DAYS` (default 30). Both are read when the code is issued, so changing them does not alter existing codes. **If you change the percent, change the storefront copy ("Get 10% off") too: the text is not generated from the variable.**
- **The code is in the `201` response only** (`doc.discountCode`, `doc.discountPercent`, `doc.discountExpiresAt`): the collection's read access is staff only, so nobody else can read it afterwards (staff can see it in the admin). The storefront must show it right away. A duplicate sign-up gets no code (`400`).
- Payload never calls the shop. The shop asks Payload, server to server, with `Authorization: Bearer <NEWSLETTER_DISCOUNT_SECRET>` (no secret configured on Payload -> `503`, wrong or missing bearer -> `401`):
  - `POST /api/newsletter-discount/validate` `{ "code": "abcd-efgh-jkmn" }` (case, spaces and dashes are forgiven) -> `200 { "valid": true, "percent": 10, "expiresAt": "..." }` or `200 { "valid": false, "reason": "unknown" | "redeemed" | "expired" }`. Changes nothing; use it to show the discount in the cart. `400` for a malformed code.
  - `POST /api/newsletter-discount/redeem` `{ "code": "..." }` -> `200 { "redeemed": true, "percent": 10 }`, or `404 { "redeemed": false, "reason": "unknown" }`, or `409 { "redeemed": false, "reason": "redeemed" | "expired" }`. The redemption is a single conditional `UPDATE`, so of parallel calls exactly one wins (checked with 20 parallel requests: one `200`, nineteen `409`). Redeem when the order is placed, not when the code is typed in.
  - Neither endpoint returns the e-mail address.
- Limits: a code is tied to an unverified address, so the real protection against farming codes is the closed `create` plus the proxy's rate limit and honeypot. Redemption is not tied to a customer or an order; the shop decides whether a code may be combined with other promotions (the consent wording says it cannot).

## Handover: what the storefront owner (`nuxtMedusa`) must do

Not done from this repo. Checklist:

1. Server route (for example `server/api/newsletter.post.ts`): validate with the same zod schema as `app/types/newsletter.ts`, resolve and cache the form id, forward to `POST {NUXT_PUBLIC_PAYLOAD_URL}/api/form-submissions?locale=<current>&depth=0` with `x-newsletter-token`. Keep the token in a private runtime variable (never `NUXT_PUBLIC_*`).
2. Honeypot (a hidden field that humans leave empty; a filled one gets a fake success) and a **rate limit per IP** on that route. Payload has neither, and this route is now the only way in.
3. Treat the duplicate error (`path` containing `email`) as success, without a code.
4. Replace the `onSubmit` stub in `newsletter.vue`: show `app.newsletter.success` and **the discount code** from the `201` response; an error state otherwise. Keep `consent` mandatory and send it explicitly.
5. Checkout: call `validate` while the cart shows the discount and `redeem` when the order is placed, with `NEWSLETTER_DISCOUNT_SECRET` in the server environment only. Apply the percent returned by Payload, not a constant.
6. Environment: `NEWSLETTER_SUBMIT_TOKEN` (also on Payload), `NEWSLETTER_DISCOUNT_SECRET` (also on Payload); `NUXT_PUBLIC_PAYLOAD_URL` already exists.

## Privacy, retention and deletion (legal ASSUMPTION, not legal advice)

What is stored: the e-mail, the interests, the consent wording and its hash, the language, the time (`createdAt`) and the discount code. No IP address. Not sent to any third party.

- **Retention (assumption, to be confirmed by whoever is responsible for data protection):** the sign-up is kept as proof of consent for up to **3 years**, or until the person asks for deletion, whichever comes first. Nothing deletes old rows automatically yet; do it by hand (or with a follow-up job) when a row is older than that.
- **Deletion on request:** find the submission in the admin (Form Submissions, filter by the Email column; admin role) and delete it. That removes the address, the consent proof and the code in one go, and there is no copy in another system. Rows from before the `email` column existed have no `email` value: look for the address inside "Submission Data".
- **Unverified addresses:** someone can sign up another person. With no mail sent from here, the harm is limited to storage; revisit it before any sending is added (double opt-in is then needed).

## Validation (Payload side)

`src/hooks/validateFormSubmission.ts` runs as a `beforeValidate` hook on `form-submissions` (wired in `payload.config.ts`) for every form-builder form; the rules are in `validateFormSubmission.utils.ts` and covered by `pnpm test`. To change a rule, edit that file and its tests. A submission is rejected with `400` (each error has a `path`) when:

- `submissionData` is not a list, has more than 50 entries, or an entry is not an object with a non-empty string `field`;
- a field is unknown, sent twice, or its form type is not supported (anything other than text, textarea, country, state, email, number, checkbox, select);
- a value has the wrong type or is longer than 5000 characters (text only: no objects, no numbers where text is expected);
- an e-mail is malformed or over 254 characters, a number is not numeric, a checkbox is not `true`/`false` (booleans are accepted), a select value is not one of its options;
- a required field is missing or blank, or a required checkbox is not `true`.

Accepted submissions are normalised: e-mails are trimmed, checkboxes and numbers become text, blank optional values are dropped (the plugin itself rejects blank values), text is stored as sent. Properties of an entry other than `field`/`value` (such as `id`) are kept. A missing or non-existent `form` is left to the plugin's own validation; any other failure while reading the form is rethrown, so a database problem cannot skip validation. Payload itself removes `null` array entries and turns `{ "id": 1 }` into `1` before the hook runs.

Then `beforeChange` hooks run in this order: `stampSubmission` (e-mail key, consent snapshot, duplicate check), `issueDiscount` (code). The storefront should still validate first for good error messages and to avoid pointless requests.

## Known gaps

- Older submissions (from before this change) have no `email` and are **not deduplicated**: the unique index ignores empty values on purpose, so the migration cannot fail on duplicates already in the database.
- No e-mail verification, no delivery, no automatic retention clean-up (see above).
- No rate limit or honeypot in Payload (it has no such option); they live in the storefront route.

## Verify

1. `GET /api/forms?where[title][equals]=Newsletter&locale=pl&depth=0` returns the four fields.
2. `POST /api/form-submissions` without the token header returns `403`; with `x-newsletter-token` and valid data it returns `201` and the response holds `discountCode`.
3. The same e-mail again returns `400` with `path: "email"`.
4. A read of `/api/form-submissions` without a session returns `403`; staff with `editor`/`admin` see `email`, `consentText`, `consentHash`, `consentLocale` on the row.
5. `validate` and `redeem` with the bearer secret: valid, then `redeem` twice (`200`, then `409`), a wrong bearer (`401`).
6. From the deployed storefront, the sign-up appears in Payload (not only in the browser network tab).
