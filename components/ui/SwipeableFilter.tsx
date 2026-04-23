'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { cn } from '@/lib/utils'

export interface SwipeableFilterOption {
  label: string
  value: string
  icon?: React.ReactNode
  count?: number
}

interface SwipeableFilterProps {
  options: SwipeableFilterOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SwipeableFilter({
  options,
  value,
  onChange,
  className,
}: SwipeableFilterProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollStartX, setScrollStartX] = React.useState(0)

  const activeIndex = options.findIndex((opt) => opt.value === value)

  // Check scroll bounds
  const checkScrollBounds = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  // Scroll to active option
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const activeButton = el.querySelector(`[data-value="${value}"]`) as HTMLElement
    if (activeButton) {
      const containerWidth = el.clientWidth
      const buttonWidth = activeButton.offsetWidth
      const buttonLeft = activeButton.offsetLeft
      const scrollTarget = buttonLeft - containerWidth / 2 + buttonWidth / 2

      el.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: 'smooth',
      })
    }
  }, [value])

  // Listen for scroll events
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScrollBounds()
    el.addEventListener('scroll', checkScrollBounds, { passive: true })
    return () => el.removeEventListener('scroll', checkScrollBounds)
  }, [checkScrollBounds, options.length])

  // Scroll handlers
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return

    const scrollAmount = el.clientWidth * 0.6
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  // Touch/drag handlers for swipe
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
    setScrollStartX(scrollRef.current?.scrollLeft ?? 0)
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const delta = startX - clientX
    scrollRef.current.scrollLeft = scrollStartX + delta
  }

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    setIsDragging(false)

    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const delta = startX - clientX
    const threshold = 50

    // Snap to nearest option on significant swipe
    if (Math.abs(delta) > threshold) {
      if (delta > 0 && activeIndex < options.length - 1) {
        onChange(options[activeIndex + 1].value)
      } else if (delta < 0 && activeIndex > 0) {
        onChange(options[activeIndex - 1].value)
      }
    }
  }

  return (
    <div
      className={cn(
        'relative flex items-center gap-1',
        className
      )}
    >
      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => scroll('left')}
        className={cn(
          'flex h-8 w-6 shrink-0 items-center justify-center rounded-full',
          'text-muted-foreground transition-all duration-200',
          'hover:bg-muted hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          !canScrollLeft && 'pointer-events-none opacity-0'
        )}
        aria-label="Previous filters"
        disabled={!canScrollLeft}
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={cn(
          'relative flex items-center gap-2 overflow-x-auto overscroll-x-contain',
          'scrollbar-hide scroll-smooth snap-x snap-mandatory',
          'px-1 py-1'
        )}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => isDragging && setIsDragging(false)}
      >
        {options.map((option) => {
          const isActive = option.value === value

          return (
            <motion.button
              key={option.value}
              type="button"
              data-value={option.value}
              onClick={() => onChange(option.value)}
              layout
              className={cn(
                'relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5',
                'snap-center transition-colors duration-200',
                'min-h-[36px] touch-manipulation',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              )}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              {option.icon && (
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  {option.icon}
                </span>
              )}
              <span className="whitespace-nowrap text-sm">{option.label}</span>
              {option.count !== undefined && (
                <span
                  className={cn(
                    'ml-0.5 inline-flex min-w-[18px] items-center justify-center rounded-full px-1',
                    'text-[10px] font-semibold leading-4',
                    isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-muted-foreground/20 text-muted-foreground'
                  )}
                >
                  {option.count}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => scroll('right')}
        className={cn(
          'flex h-8 w-6 shrink-0 items-center justify-center rounded-full',
          'text-muted-foreground transition-all duration-200',
          'hover:bg-muted hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          !canScrollRight && 'pointer-events-none opacity-0'
        )}
        aria-label="Next filters"
        disabled={!canScrollRight}
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

SwipeableFilter.displayName = 'SwipeableFilter'
