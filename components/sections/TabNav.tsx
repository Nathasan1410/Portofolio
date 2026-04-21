"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

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
  content: React.ReactNode;
}

export interface TabNavProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function TabNav({ tabs, defaultValue, value, onValueChange, className }: TabNavProps) {
  const defaultTabValue = defaultValue || tabs[0]?.value;

  // Scroll detection for active tab highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const tabValue = sectionId.replace("-section", "");
          if (tabValue !== "tab-nav") {
            onValueChange?.(tabValue);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    tabs.forEach((tab) => {
      const element = document.getElementById(`${tab.value}-section`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [onValueChange, tabs]);

  const handleTabClick = (tabValue: string) => {
    if (tabValue === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(`${tabValue}-section`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Filter out home tab from the navigation (Home is the hero section)
  const navTabs = tabs.filter((tab) => tab.value !== "home");

  return (
    <>
      {/* Fixed Persistent Capsule Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-1.5 rounded-full",
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
                "flex flex-wrap justify-center gap-1 sm:gap-2"
              )}
              aria-label="Content categories"
            >
              {navTabs.map((tab) => (
                <TabsPrimitive.Trigger
                  key={tab.value}
                  value={tab.value}
                  onClick={() => handleTabClick(tab.value)}
                  className={cn(
                    "group inline-flex items-center justify-center gap-2",
                    "px-4 py-2 text-sm font-medium rounded-full",
                    "text-muted-foreground",
                    "transition-all duration-200",
                    "hover:text-foreground hover:bg-muted/50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm"
                  )}
                >
                  <span>{tab.label}</span>
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
          </TabsPrimitive.Root>
        </div>
      </div>

      {/* Tab Content Sections - All stacked vertically */}
      <motion.section
        id="tab-nav"
        className={cn("pt-24 px-4 sm:px-6 lg:px-8", className)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        aria-label="Content sections"
      >
        <div className="max-w-5xl mx-auto space-y-24">
          {tabs.map((tab) => (
            <section
              key={tab.value}
              id={`${tab.value}-section`}
              className="scroll-mt-32 min-h-screen flex flex-col justify-start pt-8"
            >
              {/* Section Title */}
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white">
                  {tab.label}
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
              </div>

              <div className="flex-1">
                {tab.content}
              </div>
            </section>
          ))}
        </div>
      </motion.section>
    </>
  );
}
