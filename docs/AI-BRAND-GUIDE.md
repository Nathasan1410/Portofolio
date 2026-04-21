# AI Brand Guidelines - Portfolio Website

> **Purpose:** This doc serves as single source of truth buat all design decisions. AI agents can parse this without needing konteks dari codebase. Simpen di `docs/AI-BRAND-GUIDE.md` dan update cada kali ada design changes.

---

## 1. Brand Philosophy

### Core Identity
- **Aesthetic:** Tech-forward luxury — elegant tapi nggak kaku, clean tapi punya character
- **Vibe:** Nih portfolio gw sebagai developer Web3/AI yang juga content creator. Jadianya nggak nerima actcool tapi juga bukan boring tech bro.
- **Mood:** Confident, approachable, forward-thinking

### Design Principles
```
KISS → Keep it Simple Stupid
     → Nggak boleh ada yang unnecessary
     → Every element must earn its place

DRY → Don't Repeat Yourself
    → Reusable components, consistent patterns
    → Component file names MUST reflect their purpose

Code Reusability → Composability over duplication
                → shadcn/ui primitives as base, compose jadi larger components
                → Section components self-contained, no cross-imports
```

### Indonesian Essence (Casual Tone)
- Explain with "gw", "kek", "nanti" where natural in conversation
- But code/labels tetap professional (English)
- Cultural nuance: modern Indonesian youth — tech-savvy, globally aware, locally rooted

---

## 2. Color Tokens

### CSS Variables Location
`app/globals.css` lines 6-35, `tailwind.config.ts` lines 14-67

### Backgrounds
```css
--background: hsl(0 0% 100%)      /* #FFFFFF - Pure white */
--muted: hsl(0 0% 96%)            /* #F5F5F5 - Off-white */
--card: hsl(0 0% 100%)             /* #FFFFFF - Card surfaces */
--popover: hsl(0 0% 100%)          /* #FFFFFF - Popup overlays */
```

### Primary Palette (Periwinkle/Sage)
```css
--primary: hsl(220 25% 65%)        /* #9BA5C7 - Main brand color */
--primary-foreground: hsl(0 0% 100%) /* #FFFFFF - Text on primary */
--secondary: hsl(100 15% 70%)      /* #A3C49A - Sage green */
--secondary-foreground: hsl(0 0% 10%)
--accent: hsl(0 45% 75%)           /* #EBBFB0 - Dusty rose */
--accent-foreground: hsl(0 0% 10%)
```

### Tech Accents (Web3/AI Vibe)
```css
--tech-cyan: hsl(160 80% 70%)      /* #33E5C4 - Web3/DeFi accent */
--tech-purple: hsl(270 70% 75%)    /* #B099E0 - AI/ML accent */
--tech-blue: hsl(215 80% 65%)       /* #4B8FD9 - Secondary tech */
```

### Text Colors
```css
--foreground: hsl(0 0% 10%)       /* #1A1A1A - Near-black */
--muted-foreground: hsl(0 0% 45%) /* #737373 - Secondary text */
--card-foreground: hsl(0 0% 10%)
--popover-foreground: hsl(0 0% 10%)
```

### Utility Colors
```css
--border: hsl(0 0% 90%)            /* #E5E5E5 - Subtle borders */
--input: hsl(0 0% 90%)             /* #E5E5E5 - Input borders */
--ring: hsl(220 25% 65%)           /* #9BA5C7 - Focus rings */
--destructive: hsl(0 84% 60%)      /* #EF4444 - Error states */
```

### Chart Colors (For data viz if needed)
```css
--chart-1: hsl(220 25% 65%)        /* Primary */
--chart-2: hsl(100 15% 70%)       /* Secondary */
--chart-3: hsl(0 45% 75%)          /* Accent */
--chart-4: hsl(270 30% 75%)       /* Tech purple */
--chart-5: hsl(180 30% 60%)       /* Tech cyan */
```

### Usage Rules

