---
name: run-locally
description: Run or troubleshoot the Payload CMS app and the Nuxt landing page locally, with a local Postgres (and optionally a fake S3). Use when starting dev servers, testing a migration or upload locally, or diagnosing startup failures.
---

# Run locally

## Payload CMS (`payload-cms/`, http://localhost:3000/admin)

1. Prerequisites: Node >= 22.13, pnpm 11.5.0 (`npm install -g pnpm@11.5.0`), Docker for Postgres. `pnpm install`.
2. **Know which database you point at.** `payload-cms/.env` may contain the real Railway Postgres URL. For local work start a throwaway database and override the variable per command (a shell variable wins over `.env`):

   ```bash
   cd payload-cms
   docker compose up -d postgres            # postgres:17 on :5432, db "payload", postgres/postgres
   export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/payload
   export PAYLOAD_SECRET=local-dev-secret
   pnpm migrate                             # applies src/migrations to the local db
   pnpm dev
   ```

   Only use the remote database when the user explicitly asks for it, and never run `pnpm migrate` against it without approval. Do not use the `payload` service of `docker-compose.yml` (it relies on corepack, which does not work here); run `pnpm dev` directly.
3. Create the first admin through the UI on the first visit to `/admin`.
4. Never print `.env` values when diagnosing; check that a variable is set, not what it contains.

### Optional: S3 uploads locally

Run a fake S3 (`docker run -d -p 9090:9090 -e initialBuckets=media adobe/s3mock`) and export `S3_BUCKET=media`, `S3_ACCESS_KEY_ID=x`, `S3_SECRET_ACCESS_KEY=x`, `S3_ENDPOINT=http://localhost:9090`, `S3_FORCE_PATH_STYLE=true` (optionally `S3_PREFIX=payload`). Upload an image in the admin and check the `url`; remove the containers afterwards.

### Optional: Medusa SSO locally

Set `MEDUSA_SSO_SECRET` and `MEDUSA_ADMIN_URL`, mint a token as described in `payload-medusa-integration` and open `/api/users/sso/medusa?token=...`.

## Nuxt app (`nuxt-app/`, http://localhost:3001)

`npm install`, `npm run dev`. It reads the Payload URL from `PAYLOAD_PUBLIC_SERVER_URL` (default `http://localhost:3000`), so start Payload first. After changing Payload fields: `pnpm generate:types` in `payload-cms`, then `npm run sync-types` in `nuxt-app`.

## Checks

`npx tsc --noEmit`, `pnpm lint`, `pnpm build` in `payload-cms`; `npm run build` in `nuxt-app`. There is no automated test suite.

## Common startup failures

- `ECONNREFUSED :5432` — Postgres container not running.
- "relation/column does not exist" — local database missing migrations: `pnpm migrate`.
- `Cannot find module` / pnpm errors after switching branches — `pnpm install` again.
- Port 3000 busy — another Next process; stop it instead of changing ports silently.
