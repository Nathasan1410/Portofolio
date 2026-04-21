---
description: Perform one iteration of the Ralph Loop (PRD task)
---

# /ralph-loop Workflow

<objective>
Execute exactly one atomic task from PRD.md and record progress in progress.txt, following the Ralph Loop iterative pattern.
</objective>

<process>

1. **Read Task Source:**
   - Load `PRD.md` to identify the next pending task (`[ ]`).
   - Load `progress.txt` to understand the current iteration state.

2. **Establish Context:**
   - Use `context-fetch` skill to gather relevant files for the current task.
   - Summarize the task objective.

3. **Execute Task (GSD Style):**
   - Perform any necessary research (`research-phase`).
   - Implement the change using the `executor` skill.
   - Verify the result using the `verifier` skill.

4. **Update State:**
   - Mark the task as completed `[x]` in `PRD.md`.
   - Append a summary of work (Iteration {N}: Completed {Task}) to `progress.txt`.
   - Update `STATE.md` as per GSD rules.

5. **Commit & Loop:**
   - Commit changes with a descriptive message prefix: `[ralph-loop] {task-summary}`.
   - Stop this session and wait for the next loop trigger.

</process>
