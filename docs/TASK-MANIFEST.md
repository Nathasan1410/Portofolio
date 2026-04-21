# Documentation Task Manifest

## Mission
Create standardized documentation for portfolio AI/human walkthrough with:
- KISS, DRY, Code Reusability principles
- Two versions: AI-optimized and Human-readable

---

## Tasks (7 Agents)

### Agent 1: BRAND-GUIDE-AI
**File:** `docs/AI-BRAND-GUIDE.md`
**Task:** Create AI-optimized brand guidelines
**Scope:**
- Brand philosophy (tech-forward, luxury, Indonesian essence)
- Color tokens with hex values + usage rules
- Typography system (Outfit + Inter)
- Icon usage (react-icons naming conventions)
- Motion philosophy (Framer Motion patterns)
- Image standards (Cloudinary URL patterns, aspect ratios)
- Spacing/timing tokens

### Agent 2: BRAND-GUIDE-HUMAN
**File:** `docs/HUMAN-BRAND-GUIDE.md`
**Task:** Create human-readable brand guidelines
**Scope:**
- Same content as AI version but:
- Use casual Indonesian tone
- Include visual examples/descriptions
- Add "why" explanations
- Make it scannable with headers

### Agent 3: CONTENT-MANIFEST-AI
**File:** `docs/AI-CONTENT-MANIFEST.md`
**Task:** Create AI navigation content manifest
**Scope:**
- File structure map (app/, components/, lib/)
- Data flow (experiences.ts → ExperienceCard → ExperiencePopup)
- Image sources (public/images/, Cloudinary CDN patterns)
- Component hierarchy
- State management patterns
- Known quirks/gotchas

### Agent 4: CONTENT-MANIFEST-HUMAN
**File:** `docs/HUMAN-CONTENT-MANIFEST.md`
**Task:** Create human reference content manifest
**Scope:**
- Simplified file tree
- Step-by-step content update workflow
- Where to add images
- How to edit experiences/projects/achievements
- Troubleshooting guide

### Agent 5: DESIGN-SYSTEM
**File:** `docs/DESIGN-SYSTEM.md`
**Task:** Document design system standards
**Scope:**
- All Tailwind tokens (colors, fonts, spacing)
- Component patterns (Card, Popup, Badge)
- Animation presets
- Responsive breakpoints
- Theme configuration

### Agent 6: DATA-SCHEMA
**File:** `docs/DATA-SCHEMA.md`
**Task:** Document data structures for AI
**Scope:**
- TypeScript interfaces (Experience, Project, Achievement)
- Field-by-field documentation
- Required vs optional fields
- Validation rules
- Example entries

### Agent 7: UPDATE-MEMORY
**File:** `PORTFOLIO_MEMORY.md`
**Task:** Update memory with doc references
**Scope:**
- Add documentation section
- Reference all new docs
- Add update workflow notes

---

## Execution Order
- Phase 1: Tasks 1-6 run in parallel (independent files)
- Phase 2: Task 7 runs after 1-6 complete (uses their output)

---

## Success Criteria
- AI docs use bullet points, code blocks, specific conventions
- Human docs use casual tone, scannable headers
- All docs follow KISS, DRY, Reusability principles
- No duplication between AI/Human versions