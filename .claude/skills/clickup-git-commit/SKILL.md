---
name: clickup-git-commit
description: Stage, commit, and sync the commit to ClickUp category tasks.
---

# clickup-git-commit

This skill teaches the AI agent how to handle the `/clickup-git-commit` slash command via
the `clickup-git-sync` CLI. All logic lives in the CLI (`npx @nextzy-tech/clickup-git-sync`).

## Directives

When the user triggers `/clickup-git-commit`:
1. Inspect uncommitted work with `git status` and `git diff`.
2. Draft a clean, descriptive commit message from the changes.
3. Pick the category based on the file types — use ONE of these EXACT names:
   Main Task [Support], Main Task [Backend], Main Task [Frontend], Main Task [Planning and Learning], Main Task [Infrastructure], Main Task [Monitor], Main Task [Testing], Main Task [Meeting]
4. Estimate the tracked time from the ACTUAL complexity of the diff you just
   read — weigh how many files/modules changed, how much real logic vs
   boilerplate, and the risk involved; don't just count lines. Use the line-count
   bands (0.5h docs/typo, 1-2h moderate, 3h+ major) only as a loose sanity check.
   Propose a number and always let the user adjust it.
   Time can be given as `--hours`/`-h` and/or `--minutes`/`--min` (they are summed).
5. Ask which date the work should be logged on: press Enter/skip for **today**, or
   give a past date (backdate) or future date in YYYY-MM-DD.
6. Show the proposed message, category, time, and date and ask the user to confirm.
7. On confirmation run the CLI (it stages, commits, and syncs to ClickUp):
   ```bash
   npx @nextzy-tech/clickup-git-sync commit --message "<msg>" --category "<category>" --hours <h> --min <m> --stage --yes
   ```
   - Time: use `--hours`/`-h` and/or `--minutes`/`--min` (e.g. `-h 1 --min 30` = 1.5h).
   - To log on a specific day, add `--start-date YYYY-MM-DD` (and optionally
     `--end-date YYYY-MM-DD` for a range). Omit both for today.
   - To commit without logging time, add `--no-log`.
