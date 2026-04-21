'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FiX } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { Experience } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExperiencePopupCarousel } from './ExperiencePopupCarousel'
import { cn } from '@/lib/utils'

interface ExperiencePopupProps {
  experience: Experience | null
  onClose: () => void
}

const typeColors = {
  hackathon: 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-500/20',
  event: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20',
  community: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20',
  work: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
}

const typeLabels = {
  hackathon: 'Hackathon',
  event: 'Event',
  community: 'Community',
  work: 'Work',
}

export function ExperiencePopup({ experience, onClose }: ExperiencePopupProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (experience) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [experience, handleEscape])

  return (
    <DialogPrimitive.Root
      open={!!experience}
      onOpenChange={(open) => !open && onClose()}
    >
      <AnimatePresence>
        {experience && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="experience-dialog-title"
                className={cn(
                  'fixed z-50 w-full max-w-4xl max-h-[90vh] overflow-auto',
                  'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  'bg-card rounded-xl border shadow-xl',
                  'p-6',
                  'focus:outline-none'
                )}
              >
                <DialogPrimitive.Close
                  className={cn(
                    'absolute right-4 top-4 rounded-sm p-1.5 z-10',
                    'opacity-70 hover:opacity-100',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'transition-opacity duration-200'
                  )}
                  aria-label="Close dialog"
                >
                  <FiX className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    {(experience.youtubeVideo || (experience.photos && experience.photos.length > 0) || (experience.reels && experience.reels.length > 0)) && (
                      <div className="space-y-4">
                        {experience.youtubeVideo && (
                          <div className="aspect-video w-full rounded-lg overflow-hidden">
                            <iframe
                              src={experience.youtubeVideo}
                              className="w-full h-full"
                              allowFullScreen
                              title="YouTube video"
                            />
                          </div>
                        )}

                        {experience.photos && experience.photos.length > 0 && (
                          <ExperiencePopupCarousel
                            items={experience.photos}
                            label="📸 Photos"
                          />
                        )}

                        {experience.photos && experience.photos.length > 0 && experience.reels && experience.reels.length > 0 && (
                          <Separator />
                        )}

                        {experience.reels && experience.reels.length > 0 && (
                          <ExperiencePopupCarousel
                            items={experience.reels}
                            label="🎬 Reels & Vlogs"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-5">
                    <header className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <DialogPrimitive.Title
                          id="experience-dialog-title"
                          className="text-xl font-semibold text-foreground pr-6"
                        >
                          {experience.title}
                        </DialogPrimitive.Title>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn('text-xs font-medium', typeColors[experience.type])}
                        >
                          {typeLabels[experience.type]}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {experience.date}
                        </span>
                      </div>
                    </header>

                    {experience.kpi && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {experience.kpi}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-1 text-sm">
                      <span className="font-medium text-foreground">
                        {experience.mainRole}
                      </span>
                      {experience.extraRoles && experience.extraRoles.length > 0 && (
                        <span className="text-muted-foreground">
                          {' - '}
                          {experience.extraRoles.join(' - ')}
                        </span>
                      )}
                    </div>

                    <Separator />

{experience.content && (
                    <>
                      <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80">
                        <ReactMarkdown>{experience.content}</ReactMarkdown>
                      </div>
                      <Separator />
                    </>
                  )}
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}