---
name: review-changes
description: Read-only review of Git changes (uncommitted by default, or a branch against main) for bugs, regressions, security and quality in the Payload CMS and Nuxt apps. Does not fix the code. Use for /review-changes or when asked to review a diff or branch.
disable-model-invocation: true
---

# Review Changes

## Rules

- Read-only: do not edit files, stage or commit. Do not run tests, lint or builds without approval.
- Default scope: `git diff`, `git diff --cached` and `git ls-files --others --exclude-standard` (new files appear in no diff). For a branch: `git diff main...HEAD`. Read the surrounding code, not only the hunks.

## What to check

1. Logic errors, edge cases, regressions against existing API contracts (the Nuxt app and the `nuxtMedusa` storefront consume Payload REST; Medusa calls `/api/users/sso/medusa`).
2. Security: access control on collections/globals/endpoints (Payload's default allows any logged-in user), secrets in code or logs, JWT/SSO validation, cookie flags (`Secure`, `SameSite`), CORS/CSRF origins, open redirects.
3. Migrations: every schema change has a migration plus snapshot; none rewrites history; down migration is sane; no data-destroying statements without notice; `payload-types.ts` regenerated.
4. Deployment impact: new env vars documented in `.env.example`, Dockerfile/`railway.json` assumptions, behaviour when a variable is unset (feature must degrade, not crash startup).
5. Error handling and async: swallowed errors, unawaited promises, 200 on failure.
6. Nuxt: SSR/hydration issues, null/undefined handling of optional CMS data, types synced from Payload.
7. Unnecessary complexity, duplication, unjustified dependencies. Test gaps proportionate to risk (the only tests are the hook unit tests in `payload-cms` (`pnpm test`), so say what should be verified manually).

## Report

Findings first, with file and line, ordered `[P1]` critical, `[P2]` significant, `[P3]` minor, `[P4]` suggestion. Each has the scenario, impact and reason; no hypothetical issues without justification. If nothing significant, say so without guaranteeing the absence of bugs. End with what you could not verify. Do not fix anything unless asked.
