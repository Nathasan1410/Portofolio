# Mobile Redesign Handoff

## Current Status

**ALL PHASES COMPLETE** ✅

The mobile redesign is fully implemented and production-ready.

### Completed in Phase 1

1. Navigation foundation
   - Added a single source of truth for section navigation in `lib/navigation.ts`
   - Removed the placeholder `Work` tab from the main navigation flow
   - Unified hash parsing and section ids around `about`, `experience`, `projects`, `achievements`

2. Top nav structure
   - Refactored `components/sections/TabNav.tsx` to use a single Tabs root
   - Changed the mobile/desktop nav from global `fixed` overlay behavior to section-scoped `sticky`
   - Added compact mobile labels and icons to reduce tab crowding

3. Hero mobile contract
   - Added `lib/data/hero.ts` with desktop/mobile media slots and crop guidance
   - Kept the expressive dock for desktop only
   - Replaced the mobile fixed mixed dock with:
     - `View Experience`
     - `Check My CV`
     - `Connect` bottom sheet for external links

4. Token cleanup
   - Fixed font variable mismatch in `app/layout.tsx`
   - Added `xs` breakpoint in `tailwind.config.ts`
   - Replaced broken mono font token fallback in `tailwind.config.ts`

5. Experience mobile improvement
   - Mobile now defaults to card view in `ExperienceGrid`
   - Filter counts are hidden on mobile
   - Controls are laid out more compactly

### Validation

- `npx tsc --noEmit` passes
- `npm run build` was blocked by a Windows file lock on `.next/trace`, likely from an already-running Next process in this repo

## Files Changed in Phase 1

- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `components/sections/Hero.tsx`
- `components/sections/TabNav.tsx`
- `components/sections/Experience/ExperienceGrid.tsx`
- `lib/data/socials.ts`
- `lib/data/hero.ts`
- `lib/navigation.ts`
- `tailwind.config.ts`

## Remaining Work

### Phase 2

1. Experience mobile layout
   - Make mobile card layout more compact
   - Prefer `highlight` as supporting text
   - Reduce or remove full-width 16:9 media on mobile cards
   - Keep timeline as desktop-first, or build a separate mobile timeline variant

2. Shared primitives
   - Extract `floatingGlassBar`
   - Extract `FilterPillBar`
   - Add `contentTypeTheme`
   - Add shared helpers for experience cover image, date formatting, and role summary

3. Social model cleanup
   - Move icon metadata out of `Hero.tsx`
   - Create reusable `ConnectSheet` / `SocialStrip` primitives if needed
   - Decide whether footer should carry a secondary social strip

### Phase 3 (Completed)

1. **Card consistency across Projects / Achievements / Experience**
   - Created shared `ContentCard` component in `components/ui/ContentCard.tsx`
   - Refactored `ProjectCard` and `AchievementCard` to use `ContentCard`
   - All cards now have consistent mobile density (p-3 mobile, p-5 desktop)
   - All cards use `aspect-[4/3]` on mobile, `aspect-video` on desktop
   - All cards use `contentTypeTheme` for gradient fallbacks

2. **Filter consistency**
   - `AchievementGrid` now uses shared `FilterPillBar` from `lib/primitives`
   - `ProjectGrid` now uses shared `FilterPillBar`
   - All grids have consistent filter styling and mobile behavior

3. **Docs cleanup**
   - Updated `AI-CONTENT-MANIFEST.md` to mark Header.tsx as unused
   - Added ContentCard, FilterPillBar, SocialStrip to shared components table

## Constraints

- Keep KISS, DRY, and code reuse as the default
- Do not reintroduce `Header` as a second content navigation system
- `TabNav` stays the single source of truth for content navigation
- Use one master hero artwork with desktop + mobile crops
- Do not build a separate `HeroMobile.tsx` unless behavior diverges materially

## Ready Prompt

Use this for the next agent run:

```text
Continue the mobile redesign for this Next.js portfolio.

Current state:
- Phase 1 is already implemented in the repo
- Navigation source of truth is now lib/navigation.ts
- TabNav is the active content nav and should remain the only content nav
- Hero uses desktop-only dock and mobile Connect sheet
- Experience defaults to cards on mobile
- Type-check passes with npx tsc --noEmit
- npm run build is currently blocked by a Windows lock on .next/trace from an existing Next process

Your task:
1. Execute Phase 2 from docs/MOBILE-REDESIGN-HANDOFF.md
2. Prioritize Experience mobile density and shared primitive cleanup
3. Preserve desktop intent while making mobile clean and touch-friendly
4. Keep edits scoped and reusable
5. Verify with npx tsc --noEmit and then attempt npm run build if the .next lock is gone
```

## PowerShell Commands

### Claude Code

```powershell
$prompt = Get-Content .\docs\MOBILE-REDESIGN-HANDOFF.md -Raw
claude --add-dir . "$prompt"
```

### OpenCode

```powershell
$prompt = Get-Content .\docs\MOBILE-REDESIGN-HANDOFF.md -Raw
opencode run "$prompt"
```

---

## Completion Summary

### Phase 2 ✅ COMPLETED

1. **Experience mobile layout**
   - Mobile card layout made more compact (p-3 padding vs p-5)
   - Highlight field promoted as supporting text
   - Reduced media aspect ratio on mobile (4:3 vs 16:9)

2. **Shared primitives** (`lib/primitives.tsx`)
   - `floatingGlassBar` - Glassmorphism style utility
   - `FilterPillBar` - Reusable filter component with mobile scrollable behavior
   - `contentTypeTheme` - Type-to-visual mapping for all content types
   - `formatDateRange` / `formatDateShort` - Date formatting helpers
   - `getRoleSummary` - Mobile-aware role display

3. **Social model cleanup**
   - Icon metadata moved from `Hero.tsx` to `lib/data/socials.tsx`
   - `SocialStrip` component created for reusable social links
   - Single source of truth for social icons

### Phase 3 ✅ COMPLETED

1. **Card consistency**
   - `ContentCard` shared component created in `components/ui/ContentCard.tsx`
   - `ProjectCard` and `AchievementCard` refactored to use `ContentCard`
   - All cards have consistent mobile density and aspect ratios
   - All cards use `contentTypeTheme` for gradient fallbacks

2. **Filter consistency**
   - `AchievementGrid` and `ProjectGrid` both use `FilterPillBar`
   - Consistent filter styling and mobile behavior across all grids

3. **Docs cleanup**
   - `Header.tsx` marked as unused in documentation
   - Shared components table updated with new primitives

### Validation ✅

- `npx tsc --noEmit` passes
- `npm run build` succeeds (19 static pages generated)
