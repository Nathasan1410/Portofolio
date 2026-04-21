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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const blobVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-32"
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 50%, hsl(var(--background)) 100%)",
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl -z-10"
        style={{
          background:
            "radial-gradient(circle, hsl(207 90% 54% / 0.4) 0%, transparent 70%)",
        }}
        variants={blobVariants}
        initial="hidden"
        animate="visible"
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl -z-10"
        style={{
          background:
            "radial-gradient(circle, hsl(173 58% 39% / 0.5) 0%, transparent 70%)",
        }}
        variants={blobVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        {/* Main Hero Content - Centered */}
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Your Custom Design Area - Replace with your transparent PNG */}
          <motion.div
            className="relative w-full max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* PLACEHOLDER FOR YOUR CUSTOM DESIGN */}
            {/* Replace this entire div with your transparent PNG design */}
            {/* Recommended: 1200x1200px PNG with transparent background */}
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
              {/* This is where your custom PNG design will go */}
              {/* Example: <img src="/hero-design.png" alt="Nathan's Space Design" className="w-full h-auto" /> */}
              <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded-3xl flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
                <div className="text-center text-muted-foreground p-8">
                  <FiImage className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-base font-medium mb-2">Your Custom Design Here</p>
                  <p className="text-sm opacity-70">Recommended: 1200x1200px PNG (transparent)</p>
                  <p className="text-xs opacity-50 mt-4">Place your &quot;PORTFOLIO &apos;25&quot; style artwork here</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons - Below the design */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={handleViewWork}
              className="group inline-flex items-center justify-center gap-2 h-12 px-8 py-3 text-base font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="View my work"
            >
              View My Work
              <FiArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </button>

            <button
              onClick={handleDownloadCV}
              className="group inline-flex items-center justify-center gap-2 h-12 px-8 py-3 text-base font-medium rounded-full border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Download CV"
            >
              <FiDownload className="h-4 w-4" />
              CV Download
            </button>
          </motion.div>

          {/* macOS Dock - Social Media Icons */}
          <motion.div
            className="pt-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-center">
              <motion.div
                className="flex items-end gap-2 px-3 py-2 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
              >
                {socialItems.map(({ href, icon: Icon, label, color }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1"
                    whileHover={{
                      scale: 1.3,
                      y: -10
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      mass: 0.5
                    }}
                  >
                    {/* Icon Container - Rounded Square */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${color}DD, ${color})`,
                      }}
                    >
                      <Icon className="h-6 w-6 text-white drop-shadow-md" />
                    </div>
                    {/* Label - Hidden by default, shows on hover */}
                    <motion.span
                      className="text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {label}
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
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
