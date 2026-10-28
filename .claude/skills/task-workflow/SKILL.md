---
name: task-workflow
description: Plan and execute a change in the Payload CMS or Nuxt app with risk-based validation, an agreed verification scope and an honest summary. Use when implementing, refactoring or fixing anything non-trivial in this repo.
---

# Task Workflow

Deliver the smallest correct change with validation proportional to risk. Do not run a full verification for every task, and do not run any check the user has not been told about when it is slow or touches external systems.

## Before editing

1. Inspect the relevant files, nearby patterns, the real `package.json` scripts and the current `git diff`. Never invent script names.
2. Classify the risk:
   - **Low** — copy, styling, isolated Nuxt component, comments, docs.
   - **Medium** — new field/collection/global, Nuxt data mapping, endpoint without auth impact, dependency bump within a minor.
   - **High** — authentication/SSO, access control, cookies/CSRF/CORS, migrations, anything touching the Railway database, S3 credentials or bucket layout, Dockerfile/`railway.json`, Payload/Next/React upgrades, secrets and deployment configuration.
3. For non-trivial work give a short plan first: files likely touched, intended effect, risks, and the exact verification (command and why). Ask only if a missing decision blocks safe progress; otherwise state an assumption. For High risk, wait for approval of the plan.

## Implementation

- Follow existing conventions (comment density, naming, file layout). Keep the change focused.
- Preserve unrelated user changes. Do not hand-edit generated files (`payload-types.ts`, migration snapshots, lockfiles).
- Config that varies per environment goes into environment variables with a safe fallback, documented in `payload-cms/.env.example`.

## Validation

| Change | Checks |
|---|---|
| Low | inspect the diff; targeted check only if useful |
| Medium | `npx tsc --noEmit` and `pnpm lint` in `payload-cms`; `pnpm generate:types` if fields changed |
| High | the above plus `pnpm build`, and a local run against a local database (see `run-locally`): exercise the real flow (login, upload, SSO redirect), not just compilation |

Never run migrations or write to the remote Railway database as a check. Do not repeat a check when nothing relevant changed since it passed.

## Before finishing

Review `git diff` for accidental changes, secrets and scope creep. Report what changed, the checks actually run with results, what was not verified (for example "not tested on Railway"), and follow-ups. Never claim a check passed unless it ran and passed.
