"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedPillProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  expanded?: boolean;
}

export function AnimatedPill({
  icon,
  label,
  onClick,
  variant = "primary",
  className,
  expanded = false,
}: AnimatedPillProps) {
  const glowColor = variant === "primary"
    ? "conic-gradient(from 0deg, #ff0080, #7928ca, #ff0080, #0070f3, #ff0080)"
    : "conic-gradient(from 0deg, #0070f3, #00dfd8, #7928ca, #ff0080, #0070f3)";

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      layout
      initial={{ width: expanded ? "auto" : 40 }}
      animate={{ width: expanded || isHovered ? "auto" : 40 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "relative flex rounded-full p-[2px] overflow-hidden flex-shrink-0 cursor-pointer",
        className
      )}
    >
      {/* Animated gradient border - always rotating */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: glowColor,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 4,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        }}
      />

      {/* Inner content */}
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full z-10",
        variant === "primary"
          ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          : "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm"
      )}>
        <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>
        <motion.span
          initial={{ opacity: expanded ? 1 : 0, width: expanded ? "auto" : 0 }}
          animate={{
            opacity: expanded || isHovered ? 1 : 0,
            width: expanded || isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="whitespace-nowrap overflow-hidden font-medium text-sm"
        >
          {label}
        </motion.span>
      </div>
    </motion.button>
  );
}
