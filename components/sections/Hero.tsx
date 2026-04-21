"use client";

import { motion } from "framer-motion";
import { FiDownload, FiArrowDown, FiImage } from "react-icons/fi";
import { FaYoutube, FaTiktok, FaGithub, FaDiscord, FaInstagram } from "react-icons/fa";
import { socials } from "@/lib/data/socials";

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialItems = [
  { href: socials.youtube, icon: FaYoutube, label: 'YouTube', color: '#FF0000' },
  { href: socials.tiktok, icon: FaTiktok, label: 'TikTok', color: '#00f2ea' },
  { href: socials.twitter, icon: XIcon, label: 'X', color: '#000000' },
  { href: socials.instagram, icon: FaInstagram, label: 'Instagram', color: '#E4405F' },
  { href: socials.github, icon: FaGithub, label: 'GitHub', color: '#181717' },
  { href: socials.discord, icon: FaDiscord, label: 'Discord', color: '#5865F2' },
];

export function Hero() {
  const handleViewWork = () => {
    const tabSection = document.getElementById("tab-nav");
    if (tabSection) {
      tabSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCV = () => {
    const cvPath = "/cv/resume.pdf";
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Nathanael_Santoso_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      aria-label="Hero section"
    >
      {/* FULL BACKGROUND IMAGE PLACEHOLDER - Replace with your custom PNG */}
      {/* Recommended: 1920x1080px or 2560x1440px PNG */}
      <div className="absolute inset-0 z-0">
        {/* REMOVE this placeholder div and replace with your image: */}
        {/* <img src="/your-hero-bg.png" alt="Hero Background" className="w-full h-full object-cover" /> */}
        <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-gradient-to-br from-muted/50 to-primary/10">
          <div className="text-center text-muted-foreground p-8 max-w-md">
            <FiImage className="h-24 w-24 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Full Hero Background Image</p>
            <p className="text-sm opacity-70">Recommended: 1920x1080px or 2560x1440px PNG</p>
            <p className="text-xs opacity-50 mt-4">This will be the full background - dock & buttons overlay on top</p>
          </div>
        </div>
      </div>

      {/* Content Overlay - UI elements on top of background */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={handleViewWork}
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 py-3 text-base font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="View my work"
          >
            View My Work
            <FiArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </button>

          <button
            onClick={handleDownloadCV}
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 py-3 text-base font-medium rounded-full border-2 border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Download CV"
          >
            <FiDownload className="h-4 w-4" />
            CV Download
          </button>
        </motion.div>

        {/* macOS Dock - Social Media Icons */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Dock Container - Frosted Glass */}
          <div className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-zinc-900/60 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/10 shadow-2xl">
            {socialItems.map(({ href, icon: Icon, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center"
                whileHover={{
                  scale: 1.2,
                  y: -6
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15
                }}
              >
                {/* Icon Container - Squircle (like macOS) */}
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center shadow-md overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, ${color}FF 0%, ${color}CC 100%)`,
                  }}
                >
                  <Icon className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
                {/* Label - Shows on hover */}
                <motion.span
                  className="absolute -top-8 px-2 py-1 rounded-md bg-zinc-800/90 backdrop-blur text-[10px] font-medium text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  {label}
                </motion.span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <FiArrowDown className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
