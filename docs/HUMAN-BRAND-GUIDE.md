# Nathanael's Portfolio Brand Guide

Yo! This is your brand guide - keeping it chill and scannable so you can jump in, find what you need, and get back to building.

---

## Brand Philosophy

**Who you are:** Developer + Web3 + AI + Yapper (content creator). Lu bukan coder biasa yang monoton - lu vibrant, lu aktif di hackathons, lu suka ngomong dan ngorganisir acara.

**Vibe:** Tech-forward luxury. Clean tapi nggak boring. Elegan tapi tetap playful. Think: premium SaaS landing page tapi with personality.

**Visual mood:** Light mode base (white background). Muted, sophisticated colors with tech accents. Inspired by that reference aesthetic - sleek, modern, tapi nggak over-designed.

**Gue mau portfolio lu ngerasa:**
- Professional tapi approachable
- Tech-forward without being cold
- Personal without being messy

---

## Colors

All colors are defined as HSL variables in `app/globals.css`. They're used via Tailwind classes like `bg-primary`, `text-foreground`, etc.

### Primary Palette

| Color | HSL Value | Hex | Feel & When to Use |
|-------|-----------|-----|-------------------|
| **Background** | `0 0% 100%` | `#FFFFFF` | Pure white. Base for everything. |
| **Foreground** | `0 0% 10%` | `#1A1A1A` | Near-black. Main text color. Soft on eyes. |

### Muted Tones (Your Signature Colors)

These give portfolio lu that elegant, muted vibe:

| Color | HSL Value | Hex | Feel & When to Use |
|-------|-----------|-----|-------------------|
| **Primary** | `220 25% 65%` | `#9299B2` | Periwinkle blue. Headers, active states, primary buttons. Soft tapi confident. |
| **Secondary** | `100 15% 70%` | `#A8C1A8` | Sage green. Secondary elements, success states, nature-themed content. |
| **Accent** | `0 45% 75%` | `#D9A3A3` | Dusty rose. Highlights, special callouts, warmth accents. |
| **Muted** | `0 0% 96%` | `#F5F5F5` | Light gray. Card backgrounds, subtle divisions. |

### Tech Accents

For that Web3/AI vibe - use sparingly for impact:

| Color | HSL Value | Hex | Feel & When to Use |
|-------|-----------|-----|-------------------|
| **Tech Cyan** | `160 80% 70%` | `#5EEAD4` | Bright, fresh. Tech badges, hover effects, crypto/blockchain themes. |
| **Tech Purple** | `270 70% 75%` | `#B19CD9` | Dreamy, futuristic. AI themes, creative projects, special highlights. |
| **Tech Blue** | `215 80% 65%` | `#6B9EFF` | Deep, trustworthy. Links, interactive elements, data viz. |

### Utility Colors

| Purpose | HSL Value | Hex |
|---------|-----------|-----|
| Border | `0 0% 90%` | `#E6E6E6` |
| Muted Text | `0 0% 45%` | `#737373` |
| Destructive | `0 84% 60%` | `#EF4444` |

> **Pro Tip:** Colors with `var(--...)` syntax work with dark mode too. Currently light-only, but if you add dark mode later, these variables will adapt automatically.

---

## Typography

Two fonts only - Outfit for display, Inter for body. Both loaded via `app/layout.tsx`.

### Font Usage

| Font | Tailwind Class | When to Use |
|------|---------------|-------------|
| **Outfit** | `font-display` | Headlines, section titles, big numbers, your name. Anything that needs impact. |
| **Inter** | Default (no class needed) | Body text, descriptions, UI labels, navigation. |

### Scale

```
text-xs    → 12px  - Badges, captions
text-sm    → 14px  - Secondary text, timestamps
text-base  → 16px  - Body text (default)
text-lg    → 18px  - Emphasized body
text-xl    → 20px  - Small headings
text-2xl   → 24px  - Section headers
text-3xl+  → 30px+  - Hero text, your name
```

### Example

```tsx
// Headlines - use Outfit
<h1 className="font-display text-4xl font-bold">Nathanael Santoso</h1>

// Body - use Inter (default)
<p className="text-base text-muted-foreground">
  Developer • Web3 • AI • Yapper
</p>
```

> **Pro Tip:** The `.font-display` class is defined in `app/globals.css` under `@layer components`. Use it for any heading that needs to pop.

---

## Icons

Icons come from **react-icons** - specifically Feather icons and FontAwesome.

### Quick Reference

| Icon Set | Import Path | Use When |
|----------|-------------|----------|
| Feather | `react-icons/fi` | UI actions, navigation, generic icons |
| FontAwesome | `react-icons/fa` | Brand logos (YouTube, GitHub, Instagram, etc.) |

### How to Add Icons

