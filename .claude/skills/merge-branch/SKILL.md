---
name: merge-branch
description: Merge another branch (usually origin/main) into the current branch and resolve the conflicts - only simple ones automatically, every doubtful one together with the user - then report what conflicted and how it was resolved. Use when the user asks to merge, sync or update a branch with main, or to resolve merge conflicts (including Polish phrasings like "domerguj main", "zmerguj", "rozwiaz konflikty").
---

# Merge a branch

Do the merge for the user on their terms: resolve only conflicts whose answer is obvious, bring every doubtful one to them, finish with a summary. Write everything you say to the user, including the summary, in their language.

The conflicts git reports are rarely the dangerous part. The damage comes from things that merge cleanly but break: incoming code that uses something this branch renamed or removed, or two branches that each added a migration.

## Ground rules

- Never push. Never rebase, `reset`, `merge --abort`, force or rewrite history without asking.
- Never skip hooks; never change git config (pass settings per command with `git -c ...`).
- The user's request is the request to create the merge commit; if they only asked to resolve a merge already in progress, ask before concluding it.

## 1. Prepare

1. `git status --short --branch`. If the tree is not clean, stop and ask (do not stash on your own).
2. `git fetch origin`. Merge `origin/main`, not a possibly stale local `main`; say so in one line if they differ.
3. Preview: `git log --oneline HEAD..origin/main`, `git merge-base HEAD origin/main`, and the files changed on both sides since the base (intersection of `git diff --name-only <base> HEAD` and `git diff --name-only <base> origin/main`). Read the incoming commit messages for those files.

## 2. Merge without committing

```bash
git -c merge.conflictStyle=zdiff3 merge --no-ff --no-commit origin/main
```

`--no-commit` keeps the merge open so the checks in step 5 run before anything is committed.

## 3. Classify every conflict

For each conflicted file establish each side's intent (`git log --oneline <base>..HEAD -- <file>` and `<base>..MERGE_HEAD -- <file>`, plus the diffs against the base).

**Simple — resolve yourself:** you can state both intents in one sentence and they do not contradict. Examples: formatting vs content (take the content, format), both sides added different independent entries (imports, env vars in `.env.example`, list items), identical change on both sides.

**Needs the user — ask:** both sides changed behaviour, logic or values of the same thing; modify/delete or rename/modify; `package.json` and lockfiles (never hand-merge a lockfile: propose taking one side and regenerating with `pnpm install`, which changes dependencies, so ask); **migrations** (see below); `CLAUDE.md`/skills where the two sides state contradicting rules; anything where you cannot tell why a side changed. If you hesitate, ask.

### Payload-specific hazards

- **Migrations**: both branches added a migration. Do not hand-merge `src/migrations/index.ts` or the `.json` snapshots. Keep the first-merged branch's migrations and regenerate this branch's with `pnpm migrate:create` against a local database, then discard the old file only if it was never applied/merged. Ask the user before doing it. See `payload-migrations`.
- **`payload-types.ts`**: never hand-merge; take either side, then `pnpm generate:types` and `cd nuxt-app && npm run sync-types`.
- **`payload.config.ts`**: both sides usually add to `collections`/`globals`/`plugins` arrays — keep both, in a sensible order, and check imports.

## 4. Resolve

Simple conflicts: resolve, then format only those files if the repo formats them (`payload-cms/.prettierrc.json`). Hard conflicts: collect and ask together with AskUserQuestion (up to 4 per call), giving the file, what each side did and why, the options and your recommendation first. Do not change incoming code outside conflict hunks, except to restore something this branch deliberately removed — and list that in the summary.

## 5. Verify

1. `git diff --name-only --diff-filter=U` is empty and `git diff --check` finds no conflict markers.
2. In `payload-cms`: `npx tsc --noEmit`, `pnpm lint`, and `pnpm build` when the merge touched config, collections, Dockerfile or dependencies. Check `src/migrations/index.ts` exports every migration file in the folder.
3. Skim incoming new code against `CLAUDE.md`; note violations, do not fix them in the merge.

If anything fails, stop and tell the user instead of concluding.

## 6. Conclude

`git commit --no-edit` (with hooks), then `git status --short --branch`. Do not push.

## 7. Summary (user's language)

```
MERGE: <ref> -> <branch> — <n> commits, <m> files
RESULT: merge commit <sha>, not pushed | stopped before committing: <why>

CONFLICTS (<k> files):
| File | This branch | Incoming | Type | Resolution | Decided by |

MERGED BY GIT, CHECKED: <files and what was checked>
CHANGED OUTSIDE CONFLICTS: <...> | none
FOUND, NOT FIXED: <...> | none
VERIFICATION: <checks actually run; what was not verified>
NEXT: <push? follow-ups?>
```

Report anything that went wrong or was skipped plainly.
