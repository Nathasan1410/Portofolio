"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechStackGridProps {
  techs: string[];
  className?: string;
}

const badgeClasses = cn(
  "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700",
  "hover:from-primary/10 hover:to-primary/5 dark:hover:from-primary/20 dark:hover:to-primary/10",
  "border border-gray-200 dark:border-gray-600 hover:border-primary/30",
  "text-gray-700 dark:text-gray-300",
  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
);

export function TechStackGrid({ techs, className }: TechStackGridProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {techs.map((tech, idx) => (
        <Badge key={idx} className={badgeClasses}>
          {tech}
        </Badge>
      ))}
    </div>
  );
}
