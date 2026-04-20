# Project Memory - Portfolio Development

## Last Updated
2026-04-21

## Project Overview
Personal portfolio website for **Nathanael Santoso** - Developer, Web3, AI, Yapper (content creator)

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- react-icons (Feather + FontAwesome)
- Cloudinary for image optimization

**Repo:** https://github.com/Nathasan1410/Portofolio

---

## User Profile

### Who They Are
- Developer with Web3 and AI focus
- Content creator / influencer ("Yapper")
- Active in hackathons and tech community events
- Has experience hosting events, speaking, community organizing

### Design Preferences
- **Light mode** base (white background)
- **Elegant/Luxury aesthetic** inspired by reference image
- **Muted color palette:** periwinkle, sage, dusty rose, lavender
- **Tech accents:** cyan/purple for Web3/AI vibe
- **Fonts:** Outfit (display/headings) + Inter (body)

### Communication Style
- Uses Indonesian slang ("gw", "nanti", "sampe", etc.)
- Direct, decisive
- Prefers delegation to sub-agents

---

## Current Project Structure

```
app/
├── layout.tsx              # Root layout with fonts
├── page.tsx                # Home with Hero + TabNav
├── globals.css             # Design tokens
├── work/page.tsx          # Work placeholder (NOT integrated as tab)
├── experience/[id]/        # Experience popup routes
├── projects/[id]/         # Projects popup routes
└── achievements/[id]/     # Achievements popup routes

components/
├── layout/
│   ├── Header.tsx         # MISSING social links!
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx           # Name + tagline + CV button (broken)
│   ├── TabNav.tsx         # 3 tabs: Projects, Experience, Achievements
│   ├── Experience/
│   │   ├── ExperienceCard.tsx
│   │   ├── ExperienceGrid.tsx
│   │   ├── ExperiencePopup.tsx
│   │   └── ExperiencePopupCarousel.tsx
│   ├── Projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectPopup.tsx
│   │   └── TechBadge.tsx
│   └── Achievements/
│       ├── AchievementCard.tsx
│       ├── AchievementGrid.tsx
│       └── AchievementPopup.tsx
└── ui/                    # shadcn/ui components

lib/
├── cloudinary.ts           # Image optimization utility
├── images.ts               # Image URL helpers
├── data/
│   ├── experiences.ts     # 4 placeholder entries
│   ├── projects.ts         # 4 placeholder entries
│   ├── achievements.ts     # 5 placeholder entries
│   └── index.ts
├── types/
│   └── index.ts           # TypeScript interfaces
└── utils.ts

public/images/
├── achievements/
├── certificates/
├── experiences/
├── profile/
└── projects/
```

---

## VERIFICATION STATUS

### DONE ✓
- [x] Tabbed navigation (Projects, Experience, Achievements)
- [x] Hero section with name, tagline, CV CTA
- [x] Experience popup with blog, photos carousel, reels carousel
- [x] Projects popup with YouTube embed, photos, GitHub/Demo links
- [x] Achievements popup with certificate viewer, photos
- [x] Light mode design with muted colors + tech accents
- [x] Framer Motion animations
- [x] Cloudinary utility setup
- [x] All icons converted to react-icons

### NOT DONE ✗
- [ ] **Header missing social links** - Only shows "Portfolio" text
- [ ] **Work tab not integrated** - Exists at `/work` but not in TabNav
- [ ] **CV Download button broken** - Just console.logs, no actual download
- [ ] **Tab order wrong** - Should be: Experience, Projects, Achievements, Work
- [ ] **Work filter missing** in ExperienceGrid

### BUGS
1. `youtubeVideo` in Experience data never rendered
2. `highlight` field in Experience/Projects/Achievements never displayed
3. Type mismatch: `roles[]` vs `mainRole`/`extraRoles` fields

---

## Data Structures

### Experience
```typescript
{
  id: string
  title: string           // e.g., "Coinvestasi Campus Tour 2026"
  type: 'hackathon' | 'event' | 'community' | 'work'
  date: string
  kpi: string            // e.g., "250+ Pendaftar"
  roles: string[]         // e.g., ["Host", "Crowd Control", "Runner"]
  highlight: string       // Markdown content (NOT USED currently)
  photos: string[]        // Cloudinary URLs
  reels: string[]         // YouTube URLs
  youtubeVideo?: string  // Full embed URL (NOT USED currently)
}
```

### Project
```typescript
{
  id: string
  title: string
  description: string
  techStack: string[]
  role: string
  highlight: string       // Markdown (NOT USED currently)
  githubUrl?: string
  demoUrl?: string
  photos: string[]
  youtubeVideo?: string  // YouTube embed URL
}
```

### Achievement
```typescript
{
  id: string
  title: string
  type: 'certificate' | 'hackathon_win' | 'recognition'
  date: string
  issuer?: string
  highlight: string       // (NOT USED - shows issuer instead)
  certificateUrl?: string
  photos: string[]
}
```

---

## Cloudinary Setup

**Status:** Utility created, not yet configured

**Next steps for user:**
1. Create account at cloudinary.com
2. Get cloud name and create unsigned upload preset
3. Copy `.env.example` to `.env.local`
4. Add credentials
5. Upload images and update data URLs

**Demo URLs** currently in use (will break if Cloudinary changes demo account)

---

## Next Session Priorities

1. **Fix critical issues:**
   - Add social links to Header
   - Integrate Work tab in TabNav
   - Fix CV Download functionality

2. **Fix tab order:**
   - Should be: Experience → Projects → Achievements → Work

3. **Fix data display:**
   - Render `highlight` fields in popups
   - Fix YouTube video in Experience popup

4. **Add real content:**
   - Replace placeholder data with actual experiences/projects
   - Upload real photos to Cloudinary

5. **Future enhancements:**
   - Dark mode toggle
   - Contact form
   - Blog section
   - Animations refinement

---

## Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Push to GitHub
git add . && git commit -m "message" && git push

# Install dependencies
npm install
```

---

## User Preferences (Captured from Conversation)

- Prefers delegation to sub-agents (doesn't want me writing code directly)
- Wants snappy/performant portfolio
- Chose Cloudinary over GDrive for images
- Likes the reference aesthetic (luxury, elegant, playful)
- Wants both scrolling AND tiles view for experiences (chose scrolling default)
- Popup format for experiences with blog + photos + reels
- Horizontal carousels below blog content
- Real name: Nathanael Santoso
