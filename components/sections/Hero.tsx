"use client";

import { motion } from "framer-motion";
import { FiDownload, FiArrowDown } from "react-icons/fi";

const NAME = "Nathanael Santoso";
const TAGLINE = "Developer • Web3 • AI • Yapper";
const BIO = "Building the next generation of digital experiences with a focus on decentralization and intelligence.";

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
    console.log("Download CV clicked");
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-32"
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

      <motion.div
        className="max-w-4xl mx-auto text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground"
          variants={itemVariants}
        >
          {NAME}
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground tracking-wide"
          variants={itemVariants}
        >
          {TAGLINE}
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
          variants={itemVariants}
        >
          {BIO}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          variants={itemVariants}
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
      </motion.div>

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
