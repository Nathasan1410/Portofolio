# AI Content Manifest - Portfolio

**Project:** Nathanael Santoso's Portfolio  
**Path:** `D:\Projekan\Personal\My-digital-namecard`  
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Radix UI, react-icons, Cloudinary

---

## 1. File Structure Map

```
portfolio/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main page (Hero + TabNav + modals)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── experience/[id]/          # Dynamic route for experience detail
│   │   └── page.tsx              # Static params generation, redirects to /
│   ├── projects/[id]/            # Dynamic route for project detail
│   │   └── page.tsx              # (placeholder - "coming soon")
│   ├── achievements/[id]/         # Dynamic route for achievement detail
│   │   └── page.tsx              # (placeholder - "coming soon")
│   └── work/
│       └── page.tsx              # Placeholder page
│
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/                 # Main page sections
│   │   ├── Hero.tsx              # Hero section with name/roles
│   │   ├── TabNav.tsx            # Tab navigation (Radix Tabs)
│   │   ├── SocialHighlightsBar.tsx
│   │   │
│   │   ├── About/                # About section
│   │   │   ├── index.tsx
│   │   │   ├── constants.ts
│   │   │   ├── ExperienceItem.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── TechStackGrid.tsx
│   │   │   └── variants.ts
│   │   │
│   │   ├── Experience/           # Experience section
│   │   │   ├── index.ts
│   │   │   ├── ExperienceGrid.tsx     # Filter/view mode controls
│   │   │   ├── ExperienceCard.tsx     # Card display component
│   │   │   ├── ExperienceTimeline.tsx # Timeline display
│   │   │   ├── ExperiencePopup.tsx    # ⚠️ DEFINED BUT NOT USED
│   │   │   ├── ExperiencePopupCarousel.tsx
│   │   │   └── ExperienceArticleModal.tsx # ACTUAL modal used
│   │   │
│   │   ├── Projects/             # Projects section
│   │   │   ├── index.ts
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectPopup.tsx
│   │   │   ├── ProjectArticleModal.tsx
│   │   │   └── TechBadge.tsx
│   │   │
│   │   └── Achievements/         # Achievements section
│   │       ├── index.ts
│   │       ├── AchievementGrid.tsx
│   │       ├── AchievementCard.tsx
│   │       ├── AchievementPopup.tsx
│   │       └── AchievementArticleModal.tsx
│   │
│   └── ui/                       # shadcn/ui components + custom
│       ├── FullScreenDialog.tsx   # Custom Radix Dialog wrapper
│       ├── MediaCarousel.tsx     # Image/video carousel
│       ├── TypeBadge.tsx         # Experience type badge
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── separator.tsx
│       ├── tabs.tsx
│       └── ... (50+ shadcn components)
│
├── lib/
│   ├── data/                     # Static data
│   │   ├── index.ts              # Re-exports all data
│   │   ├── experiences.ts        # Experience entries
│   │   ├── projects.ts           # Project entries
│   │   ├── achievements.ts       # Achievement entries
│   │   ├── about.ts
│   │   └── socials.ts
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   │
│   ├── cloudinary.ts             # Cloudinary URL helpers
│   ├── images.ts                 # Image URL utilities
│   └── utils.ts                  # cn() helper, etc.
│
├── public/
│   ├── images/                   # Local static images
│   │   ├── achievements/
│   │   ├── certificates/
│   │   ├── experiences/
│   │   ├── profile/
│   │   └── projects/
│   └── cv/
│       └── README.txt
│
└── hooks/                        # Custom React hooks (if any)
```

---

## 2. Data Flow

### Experience Data Flow

