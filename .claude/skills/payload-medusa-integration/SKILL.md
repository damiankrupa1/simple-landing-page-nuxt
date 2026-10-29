---
name: payload-medusa-integration
description: Contract between this Payload CMS and the Medusa admin (repo medusaDemo) - single sign-on endpoint, iframe embedding, cookies, shared S3 bucket. Use when touching src/endpoints/medusaSso.ts, src/middleware.ts, Users auth cookies, S3 settings, or when debugging the embedded CMS page.
---

# Payload <-> Medusa integration

Medusa admin (`medusaDemo`, `apps/backend`) embeds this Payload admin in an iframe on its `/app/cms` page. Only the Payload side lives here; Medusa owns the token minting (`GET /admin/payload-sso` -> `{ url }`, `src/utils/payload-sso.ts`, env `PAYLOAD_PUBLIC_URL`, `PAYLOAD_SSO_SECRET`).

## SSO contract (do not change one side alone)

- Endpoint: `GET /api/users/sso/medusa?token=<jwt>` (`src/endpoints/medusaSso.ts`, registered on the `users` collection).
- Token (contract v2): HS256 signed with the shared secret (`MEDUSA_SSO_SECRET` here = `PAYLOAD_SSO_SECRET` in Medusa), `iss: medusa-admin`, `aud: payload`, lifetime at most 120 s, claims `exp`, `iat`, `jti` (single use, recorded in the hidden `sso-token-uses` collection), `sub` (stable Medusa user id), `email`, `name` (optional), `role` (`none|viewer|editor|publisher|admin`; missing or unknown = `none`), `redirect` (optional path under `/admin`, anything else becomes `/admin`) and `lng` (optional `en|pl`, sets the `payload-lng` cookie).
- Accounts: matched by `medusaUserId` (= `sub`) first; an unlinked account with the same email is linked once and keeps working; an account linked to another id or an email owned by another account is a 409 (never merged, never taken over). Medusa owns identity: email, name and role are overwritten at every sign-in and read-only in Payload. Role `none` is a 403 that also stores `none` on the linked account and ends its sessions.
- Result: 302 to `redirect` with the Payload auth cookie. New accounts get `ssoManaged: true`, a random password and the token role.
- Errors: 503 secret not configured, 400 token missing, 401 invalid/expired/too long/already used/missing claims, 403 role none, 409 account conflict. Every failure is explicit; never fall back to an unauthenticated session.
- Session revocation (server to server): `POST /api/users/sso/revoke` with `Authorization: Bearer <jwt>`, HS256 with the same secret, `iss: medusa-admin`, `aud: payload-session`, claims `sub`, `jti` (single use), `action` (`logout` ends the sessions; `revoke` also sets the role to `none`), lifetime at most 120 s. 200 `{revoked: true|false}` (an unknown `sub` is `false`), 401 for a missing/invalid/replayed token, 503 when the secret is missing. Medusa calls it on logout, on session expiry and when a user is deleted, disabled or loses the role.
- Deploy order: Medusa v2 tokens are a superset of v1 (an old Payload ignores the extra claims), so deploy Medusa first. A v1 token (no `sub`/`jti`) is rejected by this Payload.
- Minting a test token (run inside `payload-cms/`, where `jose` is installed; secret from the environment, not from files you print):

  ```bash
  node -e "import('jose').then(async({SignJWT})=>{const k=new TextEncoder().encode(process.env.MEDUSA_SSO_SECRET);console.log(await new SignJWT({email:'dev@example.com',name:'Dev',role:'editor',lng:'en'}).setProtectedHeader({alg:'HS256'}).setIssuer('medusa-admin').setAudience('payload').setSubject('user_dev').setJti(crypto.randomUUID()).setIssuedAt().setExpirationTime('60s').sign(k))})"
  ```

## Roles and access (default deny)

`users.role` is `none | viewer | editor | publisher | admin`, owned by Medusa (`user.metadata.payload_role` -> token `role`) and helpers live in `src/access/roles.ts` (`atLeast(min)`, `isAdmin`, `normalizeRole`). `users.access.admin` needs at least `viewer`, so `none` lands on `/admin/unauthorized`. Globals: `read` public (the storefront depends on it), `update` editor+. `pages`/`media`: create/update editor+, delete admin. `forms`: read public, writes editor+, delete admin; `form-submissions`: create public (newsletter), read editor+, delete admin. `users`: admin sees/changes everyone, others only themselves; linked accounts have read-only email/name/role and cannot sign in with a password (`beforeLogin`), so a Medusa logout or removal always ends their access. In an empty database the first account becomes admin. New collections must declare their own access, never rely on Payload's "any logged-in user" default.

## Iframe embedding

- `src/middleware.ts` sends `Content-Security-Policy: frame-ancestors 'self' <origins>` where the origins come from `MEDUSA_ADMIN_URLS` (comma separated) plus the legacy `MEDUSA_ADMIN_URL` (`src/embed/config.ts`; invalid entries are skipped); do not widen it to `*`. It does not depend on `PAYLOAD_EMBEDDED`.
- Embed mode: `PAYLOAD_EMBEDDED=true` (read at runtime and passed to the client as props by `EmbedProvider`, so no rebuild; a restart is enough). With the flag on, server-rendered CSS (`src/embed/frame.ts`) hides the user icon (`.app-header__account`), the nav logout icon (`.nav__log-out`) and the unauthorized view's logout button until the page proves it is not framed (`window.self === window.top` sets `data-embed="direct"`), so a direct visit to `/admin` keeps its logout. `admin.autoRefresh` is on with the flag, so the "stay logged in?" modal (which has a log out button) never appears. A hard load of `/admin/logout` with `Sec-Fetch-Dest: iframe` is redirected to `/admin`. The REST `POST /api/users/logout` is deliberately not blocked: it cannot tell a frame (fetches send `Sec-Fetch-Dest: empty`), and a logout in the frame ends up as `session:expired` for the host anyway. Re-check the three CSS class names when upgrading Payload.
- Cookies (`src/collections/Users.ts`): `PAYLOAD_COOKIE_SAMESITE=None` (implies `Secure`) is required while Payload and Medusa are on different registrable domains, which is the case for two `*.up.railway.app` hosts. The real fix is sibling subdomains of one domain plus `PAYLOAD_COOKIE_DOMAIN`, where `Lax` works. It is a workaround: browsers that block third-party cookies can still break it.
- `PAYLOAD_PUBLIC_SERVER_URL` must equal Payload's public origin or the CSRF allowlist rejects cookie-authenticated browser requests.
- Known gap: when the Payload session expires inside the iframe the Payload login screen shows instead of refreshing SSO from Medusa (tracked in `damiankrupa1/medusaDemo` issue #19).

## Shared S3 bucket

Medusa (`@medusajs/file-s3`) and Payload can use one bucket with the same `S3_*` variables. Medusa writes `name-<ULID>.ext` at the bucket root with no prefix; keep Payload on `S3_PREFIX=payload`. Do not change the prefix once files exist (stored `url`s point at the old location), and do not add a prefix to Medusa. `S3_FILE_URL` is the public URL of the bucket and is the same for both; for Railway Buckets use `S3_REGION=auto`.

## Changing the contract

Update both repos and this skill together; verify with a minted token against a local Payload (`run-locally`) and, after deploy, with the real Medusa page. Report what was and was not tested on the deployed pair.
