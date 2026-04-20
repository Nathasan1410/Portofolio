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

export function TabNav({ tabs, defaultValue, className }: TabNavProps) {
  const defaultTabValue = defaultValue || tabs[0]?.value;

  return (
    <motion.section
      id="tab-nav"
      className={cn("py-16 px-4 sm:px-6 lg:px-8", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-label="Content tabs"
    >
      <div className="max-w-5xl mx-auto">
        <TabsPrimitive.Root
          defaultValue={defaultTabValue}
          className="w-full"
        >
          <TabsPrimitive.List
            className={cn(
              "flex flex-wrap justify-center gap-2 sm:gap-4",
              "p-1.5 rounded-xl",
              "bg-muted/50 border border-border/50",
              "w-fit mx-auto"
            )}
            aria-label="Content categories"
          >
            {tabs.map((tab) => (
              <TabsPrimitive.Trigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "group inline-flex items-center justify-center gap-2",
                  "px-4 py-2.5 sm:px-6 sm:py-3",
                  "text-sm sm:text-base font-medium rounded-lg",
                  "text-muted-foreground",
                  "transition-all duration-200",
                  "hover:text-foreground hover:bg-background/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                  "data-[state=active]:border data-[state=active]:border-border"
                )}
              >
                {tab.icon && (
                  <span className="hidden sm:inline-block" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {tabs.map((tab) => (
            <TabNavContent key={tab.value} value={tab.value} isActive={true}>
              {tab.content}
            </TabNavContent>
          ))}
        </TabsPrimitive.Root>
      </div>
    </motion.section>
  );
}
