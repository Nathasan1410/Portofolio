"use client";

import { motion } from "framer-motion";
import { FiDownload, FiArrowDown, FiImage, FiLinkedin } from "react-icons/fi";
import { FaYoutube, FaTiktok, FaGithub, FaInstagram } from "react-icons/fa";
import { socials } from "@/lib/data/socials";

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

export function Hero() {
  const handleViewWork = () => {
    const tabSection = document.getElementById("tab-nav");
    if (tabSection) {
      tabSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCheckCV = () => {
    // TODO: Replace with actual PDF Drive URL
    window.open('https://drive.google.com/file/d/YOUR_FILE_ID/view', '_blank');
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4" aria-label="Hero section">
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

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-4">
        <motion.div
          className="mx-auto flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={handleViewWork}
            className="group inline-flex items-center justify-center gap-2 h-10 px-5 py-2 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-lg"
            aria-label="View my work"
          >
            View My Work
            <FiArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </button>

          <div className="w-px h-6 bg-border" />

          {socialItems.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center"
              whileHover={{ scale: 1.15, y: -4 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-black dark:bg-white shadow-md overflow-hidden">
                <Icon className="h-6 w-6 text-white dark:text-black" />
              </div>
              <motion.span
                className="absolute -top-8 px-2 py-1 rounded-md bg-black/90 backdrop-blur text-[10px] font-medium text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                initial={{ opacity: 0, y: 4 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {label}
              </motion.span>
            </motion.a>
          ))}

          <div className="w-px h-6 bg-border" />

          <button
            onClick={handleCheckCV}
            className="group inline-flex items-center justify-center gap-2 h-10 px-5 py-2 text-sm font-medium rounded-full border-2 border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors shadow-lg"
            aria-label="Check my CV"
          >
            <FiDownload className="h-4 w-4" />
            Check My CV
          </button>
        </motion.div>
      </div>
    </section>
  );
}
