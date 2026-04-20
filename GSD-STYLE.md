# GSD Style Guide

## Artifact Standards

### SPEC.md (Specification)
- **Vision**: One paragraph (why it matters).
- **Goals**: Quantifiable outcomes.
- **Constraints**: Technical and timeline.
- **Status**: DRAFT | FINALIZED (Planning Lock applies).

### PLAN.md (Planning)
- **Dependency Graph**: Visualization of task flow.
- **Tasks**: Granular, atomic steps (< 50 lines per edit if possible).

### STATE.md (Persistence)
- **Current Position**: Phase and Task.
- **Last Action**: Timestamped summary.
- **Blockers**: Anything preventing progress.

## Checkpoint Rules
- Update `STATE.md` after every file write.
- Run `/pause` when handing off to another session.
- Run `/resume` to reload context and verify state.
