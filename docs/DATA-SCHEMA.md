# Portfolio Data Schema Documentation

## Table of Contents

- [Overview](#overview)
- [Experience Interface](#experience-interface)
- [Project Interface](#project-interface)
- [Achievement Interface](#achievement-interface)
- [Validation Rules](#validation-rules)
- [Current Issues & Deprecations](#current-issues--deprecations)

---

## Overview

All data structures are defined in `lib/types/index.ts`. Data files in `lib/data/` contain actual entries.

**Design Principles (KISS, DRY, Code Reusability):**

- Use shared `FilterType` and `AchievementFilterType` for consistent filtering
- Article modal fields (`tags`, `showGallery`, `galleryImages`, `heroImage`) are reused across all interfaces
- URL fields follow Cloudinary convention for image optimization

---

## Experience Interface

```typescript
export interface Experience {
  // Core Identification
  id: string;                    // Unique identifier (e.g., 'exp-1')
  title: string;                 // Experience title
  type: 'hackathon' | 'event' | 'community' | 'work';  // Filter category
  date: string;                  // Format: YYYY-MM-DD

  // Role Information
  mainRole: string;              // Primary role (REQUIRED)
  extraRoles?: string[];         // Additional roles
  /** @deprecated Use mainRole + extraRoles instead */
  roles: string[];               // Duplicate of mainRole+extraRoles, kept for backward compatibility

  // Content
  highlight: string;             // Short summary (1-2 sentences) - ⚠️ NOT RENDERED IN UI
  content?: string;              // Full markdown content for article modal

  // Media
  photos: string[];              // Array of image URLs
  reels: string[];               // Array of video reel URLs
  youtubeVideo?: string;         // ⚠️ NOT RENDERED IN UI

  // Metrics
  kpi?: string;                  // Key performance indicator (e.g., 'Top 10 Finalist')

  // Article Modal (shared pattern)
  tags?: string[];
  showGallery?: boolean;
  galleryImages?: string[];
  heroImage?: string;
  images?: string[];            // Legacy field, use galleryImages
}
```

### Field Classification

| Field | Type | Required | Default | Purpose |
|-------|------|----------|---------|---------|
| `id` | `string` | Yes | — | Unique identifier |
| `title` | `string` | Yes | — | Display title |
| `type` | `FilterType` | Yes | — | Category for filtering |
| `date` | `string` | Yes | — | YYYY-MM-DD format |
| `mainRole` | `string` | Yes | — | Primary role |
| `extraRoles` | `string[]` | No | `[]` | Additional roles |
| `roles` | `string[]` | Yes | — | **DEPRECATED** - Use `mainRole` + `extraRoles` |
| `highlight` | `string` | Yes | — | Summary (not displayed in UI) |
| `content` | `string` | No | — | Markdown for modal |
| `photos` | `string[]` | Yes | `[]` | Preview images |
| `reels` | `string[]` | No | `[]` | Video reels |
| `youtubeVideo` | `string` | No | — | YouTube URL (not rendered) |
| `kpi` | `string` | No | — | Key metric |
| `tags` | `string[]` | No | — | Search tags |
| `showGallery` | `boolean` | No | `false` | Show gallery in modal |
| `galleryImages` | `string[]` | No | — | Full gallery images |
| `heroImage` | `string` | No | — | Modal hero image |
| `images` | `string[]` | No | — | Legacy, use galleryImages |

### Example

```typescript
{
  id: 'exp-1',
  title: 'National Hackathon 2024',
  type: 'hackathon',
  date: '2024-11-15',
  kpi: 'Top 10 Finalist out of 200+ teams',
  mainRole: 'Full-Stack Developer',
  extraRoles: ['UI Designer', 'Presenter'],
  roles: ['Full-Stack Developer', 'UI Designer', 'Presenter'],
  highlight: 'Built a real-time disaster response platform in 48 hours using Next.js and WebSockets.',
  content: `Led the technical development of an AI-powered disaster coordination system...`,
  photos: [
    'https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/samples/landscapes/architecture-signs.jpg',
  ],
  reels: [],
  youtubeVideo: undefined,
  tags: ['Hackathon', 'AI/ML', 'Real-time'],
  showGallery: true,
  galleryImages: [/* ... */],
  heroImage: 'https://res.cloudinary.com/demo/image/upload/...',
}
```

---

## Project Interface

```typescript
export interface Project {
  // Core Identification
  id: string;                    // Unique identifier (e.g., 'proj-1')
  title: string;                 // Project title
  type: 'web3' | 'ai' | 'general';  // Filter category
  description: string;           // Short description for cards
  techStack: string[];           // Technology tags

  // Role & Content
  role: string;                  // Project role
  highlight: string;              // Short achievement summary
  content?: string;              // Full markdown for article modal

  // Links
  githubUrl?: string;            // Repository URL
  demoUrl?: string;              // Live demo URL
  youtubeUrl?: string;           // Video URL

  // Media
  photos: string[];              // Image gallery
  thumbnail?: string;            // Card thumbnail

  // Legacy link fields (use links instead)
  links?: {
    demo?: string;
    github?: string;
  };

  // Article Modal (shared pattern)
  tags?: string[];
  showGallery?: boolean;
  galleryImages?: string[];
}
```

### Field Classification

| Field | Type | Required | Default | Purpose |
|-------|------|----------|---------|---------|
| `id` | `string` | Yes | — | Unique identifier |
| `title` | `string` | Yes | — | Display title |
| `type` | `ProjectFilterType` | Yes | — | Category |
| `description` | `string` | Yes | — | Card description |
| `techStack` | `string[]` | Yes | — | Tech badges |
| `role` | `string` | Yes | — | Your role |
| `highlight` | `string` | Yes | — | Key achievement |
| `content` | `string` | No | — | Markdown for modal |
| `githubUrl` | `string` | No | — | GitHub link |
| `demoUrl` | `string` | No | — | Demo link |
| `youtubeUrl` | `string` | No | — | YouTube video |
| `photos` | `string[]` | Yes | `[]` | Image gallery |
| `thumbnail` | `string` | No | — | Card image |
| `links` | `object` | No | — | Grouped links |
| `tags` | `string[]` | No | — | Search tags |
| `showGallery` | `boolean` | No | `false` | Show gallery |
| `galleryImages` | `string[]` | No | — | Full gallery |

### Example

```typescript
{
  id: 'proj-1',
  title: 'DisasterPulse',
  type: 'ai',
  description: 'Real-time disaster response coordination platform with AI-powered resource routing.',
  techStack: ['Next.js', 'TypeScript', 'WebSocket', 'PostgreSQL', 'TensorFlow.js'],
  role: 'Lead Developer',
  highlight: 'Processed 10,000+ emergency reports and coordinated 500+ rescue team deployments.',
  content: `## About DisasterPulse...`,
  githubUrl: 'https://github.com/example/disaster-pulse',
  demoUrl: 'https://disaster-pulse-demo.vercel.app',
  photos: [/* ... */],
  thumbnail: 'https://res.cloudinary.com/demo/image/upload/...',
  links: {
    demo: 'https://disaster-pulse-demo.vercel.app',
    github: 'https://github.com/example/disaster-pulse',
  },
  tags: ['Hackathon Winner', 'AI/ML', 'Real-time'],
  showGallery: true,
  galleryImages: [/* ... */],
}
```

---

## Achievement Interface

```typescript
export interface Achievement {
  // Core Identification
  id: string;                    // Unique identifier (e.g., 'ach-1')
  title: string;                 // Achievement title
  type: 'certificate' | 'hackathon_win' | 'recognition';  // Filter category
  date: string;                  // Format: YYYY-MM-DD

  // Content
  highlight: string;             // Short summary
  content?: string;              // Full markdown for article modal
  issuer?: string;               // Issuing organization

  // Certificate
  certificateUrl?: string;       // PDF URL
  certificateImage?: string;     // Certificate image

  // Hackathon-specific
  projectSubmitted?: string;     // Project name submitted
  teamInfo?: string[];           // Team members
  keyAchievements?: string[];    // Bullet achievements

  // Media
  photos: string[];              // Event/project photos

  // Article Modal (shared pattern)
  tags?: string[];
  showGallery?: boolean;
  galleryImages?: string[];
  heroImage?: string;
}
```

### Field Classification

| Field | Type | Required | Default | Purpose |
|-------|------|----------|---------|---------|
| `id` | `string` | Yes | — | Unique identifier |
| `title` | `string` | Yes | — | Display title |
| `type` | `AchievementFilterType` | Yes | — | Category |
| `date` | `string` | Yes | — | YYYY-MM-DD |
| `highlight` | `string` | Yes | — | Summary |
| `content` | `string` | No | — | Markdown for modal |
| `issuer` | `string` | No | — | Issuing body |
| `certificateUrl` | `string` | No | — | Cert PDF link |
| `certificateImage` | `string` | No | — | Cert image |
| `projectSubmitted` | `string` | No | — | Hackathon project |
| `teamInfo` | `string[]` | No | — | Team members |
| `keyAchievements` | `string[]` | No | — | Achievement bullets |
| `photos` | `string[]` | Yes | `[]` | Event photos |
| `tags` | `string[]` | No | — | Search tags |
| `showGallery` | `boolean` | No | `false` | Show gallery |
| `galleryImages` | `string[]` | No | — | Full gallery |
| `heroImage` | `string` | No | — | Modal hero |

### Example

```typescript
{
  id: 'ach-5',
  title: 'SamaBlockDev Hackathon Winner',
  type: 'hackathon_win',
  date: '2024-06-10',
  issuer: 'SamaBlock',
  highlight: 'First place in a 48-hour blockchain development competition building a decentralized application.',
  content: `Built a DeFi dashboard with wallet integration...`,
  keyAchievements: [
    'First Place - 50+ competing teams',
    'Built full-stack dApp in 48 hours',
    'Integrated Web3 wallet and smart contracts',
  ],
  photos: [/* ... */],
  tags: ['Hackathon', 'Web3', 'Winner'],
  heroImage: 'https://res.cloudinary.com/demo/image/upload/...',
}
```

---

## Validation Rules

### ID Uniqueness

- Must be unique across **all** data types
- Prefix convention:
  - Experience: `exp-*` (e.g., `exp-1`)
  - Project: `proj-*` (e.g., `proj-1`)
  - Achievement: `ach-*` (e.g., `ach-1`)

### Date Format

- **Required format:** `YYYY-MM-DD` (ISO 8601)
- Used for: `Experience.date`, `Achievement.date`
- Example: `'2024-11-15'` (November 15, 2024)

### URL Arrays (`photos`, `reels`, `galleryImages`)

- Must be valid URLs or Cloudinary paths
- Empty arrays allowed: `[]`
- Photos commonly use Cloudinary transformation syntax:
  ```
  https://res.cloudinary.com/{cloud}/image/upload/w_600,h_400,c_fill/{public_id}
  ```

### Type Enums

| Interface | Enum Values |
|-----------|-------------|
| `Experience.type` | `'hackathon'` \| `'event'` \| `'community'` \| `'work'` |
| `Project.type` | `'web3'` \| `'ai'` \| `'general'` |
| `Achievement.type` | `'certificate'` \| `'hackathon_win'` \| `'recognition'` |

---

## Current Issues & Deprecations

### 1. `highlight` Field Not Rendered in UI

**Status:** Defined in all interfaces but not displayed in the UI.

**Impact:** Users see empty summary cards or must open modal to read content.

**Recommendation:** Either render `highlight` in the card/list view or remove from interface.

### 2. `youtubeVideo` Field Not Rendered

**Status:** `Experience.youtubeVideo` exists but is not rendered anywhere.

**Impact:** Video content cannot be displayed.

**Recommendation:** Implement YouTube embed rendering or remove field.

### 3. `roles` vs `mainRole`/`extraRoles` Confusion

**Status:** `roles` is marked `@deprecated` but is **required** in the interface.

**Current State:**

```typescript
mainRole: string;              // Primary role (REQUIRED)
extraRoles?: string[];         // Additional roles
/** @deprecated Use mainRole + extraRoles instead */
roles: string[];              // Duplicate - REQUIRED
```

**Problem:**

- Data has redundant entries (e.g., `mainRole: 'Full-Stack Developer'`, `extraRoles: ['UI Designer']`, `roles: ['Full-Stack Developer', 'UI Designer']`)
- `roles` is marked deprecated but is required
- Logic must derive `roles` from `mainRole` + `extraRoles`

**Recommendation:**

```typescript
// Option A: Keep both (current)
roles: string[];           // Required but deprecated
mainRole: string;          // Primary
extraRoles?: string[];     // Additional

// Option B: Remove deprecated field
// Update Experience to only have:
mainRole: string;
extraRoles?: string[];
```

### 4. Duplicate Link Fields in Project

**Status:** Both legacy and new link fields exist.

```typescript
githubUrl?: string;        // Legacy
demoUrl?: string;          // Legacy
links?: {
  demo?: string;
  github?: string;
};
```

**Recommendation:** Consolidate to `links` object and remove legacy fields.

### 5. Legacy `images` Field

**Status:** `Experience.images` exists alongside `galleryImages`.

**Recommendation:** Use `galleryImages` only, remove `images`.

---

## Shared Article Modal Pattern

All three interfaces share the same article modal fields:

```typescript
{
  // Modal content
  tags?: string[];
  showGallery?: boolean;
  galleryImages?: string[];
  heroImage?: string;
}
```

This pattern enables consistent modal rendering across Experiences, Projects, and Achievements.
