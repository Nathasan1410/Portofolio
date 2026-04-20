'use client'

import { useRef, useState, useEffect, KeyboardEvent } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { cn } from '@/lib/utils'

interface ExperiencePopupCarouselProps {
  items: string[]
  label: string
}

export function ExperiencePopupCarousel({ items, label }: ExperiencePopupCarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollability()
    const scrollEl = scrollRef.current
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollability)
      window.addEventListener('resize', checkScrollability)
      return () => {
        scrollEl.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
      }
    }
  }, [items])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scroll('left')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scroll('right')
    }
  }

  if (items.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">({items.length})</span>
      </div>

      <div className="relative group/carousel">
        {(canScrollLeft || items.length > 1) && (
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              'absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full',
              'bg-background/90 backdrop-blur-sm border shadow-md p-1.5',
              'opacity-0 group-hover/carousel:opacity-100 transition-opacity',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
            aria-label="Scroll left"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div
          ref={scrollRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="listbox"
          aria-label={`${label} carousel`}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              role="option"
              className="flex-shrink-0 snap-start"
            >
              {label.includes('Reel') || label.includes('Vlog') ? (
                <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-muted">
                  <video
                    src={item}
                    controls
                    className="w-full h-full object-cover"
                    aria-label={`Video ${index + 1}`}
                  />
                </div>
              ) : (
                <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {(canScrollRight || items.length > 1) && (
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              'absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full',
              'bg-background/90 backdrop-blur-sm border shadow-md p-1.5',
              'opacity-0 group-hover/carousel:opacity-100 transition-opacity',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
            aria-label="Scroll right"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}