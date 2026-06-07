"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data/about";
import { containerVariants, itemVariants } from "./variants";
import {
  GRID_LAYOUT,
  COL_PHOTO,
  COL_DESCRIPTION,
  PHOTO_STICKY,
  PHOTO_WRAPPER,
  PHOTO_PLACEHOLDER,
} from "./constants";

export function About() {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grid Layout */}
      <div className={GRID_LAYOUT}>
        {/* LEFT COLUMN - Photo */}
        <motion.div
          className={COL_PHOTO}
          variants={itemVariants}
        >
          <div className={PHOTO_STICKY}>
            <div className={PHOTO_WRAPPER}>
              <div className={PHOTO_PLACEHOLDER}>
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

        {/* COLUMN 2 - Description */}
        <motion.div
          className={COL_DESCRIPTION}
          variants={itemVariants}
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm {aboutData.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {aboutData.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
