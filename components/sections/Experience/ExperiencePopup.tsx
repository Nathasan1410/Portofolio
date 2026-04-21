'use client'

import { useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { Experience } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MediaCarousel } from '@/components/ui/MediaCarousel'
import { cn } from '@/lib/utils'
import {
  FullScreenDialog,
  FullScreenDialogContent,
} from '@/components/ui/FullScreenDialog'

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
    <FullScreenDialog open={!!experience} onOpenChange={(open) => !open && onClose()}>
      <FullScreenDialogContent
        title={experience?.title}
        className={cn(
          'w-[90vw] md:w-[80vw] lg:w-[70vw] aspect-video',
          'max-h-[90vh]'
        )}
      >
        {experience && (
          <div className="flex flex-col md:flex-row gap-6 h-full">
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
                    <MediaCarousel
                      items={experience.photos}
                      aspectRatio="video"
                    />
                  )}

                  {experience.photos && experience.photos.length > 0 && experience.reels && experience.reels.length > 0 && (
                    <Separator />
                  )}

                  {experience.reels && experience.reels.length > 0 && (
                    <MediaCarousel
                      items={experience.reels}
                      aspectRatio="video"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-5 overflow-auto">
              <header className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-foreground pr-6">
                    {experience.title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn('text-xs font-medium bg-white/20 backdrop-blur-sm', typeColors[experience.type])}
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

              <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {experience.mainRole}
                </span>
                {experience.extraRoles && experience.extraRoles.length > 0 && (
                  <span>
                    {' - '}
                    {experience.extraRoles.join(' - ')}
                  </span>
                )}
              </div>

              <Separator />

              {experience.content && (
                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80">
                  <ReactMarkdown>{experience.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        )}
      </FullScreenDialogContent>
    </FullScreenDialog>
  )
}