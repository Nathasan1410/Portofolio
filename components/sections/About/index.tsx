"use client";

import { motion, Variants } from "framer-motion";
import { FiLinkedin, FiGithub, FiTwitter, FiMail, FiExternalLink } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa6";
import { aboutData } from "@/lib/data/about";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function About() {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* LEFT COLUMN - Photo (full height) */}
        <motion.div
          className="md:col-span-3 flex flex-col"
          variants={itemVariants}
        >
          <div className="sticky top-8">
            <div className="relative aspect-[3/4] w-full max-w-xs mx-auto">
              {/* Photo Placeholder */}
              <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded-2xl bg-gradient-to-br from-muted/50 to-primary/10 flex items-center justify-center overflow-hidden">
                {aboutData.photo ? (
                  <img
                    src={aboutData.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-muted-foreground p-6">
                    <p className="text-sm font-medium mb-2">Your Photo Here</p>
                    <p className="text-xs opacity-70">Place PNG in public/about/profile.png</p>
                    <p className="text-xs opacity-50 mt-2">Recommended: 600x800px</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CENTER COLUMN - Description, Experience, Contact */}
        <motion.div
          className="md:col-span-5 space-y-8"
          variants={itemVariants}
        >
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm {aboutData.description.split(" ")[2]?.replace(/[.,]/g, '') || "Nathanael"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {aboutData.description}
            </p>
          </div>

          {/* Experience Highlights */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>EXPERIENCE</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </h3>
            <div className="space-y-4">
              {aboutData.highlights.map((highlight, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {highlight.company} • {highlight.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>CONTACT</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={aboutData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiLinkedin className="h-5 w-5" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href={aboutData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiGithub className="h-5 w-5" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href={aboutData.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiTwitter className="h-5 w-5" />
                <span className="text-sm font-medium">X / Twitter</span>
              </a>
              <a
                href={`mailto:${aboutData.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiMail className="h-5 w-5" />
                <span className="text-sm font-medium">Email</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - Main Stack & Public Speaking */}
        <motion.div
          className="md:col-span-4 space-y-8"
          variants={itemVariants}
        >
          {/* Main Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>MAIN STACK</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </h3>
            <div className="flex flex-wrap gap-2">
              {aboutData.mainStack.map((tech, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700",
                    "hover:from-primary/10 hover:to-primary/5 dark:hover:from-primary/20 dark:hover:to-primary/10",
                    "border border-gray-200 dark:border-gray-600 hover:border-primary/30",
                    "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Public Speaking Badge */}
          {aboutData.publicSpeaking && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>SPEAKING</span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              </h3>
              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                <div className="p-2 rounded-lg bg-amber-500 dark:bg-amber-600 text-white">
                  <FaMicrophone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                    Public Speaker
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Tech conferences & meetups
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
}