| Token | Usage | DO | DON'T |
|-------|-------|-----|-------|
| `--primary` | Buttons, active states, focus rings | Use for primary CTAs | Use for large backgrounds |
| `--tech-cyan` | Web3 highlights, special badges | Use sparingly for emphasis | Use as main background |
| `--tech-purple` | AI/ML section highlights | Accent on feature cards | Flood entire sections |
| `--muted` | Section backgrounds, cards | Use for subtle separation | Use for text |
| `--accent` | Hover states, secondary emphasis | Use for hover feedback | Use as primary button |

---

## 3. Typography System

### Font Stack
```css
/* Display/Headings - Outfit */
font-family: var(--font-outfit), system-ui, sans-serif;

/* Body - Inter */
font-family: var(--font-inter), system-ui, sans-serif;
```

### Font Loading
`app/layout.tsx` imports next/font/google for Outfit + Inter with weights [400, 500, 600, 700]

### Scale (Tailwind classes)
```
Display:    text-5xl md:text-7xl lg:text-8xl  (Outfit, bold)
H1:         text-4xl md:text-5xl               (Outfit, semibold)
H2:         text-3xl md:text-4xl               (Outfit, semibold)
H3:         text-2xl md:text-3xl               (Outfit, medium)
H4:         text-xl md:text-2xl                 (Outfit, medium)
Body Large: text-lg                            (Inter, regular)
Body:       text-base                          (Inter, regular)
Small:      text-sm                            (Inter, regular)
Caption:    text-xs                            (Inter, medium)
```

### Font Weights
```css
/* In globals.css .font-display class */
font-display: Outfit (400-700)

/* Tailwind classes */
font-light:     300
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
```

### Line Heights
```
Display/H1:  leading-tight  (1.1)
H2/H3:       leading-snug  (1.25)
Body:        leading-normal (1.5)
Caption:     leading-relaxed (1.625)
```

---

## 4. Icon Usage

### Library
`react-icons` — Feather (Fi) for UI, FontAwesome (Fa) for brands

### Import Pattern
```typescript
// UI icons - Feather
import { FiMail, FiArrowDown, FiFileText, FiImage } from "react-icons/fi";

// Brand icons - FontAwesome
import { FaYoutube, FaTiktok, FaGithub, FaInstagram } from "react-icons/fa";

// Custom SVG inline for brand icons not in react-icons
// Example: X/Twitter logo in Hero.tsx lines 104-108
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
```

### Icon Sizing
```
UI Icons:    h-4 w-4  (16px) - inline buttons
             h-5 w-5  (20px) - navigation
             h-6 w-6  (24px) - social dock

Brand Icons:  h-6 w-6  (24px) - social dock
             h-8 w-8  (32px) - large displays
```

### DO/DON'T
```
DO:    Use Fi prefix for UI actions (mail, download, menu)
DO:    Use Fa prefix for social platforms (youtube, tiktok)
DO:    Inline custom SVG for brand logos not in react-icons
DON'T: Mix icon libraries (stick to Feather for UI)
DON'T: Use outlined/stroke icons where filled makes sense
```

---

## 5. Motion Philosophy

### Library
`framer-motion` — all animations via this, no CSS keyframes for UI

### Animation Variants Pattern
```typescript
// File: components/sections/Hero.tsx lines 12-26

// Container variants (stagger children)
const dockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Individual item variants
const socialButtonVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
};

// Hover states
const socialLinkHoverVariants = {
  hover: { scale: 1.15, y: -4 },
};
```

### Spring Configs
```typescript
// Subtle, responsive
const SOCIAL_ICON_TRANSITION = { duration: 0.2, ease: "easeInOut" as const };

// Bouncy for interactive elements
const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Smooth for page transitions
const smoothConfig = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};
```

### Core Animations

