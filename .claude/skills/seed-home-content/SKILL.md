---
name: seed-home-content
description: Fill Payload with the home page content and images the nuxtMedusa storefront currently shows from its static i18n fallback (8 Globals, 10 images, en + pl), and the storefront-side follow-ups that live outside this repo. Use when the CMS is empty, when seeding a new Payload instance, or when the storefront still shows fallback content.
---

# Seed the storefront home content

The storefront (`nuxtMedusa`) already reads these Globals from Payload (`/api/globals/<slug>?locale=&depth=`) and falls back to its i18n JSON and `public/images/home/*` when Payload returns nothing. `scripts/seed-home.ts` copies exactly that fallback into Payload, so no storefront code change is needed for the content to appear. The contract is in `payload-backend-todo`.

Covered: `navigation`, `footer-content`, `campaign-slides`, `category-tiles`, `shop-the-look`, `brands`, `studio-story`, `journal-section`, plus ten `media` documents (alt text in `en` and `pl`). Not covered: "New arrivals" (comes from Medusa) and any page that does not exist yet; every link is `/store`, the same default the storefront uses.

## Run

From `payload-cms/` with Node >= 22.13:

```bash
SEED_SOURCE=<path to the nuxtMedusa checkout> pnpm seed:home
```

- It only reads the storefront, with `git show <ref>:<path>` (`SEED_REF`, default `origin/main`), so the working tree may be stale and nothing there is modified. Run `git fetch` in the checkout first.
- It is idempotent: images are matched by filename and reused, Globals are overwritten with the same content. Re-running after an edit in the admin **overwrites the editor's changes** in those Globals.
- `{title}` and `{'@'}` placeholders from the i18n files are resolved to the final text (`Fashion`, `@`), since Payload content is not a template.
- Array rows are shared between locales: the `pl` pass must reuse the row ids from the `en` pass or the English values are lost. The script does this; keep it when editing.

### Against a local database

Start Postgres (`docker compose up -d postgres`), export `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/payload` and `PAYLOAD_SECRET`, run `pnpm migrate`, then the command above. Files go to `payload-cms/media` unless `S3_*` is set.

### Against production

Writes the production database and bucket, so it needs the owner's go-ahead for that run.

1. The database must already have the migrations, including `*_globals`: check `payload_migrations` first (read-only). Without it the script fails on missing tables.
2. Load the production variables into the shell without printing them (the repo ignores `payload-cms/.env.prod`): `set -a; . ./.env.prod; set +a`. `DATABASE_URL` must be the public Railway URL and `S3_*` must match the service, including `S3_PREFIX` and `S3_FILE_URL`.
3. `SEED_CONFIRM=yes SEED_SOURCE=... pnpm seed:home`. Without `SEED_CONFIRM=yes` the script refuses to run against a non-localhost database.
4. Verify with the public API: `/api/globals/<slug>?locale=pl&depth=1` returns 200 with populated `image.url`, and the image URLs open.

## Storefront follow-ups (outside this repo, not done here)

Record, do not apply from this repo:

- The storefront needs `NUXT_PUBLIC_PAYLOAD_URL` set to the Payload public origin (Vercel project env), otherwise it never calls Payload.
- Image `url`s point at `S3_FILE_URL` (the bucket host), but `nuxt.config.ts` only allow-lists the hostname of `NUXT_PUBLIC_PAYLOAD_URL` in `image.domains`. Bucket images still render, but `NuxtImg` serves them unoptimized. Fix on the storefront side: add the bucket host to `image.domains`. Alternative with no storefront change: unset `S3_FILE_URL` in Payload so files are served through Payload (`/api/media/file/...`), at the cost of load on Payload.
- Home routes may be cached (`routeRules`/CDN), so new content can take a while to show.
- Once Payload is the source, the static fallbacks in the storefront can stay as an outage fallback; do not remove them.
