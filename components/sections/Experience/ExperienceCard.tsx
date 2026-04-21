'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ExperienceCardProps {
  experience: Experience
  onClick: () => void
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

const typeGradients = {
  hackathon: 'from-cyan-500/20 to-purple-500/20',
  event: 'from-purple-500/20 to-pink-500/20',
  community: 'from-emerald-500/20 to-cyan-500/20',
  work: 'from-blue-500/20 to-indigo-500/20',
}

export function ExperienceCard({ experience, onClick }: ExperienceCardProps) {
  const allRoles = [experience.mainRole, ...(experience.extraRoles || [])]
  const hasPhoto = experience.photos && experience.photos.length > 0

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative w-full rounded-xl border bg-card p-5 text-left',
        'shadow-sm hover:shadow-lg',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground tracking-wide truncate">
              {experience.title}
            </h3>
            {hasPhoto && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={experience.photos[0]}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn('text-xs font-medium tracking-wider uppercase', typeColors[experience.type])}
            >
              {typeLabels[experience.type]}
            </Badge>
            <span className="text-xs text-muted-foreground font-light">
              {experience.date}
            </span>
          </div>
        </div>

        {!hasPhoto && (
          <div className={cn(
            'w-16 h-16 rounded-lg bg-gradient-to-br flex-shrink-0',
            typeGradients[experience.type]
          )} />
        )}
      </div>

      {experience.kpi && (
        <div className="mt-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary tracking-wide">
            {experience.kpi}
          </span>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1">
        <span className="text-sm font-medium text-foreground">
          {experience.mainRole}
        </span>
        {experience.extraRoles && experience.extraRoles.length > 0 && (
          <span className="text-sm text-muted-foreground font-light">
            {' - '}
            {experience.extraRoles.join(' - ')}
          </span>
        )}
      </div>

      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 group-hover:shadow-[0_0_20px_rgba(120,80,200,0.15)] dark:group-hover:shadow-[0_0_20px_rgba(100,80,255,0.1)] transition-all duration-300" />
    </motion.button>
  )
}