| Animation | Usage | Config |
|-----------|-------|--------|
| Fade in | Page load, modal open | `opacity: 0 → 1, duration: 0.3` |
| Slide up | List items, cards | `y: 20 → 0, opacity: 0 → 1, duration: 0.3` |
| Scale | Hover effects, buttons | `scale: 1 → 1.15, duration: 0.2` |
| Stagger | Grid items, nav items | `delay: index * 0.1, staggerChildren: 0.1` |

### Animation Usage in Components
```typescript
// Container with children stagger
<motion.div
  variants={dockVariants}
  initial="hidden"
  animate="visible"
  transition={{ delay: 0.3, duration: 0.5 }}
>
  {children}
</motion.div>

// Hover animations
<motion.a
  variants={socialLinkHoverVariants}
  initial="hidden"
  whileHover="hover"
  transition={SOCIAL_ICON_TRANSITION}
>
```

### Duration Tokens
```
instant:    0.1s  - micro interactions (button press)
fast:       0.2s  - hover states, icon animations
normal:     0.3s  - fades, slides
slow:       0.5s  - page transitions, modals
slower:     0.8s  - hero animations, entrance sequences
```

---

## 6. Image Standards

### Cloudinary Setup
`lib/cloudinary.ts` — utility for all image optimization

```typescript
// Environment variables
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

// Base URL
CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/image/upload'
```

### Predefined Presets
```typescript
// lib/cloudinary.ts lines 43-49
export const imagePresets = {
  thumbnail: (id) => getOptimizedImageUrl(id, { width: 400, height: 300 }),
  card:      (id) => getOptimizedImageUrl(id, { width: 600, height: 400 }),  // 3:2 ratio
  hero:      (id) => getOptimizedImageUrl(id, { width: 1200, height: 800 }),
  avatar:    (id) => getOptimizedImageUrl(id, { width: 200, height: 200, crop: 'thumb' }),
  certificate: (id) => getOptimizedImageUrl(id, { width: 1200, quality: 90 }),
}
```

### Aspect Ratios
```
Card images:     3:2  (600x400)
Thumbnails:      4:3  (400x300)
Hero:            3:2  (1200x800) or 16:9 (1920x1080)
Avatars:         1:1  (200x200) - circular via CSS
Video embeds:    16:9 (YouTube embed)
Certificates:    3:2  (1200x800)
```

### Fallback Strategy
```typescript
// In components, always handle missing images
function ExperienceCard({ experience }) {
  const [imgError, setImgError] = useState(false);

  return (
    <img
      src={imgError ? '/images/fallback.jpg' : experience.coverUrl}
      onError={() => setImgError(true)}
      alt={experience.title}
      className="object-cover"
    />
  );
}
```

### URL Pattern
```
https://res.cloudinary.com/{cloud_name}/image/upload/c_fill,w_600,h_400,q_auto,f_auto/{public_id}
```

---

## 7. Spacing & Timing Tokens

### Spacing Scale (Tailwind)
```
xs:   0.25rem  (4px)   - Tight internal spacing
sm:   0.5rem   (8px)   - Component internal gaps
md:   1rem     (16px)  - Between related elements
lg:   1.5rem   (24px)  - Section padding
xl:   2rem     (32px)  - Large section gaps
2xl:  3rem     (48px)  - Major section separation
3xl:  4rem     (64px)  - Hero padding
4xl:  6rem     (96px)  - Section vertical padding
```

### Border Radius
```css
--radius: 0.625rem (10px) - Cards, buttons
lg:  var(--radius)        - Default rounded
md:  calc(var(--radius) - 2px)  - Smaller elements
sm:  calc(var(--radius) - 4px)  - Tags, badges
full: 9999px - Pills, avatars
```

### Container Widths
```
max-w-[90vw]   mobile
max-w-[85vw]   tablet
max-w-[1200px] desktop
max-w-[1400px] large desktop
```

### Component Spacing
```
Card padding:    p-4 (mobile) → p-6 (desktop)
Section padding: px-4 py-8 (mobile) → px-8 py-16 (desktop)
Grid gaps:       gap-4 (mobile) → gap-6 (desktop)
```

