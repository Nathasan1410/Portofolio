'use client'

import { cn } from '@/lib/utils'

interface TechBadgeProps {
  name: string
  icon?: React.ReactNode
  className?: string
}

export function TechBadge({ name, icon, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground',
        'border border-primary/20',
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{name}</span>
    </span>
  )
}
