import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2",
        className
      )}
    >
      <span>{title}</span>
      <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
    </h3>
  );
}