```
lib/data/experiences.ts
    │
    │  exports: experiences[] (Experience[])
    ▼
components/sections/Experience/ExperienceGrid.tsx
    │
    │  props: { experiences, onSelectExperience }
    │  renders: ExperienceTimeline OR ExperienceCard[]
    ▼
components/sections/Experience/ExperienceCard.tsx
    │
    │  props: { experience, onClick }
    │  displays: title, date, kpi, mainRole, extraRoles, photos[0]
    │  onClick → calls onSelectExperience(experience)
    ▼
app/page.tsx (parent)
    │
    │  useState: selectedExperience
    │  passes to: ExperienceArticleModal
    ▼
components/sections/Experience/ExperienceArticleModal.tsx
    │
    │  props: { isOpen, onClose, experience }
    │  displays: title, date, kpi, roles[], highlight, content, photos, youtubeVideo
```

### Key Insight
There are TWO modals defined:
- `ExperiencePopup.tsx` - Uses `FullScreenDialog` (Radix), displays content but NOT `highlight` or `youtubeVideo`
- `ExperienceArticleModal.tsx` - Custom modal (not Radix), displays `highlight` AND `youtubeVideo`, more featured

**The app uses `ExperienceArticleModal`**, not `ExperiencePopup`.

---

## 3. Image Sources

### Local Images
```
public/images/
├── achievements/      # Achievement-related images
├── certificates/      # Certificate images
├── experiences/       # Experience-related images
├── profile/           # Profile pictures, avatar
└── projects/          # Project screenshots
```

### Cloudinary CDN Pattern
```typescript
// lib/cloudinary.ts
const CDN = 'https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill'

// Usage in data files:
photos: [
  `${CDN}/samples/landscapes/architecture-signs.jpg`,
]

// Presets available:
imagePresets.thumbnail(publicId)  // 400x300
imagePresets.card(publicId)       // 600x400
imagePresets.hero(publicId)        // 1200x800
imagePresets.avatar(publicId)      // 200x200 thumb
imagePresets.certificate(publicId) // 1200x900
```

### Image Helper Functions (`lib/images.ts`)
```typescript
isCloudinaryUrl(url: string): boolean
getOptimizedUrl(url: string, options?): string
extractPublicIdFromUrl(url: string): string | null
```

---

## 4. Component Hierarchy

```
app/page.tsx
├── Hero
├── TabNav (Radix Tabs)
│   └── TabsPrimitive.Root
│       └── TabsPrimitive.List
│           └── TabsPrimitive.Trigger × 5
│       └── TabsPrimitive.Content × 5
│           ├── About
│           ├── ExperienceGrid
│           │   └── ExperienceTimeline OR ExperienceCard[]
│           ├── ProjectGrid
│           │   └── ProjectCard[]
│           ├── AchievementGrid
│           │   └── AchievementCard[]
│           └── Work (placeholder)
├── ExperienceArticleModal (overlay)
└── AchievementArticleModal (overlay)
```

### Shared Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `cn()` | `lib/utils.ts` | className merger (clsx + tailwind-merge) |
| `TypeBadge` | `components/ui/TypeBadge.tsx` | Experience type indicator |
| `FullScreenDialog` | `components/ui/FullScreenDialog.tsx` | Radix Dialog wrapper |
| `MediaCarousel` | `components/ui/MediaCarousel.tsx` | Image/video carousel |
| `FilterBar` | Inline in ExperienceGrid | Filter buttons |

---

## 5. State Management

### Tab Navigation
```typescript
// app/page.tsx
const [activeTab, setActiveTab] = useState<string>("about")

// Hash-based routing
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1)
    if (hash && ["about", "experience", "projects", "achievements", "work"].includes(hash)) {
      setActiveTab(hash)
    }
  }
  window.addEventListener("hashchange", handleHashChange)
}, [])

// TabNav uses Radix Tabs
<TabsPrimitive.Root defaultValue={activeTab}>
```

### Popup/Modal State
```typescript
// app/page.tsx
const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

// Passed to modals
<ExperienceArticleModal
  experience={selectedExperience}
  isOpen={!!selectedExperience}
  onClose={() => setSelectedExperience(null)}
/>
```

