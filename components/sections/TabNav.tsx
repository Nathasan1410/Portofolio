"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabNavProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function TabNavContent({
  children,
  isActive,
  value,
}: {
  children: React.ReactNode;
  isActive: boolean;
  value: string;
}) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={cn(
        "mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
        isActive && "animate-in fade-in-50 duration-300"
      )}
      tabIndex={isActive ? 0 : -1}
    >
      <div className="min-h-[400px]">{children}</div>
    </TabsPrimitive.Content>
  );
}

export function TabNav({ tabs, defaultValue, value, onValueChange, className }: TabNavProps) {
  const defaultTabValue = defaultValue || tabs[0]?.value;

  return (
    <>
      {/* Fixed Persistent Capsule Navigation */}
      <div className="fixed top-4 sm:top-5 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-[90vw] overflow-x-auto">
        <div
          className={cn(
            "flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 md:py-2 rounded-xl sm:rounded-2xl",
            "bg-white/80 dark:bg-black/70 backdrop-blur-xl",
            "border border-white/20 dark:border-white/10 shadow-lg"
          )}
        >
          <TabsPrimitive.Root
            defaultValue={defaultTabValue}
            value={value}
            onValueChange={onValueChange}
            className="w-full"
          >
            <TabsPrimitive.List
              className={cn(
                "flex flex-wrap justify-center gap-0.5 sm:gap-1 md:gap-1.5"
              )}
              aria-label="Content categories"
            >
              {tabs.map((tab) => (
                <TabsPrimitive.Trigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "group inline-flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2",
                    "px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] xs:text-xs sm:text-sm font-medium rounded-full",
                    "text-muted-foreground",
                    "transition-all duration-200",
                    "hover:text-foreground hover:bg-muted/50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm",
                    "whitespace-nowrap flex-shrink-0"
                  )}
                >
                  <span>{tab.label}</span>
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
          </TabsPrimitive.Root>
        </div>
      </div>

      {/* Tab Content */}
      <motion.section
        id="tab-nav"
        className={cn("pt-24 pb-16 px-4 sm:px-6 lg:px-8", className)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        aria-label="Content tabs"
      >
        <div className="max-w-5xl mx-auto">
          <TabsPrimitive.Root
            defaultValue={defaultTabValue}
            value={value}
            onValueChange={onValueChange}
            className="w-full"
          >
            {tabs.map((tab) => (
              <TabNavContent key={tab.value} value={tab.value} isActive={value === tab.value}>
                {tab.content}
              </TabNavContent>
            ))}
          </TabsPrimitive.Root>
        </div>
      </motion.section>
    </>
  );
}
