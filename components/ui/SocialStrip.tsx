"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SocialLink, SocialLinkId } from "@/lib/data/socials";

const SOCIAL_ICON_TRANSITION = { duration: 0.2, ease: "easeInOut" as const };

const socialLinkHoverVariants = {
  hover: { scale: 1.15, y: -4 },
};

interface SocialStripProps {
  links: SocialLink[];
  variant?: "default" | "compact";
  className?: string;
  iconClassName?: string;
}

export function SocialStrip({
  links,
  variant = "default",
  className,
  iconClassName,
}: SocialStripProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {links.map((link) => (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center"
            variants={socialLinkHoverVariants}
            whileHover="hover"
            transition={SOCIAL_ICON_TRANSITION}
            aria-label={link.label}
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-[14px] bg-black text-white shadow-md",
                iconClassName
              )}
            >
              <link.icon className="h-6 w-6" />
            </div>
            <span
              className="absolute -top-8 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              {link.label}
            </span>
          </motion.a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => (
        <motion.a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          variants={socialLinkHoverVariants}
          whileHover="hover"
          transition={SOCIAL_ICON_TRANSITION}
          aria-label={link.label}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
            <link.icon className="h-4 w-4" />
          </span>
          <span>{link.label}</span>
        </motion.a>
      ))}
    </div>
  );
}

// Helper function to filter links by IDs (maintains order of ids array)
export function filterSocialLinksByIds(
  allLinks: readonly SocialLink[],
  ids: SocialLinkId[]
): SocialLink[] {
  return ids
    .map((id) => allLinks.find((link) => link.id === id))
    .filter((link): link is SocialLink => link !== undefined);
}

// Helper function to filter links by group
export function filterSocialLinksByGroup(
  allLinks: readonly SocialLink[],
  group: "professional" | "social"
): SocialLink[] {
  return allLinks.filter((link) => link.group === group);
}