### Radix Dialog Usage
```typescript
// FullScreenDialog.tsx wraps Radix Dialog primitives
import * as DialogPrimitive from '@radix-ui/react-dialog'

// Structure:
FullScreenDialog (DialogPrimitive.Root)
├── FullScreenDialogPortal
│   ├── FullScreenDialogOverlay (backdrop blur)
│   └── FullScreenDialogContent (modal box with X close button)
```

### URL Params for [id] Routes
```typescript
// app/experience/[id]/page.tsx
export async function generateStaticParams() {
  return experiences.map((exp) => ({ id: exp.id }))
}
// Note: Currently redirects to '/' if not found
```

---

## 6. Known Quirks/Gotchas

### 6.1 ExperiencePopup vs ExperienceArticleModal
- **`ExperiencePopup.tsx`** exists but is NOT exported from `components/sections/Experience/`
- **`ExperienceArticleModal`** is the ACTUAL modal component used in `app/page.tsx`
- `ExperiencePopup` uses Radix `FullScreenDialog`
- `ExperienceArticleModal` uses custom modal with `fixed inset-0` positioning

### 6.2 youtubeVideo Field
- **Defined in type:** `Experience.youtubeVideo?: string`
- **ExperiencePopup:** Renders it (line 72-81)
- **ExperienceArticleModal:** Renders it (line 133-145)
- But the `experiences.ts` data has `youtubeVideo: undefined` for all entries

### 6.3 highlight Field
- **Defined in type:** `Experience.highlight: string`
- **ExperienceCard:** NOT displayed (only shows mainRole, kpi)
- **ExperiencePopup:** NOT displayed
- **ExperienceArticleModal:** Displayed at line 93 (`{experience.highlight}`)
- This is intentional per design - highlight is "teaser" text for article modal

### 6.4 Type Mismatch: roles[] vs mainRole/extraRoles
```typescript
// lib/types/index.ts
interface Experience {
  mainRole: string          // Required
  extraRoles?: string[]     // Optional
  roles: string[]           // Required - array of all roles
}
```
- **Card/Popup display:** Uses `mainRole` + `extraRoles` (line 82-91 in Card, 133-143 in Popup)
- **ArticleModal display:** Uses `roles[]` directly (line 97-101)
- `mainRole + extraRoles` should equal `roles` but data shows redundancy

### 6.5 Work Tab is Placeholder
```typescript
// app/page.tsx line 78
{
  value: "work",
  label: "Work",
  icon: <FaLaptopCode className="h-4 w-4" />,
  content: <div>Work content coming soon</div>,
}
```
- Tab exists but has no real content
- Work filter exists in ExperienceGrid (`type: 'work'`) but no dedicated page

### 6.6 Experience Timeline vs Cards View
```typescript
// ExperienceGrid.tsx
const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('timeline')
```
- Default view is timeline
- User can toggle between timeline and cards
- Both render the same `ExperienceCard` component

### 6.7 Cloudinary Demo URLs
```typescript
// lib/data/experiences.ts line 3
const CDN = 'https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill'
```
- Uses Cloudinary demo account, not production
- `CLOUDINARY_CLOUD_NAME` defaults to `'your_cloud_name'` if env var not set

---

## Quick Reference for AI Agents

### Adding New Experience
1. Add entry to `lib/data/experiences.ts`
2. Follow existing pattern with `id`, `title`, `type`, `date`, `mainRole`, `extraRoles`, `roles`, `highlight`, `content`, `photos`
3. Ensure `type` is one of: `'hackathon' | 'event' | 'community' | 'work'`

### Modifying Tab Order
- Edit `tabs` array in `app/page.tsx` lines 39-80

### Changing Popup Behavior
- For Radix-based popup: modify `ExperiencePopup.tsx`
- For article modal: modify `ExperienceArticleModal.tsx`
- Currently only `ExperienceArticleModal` is used

### Image Optimization
```typescript
import { getOptimizedUrl } from '@/lib/images'
const optimized = getOptimizedUrl(originalUrl, { width: 800 })
```
