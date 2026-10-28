---
name: payload-medusa-integration
description: Contract between this Payload CMS and the Medusa admin (repo medusaDemo) - single sign-on endpoint, iframe embedding, cookies, shared S3 bucket. Use when touching src/endpoints/medusaSso.ts, src/middleware.ts, Users auth cookies, S3 settings, or when debugging the embedded CMS page.
---

# Payload <-> Medusa integration

Medusa admin (`medusaDemo`, `apps/backend`) embeds this Payload admin in an iframe on its `/app/cms` page. Only the Payload side lives here; Medusa owns the token minting (`GET /admin/payload-sso` -> `{ url }`, `src/utils/payload-sso.ts`, env `PAYLOAD_PUBLIC_URL`, `PAYLOAD_SSO_SECRET`).

## SSO contract (do not change one side alone)

- Endpoint: `GET /api/users/sso/medusa?token=<jwt>` (`src/endpoints/medusaSso.ts`, registered on the `users` collection).
- Token: HS256 signed with the shared secret (`MEDUSA_SSO_SECRET` here = `PAYLOAD_SSO_SECRET` in Medusa), `iss: medusa-admin`, `aud: payload`, claims `exp`, `iat` and `email`; lifetime at most 120 s.
- Result: 302 to `/admin` with the Payload auth cookie. Unknown emails are created with `ssoManaged: true` and a random password; existing accounts are signed in without changing their password.
- Errors: 503 secret not configured, 400 token missing, 401 invalid/expired/too long. Every failure is explicit; never fall back to an unauthenticated session.
- Minting a test token (run inside `payload-cms/`, where `jose` is installed; secret from the environment, not from files you print):

  ```bash
  node -e "import('jose').then(async({SignJWT})=>{const k=new TextEncoder().encode(process.env.MEDUSA_SSO_SECRET);console.log(await new SignJWT({email:'dev@example.com'}).setProtectedHeader({alg:'HS256'}).setIssuer('medusa-admin').setAudience('payload').setIssuedAt().setExpirationTime('60s').sign(k))})"
  ```

## Iframe embedding

- `src/middleware.ts` sends `Content-Security-Policy: frame-ancestors 'self' <origin of MEDUSA_ADMIN_URL>`; do not widen it to `*`.
- Cookies (`src/collections/Users.ts`): `PAYLOAD_COOKIE_SAMESITE=None` (implies `Secure`) is required while Payload and Medusa are on different registrable domains, which is the case for two `*.up.railway.app` hosts. The real fix is sibling subdomains of one domain plus `PAYLOAD_COOKIE_DOMAIN`, where `Lax` works. It is a workaround: browsers that block third-party cookies can still break it.
- `PAYLOAD_PUBLIC_SERVER_URL` must equal Payload's public origin or the CSRF allowlist rejects cookie-authenticated browser requests.
- Known gap: when the Payload session expires inside the iframe the Payload login screen shows instead of refreshing SSO from Medusa (tracked in `damiankrupa1/medusaDemo` issue #19).

## Shared S3 bucket

Medusa (`@medusajs/file-s3`) and Payload can use one bucket with the same `S3_*` variables. Medusa writes `name-<ULID>.ext` at the bucket root with no prefix; keep Payload on `S3_PREFIX=payload`. Do not change the prefix once files exist (stored `url`s point at the old location), and do not add a prefix to Medusa. `S3_FILE_URL` is the public URL of the bucket and is the same for both; for Railway Buckets use `S3_REGION=auto`.

## Changing the contract

Update both repos and this skill together; verify with a minted token against a local Payload (`run-locally`) and, after deploy, with the real Medusa page. Report what was and was not tested on the deployed pair.
