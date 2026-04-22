'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface BentoGalleryProps {
  images: string[]
  title?: string
}

const INITIAL_DISPLAY = 6

// Fallback placeholder image
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&h=600&fit=crop'

export function BentoGallery({ images, title = 'Gallery' }: BentoGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCarouselOpen, setIsCarouselOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Handle escape key to close carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCarouselOpen) {
        setIsCarouselOpen(false)
      }
      if (e.key === 'ArrowLeft' && isCarouselOpen) {
        goToPrev()
      }
      if (e.key === 'ArrowRight' && isCarouselOpen) {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCarouselOpen, currentIndex])

  if (!images || images.length === 0) {
    return (
      <div className="mt-16 pt-12 border-t border-gray-100 font-sans">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">{title}</h3>
        <div className="relative rounded-2xl overflow-hidden h-[300px] bg-gray-100">
          <img
            src={PLACEHOLDER_IMAGE}
            alt="Placeholder"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400 text-lg font-medium">No images available</p>
          </div>
        </div>
      </div>
    )
  }

  const displayImages = isExpanded ? images : images.slice(0, INITIAL_DISPLAY)
  const hasMore = images.length > INITIAL_DISPLAY

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openCarousel = (index: number) => {
    setCurrentIndex(index)
    setIsCarouselOpen(true)
  }

  // Bento grid pattern - larger first image
  const getGridSpan = (index: number, isExpanded: boolean) => {
    if (isExpanded) {
      if (index === 0) return 'md:col-span-2 md:row-span-2'
      if (index === 4) return 'md:col-span-2'
      if (index === 7) return 'md:row-span-2'
    }
    if (index === 0) return 'md:col-span-2 md:row-span-2'
    return ''
  }

  return (
    <>
      <div className="mt-16 pt-12 border-t border-gray-100 font-sans">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">{title}</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {displayImages.map((img, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => openCarousel(idx)}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${getGridSpan(idx, isExpanded)}`}
              >
                <img
                  src={img}
                  alt={`${title} item ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 mx-auto flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <>
                <FiChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <FiChevronDown className="w-4 h-4" />
                Show More ({images.length - INITIAL_DISPLAY} more)
              </>
            )}
          </motion.button>
        )}
      </div>

      {/* Carousel Modal */}
      <AnimatePresence>
        {isCarouselOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setIsCarouselOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsCarouselOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Previous */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrev()
                }}
                className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <FiChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Main image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
                }}
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full">
                <span className="text-white text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </motion.div>

            {/* Navigation - Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <FiChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
