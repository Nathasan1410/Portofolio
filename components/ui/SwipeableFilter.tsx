'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterOption {
  id: string
  label: string
  count: number
  icon: React.ComponentType<{ className?: string }>
}

interface SwipeableFilterProps {
  options: FilterOption[]
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
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollStartX, setScrollStartX] = React.useState(0)
  const [animationClass, setAnimationClass] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)

  const activeIndex = options.findIndex((opt) => opt.id === value)
  const activeOption = options[activeIndex]

  // Scroll active option into view
  React.useEffect(() => {
    if (containerRef.current && activeOption) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [value, activeOption])

  const navigateToFilter = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < options.length) {
      const direction = newIndex > activeIndex ? 'right' : 'left'
      setAnimationClass(direction === 'right' ? 'animate-in slide-in-from-right-8 fade-in duration-300' : 'animate-in slide-in-from-left-8 fade-in duration-300')
      onChange(options[newIndex].id)
      // Clear animation class after animation completes
      setTimeout(() => setAnimationClass(''), 300)
    }
  }

  const handlePrev = () => {
    navigateToFilter(activeIndex - 1)
  }

  const handleNext = () => {
    navigateToFilter(activeIndex + 1)
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setScrollStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    // Prevent default to stop page scroll
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    const endX = e.changedTouches[0].clientX
    const delta = startX - endX
    const threshold = 50

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        // Swiped left, go to next
        handleNext()
      } else {
        // Swiped right, go to previous
        handlePrev()
      }
    }
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setScrollStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    const delta = startX - e.clientX
    const threshold = 50

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < options.length - 1

  if (!activeOption) return null

  const IconComponent = activeOption.icon

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex items-center justify-center gap-3',
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
          'text-gray-400 hover:text-black hover:bg-gray-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          !canGoPrev && 'opacity-30 cursor-not-allowed hover:text-gray-400 hover:bg-transparent'
        )}
        aria-label="Previous filter"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Active Filter Pill */}
      <div
        className={cn(
          'flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full',
          'select-none touch-manipulation',
          animationClass
        )}
      >
        {IconComponent && <IconComponent className="h-4 w-4" />}
        <span className="text-sm font-medium whitespace-nowrap">{activeOption.label}</span>
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-white text-black text-xs font-semibold rounded-full">
          {activeOption.count}
        </span>
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!canGoNext}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
          'text-gray-400 hover:text-black hover:bg-gray-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          !canGoNext && 'opacity-30 cursor-not-allowed hover:text-gray-400 hover:bg-transparent'
        )}
        aria-label="Next filter"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

SwipeableFilter.displayName = 'SwipeableFilter'
