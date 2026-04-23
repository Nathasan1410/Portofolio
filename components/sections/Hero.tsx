"use client";

import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiFileText,
} from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import { AnimatedPill } from "@/components/ui/AnimatedPill";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { heroCopy, heroMedia, hasHeroMedia } from "@/lib/data/hero";
import { socialLinks, socials, type SocialLinkId } from "@/lib/data/socials";
import { EXPERIENCE_SECTION_ID, getSectionHash } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const dockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const mobileActionClassName = cn(
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium",
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
);

const dockLinkIds: SocialLinkId[] = [
  "youtube",
  "tiktok",
  "twitter",
  "instagram",
  "github",
  "linkedin",
];

const desktopSocialItems = socialLinks.filter((item) => dockLinkIds.includes(item.id));
const professionalLinks = socialLinks.filter((item) => item.group === "professional");
const communityLinks = socialLinks.filter(
  (item) => item.group === "social" && item.id !== "discord"
);

const heroImageSrc = heroMedia.desktop.src || heroMedia.mobile.src;

interface SocialIconProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function SocialIcon({ href, icon: Icon, label }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center"
      whileHover={{ scale: 1.15, y: -4 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      aria-label={label}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-black text-white shadow-md">
        <Icon className="h-6 w-6" />
      </div>
      <span
        className="absolute -top-8 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        {label}
      </span>
    </motion.a>
  );
}

function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function Hero() {
  const handleCheckCV = () => {
    openUrl(socials.resume);
  };

  const handleExperiencesClick = () => {
    window.location.hash = getSectionHash("experience");
    const section = document.getElementById(EXPERIENCE_SECTION_ID);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden px-4"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0">
        {hasHeroMedia ? (
          <picture className="block h-full w-full">
            {heroMedia.mobile.src && (
              <source media="(max-width: 767px)" srcSet={heroMedia.mobile.src} />
            )}
            <img
              src={heroImageSrc}
              alt={heroMedia.alt}
              className="h-full w-full object-cover"
            />
          </picture>
        ) : (
          <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-muted-foreground/30 bg-gradient-to-br from-muted/50 to-primary/10">
            <div className="max-w-md px-8 text-center text-muted-foreground">
              <svg
                className="mx-auto mb-4 h-24 w-24 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mb-2 text-lg font-medium">{heroCopy.placeholderTitle}</p>
              <p className="text-sm opacity-80">{heroCopy.placeholderBody}</p>
              <div className="mt-4 space-y-1 text-xs opacity-70">
                <p>Desktop: {heroMedia.desktop.recommendedSize}</p>
                <p>Mobile crop: {heroMedia.mobile.recommendedSize}</p>
                <p>{heroMedia.focalGuidance}</p>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/75 md:to-white/25" />
      </div>

      <div className="absolute inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-10 md:hidden">
        <div className="mx-auto max-w-sm rounded-[24px] border border-white/30 bg-white/82 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleExperiencesClick}
              className={cn(
                mobileActionClassName,
                "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              {heroCopy.primaryAction}
            </button>
            <button
              type="button"
              onClick={handleCheckCV}
              className={cn(
                mobileActionClassName,
                "border border-input bg-background/90 text-foreground hover:bg-muted"
              )}
            >
              {heroCopy.secondaryAction}
            </button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className={cn(
                  mobileActionClassName,
                  "mt-2 w-full border border-input bg-background/90 text-foreground hover:bg-muted"
                )}
              >
                {heroCopy.connectAction}
                <FiArrowRight className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="rounded-t-[28px] border-white/20 bg-white/95 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
            >
              <SheetHeader>
                <SheetTitle>Connect</SheetTitle>
                <SheetDescription>
                  Keep the hero simple on mobile. External links live here instead of the fixed dock.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Professional
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {professionalLinks.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <span className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground">
                            <item.icon className="h-4 w-4" />
                          </span>
                          {item.label}
                        </span>
                        <FiArrowRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Social
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {communityLinks.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:block">
        <motion.div
          className="mx-auto flex w-fit items-center gap-1.5 rounded-2xl border border-white/20 bg-white/80 px-3 py-2.5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5"
          variants={dockVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <AnimatedPill
            icon={<IoSparkles className="h-4 w-4" />}
            label={heroCopy.primaryAction}
            variant="primary"
            onClick={handleExperiencesClick}
          />

          <div className="h-6 w-px shrink-0 bg-border" />

          {desktopSocialItems.map((item) => (
            <SocialIcon
              key={item.id}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}

          <div className="h-6 w-px shrink-0 bg-border" />

          <AnimatedPill
            icon={<FiFileText className="h-4 w-4" />}
            label={heroCopy.secondaryAction}
            variant="secondary"
            onClick={handleCheckCV}
          />
        </motion.div>
      </div>
    </section>
  );
}
