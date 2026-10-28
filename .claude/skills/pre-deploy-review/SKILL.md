---
name: pre-deploy-review
description: Review deployment readiness of the Payload CMS app on Railway - env vars, migrations, Docker build, cookies/CORS, S3 and rollback. Does not deploy. Use for /pre-deploy-review or before merging changes that affect production.
disable-model-invocation: true
---

# Pre-deploy Review

A readiness review, not approval to deploy. Do not deploy, run migrations against the remote database, change Railway variables, DNS or secrets, or delete data. Never print secret values.

## Check (mark items "not applicable" or "unconfirmed" instead of assuming)

- **Build**: `Dockerfile` builds (Node 22 alpine, pnpm 11.5.0 installed via npm, `pnpm i --frozen-lockfile`, Next `output: 'standalone'`); lockfile matches `package.json`; Next version is not on Railway's CVE blocklist; `railway.json` start command `node server.js`; no Custom Start/Pre-deploy command set in Railway (ask the user).
- **Migrations**: new schema has a migration + snapshot registered in `src/migrations/index.ts`; `prodMigrations` applies it at startup; it is additive/backward compatible with the running version (old code keeps working during the rollout); a rollback path exists (previous deploy keeps running with the extra columns).
- **Environment variables**: every variable the change reads is in `.env.example` and set in Railway (ask the user to confirm; you cannot read Railway): `DATABASE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL` (or `RAILWAY_PUBLIC_DOMAIN`), `FRONTEND_URL`, `NUXT_PUBLIC_PAYLOAD_URL`, `MEDUSA_SSO_SECRET` (same value as Medusa's `PAYLOAD_SSO_SECRET`), `MEDUSA_ADMIN_URL`, `PAYLOAD_COOKIE_SAMESITE`, `S3_*`. A missing optional variable must degrade, not crash.
- **Auth and cookies**: `Secure`/`SameSite` flags, CSRF origin equals the public URL, `frame-ancestors` lists only the Medusa admin origin, SSO token validation (algorithm, issuer, audience, max lifetime).
- **Access control**: new collections/globals/endpoints have explicit access rules; nothing private is publicly readable.
- **Storage**: S3 bucket, `S3_PREFIX=payload` when the bucket is shared with Medusa, public URL vs proxied files, existing files not orphaned by a prefix change.
- **Operations**: logs show startup and migration errors; health after deploy can be checked (`/admin/login` 200, `GET /api/media` works, one real upload).

## Do not run

Linters, tests, builds or deploy commands without agreeing the scope first.

## Report

Status: ready / ready with risks / not ready / insufficient data. Then blockers and high risks, other risks, proposed verification commands, the deploy and rollback plan, and items that need the user's confirmation. Stop before any operation that changes an external system and ask for explicit approval of that specific operation.
