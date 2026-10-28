---
name: safe-commit
description: Safely prepares a Git commit. Checks the branch, changed files and diff, proposes a commit message and always requires explicit user approval before running git commit. Use for /safe-commit or whenever the user asks to commit.
disable-model-invocation: true
---

# Safe Commit

The user must know the scope of a commit and approve it before `git commit` runs.

## Absolute rules

- Never run `git commit` without the user's explicit approval of that specific commit. Approval of an implementation, of tests, or of an earlier commit is not approval of this one.
- Never `git push`, switch branches, create tags or rewrite history without separate approval.
- Never use `git add .`, `git add -A` or `git commit -a`; stage explicit paths.
- Do not overwrite, delete or reset the user's changes, and do not edit files just to prepare a commit.
- Commit messages are English Conventional Commits: `type(scope): subject` (`feat|fix|refactor|docs|style|test|build|chore`), imperative, max 72 characters, body explains why. Scope is usually `payload-cms` or `nuxt-app`.
- Do not skip hooks or safety checks. If the scope is ambiguous, stop and ask.

## Stage 1: Inspect (read-only)

`git status --short --branch`, `git diff --stat`, `git diff`, `git diff --cached --stat`, `git diff --cached`, `git ls-files --others --exclude-standard`. Do not run tests, lint or builds just to prepare a commit.

Never print secret values. `payload-cms/.env` is gitignored; if `.env` files, keys, database URLs, the `.db` SQLite file or credentials show up in the change, warn without revealing them.

## Stage 2: Analyse

Check that: migrations in `payload-cms/src/migrations` come with their `.json` snapshot and an updated `index.ts`; `payload-types.ts` matches the collection/global changes; new env vars are in `.env.example`; lockfiles changed only when dependencies did. Unrelated changes should be split into separate commits.

## Stage 3: Ask for approval

Stop before anything writes to the index. Report, in the user's language:

```text
BRANCH: ...
SCOPE: ...
FILES TO COMMIT: ...
SKIPPED FILES: ...
PROPOSED COMMIT MESSAGE: ...
TESTS / VERIFICATION: ... (only checks actually run)
WARNINGS: ...
```

Then ask: "Do you approve exactly this set of files and this commit message?" An ambiguous reply is not approval.

## Stage 4: Commit

After approval: re-check `git status`, confirm nothing changed, `git add` the approved paths only, verify `git diff --cached` matches what was approved (if not, stop and ask again), then commit with the approved message unchanged. If a hook rejects it, show the error and ask. Report hash, message, branch and files. Do not push.
