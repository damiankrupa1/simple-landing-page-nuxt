---
name: debug-systematically
description: Diagnose a bug methodically, find the root cause and propose a minimal fix before changing code. Use for /debug-systematically or when something fails in the Payload CMS app, its Railway deploy, or the Nuxt app.
disable-model-invocation: true
---

# Debug Systematically

Fix the cause, not the symptom.

## 1. Gather data

- Expected vs actual behaviour, the exact error text (full stack), reproduction steps, recent changes (`git log`, `git diff`).
- Read the relevant files and configuration. Decide which layer fails: browser, Next/Payload server, database, S3, Railway build/start, proxy, Nuxt.
- Do not run anything that changes data or an external system (migrations, remote database writes, deploys) without approval. `payload-cms/.env` points at the real Railway database; never echo its values.

## 2. Hypotheses

List likely causes ordered by evidence; separate observations from hypotheses; propose the smallest experiment that tells them apart. Read the library source in `node_modules` when behaviour is unclear (for example Payload's cookie/CSRF logic in `payload/dist/auth/extractJWT.js`) instead of guessing.

Known failure patterns in this project:

- "You are not allowed to perform this action" in a logged-in admin: auth cookie ignored because the request `Origin` is not in the CSRF allowlist (`serverURL`), or the session expired.
- Iframe in the Medusa admin asks for a login: cross-site cookie (`SameSite`), expired Payload session, or CSRF origin.
- Railway start errors mentioning `pnpm`/`EACCES`: a Custom Start/Pre-deploy command is set in the Railway UI; `railway.json` should own startup.
- Build failure on Railway: Node/pnpm version, missing file in a Docker `COPY`, blocked Next version (CVE scan).
- Upload errors: S3 credentials, region/endpoint, `forcePathStyle`, or the missing `media.prefix` migration.

## 3. Plan before changing

State the root cause (or your confidence), files to change, minimal scope, regression risk and verification. Stop and wait for approval.

## 4. Fix and report

Change only what the fix needs; do not silence errors or weaken validation; no new dependencies without approval. Run only the agreed checks. Report the cause, the change, real results and what remains unverified. If the cause is not confirmed, say so.
