# Human Content Manifest

Your pocket guide to updating your portfolio without breaking things.

---

## Quick File Tree

These are the ONLY files you need to touch:

```
portfolio/
├── lib/data/
│   ├── experiences.ts    # Your experience/activity entries
│   ├── projects.ts       # Your project entries
│   └── achievements.ts   # Your certificates & awards
│
├── public/images/
│   ├── experiences/      # Drop experience images here
│   ├── projects/         # Drop project images here
│   └── achievements/     # Drop achievement images here
│
└── components/sections/
    ├── Experience/       # (Do not touch unless adding new features)
    ├── Projects/         # (Do not touch unless adding new features)
    └── Achievements/     # (Do not touch unless adding new features)
```

---

## How to Update Experiences

### Step 1: Edit the Data

Open `lib/data/experiences.ts`. Each experience follows this pattern:

```typescript
{
  id: "exp-1",           // Unique ID - must match no other experience
  title: "National Hackathon 2024",
  type: "hackathon",      // Options: hackathon | event | community | work
  date: "2024-11-15",
  kpi: "Top 10 Finalist out of 200+ teams",  // Key highlight stat
  mainRole: "Full-Stack Developer",
  extraRoles: ["UI Designer", "Presenter"],  // Optional, can omit
  roles: ["Full-Stack Developer", "UI Designer", "Presenter"],
  highlight: "Short description for the card.",
  content: `Markdown content here.`,
  photos: [
    "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/samples/landscapes/architecture-signs.jpg"
  ],
  tags: ["Hackathon", "AI/ML", "Real-time"],
  heroImage: "...",       // Main image shown in popup
}
```

### Step 2: Add Images

1. Save your image to `public/images/experiences/`
2. Upload to Cloudinary (cloudinary.com)
3. Copy the image URL
4. Paste into the `photos` array in your data file

**Your turn:** Drop your image in `public/images/experiences/` and update the URL.

---

## How to Update Projects

### Step 1: Edit the Data

Open `lib/data/projects.ts`. Each project follows this pattern:

```typescript
{
  id: "proj-1",           // Unique ID
  title: "DisasterPulse",
  type: "ai",              // Options: ai | web3 | general
  description: "Brief one-liner.",
  techStack: ["Next.js", "TypeScript", "WebSocket"],
  role: "Lead Developer",
  highlight: "Key achievement or impact stat.",
  content: `Markdown content with details.`,
  githubUrl: "https://github.com/...",
  demoUrl: "https://your-demo.vercel.app",  // Can be undefined
  photos: ["...", "..."],
  thumbnail: "...",        // Main image
  tags: ["Hackathon Winner", "AI/ML"],
  links: {
    demo: "https://...",
    github: "https://...",
  },
}
```

### Step 2: Add Images

1. Save your image to `public/images/projects/`
2. Upload to Cloudinary
3. Copy URL and paste into `photos` or `thumbnail`

**Your turn:** Add your project screenshots to `public/images/projects/`.

---

## How to Update Achievements

### Step 1: Edit the Data

Open `lib/data/achievements.ts`. Each achievement follows this pattern:

```typescript
{
  id: "ach-2",             // Unique ID
  title: "AWS Certified Solutions Architect",
  type: "certificate",    // Options: certificate | recognition | hackathon_win
  date: "2024-08-22",
  issuer: "Amazon Web Services",
  highlight: "What this means for you.",
  content: `Markdown details about the achievement.`,
  certificateUrl: "https://...",  // Link to PDF if you have one
  certificateImage: "...",        // Image of certificate
  photos: ["..."],
  tags: ["Certificate", "AWS", "Cloud"],
  heroImage: "...",
}
```

### Step 2: Add Images

1. Save your image to `public/images/achievements/`
2. Upload to Cloudinary
3. Paste URL into `photos` or `heroImage`

**Your turn:** Add your achievement images to `public/images/achievements/`.

---

## Adding New Sections (Advanced)

### Copy-Paste Pattern

If you want to add a completely new section (e.g., "Blog"):

1. **Copy an existing section folder** (e.g., `components/sections/Projects`)
2. **Rename it** (e.g., `components/sections/Blog`)
3. **Update the files inside** to match your new data type
4. **Create new data file** `lib/data/blog.ts`
5. **Add to TabNav in `app/page.tsx`:**

```typescript
{
  value: "blog",
  label: "Blog",
  icon: <FaBlog className="h-4 w-4" />,
  content: <BlogGrid blogs={blogs} />,
},
```

**Tip:** Keep it simple. The existing sections handle everything you need.

---

## Troubleshooting

### "My image is not showing"

1. **Check the URL is correct**
   - Does it start with `https://`?
   - Is the Cloudinary link accessible in a new tab?

2. **Check image is on Cloudinary**
   - Go to cloudinary.com
   - Make sure your image is uploaded and public

3. **For local images**
   - Images in `public/images/` need full path like `/images/experiences/photo.jpg`
   - But for simplicity, use Cloudinary URLs instead

### "Popup not opening when I click a card"

1. **Check the `id` field** - Each item MUST have a unique ID
2. **Check `onSelectExperience` is being called** in the card onClick
3. **Check the popup component** is receiving the data in `app/page.tsx`

### "Animation is janky"

1. **Framer Motion syntax check:**

```tsx
// Correct
<motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} />

// Wrong - missing duration or wrong syntax
<motion.div whileHover={{ y: -4 }} />
```

2. **Image optimization:** Use Next.js Image component (already in use). Make sure images are properly sized.

### "Changes not appearing"

1. **Save the file** - Ctrl+S in your editor
2. **Check for TypeScript errors** - Red squiggles mean something is wrong
3. **Restart dev server** if needed:

```bash
npm run dev
```

---

## URL Patterns

### Cloudinary (Recommended)

```
https://res.cloudinary.com/[your-cloud-name]/image/upload/w_600,h_400,c_fill/[public-id].jpg
```

### Local Images (public folder)

```
/images/experiences/your-photo.jpg
```

### Best Practice

- Use Cloudinary for production images (better performance)
- Start with local images in `public/` for quick testing

---

## Quick Reference: Data IDs

| Section     | ID Pattern | Example        |
|-------------|------------|----------------|
| Experience  | `exp-N`    | `exp-1`, `exp-2` |
| Project     | `proj-N`   | `proj-1`, `proj-2` |
| Achievement | `ach-N`    | `ach-1`, `ach-2`   |

**Important:** Never use the same ID twice. Always use a unique identifier.

---

## Need Help?

1. Check `docs/AI-CONTENT-MANIFEST.md` for technical details
2. Check `docs/DATA-SCHEMA.md` for exact type definitions
3. Ask: "Why is my data not showing?" - Usually ID or URL issue

---

*Last updated: 2026-04-22*