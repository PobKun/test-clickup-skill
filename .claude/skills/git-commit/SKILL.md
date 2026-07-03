---
name: git-commit
description: Stage, commit, and sync the commit to ClickUp category tasks.
---

# git-commit

This skill teaches the AI agent how to handle the `/git-commit` slash command via
the `clickup-git-sync` CLI. All logic lives in the CLI (`npx clickup-git-sync`).

## Directives

When the user triggers `/git-commit`:
1. Inspect uncommitted work with `git status` and `git diff`.
2. Draft a clean, descriptive commit message from the changes.
3. Suggest a category (Planning, Frontend, Backend, Support, Monitor, Testing, Meeting) based on the file types.
4. Suggest tracked hours (0.5h docs/typo, 1-2h moderate, 3h+ major).
5. Show the proposed message, category, and hours and ask the user to confirm.
6. On confirmation run the CLI (it stages, commits, and syncs to ClickUp):
   ```bash
   npx clickup-git-sync commit --message "<msg>" --category "<category>" --hours <hours> --stage --yes
   ```
   To commit without logging time, add `--no-log`.