1. **Find your icon** at [react-icons.github.io/react-icons](https://react-icons.github.io/react-icons)

2. **Import it:**
   ```tsx
   import { FiArrowRight } from "react-icons/fi";
   import { FaGithub } from "react-icons/fa";
   ```

3. **Use it:**
   ```tsx
   <FaGithub className="h-6 w-6" />
   ```

### Icon Sizes

| Size | Class | Use For |
|------|-------|---------|
| `h-4 w-4` | Small | Inline with text, button icons |
| `h-5 w-5` | Medium | Navigation, list items |
| `h-6 w-6` | Large | Social icons, feature icons |
| `h-8 w-8` | X-Large | Hero sections, empty states |

> **Pro Tip:** Always set explicit width/height. Lu nggak mau icon lu resize secara random. Use `h-` and `w-` with same value for square icons.

---

## Animations

Animations are powered by **Framer Motion** and **Tailwind CSS animate**.

### Animation Feel

**Key principle: smooth, subtle, purposeful.**

- Page loads: fade in + slide up (0.3-0.5s)
- Hover effects: quick (0.2s), small transforms
- Tab switches: crossfade (0.3s)
- Cards on scroll: staggered entrance

### Framer Motion Patterns

**Container with staggered children:**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

<motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {children.map(child => <motion.div key={child.id} variants={itemVariants} />)}
</motion.div>
```

**Hover with scale:**
```tsx
const hoverVariants = { hover: { scale: 1.05, y: -4 } };

<motion.div variants={hoverVariants} whileHover="hover" transition={{ duration: 0.2 }}>
  Card content
</motion.div>
```

### Tailwind Animate Classes

For simpler animations, Tailwind's built-in animate:

```tsx
// Fade in on mount
className="animate-in fade-in-50 duration-300"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-300"
```

### Tweak Animation Speed

To adjust overall feel:

| Feel | Duration | Example |
|------|----------|---------|
| Snappy | 0.15-0.2s | Hover states, small interactions |
| Smooth | 0.3-0.5s | Page transitions, reveals |
| Dramatic | 0.6-1s | Hero animations, major reveals |

> **Pro Tip:** `ease: [0.25, 0.46, 0.45, 0.94]` = cubic-bezier ease-out. The go-to for natural, decelerating motion. Nggak pernah pakai linear - it feels robotic.

---

## Images

Images are handled via **Cloudinary** for optimization. See `lib/cloudinary.ts`.

### Image Presets

| Preset | Dimensions | Use For |
|--------|------------|---------|
| `thumbnail` | 400×300 | Cards, list items |
| `card` | 600×400 | Project/experience cards |
| `hero` | 1200×800 | Hero backgrounds |
| `avatar` | 200×200 (cropped circle) | Profile pictures |
| `certificate` | 1200×auto | Achievement certificates |

### Using the Helper

```tsx
import { imagePresets } from '@/lib/cloudinary';

// In your component
<img src={imagePresets.card(publicId)} alt="Project screenshot" />
```

### Manual URL Construction

```tsx
import { getOptimizedImageUrl } from '@/lib/cloudinary';

<img 
  src={getOptimizedImageUrl('my-folder/my-image', {
    width: 800,
    height: 600,
    quality: 'auto',
    format: 'auto',
    crop: 'fill'
  })}
  alt="Description"
/>
```

### Upload Process (Cloudinary)

1. Go to [cloudinary.com](https://cloudinary.com) → Create account
2. Go to Settings → Upload → Create unsigned upload preset
3. Copy `.env.example` to `.env.local`
4. Add your cloud name and preset:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
   ```
5. Upload images via Cloudinary dashboard or their upload widget
6. Copy the public ID (e.g., `experiences/hackathon-2026`) and use with image presets

> **Pro Tip:** Always use `alt` text that describes the image. For empty state placeholders like "no image yet", use descriptive alt like "Event group photo placeholder".

---

## Spacing

Consistent spacing makes everything look polished. We follow a simple scale.

### Spacing Scale

| Name | Value | Tailwind | Use For |
|------|-------|----------|---------|
| Tight | 4px | `gap-1`, `p-1` | Icon-to-text, badge padding |
| Small | 8px | `gap-2`, `p-2` | Between related elements |
| Base | 16px | `gap-4`, `p-4` | Standard padding, card content |
| Section | 24px | `gap-6`, `p-6` | Between sections, larger cards |
| Large | 32px+ | `gap-8`, `p-8` | Major section breaks |
| XL | 64px+ | `gap-16`, `p-16` | Hero padding, page margins |

### Common Patterns

**Card internal padding:**
```tsx
<div className="p-4 sm:p-6">Content here</div>
```

**Grid gaps:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
```

**Section spacing:**
```tsx
<section className="py-16 px-4 sm:px-6 lg:px-8">
```

**Container max-width:**
```tsx
<div className="max-w-5xl mx-auto">
```

> **Pro Tip:** Always use responsive spacing (`sm:`, `lg:` prefixes). Mobile needs less padding than desktop. Test on both.

---

## Quick Reference Cheatsheet

```
COLOR CLASSES          TYPOGRAPHY
─────────────────────────────────────────
bg-background          font-display (Outfit)
bg-foreground          font-sans (Inter - default)
bg-primary             text-xs/sm/base/lg/xl/2xl/3xl/4xl
bg-secondary           font-medium/bold
bg-muted              

ICON SIZES             SPACING
─────────────────────────────────────────
h-4 w-4  (small)       p-1 / gap-1 (tight)
h-5 w-5  (medium)      p-2 / gap-2 (small)
h-6 w-6  (large)       p-4 / gap-4 (base)
h-8 w-8  (x-large)     p-6 / gap-6 (section)

ANIMATION SPEED        IMPORTANT FILES
─────────────────────────────────────────
0.15-0.2s (snappy)     app/globals.css (colors, tokens)
0.3-0.5s (smooth)      lib/cloudinary.ts (images)
0.6-1s  (dramatic)    components/sections/ (UI)
```

---

## Key Files to Know

| File | What It Does |
|------|-------------|
| `app/globals.css` | Design tokens (colors, radius), font-display class |
| `app/layout.tsx` | Font loading, root layout |
| `lib/cloudinary.ts` | Image optimization helpers |
| `lib/utils.ts` | `cn()` utility for class merging |
| `tailwind.config.ts` | Tailwind theme extension |

---

Last updated: 2026-04-22
