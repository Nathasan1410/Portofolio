# Canonical Rules — Mission Control

> **Get Shit Done**: A spec-driven, context-engineered development methodology.

---

## Core Principles

1. **Plan Before You Build** — No code without specification (SPEC.md)
2. **State Is Sacred** — Update STATE.md after every atomic task
3. **Context Is Limited** — 3 failures → state dump → fresh session
4. **Verify Empirically** — Proof required for all changes

---

## GSD Workflow

1. **Initialize** (`/new-project`) → Deep questioning to create `SPEC.md`
2. **Plan** (`/plan [N]`) → Create detailed `PLAN.md` for phase N
3. **Execute** (`/execute [N]`) → Atomic commits for each task
4. **Verify** (`/verify [N]`) → Confirm success criteria met
5. **Repeat**

---

## Ralph Loop Integration

The iterative "Ralph Loop" is used for autonomous task completion:

- **Source**: `PRD.md` contains the task list.
- **State**: `progress.txt` tracks iteration history.
- **Rule**: Every loop iteration completes exactly **ONE** task from `PRD.md`.
- **Action**: Check off completed tasks in `PRD.md` and append log to `progress.txt`.

---

## Status Indicators

- `[ ]` Pending
- `[/]` In Progress
- `[x]` Completed
- `[!]` Blocked (Requires manual intervention)
