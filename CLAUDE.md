# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

Two apps in one repo, no root `package.json`; run every command inside the app folder:

- `payload-cms/` — Payload CMS 3.92.0 on Next.js 15.4 (React 19.2), Postgres (`@payloadcms/db-postgres`), Lexical editor, form-builder, S3 media storage. Deployed to Railway with the `Dockerfile` (Next `output: 'standalone'`, start command `node server.js` from `railway.json`).
- `nuxt-app/` — small Nuxt 3 landing page that renders Payload `pages` blocks (`pages/[slug].vue`, `components/*Block.vue`). Dev server on port 3001.

The Payload admin is also embedded in the Medusa admin (separate repo `medusaDemo`) through an iframe with single sign-on; see `.claude/skills/payload-medusa-integration`. `.claude/skills/payload-backend-todo` is the contract of Globals the `nuxtMedusa` storefront expects from this Payload instance.

Stack constraints: Node >= 22.13, pnpm 11.5.0 (pinned in `payload-cms/package.json`). pnpm is installed with `npm install -g pnpm@11.5.0` in the Dockerfile, not corepack (corepack failed on Railway). All `payload` and `@payloadcms/*` packages must stay on the same exact version; upgrade them together. Next must stay >= 15.4.11 (Payload peer range, and older versions are blocked by Railway's CVE scan).

## Required operating rules

1. Verify before claiming success. Run the smallest relevant check and report what was actually run. Never say a build or test passed unless it did.
2. Fix the root cause. Read the whole error, locate the failing layer, reproduce, then fix. Do not hide errors with broad `try/catch`.
3. Never hardcode or print secrets. `payload-cms/.env` holds real credentials (the Railway Postgres URL, `PAYLOAD_SECRET`); read it only to learn variable names, never echo its values. New variables go into `payload-cms/.env.example` with a comment.
4. Schema changes need a Payload migration (see `.claude/skills/payload-migrations`). Never edit a migration that has already been applied or merged, and never rely on `push` (it is disabled).
5. Keep generated files generated: `payload-cms/src/payload-types.ts` comes from `pnpm generate:types`, `payload-cms/src/migrations/*.json` and `index.ts` from `pnpm migrate:create`, lockfiles from the package manager. After changing collections/globals, regenerate types, then `cd nuxt-app && npm run sync-types` to copy them to the frontend.
6. Ask before anything destructive or externally visible: `git push`, force operations, deleting data, running migrations or any write against the remote Railway database, changing Railway variables, deploying, rotating secrets.
7. Prefer small, focused changes that match the surrounding code. No speculative abstractions, no unrelated refactors, no new dependencies without a concrete need.

## Commands

`payload-cms/` (pnpm):

| Purpose | Command |
|---|---|
| Install | `pnpm install` |
| Dev server (port 3000) | `pnpm dev` |
| Production build | `pnpm build` |
| Lint | `pnpm lint` |
| Typecheck | `npx tsc --noEmit` |
| Regenerate types / import map | `pnpm generate:types` / `pnpm generate:importmap` |
| Create / run migrations | `pnpm migrate:create <name>` / `pnpm migrate` |

`nuxt-app/`: `npm run dev`, `npm run build`, `npm run sync-types`. There is no test suite in either app; do not invent test scripts.

## Environment (`payload-cms/.env.example` is the source of truth)

- Required: `DATABASE_URL`, `PAYLOAD_SECRET`.
- `PAYLOAD_PUBLIC_SERVER_URL` — public origin of this Payload instance. Browser requests carrying the auth cookie are only trusted when their `Origin` equals it; wrong value = admin renders logged in but uploads/saves fail with "You are not allowed to perform this action". Defaults to `https://$RAILWAY_PUBLIC_DOMAIN`, then localhost.
- `FRONTEND_URL`, `NUXT_PUBLIC_PAYLOAD_URL` — CORS origins.
- Medusa SSO: `MEDUSA_SSO_SECRET`, `MEDUSA_ADMIN_URL`, `PAYLOAD_COOKIE_SAMESITE`, `PAYLOAD_COOKIE_DOMAIN`.
- S3 media: `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `S3_REGION`, `S3_FORCE_PATH_STYLE`, `S3_FILE_URL`, `S3_PREFIX`. Without the first three, uploads fall back to local disk, which is ephemeral on Railway.

## Payload conventions

- Collections live in `src/collections`, Globals in `src/globals`, custom endpoints in `src/endpoints`, plugins wrappers in `src/storage`. Register everything in `src/payload.config.ts`.
- Access control is explicit. Payload's default lets any logged-in user create/update/delete; there are no roles here. Public data needs `read: () => true`; do not widen `create`/`update`/`delete` beyond what is needed.
- Localized content uses `localized: true` fields and `localization: { locales: ['en', 'pl'], defaultLocale: 'en' }`.
- Railway deploys: do not set Custom Start or Pre-deploy commands in the Railway UI (they overrode the container and broke start); `railway.json` owns the start command. Migrations run at startup through `prodMigrations`.
- Cross-site iframe: `*.up.railway.app` is on the Public Suffix List, so Payload and Medusa on Railway default domains are cross-site; `PAYLOAD_COOKIE_SAMESITE=None` is the workaround, a shared parent domain is the real fix.

## Git

- Work on a feature branch, never directly on `main`. Branch names: `feat/...`, `fix/...`, `docs/...`, `chore/...`.
- Commit subjects are English Conventional Commits with a scope when it helps: `feat(payload-cms): ...`, `fix(payload-cms): ...`, `docs: ...`. Imperative, no trailing period, max 72 characters, body explains why.
- Commit only after the user approves the files and message (`/safe-commit`). Never push without separate approval. Never `git add .`, `-A` or `commit -a`.
- There are no git hooks or CI in this repo, so lint/typecheck/build are on you: run the ones relevant to the change.

## Completion criteria

A task is done when the change is present, the relevant checks were run and their real results reported, migrations/types/`.env.example` are updated where needed, and anything not verified (for example "not tested on Railway") is stated plainly.
