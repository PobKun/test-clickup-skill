---
name: clickup-log
description: Log tasks and track time directly to ClickUp without committing.
---

# clickup-log

This skill teaches the AI agent how to handle the `/clickup-log` slash command via
the `clickup-git-sync` CLI. All logic lives in the CLI (`npx clickup-git-sync`).

## Directives

When the user triggers `/clickup-log` or asks to log time directly (no commit):
1. Determine task name, hours, and category; ask if missing.
   Category must be ONE of these EXACT names: Main Task [Support], Main Task [Backend], Main Task [Frontend], Main Task [Planning and Learning], Main Task [Monitor], Main Task [Testing], Main Task [Meeting]
2. Run:
   ```bash
   npx clickup-git-sync log --task "<task>" --category "<category>" --hours <hours>
   ```
3. Confirm success to the user.
