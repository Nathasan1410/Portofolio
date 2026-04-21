"use client";

import { motion } from "framer-motion";
import { FiFileText, FiImage, FiLinkedin } from "react-icons/fi";
import { FaYoutube, FaTiktok, FaGithub, FaInstagram } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { socials } from "@/lib/data/socials";

// ============================================================================
// Animation Variants (Framer Motion best practice)
// ============================================================================

const dockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const socialButtonVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
};

const socialLinkHoverVariants = {
  hover: { scale: 1.15, y: -4 },
};

const SOCIAL_ICON_TRANSITION = { duration: 0.2, ease: "easeInOut" as const };

// ============================================================================
// Style Constants
// ============================================================================

const BUTTON_BASE_STYLES = "group inline-flex items-center justify-center gap-2 h-10 px-5 py-2 text-sm font-medium rounded-full transition-colors shadow-lg";

const PRIMARY_BUTTON_STYLES = `${BUTTON_BASE_STYLES} bg-foreground text-background hover:bg-foreground/90`;

const SECONDARY_BUTTON_STYLES = `${BUTTON_BASE_STYLES} border-2 border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-accent`;

const ICON_CONTAINER_STYLES = "w-12 h-12 rounded-[14px] flex items-center justify-center bg-black dark:bg-white shadow-md overflow-hidden";

const TOOLTIP_STYLES = "absolute -top-8 px-2 py-1 rounded-md bg-black/90 backdrop-blur text-[10px] font-medium text-white border border-white/10 opacity-0 transition-opacity whitespace-nowrap";

// ============================================================================
// Helper Components
// ============================================================================

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
      variants={socialLinkHoverVariants}
      initial="hidden"
      whileHover="hover"
      transition={SOCIAL_ICON_TRANSITION}
    >
      <div className={ICON_CONTAINER_STYLES}>
        <Icon className="h-6 w-6 text-white dark:text-black" />
      </div>
      <motion.span
        className={TOOLTIP_STYLES}
        variants={socialButtonVariants}
        initial="hidden"
        whileHover="visible"
        transition={{ duration: 0.15 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

// ============================================================================
// Data
// ============================================================================

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialItems = [
  { href: socials.youtube, icon: FaYoutube, label: 'YouTube' },
  { href: socials.tiktok, icon: FaTiktok, label: 'TikTok' },
  { href: socials.twitter, icon: XIcon, label: 'X' },
  { href: socials.instagram, icon: FaInstagram, label: 'Instagram' },
  { href: socials.github, icon: FaGithub, label: 'GitHub' },
  { href: socials.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
];

// ============================================================================
// Main Component
// ============================================================================

interface HeroProps {
  activeTab?: string;
}

export function Hero({ activeTab = "about" }: HeroProps) {
  const handleNavigate = (section: string) => {
    window.location.hash = section;
  };

  const handleCheckCV = () => {
    window.open('https://drive.google.com/file/d/YOUR_FILE_ID/view', '_blank');
  };

  const navItems = [
    { value: "about", label: "About Me" },
    { value: "experience", label: "Experience" },
    { value: "projects", label: "Projects" },
    { value: "achievements", label: "Achievements" },
  ];

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4" aria-label="Hero section">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-6">
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavigate(item.value)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeTab === item.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-gradient-to-br from-muted/50 to-primary/10">
          <div className="text-center text-muted-foreground p-8 max-w-md">
            <FiImage className="h-24 w-24 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Full Hero Background Image</p>
            <p className="text-sm opacity-70">Recommended: 1920x1080px or 2560x1440px PNG</p>
            <p className="text-xs opacity-50 mt-4">This will be the full background - dock & buttons overlay on top</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white/80 dark:bg-black/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
          variants={dockVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={handleCheckCV}
            className="group inline-flex items-center justify-center gap-2 h-10 px-5 py-2 text-sm font-medium rounded-full transition-colors shadow-lg bg-foreground text-background hover:bg-foreground/90"
            aria-label="Check my CV"
          >
            My Experiences
            <IoSparkles className="h-4 w-4 text-white" />
          </button>

          <div className="w-px h-6 bg-border" />

          {socialItems.map(({ href, icon: Icon, label }) => (
            <SocialIcon key={label} href={href} icon={Icon} label={label} />
          ))}

          <div className="w-px h-6 bg-border" />

          <button
            onClick={handleCheckCV}
            className="group inline-flex items-center justify-center gap-2 h-10 px-5 py-2 text-sm font-medium rounded-full transition-colors shadow-lg border-2 border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-accent"
            aria-label="Check my CV"
          >
            <FiFileText className="h-4 w-4" />
            Check My CV
          </button>
        </motion.div>
      </div>
    </section>
  );
}
