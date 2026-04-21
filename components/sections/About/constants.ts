/**
 * Tailwind CSS class constants for the About section
 * Follows KISS principle - only essential constants
 */

// Layout
export const GRID_LAYOUT = "grid grid-cols-1 md:grid-cols-12 gap-8";
export const SECTION_SPACING = "space-y-8";

// Column spans (4-column layout: Photo | Description | Experience | Main Stack)
export const COL_PHOTO = "md:col-span-2 flex flex-col";
export const COL_DESCRIPTION = "md:col-span-3";
export const COL_EXPERIENCE = "md:col-span-4";
export const COL_STACK = "md:col-span-3";

// Photo container
export const PHOTO_STICKY = "sticky top-8";
export const PHOTO_WRAPPER = "aspect-[3/4] w-full max-w-xs mx-auto";
export const PHOTO_PLACEHOLDER = "border-2 border-dashed border-muted-foreground/30 rounded-2xl bg-gradient-to-br from-muted/50 to-primary/10 flex items-center justify-center overflow-hidden";