### Animation Timing
```
Micro (hover):     100-200ms
Standard (fade):    200-300ms
Entrance (page):    300-500ms
Transition (modal): 400-600ms
```

---

## 8. Component Patterns

### Section Structure
```
components/sections/{SectionName}/
├── index.tsx          # Main component export
├── SectionName.tsx    # Component implementation
├── SectionNameCard.tsx
├── SectionNamePopup.tsx
├── constants.ts       # Data, variants, configs
└── variants.ts        # Animation variants if complex
```

### shadcn/ui Base Components
```
components/ui/
├── button.tsx
├── card.tsx
├── dialog.tsx
├── sheet.tsx
├── carousel.tsx
├── badge.tsx
├── tooltip.tsx
└── ... (full shadcn/ui inventory)
```

### Composition Pattern
```typescript
// BAD - duplicated logic
function ExperienceCard({ title, date, description, image }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <img src={image} className="w-full h-40 object-cover rounded-md" />
      <h3 className="font-semibold mt-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{date}</p>
      <p className="mt-1">{description}</p>
    </div>
  );
}

// GOOD - reusable, consistent
function ExperienceCard({ title, date, description, image }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <AspectRatio ratio={3/2}>
          <img src={image} className="object-cover w-full h-full" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
        <p className="mt-2 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
```

---

## 9. File Naming Conventions

### DO
```
components/sections/Hero.tsx          # PascalCase for components
components/ui/button.tsx              # kebab-case for utilities
lib/cloudinary.ts                     # kebab-case for libs
lib/data/experiences.ts              # kebab-case for data files
app/page.tsx                          # kebab-case for routes
```

### DON'T
```
components/Sections/Hero.tsx         # Don't use plural "Sections"
components/ui/Button.tsx              # Don't use PascalCase for ui
lib/cloudinaryUtils.ts               # Don't be redundant
```

---

## 10. DO's and DON'Ts

### DO
- Use CSS variables from globals.css for all colors
- Use `cn()` utility (`lib/utils.ts`) for conditional classes
- Compose shadcn/ui primitives for complex UI
- Use Framer Motion variants pattern for all animations
- Keep sections self-contained (no cross-imports)
- Use `aspect-ratio` component for image containers
- Handle missing images with fallback strategy
- Use semantic HTML (button, nav, header, main, section)
- Export section components from `components/sections/index.ts`

### DON'T
- Hardcode hex colors — use CSS variables
- Write custom CSS animations — use Framer Motion
- Duplicate component logic — extract to shared
- Import section components into other sections
- Use inline styles — use Tailwind classes
- Skip alt text on images
- Use !important in Tailwind — use CSS variables instead

---

## 11. Reference File Locations

### Design Tokens
```
app/globals.css                    # CSS variables, base styles
tailwind.config.ts                # Tailwind tokens, custom colors
app/layout.tsx                    # Font loading, font variables
```

### Core Components
```
components/layout/Header.tsx      # Navigation + mobile menu
components/layout/Footer.tsx      # Footer
components/sections/Hero.tsx       # Hero with social dock
components/sections/TabNav.tsx     # Tab navigation
components/sections/Experience/    # Experience cards, grid, popup, timeline
components/sections/Projects/      # Project cards, grid, popup
components/sections/Achievements/  # Achievement cards, grid, popup
```

### Utilities
```
lib/utils.ts                      # cn() function
lib/cloudinary.ts                 # Image optimization
lib/data/socials.ts               # Social links data
lib/data/experiences.ts           # Experience content
lib/data/projects.ts              # Project content
lib/data/achievements.ts          # Achievement content
```

### UI Components
```
components/ui/button.tsx
components/ui/card.tsx
components/ui/dialog.tsx
components/ui/carousel.tsx
components/ui/tabs.tsx
components/ui/tooltip.tsx
components/ui/sheet.tsx
... (shadcn/ui components)
```

---

*Last Updated: 2026-04-22*
*Maintain: Update this doc before making design changes to keep AI context accurate*