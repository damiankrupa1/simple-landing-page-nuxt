---
name: payload-migrations
description: Create, review and apply Payload CMS database migrations in this repo (Postgres, push disabled, prodMigrations). Use whenever a collection, global or field changes the schema, or when a migration fails or conflicts.
---

# Payload migrations

`payload.config.ts` runs the Postgres adapter with `push: false`, `migrationDir: src/migrations` and `prodMigrations: migrations`. The admin never auto-alters the schema; every schema change is a migration file, and deployed instances apply pending migrations at startup.

## Creating one

1. Change the collection/global.
2. Make sure you are pointed at a **local** database (`DATABASE_URL` in `payload-cms/.env`). The default `.env` here points at the real Railway database: do not run migration commands against it without explicit approval. Use `run-locally` to get a local Postgres and override `DATABASE_URL` for the command.
3. `pnpm migrate:create <short_snake_name>` generates `src/migrations/<timestamp>_<name>.ts`, its `.json` snapshot and updates `index.ts`. Review the SQL: columns added by a new field must be nullable or have a default so existing rows survive; no `DROP` of data you did not intend.
4. Apply locally with `pnpm migrate` and exercise the feature.
5. `pnpm generate:types`, then `cd ../nuxt-app && npm run sync-types`.
6. Commit the `.ts`, the `.json` snapshot, `index.ts` and `payload-types.ts` together.

## Rules

- Never edit or delete a migration that has been merged or applied anywhere; add a new one.
- Never hand-write the `.json` snapshot, and do not leave a stub `index.ts`: the generated `index.ts` must export every migration.
- The Medusa SSO and S3 features each have a migration (`users_sso`, `s3_storage`); a feature that adds fields to `users` or `media` without one will break the deployed admin.
- Running migrations on the remote database is a write to production: ask first. Normally a deploy applies them on startup, which is the preferred path.

## Two branches, two migrations

Both add a migration against the same snapshot, so they conflict in `index.ts` and the snapshot chain. Do not hand-merge the snapshots: merge the first branch, then on the second recreate its migration (`migrate:create`) so it is generated from the merged state, and delete the old file of that branch only if it was never applied or merged.

## Failure modes

- App starts but a request fails with "column ... does not exist": the migration was not applied to that database.
- `migrate:create` shows no changes: the config change did not reach the schema (check the field is on a collection registered in `payload.config.ts`).
- Build error about a `Migration` type: import the type from `payload`, not `@payloadcms/db-postgres`.
