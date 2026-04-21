'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'

interface MediaCarouselProps {
  items: string[]
  aspectRatio?: 'video' | 'square' | 'portrait'
  className?: string
}

const aspectRatioClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
}

export function MediaCarousel({ items, aspectRatio = 'video', className }: MediaCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    containScroll: 'trimSnaps',
  })

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
      }
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setSelectedIndex(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (items.length === 0) return null

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {items.map((src, index) => (
            <div
              key={index}
              className={cn(
                'flex-[0_0_100%] min-w-0 pl-4 first:pl-0',
                aspectRatioClasses[aspectRatio]
              )}
            >
              <div className="h-full w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-3">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === selectedIndex
                  ? 'bg-foreground w-3'
                  : 'bg-foreground/30 hover:bg-foreground/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}