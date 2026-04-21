# Portfolio Design System

## Table of Contents
1. [Color Tokens](#1-color-tokens)
2. [Typography Scale](#2-typography-scale)
3. [Spacing System](#3-spacing-system)
4. [Component Patterns](#4-component-patterns)
5. [Animation Presets](#5-animation-presets)
6. [Responsive Breakpoints](#6-responsive-breakpoints)

---

## 1. Color Tokens

### CSS Variables (HSL-based)

Defined in `app/globals.css`:

```css
:root {
  /* Base colors */
  --background: 0 0% 100%;
  --foreground: 0 0% 10%;
  
  /* Semantic colors */
  --primary: 220 25% 65%;
  --primary-foreground: 0 0% 100%;
  --secondary: 100 15% 70%;
  --secondary-foreground: 0 0% 10%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  --accent: 0 45% 75%;
  --accent-foreground: 0 0% 10%;
  
  /* UI-specific */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 10%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 10%;
  --border: 0 0% 90%;
  --input: 0 0% 90%;
  --ring: 220 25% 65%;
  
  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  
  /* Tech accent colors */
  --tech-cyan: 160 80% 70%;
  --tech-purple: 270 70% 75%;
  --tech-blue: 215 80% 65%;
}
```

### Tailwind Utility Classes

| Semantic Name | Tailwind Class | Usage |
|---------------|---------------|-------|
| background-primary | `bg-background` | Page background |
| foreground-primary | `text-foreground` | Primary text |
| background-card | `bg-card` | Card surfaces |
| foreground-card | `text-card-foreground` | Card text |
| background-muted | `bg-muted` | Muted backgrounds |
| foreground-muted | `text-muted-foreground` | Secondary text |
| background-primary | `bg-primary` | Primary buttons |
| foreground-primary | `text-primary-foreground` | Primary button text |
| background-secondary | `bg-secondary` | Secondary elements |
| foreground-secondary | `text-secondary-foreground` | Secondary text |
| background-accent | `bg-accent` | Accent highlights |
| foreground-accent | `text-accent-foreground` | Accent text |
| background-destructive | `bg-destructive` | Error/danger states |
| foreground-destructive | `text-destructive-foreground` | Destructive text |
| border-default | `border-border` | Default borders |
| input-default | `border-input` | Form inputs |
| ring-default | `ring-ring` | Focus rings |

### Tech-Specific Colors

| Name | Tailwind Class | Purpose |
|------|---------------|---------|
| tech-cyan | `bg-tech-cyan` / `text-tech-cyan` | Web3/Blockchain |
| tech-purple | `bg-tech-purple` / `text-tech-purple` | AI/ML highlights |
| tech-blue | `bg-tech-blue` / `text-tech-blue` | General tech |

### TypeBadge Variants (Project/Experience Types)

```tsx
// Experience Types
hackathon:     'bg-cyan-500/10'    + 'text-cyan-600'    + 'border-cyan-500/20'
event:         'bg-purple-500/10'  + 'text-purple-600'  + 'border-purple-500/20'
community:     'bg-emerald-500/10' + 'text-emerald-600' + 'border-emerald-500/20'
work:          'bg-blue-500/10'    + 'text-blue-600'    + 'border-blue-500/20'

// Project Types
web3:          'bg-indigo-500/10'  + 'text-indigo-600'  + 'border-indigo-500/20'
ai:            'bg-violet-500/10'  + 'text-violet-600'  + 'border-violet-500/20'
general:       'bg-gray-500/10'   + 'text-gray-600'    + 'border-gray-500/20'

// Achievement Types
certificate:   'bg-amber-500/10'  + 'text-amber-600'   + 'border-amber-500/20'
hackathon_win: 'bg-purple-500/10' + 'text-purple-600'   + 'border-purple-500/20'
recognition:   'bg-blue-500/10'   + 'text-blue-600'     + 'border-blue-500/20'
```

---

## 2. Typography Scale

### Font Families

```tsx
fontFamily: {
  sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
  mono:  ['var(--font-jetbrains-mono)', 'monospace'],
  display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
}
```

### Tailwind Text Sizes

| Class | Font Size | Line Height | Use Case |
|-------|-----------|-------------|----------|
| `text-xs` | 0.75rem (12px) | 1rem | Badges, captions |
| `text-sm` | 0.875rem (14px) | 1.25rem | Secondary text, descriptions |
| `text-base` | 1rem (16px) | 1.5rem | Body text |
| `text-lg` | 1.125rem (18px) | 1.75rem | Subheadings |
| `text-xl` | 1.25rem (20px) | 1.75rem | Card titles |
| `text-2xl` | 1.5rem (24px) | 2rem | Section headings |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Hero text |
| `text-4xl` | 2.25rem (36px) | 2.5rem | Large headings |
| `text-5xl` | 3rem (48px) | 1 | Hero name |

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Labels, emphasis |
| `font-semibold` | 600 | Titles, headings |
| `font-bold` | 700 | Strong emphasis |

### Common Typography Patterns

```tsx
// Card Title
'text-2xl font-semibold leading-none tracking-tight'

// Card Description  
'text-sm text-muted-foreground'

// Dialog Title
'text-lg font-semibold leading-none tracking-tight'

// Badge text
'text-xs font-semibold'

// TypeBadge text
'text-xs font-medium tracking-wider uppercase'
```

---

## 3. Spacing System

### Padding Scale

| Class | Value | Usage |
|-------|-------|-------|
| `p-0` | 0 | No padding |
| `p-1` | 0.25rem (4px) | Tight spacing |
| `p-2` | 0.5rem (8px) | Compact padding |
| `p-4` | 1rem (16px) | Default padding |
| `p-5` | 1.25rem (20px) | Card content |
| `p-6` | 1.5rem (24px) | Section padding |
| `p-8` | 2rem (32px) | Large gaps |

### Component-Specific Padding

```tsx
// Card components
CardHeader:  'flex flex-col space-y-1.5 p-6'
CardContent: 'p-6 pt-0'
CardFooter:  'flex items-center p-6 pt-0'

// Dialog
DialogContent: 'p-6'
DialogHeader:  'flex flex-col space-y-1.5 text-center sm:text-left'

// Tabs
TabsList: 'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1'
TabsTrigger: 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium'

// Button
Button sm:  'h-9 rounded-md px-3'
Button lg:  'h-11 rounded-md px-8'
```

### Margin Scale

| Class | Value | Usage |
|-------|-------|-------|
| `m-0` | 0 | No margin |
| `mt-2` | 0.5rem | Top margin small |
| `mt-4` | 1rem | Top margin default |
| `mt-5` | 1.25rem | Section spacing |
| `mb-2` | 0.5rem | Bottom margin |
| `mb-4` | 1rem | Bottom spacing |
| `mx-auto` | auto | Horizontal centering |
| `my-4` | 1rem | Vertical margin |

### Gap Values

| Class | Value | Usage |
|-------|-------|-------|
| `gap-1` | 0.25rem | Tight gaps |
| `gap-2` | 0.5rem | Icon gaps |
| `gap-4` | 1rem | Default gaps |
| `gap-6` | 1.5rem | Section gaps |
| `gap-8` | 2rem | Large gaps |

### Space Utilities

```tsx
// Flexbox
space-y-1.5:   0.375rem (6px) vertical gap
space-y-2:     0.5rem (8px) vertical gap

// Grid
grid grid-cols-1 gap-4
grid grid-cols-2 gap-6
grid grid-cols-3 gap-8
```

---

## 4. Component Patterns

### Card

**Base Card**
```tsx
<div className="rounded-lg border bg-card text-card-foreground shadow-sm" />
```

**Card with Hover**
```tsx
<motion.button
  whileHover={{ y: -4 }}
  whileTap={{ scale: 0.98 }}
  className="group relative w-full overflow-hidden rounded-xl border bg-card p-0 text-left shadow-sm hover:shadow-lg transition-shadow duration-200"
>
  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-border/50 transition-colors duration-200" />
</motion.button>
```

**Card Structure**
```tsx
<Card>
  <CardHeader className="flex flex-col space-y-1.5 p-6">
    <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
      Title
    </CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Description text
    </CardDescription>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    Content here
  </CardContent>
  <CardFooter className="flex items-center p-6 pt-0">
    Footer content
  </CardFooter>
</Card>
```

### Dialog (Popup)

**Standard Dialog** (Radix Dialog)
```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogPortal>
    <DialogOverlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
    <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">Title</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">Description</DialogDescription>
      </DialogHeader>
      {children}
      <DialogFooter>...</DialogFooter>
    </DialogContent>
  </DialogPortal>
</Dialog>
```

**Full-Screen Dialog**
```tsx
<FullScreenDialog open={open} onOpenChange={onOpenChange}>
  <FullScreenDialogContent
    className="w-[90vw] md:w-[80vw] lg:w-[70vw] max-h-[90vh]"
  >
    <div className="flex-1 overflow-auto p-6">
      Content
    </div>
  </FullScreenDialogContent>
</FullScreenDialog>
```

**Dialog Overlay Animation**
```css
/* Overlay */
bg-black/80 backdrop-blur-sm
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0

/* Content */
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
```

### Badge

**Badge Variants**
```tsx
<Badge variant="default">  // bg-primary text-primary-foreground
<Badge variant="secondary"> // bg-secondary text-secondary-foreground
<Badge variant="destructive"> // bg-destructive text-destructive-foreground
<Badge variant="outline">   // text-foreground (transparent bg)
```

**Custom Badge (Glassmorphic)**
```tsx
<Badge
  variant="outline"
  className="text-xs font-medium bg-white/20 backdrop-blur-sm border-transparent"
>
  Label
</Badge>
```

**TypeBadge Usage**
```tsx
<TypeBadge type="web3" showIcon />
<TypeBadge type="ai" />
<TypeBadge type="hackathon_win" className="bg-purple-500/10 text-purple-600" />
```

### Button

**Button Variants**
```tsx
<Button variant="default">    // bg-primary text-primary-foreground hover:bg-primary/90
<Button variant="destructive"> // bg-destructive text-destructive-foreground hover:bg-destructive/90
<Button variant="outline">    // border border-input bg-background hover:bg-accent
<Button variant="secondary">  // bg-secondary text-secondary-foreground hover:bg-secondary/80
<Button variant="ghost">      // hover:bg-accent hover:text-accent-foreground
<Button variant="link">       // text-primary underline-offset-4 hover:underline
```

**Button Sizes**
```tsx
<Button size="default"> // h-10 px-4 py-2
<Button size="sm">      // h-9 rounded-md px-3
<Button size="lg">      // h-11 rounded-md px-8
<Button size="icon">   // h-10 w-10
```

### Tabs

**Tabs Structure**
```tsx
<Tabs defaultValue="tab1">
  <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    <TabsTrigger value="tab1" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
      Tab 1
    </TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>
```

---

## 5. Animation Presets

### Framer Motion Import
```tsx
import { motion } from 'framer-motion'
```

### Animation Variants

**Dock Variants** (Hero social dock)
```tsx
const dockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
// Usage: transition={{ delay: 0.3, duration: 0.5 }}
```

**Social Link Hover**
```tsx
const socialLinkHoverVariants = {
  hover: { scale: 1.15, y: -4 },
}
// Usage: transition={{ duration: 0.2, ease: "easeInOut" }}
```

**Fade In**
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
// Duration: 300ms (default)
```

**Slide Up**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
// Duration: 400ms
```

**Scale**
```tsx
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
exit={{ scale: 0.9 }}
// Duration: 200ms
```

### Tailwind Animation Classes

| Class | Animation |
|-------|-----------|
| `animate-in` | Fade in entrance |
| `animate-out` | Fade out exit |
| `fade-in-0` | Opacity 0→1 |
| `fade-out-0` | Opacity 1→0 |
| `zoom-in-95` | Scale 0.95→1 |
| `zoom-out-95` | Scale 1→0.95 |
| `slide-in-from-bottom-10` | Slide from bottom |
| `slide-out-to-bottom-10` | Slide to bottom |
| `data-[state=open]:duration-300` | Duration control |

### Spring Configs

```tsx
// Gentle spring
transition={{ type: "spring", stiffness: 300, damping: 30 }}

// Bouncy spring
transition={{ type: "spring", stiffness: 400, damping: 10 }}

// Smooth ease
transition={{ duration: 0.3, ease: "easeOut" }}

// Quick snap
transition={{ duration: 0.2, ease: "easeInOut" }}
```

### Common Motion Patterns

**List Item Stagger**
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  transition={{ staggerChildren: 0.1 }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    />
  ))}
</motion.div>
```

**Image Hover Zoom**
```tsx
<img
  className="transition-transform duration-300 group-hover:scale-105"
/>
```

---

## 6. Responsive Breakpoints

### Breakpoint Classes

| Breakpoint | Min Width | Tailwind Prefix | Usage |
|------------|-----------|-----------------|-------|
| Mobile | < 640px | (none) | Default styles |
| Small | 640px+ | `sm:` | Small tablets |
| Medium | 768px+ | `md:` | Tablets |
| Large | 1024px+ | `lg:` | Laptops |
| Extra Large | 1280px+ | `xl:` | Desktops |

### Responsive Patterns

**Dialog Sizing**
```tsx
className="w-[90vw] md:w-[80vw] lg:w-[70vw] max-h-[90vh]"
```

**Grid Layouts**
```tsx
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6
```

**Flex Directions**
```tsx
flex flex-col md:flex-row gap-6
```

**Text Sizes**
```tsx
text-sm md:text-base lg:text-lg
```

**Padding Adjustments**
```tsx
px-4 md:px-8 lg:px-16
```

### Container Queries

The project uses standard responsive breakpoints. For component-specific responsive behavior:

```tsx
// Hide on mobile, show on tablet+
hidden md:block

// Always visible, compact on mobile
className="w-full md:w-1/3"
```

---

## Quick Reference

### Import Paths
```tsx
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { FullScreenDialog, FullScreenDialogContent } from '@/components/ui/FullScreenDialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
```

### Common Class Combinations

```tsx
// Card hoverable
'group relative overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-lg transition-shadow duration-200'

// Glassmorphic background
'bg-white/80 dark:bg-black/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl'

// Social icon container
'w-12 h-12 rounded-[14px] flex items-center justify-center bg-black dark:bg-white shadow-md'

// Tooltip
'absolute -top-8 px-2 py-1 rounded-md bg-black/90 backdrop-blur text-[10px] font-medium text-white'
```

### Border Radius

| Name | Value | Tailwind Class |
|------|-------|----------------|
| sm | calc(var(--radius) - 4px) | `rounded-sm` |
| md | calc(var(--radius) - 2px) | `rounded-md` |
| lg | var(--radius) = 0.625rem | `rounded-lg` |
| none | 0 | `rounded-none` |
| full | 9999px | `rounded-full` |
| custom | 14px (social icons) | `rounded-[14px]` |
