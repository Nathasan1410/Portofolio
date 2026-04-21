'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiFileText } from 'react-icons/fi'
import { FaAward, FaTrophy, FaStar, FaUsers } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Achievement } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogRef}
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation()
          }
        }}
      >
        <div className="flex flex-col md:flex-row gap-6">
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
          </div>

          <div className="flex-1 space-y-5">
            <DialogHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-xl leading-tight">
                    {achievement.title}
                  </DialogTitle>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn('text-xs font-medium', config.colors)}
                    >
                      <Icon className="mr-1 h-3 w-3" />
                      {config.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {achievement.date}
                    </span>
                  </div>
                </div>
              </div>
              <DialogDescription className="sr-only">
                Achievement details for {achievement.title}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Issued by</span>
                <span className="font-medium text-foreground">{achievement.issuer}</span>
              </div>
            </div>

{achievement.content && (
          <>
            <Separator />
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-muted-foreground">
              <ReactMarkdown>{achievement.content}</ReactMarkdown>
            </div>
          </>
        )}

            {achievement.type === 'hackathon_win' && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Hackathon Highlights</span>
                  </div>

                  {achievement.projectSubmitted && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Project Submitted
                      </span>
                      <p className="text-sm font-medium">{achievement.projectSubmitted}</p>
                    </div>
                  )}

                  {achievement.teamInfo && achievement.teamInfo.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaUsers className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          Team
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {achievement.teamInfo.map((member, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {member}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {achievement.keyAchievements && achievement.keyAchievements.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Key Achievements
                      </span>
                      <ul className="space-y-1.5">
                        {achievement.keyAchievements.map((achievement, index) => (
                          <li
                            key={index}
                            className="text-sm text-foreground flex items-start gap-2"
                          >
                            <span className="text-purple-500 mt-0.5">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}

            {achievement.photos && achievement.photos.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <span className="text-sm font-medium">Event Photos</span>
                  <div className="grid grid-cols-2 gap-2">
                    {achievement.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-video overflow-hidden rounded-lg border bg-muted cursor-pointer group"
                        onClick={() => {
                          const link = document.createElement('a')
                          link.href = photo
                          link.download = `achievement_photo_${index + 1}`
                          link.click()
                        }}
                      >
                        <img
                          src={photo}
                          alt={`Achievement photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <FiDownload className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}