"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_NAV_SECTION_ID } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const floatingBarClassName = cn(
  "mx-auto w-fit max-w-full overflow-x-auto rounded-2xl border px-1.5 py-1.5",
  "border-white/20 bg-white/80 shadow-lg backdrop-blur-xl",
  "ring-1 ring-black/5"
);

export interface TabItem {
  value: string;
  label: string;
  mobileLabel?: string;
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
    <TabsContent
      value={value}
      className={cn(
        "mt-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive && "animate-in fade-in-50 duration-300"
      )}
      tabIndex={isActive ? 0 : -1}
    >
      <div className="min-h-[400px]">{children}</div>
    </TabsContent>
  );
}

export function TabNav({ tabs, defaultValue, value, onValueChange, className }: TabNavProps) {
  const defaultTabValue = defaultValue || tabs[0]?.value;

  const scrollToTabSection = React.useCallback(() => {
    const section = document.getElementById(TAB_NAV_SECTION_ID);
    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      onValueChange?.(nextValue);
      scrollToTabSection();
    },
    [onValueChange, scrollToTabSection]
  );

  return (
    <motion.section
      id={TAB_NAV_SECTION_ID}
      className={cn("scroll-mt-20 px-4 pb-16 pt-6 sm:px-6 lg:px-8", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-label="Content tabs"
    >
      <div className="mx-auto max-w-5xl">
        <Tabs
          defaultValue={defaultTabValue}
          value={value}
          onValueChange={handleValueChange}
          className="w-full"
        >
          <div className="sticky top-3 z-30 mb-6">
            <div className={floatingBarClassName}>
              <TabsList
                className={cn(
                  "h-auto w-max min-w-full gap-1 bg-transparent p-0 text-muted-foreground",
                  "justify-start sm:justify-center"
                )}
                aria-label="Content categories"
              >
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => {
                      if (value === tab.value) {
                        scrollToTabSection();
                      }
                    }}
                    className={cn(
                      "group inline-flex min-w-[84px] shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-2",
                      "text-xs font-medium sm:min-w-0 sm:px-4 sm:text-sm",
                      "data-[state=active]:bg-foreground data-[state=active]:text-background",
                      "data-[state=active]:shadow-sm"
                    )}
                  >
                    {tab.icon && (
                      <span className="inline-flex h-4 w-4 items-center justify-center">
                        {tab.icon}
                      </span>
                    )}
                    <span className="sm:hidden">{tab.mobileLabel ?? tab.label}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <motion.div variants={containerVariants}>
            {tabs.map((tab) => (
              <motion.div key={tab.value} variants={itemVariants}>
                <TabNavContent value={tab.value} isActive={value === tab.value}>
                  {tab.content}
                </TabNavContent>
              </motion.div>
            ))}
          </motion.div>
        </Tabs>
      </div>
    </motion.section>
  );
}
