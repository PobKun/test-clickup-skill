---
name: clickup-log
description: Log tasks and track time directly to ClickUp without committing.
---

# clickup-log

This skill teaches the AI agent how to handle the `/clickup-log` slash command via
the `clickup-git-sync` CLI. All logic lives in the CLI (`npx clickup-git-sync`).

## Directives

When the user triggers `/clickup-log` or asks to log time / manage tasks
directly (no commit), first decide which of these three they want:

**Shared rules for every case below:**
- Category must be ONE of these EXACT names: Main Task [Support], Main Task [Backend], Main Task [Frontend], Main Task [Planning and Learning], Main Task [Monitor], Main Task [Testing], Main Task [Meeting]
- Time: `--hours`/`--h` and/or `--minutes`/`--min` are summed (e.g. `--h 1 --min 30` = 1.5h).
- Date: ask which day — Enter/skip = **today**, or a past (backdate) / future date.
  Add `--start-date YYYY-MM-DD` (and optionally `--end-date YYYY-MM-DD`); omit for today.
- Always confirm the plan with the user before running, then confirm success after.

**A. Log time (create a new subtask + time)** — the default:
```bash
npx clickup-git-sync log --task "<task>" --category "<category>" --hours <h> --min <m>
```

**B. Log time to an EXISTING task** (user says "add time to <something already there>"):
The user gives a rough task name. Search ONLY the configured list by name:
```bash
npx clickup-git-sync add-time --task-name "<rough name>" --hours <h> --min <m>
```
If the CLI reports multiple matches, show the candidates to the user, let them pick,
then re-run with the exact id: `add-time --task-id <id> --hours <h>`.
By default add-time also adds you as an assignee (additive — the task's creator
stays assigned), which suits shared tasks like meetings. Pass `--no-assign` if
the user only wants to log time without being added to the task.

**C. Create a task WITHOUT logging time** (user says "just make the task", "no time"):
```bash
npx clickup-git-sync task --task "<task>" --category "<category>"
```
