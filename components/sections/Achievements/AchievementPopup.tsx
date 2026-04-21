'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiFileText } from 'react-icons/fi'
import { FaAward, FaTrophy, FaStar, FaUsers } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Achievement } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MediaCarousel } from '@/components/ui/MediaCarousel'
import { cn } from '@/lib/utils'
import {
  FullScreenDialog,
  FullScreenDialogContent,
} from '@/components/ui/FullScreenDialog'

interface AchievementPopupProps {
  achievement: Achievement | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const typeConfig = {
  certificate: {
    colors: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20',
    label: 'Certificate',
    icon: FaAward,
  },
  hackathon_win: {
    colors: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20',
    label: 'Hackathon Win',
    icon: FaTrophy,
  },
  recognition: {
    colors: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
    label: 'Recognition',
    icon: FaStar,
  },
}

function CertificateViewer({ imageUrl, title }: { imageUrl: string; title: string }) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <div className="relative group cursor-pointer overflow-hidden rounded-lg border bg-muted/50">
        <img
          src={imageUrl}
          alt={`Certificate for ${title}`}
          className="w-full h-auto object-contain max-h-48 transition-transform duration-300 group-hover:scale-105"
          onClick={() => setIsZoomed(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            Click to zoom
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imageUrl}
                alt={`Certificate for ${title} - Full view`}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = imageUrl
                  link.download = `${title.replace(/\s+/g, '_')}_certificate`
                  link.click()
                }}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <FiDownload className="h-4 w-4" />
                Download
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function AchievementPopup({ achievement, open, onOpenChange }: AchievementPopupProps) {
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !imageViewerOpen) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onOpenChange, imageViewerOpen])

  if (!achievement) return null

  const config = typeConfig[achievement.type]
  const Icon = config.icon

  return (
    <FullScreenDialog open={open} onOpenChange={onOpenChange}>
      <FullScreenDialogContent
        title={achievement.title}
        className={cn(
          'w-[90vw] md:w-[80vw] lg:w-[70vw] aspect-video',
          'max-h-[90vh]'
        )}
      >
        <div ref={dialogRef} className="flex flex-col md:flex-row gap-6 h-full">
          <div className="w-full md:w-1/3 flex-shrink-0">
            {achievement.type === 'certificate' && achievement.certificateImage && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiFileText className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Certificate</span>
                </div>
                <CertificateViewer
                  imageUrl={achievement.certificateImage}
                  title={achievement.title}
                />
              </div>
            )}
            {achievement.type === 'hackathon_win' && achievement.photos && achievement.photos.length > 0 && (
              <MediaCarousel
                items={achievement.photos}
                aspectRatio="video"
              />
            )}
            {achievement.type !== 'certificate' && achievement.type !== 'hackathon_win' && achievement.photos && achievement.photos.length > 0 && (
              <MediaCarousel
                items={achievement.photos}
                aspectRatio="video"
              />
            )}
          </div>

          <div className="flex-1 space-y-5 overflow-auto">
            <header className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-foreground pr-6">
                  {achievement.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn('text-xs font-medium bg-white/20 backdrop-blur-sm', config.colors)}
                >
                  <Icon className="mr-1 h-3 w-3" />
                  {config.label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {achievement.date}
                </span>
              </div>

              {achievement.issuer && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Issued by</span>
                  <span className="font-medium text-foreground">{achievement.issuer}</span>
                </div>
              )}
            </header>

            <Separator />

            {achievement.content && (
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80">
                <ReactMarkdown>{achievement.content}</ReactMarkdown>
              </div>
            )}

            {achievement.type === 'hackathon_win' && achievement.keyAchievements && achievement.keyAchievements.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Key Achievements
                  </span>
                  <ul className="space-y-1.5">
                    {achievement.keyAchievements.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-foreground flex items-start gap-2"
                      >
                        <span className="text-purple-500 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </FullScreenDialogContent>
    </FullScreenDialog>
  )
}