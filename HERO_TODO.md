# Hero Section - Remaining Tasks

## Current State (as of commit ab8b0c4)

The Hero section has a unified navbar with:
- View My Work button (left)
- Social icons: YouTube, TikTok, X, Instagram, GitHub, LinkedIn (center)
- CV button (right)

## Issues to Fix

### 1. Navbar Position - NOT LOW ENOUGH
The navbar is still too high on the screen. Looking at the reference image, it should be positioned much lower, closer to the bottom of the viewport.

**Current:** Centered with `flex-1` or similar
**Should be:** Positioned near bottom (e.g., `bottom-20` or `bottom-24` from bottom)

**Fix:** Change the container positioning in Hero.tsx:
```tsx
// Change from flex-center to absolute positioning at bottom
<div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
```

### 2. CV Button Text
Change from "CV" to "Check My CV"

### 3. CV Link Destination
Currently downloads PDF directly. Should link to PDF Drive instead.

**Options:**
- **Option A:** Link directly to PDF Drive URL (need URL from user)
- **Option B:** Open PDF Drive in new tab
- **Recommendation:** Use `window.open(pdfDriveUrl, '_blank')` on button click

### 4. Icon Sizes
Keep icons at original size (12x12 or w-12 h-12), NOT the smaller 10x10 version.

## Files to Modify

1. **components/sections/Hero.tsx**
   - Reposition navbar container to bottom
   - Change CV button text to "Check My CV"
   - Update handleDownloadCV to open PDF Drive URL
   - Increase icon sizes back to w-12 h-12

2. **lib/data/socials.ts** (if needed)
   - Add PDF Drive URL constant

## Recommended Implementation

```tsx
// In Hero.tsx
const handleCheckCV = () => {
  window.open('https://drive.google.com/file/d/YOUR_FILE_ID/view', '_blank')
}

// Position container at bottom
<div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">

// Larger icons
<div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-black dark:bg-white">
  <Icon className="h-6 w-6 text-white dark:text-black" />
</div>
```

## Additional Notes

- Keep the frosted glass effect on the navbar
- Maintain the spring hover animation on icons
- Keep the vertical dividers between sections
- Maintain the macOS dock-style magnification effect
