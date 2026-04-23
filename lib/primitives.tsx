import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// =============================================================================
// 1. floatingGlassBar - Glassmorphism style utility
// =============================================================================

/**
 * Returns common glassmorphism Tailwind classes for floating bar containers
 * Used in: Hero mobile action container, filter bars
 */
export const floatingGlassBar = {
  /**
   * Base glassmorphism styles - backdrop blur, semi-transparent bg, border
   */
  base: 'backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl ring-1 ring-black/5',

  /**
   * Stronger blur variant for more prominent containers
   */
  strong: 'backdrop-blur-2xl bg-white/80 border border-white/40 shadow-2xl ring-1 ring-black/5',

  /**
   * Minimal variant for subtle bars
   */
  minimal: 'backdrop-blur-lg bg-white/60 border border-white/20 shadow-xl ring-1 ring-black/5',
} as const;

// =============================================================================
// 2. FilterPillBar Component - Reusable filter pill bar
// =============================================================================

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface FilterPillBarProps {
  options: FilterOption[];
  activeValue: string;
  onChange: (value: string) => void;
  isMobile?: boolean;
  className?: string;
}

/**
 * Reusable filter pill bar component
 * - Horizontal scrollable on mobile
 * - Rounded-full button variant
 * - Hides counts on mobile
 */
export function FilterPillBar({
  options,
  activeValue,
  onChange,
  isMobile = false,
  className,
}: FilterPillBarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto scrollbar-hide',
        'pb-2 px-1 -mx-1', // Negative margin to allow edge-to-edge scrolling feel
        className
      )}
    >
      {options.map((option) => {
        const isActive = activeValue === option.value;
        const showCount = !isMobile && option.count !== undefined;

        return (
          <Button
            key={option.value}
            variant="outline"
            size="sm"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-full whitespace-nowrap flex-shrink-0',
              'transition-all duration-200 border',
              isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-background hover:bg-muted border-input'
            )}
          >
            {option.icon && (
              <span className="mr-1.5 inline-flex items-center">{option.icon}</span>
            )}
            <span>{option.label}</span>
            {showCount && (
              <span
                className={cn(
                  'ml-1.5 text-xs px-1.5 py-0.5 rounded-full',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                )}
              >
                {option.count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

// =============================================================================
// 3. contentTypeTheme - Type-to-theme mapping
// =============================================================================

export type ContentType =
  | 'hackathon'
  | 'event'
  | 'community'
  | 'work'
  | 'web3'
  | 'ai'
  | 'general'
  | 'certificate'
  | 'hackathon_win'
  | 'recognition';

export interface ContentTheme {
  gradient: {
    from: string;
    to: string;
  };
  icon: string;
  label: string;
}

/**
 * Mapping of content types to their visual themes
 * Includes gradient backgrounds, icon references, and labels
 */
export const contentTypeTheme: Record<ContentType, ContentTheme> = {
  // Experience types
  hackathon: {
    gradient: { from: 'from-violet-500', to: 'to-fuchsia-500' },
    icon: 'Trophy',
    label: 'Hackathon',
  },
  event: {
    gradient: { from: 'from-amber-500', to: 'to-orange-500' },
    icon: 'Calendar',
    label: 'Event',
  },
  community: {
    gradient: { from: 'from-emerald-500', to: 'to-teal-500' },
    icon: 'Users',
    label: 'Community',
  },
  work: {
    gradient: { from: 'from-blue-500', to: 'to-cyan-500' },
    icon: 'Briefcase',
    label: 'Work',
  },
  // Project types
  web3: {
    gradient: { from: 'from-purple-600', to: 'to-indigo-600' },
    icon: 'Hexagon',
    label: 'Web3',
  },
  ai: {
    gradient: { from: 'from-rose-500', to: 'to-pink-500' },
    icon: 'Brain',
    label: 'AI',
  },
  general: {
    gradient: { from: 'from-slate-500', to: 'to-zinc-500' },
    icon: 'Code',
    label: 'General',
  },
  // Achievement types
  certificate: {
    gradient: { from: 'from-sky-500', to: 'to-blue-500' },
    icon: 'Award',
    label: 'Certificate',
  },
  hackathon_win: {
    gradient: { from: 'from-amber-500', to: 'to-yellow-500' },
    icon: 'Trophy',
    label: 'Win',
  },
  recognition: {
    gradient: { from: 'from-emerald-500', to: 'to-green-500' },
    icon: 'Star',
    label: 'Recognition',
  },
};

/**
 * Get theme for a content type
 * Returns default theme if type not found
 */
export function getContentTheme(type: ContentType | string): ContentTheme {
  return contentTypeTheme[type as ContentType] || contentTypeTheme.general;
}

/**
 * Get Tailwind gradient class for a content type
 */
export function getContentGradient(type: ContentType | string): string {
  const theme = getContentTheme(type);
  return `bg-gradient-to-br ${theme.gradient.from} ${theme.gradient.to}`;
}

// =============================================================================
// 4. formatDateRange - Date formatting helper
// =============================================================================

/**
 * Formats date strings consistently
 * - Mostly passthrough with minor cleanup
 * - Handles simple date formats like "Jan 2024 - Mar 2024"
 * - Strips extra whitespace
 */
export function formatDateRange(dateString: string): string {
  if (!dateString) return '';

  // Basic cleanup: trim whitespace, normalize dashes
  return dateString
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s+-\s+/g, ' - '); // Ensure spaces around dash
}

/**
 * Format date for display with optional year abbreviation
 * Example: "Jan 2024" → "Jan '24"
 */
export function formatDateShort(dateString: string): string {
  if (!dateString) return '';

  // Match year pattern and abbreviate
  return dateString.replace(/(\d{4})/g, (match) => `'${match.slice(-2)}`);
}

// =============================================================================
// 5. getRoleSummary - Role display helper
// =============================================================================

export interface RoleSummaryOptions {
  mainRole: string;
  extraRoles?: string[];
  isMobile?: boolean;
}

/**
 * Returns compact string representation of roles
 * - Mobile: "Main Role + N more" or just "Main Role" if no extras
 * - Desktop: "Main Role - Extra1 - Extra2"
 */
export function getRoleSummary({
  mainRole,
  extraRoles = [],
  isMobile = false,
}: RoleSummaryOptions): string {
  const validExtras = extraRoles.filter(Boolean);

  if (validExtras.length === 0) {
    return mainRole;
  }

  if (isMobile) {
    return `${mainRole} +${validExtras.length}`;
  }

  return [mainRole, ...validExtras].join(' - ');
}

/**
 * Returns array of roles with main first
 * Useful for components that need to render badges
 */
export function getRolesList(
  mainRole: string,
  extraRoles?: string[]
): string[] {
  const validExtras = extraRoles?.filter(Boolean) || [];
  return [mainRole, ...validExtras];
}

// =============================================================================
// Utility exports
// =============================================================================

/**
 * Scrollbar-hide utility class
 * Use for scrollable containers that should hide scrollbar
 */
export const scrollbarHideClass = 'scrollbar-hide';
