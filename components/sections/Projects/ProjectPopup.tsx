'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FiX, FiExternalLink } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Project } from '@/lib/types'
import { TechBadge } from './TechBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface ProjectPopupProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectPopup({ project, open, onOpenChange }: ProjectPopupProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      closeRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onOpenChange])

  if (!project) return null

  const youtubeVideoId = project.youtubeUrl
    ? extractYouTubeId(project.youtubeUrl)
    : null

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
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
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'fixed z-50 w-full max-w-4xl max-h-[90vh] overflow-auto',
                  'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  'rounded-xl border bg-background p-6 shadow-xl',
                  'focus:outline-none'
                )}
              >
                <DialogPrimitive.Close
                  ref={closeRef}
                  className={cn(
                    'absolute right-4 top-4 rounded-sm z-10',
                    'opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  )}
                  aria-label="Close"
                >
                  <FiX className="h-5 w-5" />
                </DialogPrimitive.Close>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="space-y-4">
                      {youtubeVideoId ? (
                        <div className="rounded-lg overflow-hidden">
                          <AspectRatio ratio={16 / 9}>
                            <iframe
                              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                              title={`${project.title} video`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="h-full w-full"
                            />
                          </AspectRatio>
                        </div>
                      ) : project.photos && project.photos.length > 0 ? (
                        <Carousel>
                          <CarouselContent>
                            {project.photos.map((photo, index) => (
                              <CarouselItem key={index}>
                                <div className="rounded-lg overflow-hidden">
                                  <img
                                    src={photo}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      ) : (
                        <div className="flex h-40 items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">
                          No media available
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <DialogPrimitive.Title className="text-xl font-semibold text-foreground pr-8">
                          {project.title}
                        </DialogPrimitive.Title>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

{project.content && (
                  <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                  </div>
                )}

                    <Separator />

                    <div className="flex flex-wrap gap-3">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 px-2.5 bg-primary text-primary-foreground hover:bg-primary/80"
                        >
                          <FaGithub className="h-4 w-4" />
                          View Code
                        </a>
                      ) : (
                        <Button disabled variant="outline" className="gap-2">
                          <FaGithub className="h-4 w-4" />
                          View Code
                        </Button>
                      )}
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border-border bg-background hover:bg-muted hover:text-foreground text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 px-2.5"
                        >
                          <FiExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      ) : (
                        <Button disabled variant="secondary" className="gap-2">
                          <FiExternalLink className="h-4 w-4" />
                          Coming Soon
                        </Button>
                      )}
                    </div>
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

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}