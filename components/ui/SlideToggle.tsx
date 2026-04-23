'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SlideToggleOption {
  label: string
  value: string
  icon?: React.ReactNode
}

interface SlideToggleProps {
  options: [SlideToggleOption, SlideToggleOption]
  value: string
  onChange: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: {
    container: 'h-8 text-xs',
    button: 'px-3',
    icon: 'w-3 h-3',
  },
  md: {
    container: 'h-10 text-sm',
    button: 'px-4',
    icon: 'w-4 h-4',
  },
  lg: {
    container: 'h-12 text-base',
    button: 'px-5',
    icon: 'w-5 h-5',
  },
}

export function SlideToggle({
  options,
  value,
  onChange,
  size = 'md',
  className,
}: SlideToggleProps) {
  const activeIndex = options.findIndex((opt) => opt.value === value)

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-full bg-muted p-1',
        sizeClasses[size].container,
        className
      )}
    >
      {/* Sliding background pill */}
      <motion.div
        layoutId="slide-toggle-pill"
        className="absolute inset-y-1 rounded-full bg-background shadow-sm"
        style={{
          width: `calc(50% - 4px)`,
        }}
        animate={{
          x: activeIndex === 0 ? 0 : 'calc(100% + 4px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 35,
        }}
      />

      {/* Option buttons */}
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full transition-colors duration-200',
              sizeClasses[size].button,
              isActive
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            {option.icon && (
              <span
                className={cn(
                  'inline-flex items-center justify-center',
                  sizeClasses[size].icon
                )}
              >
                {option.icon}
              </span>
            )}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

SlideToggle.displayName = 'SlideToggle'
