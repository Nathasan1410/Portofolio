'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/lib/types'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ExperienceCardProps {
  experience: Experience
  onClick: () => void
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
      {hasPhoto ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={experience.photos[0]}
            alt=""
            fill
            className="object-cover"
          />
          {/* Subtle bottom gradient to blend image into card content */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white via-white/5 to-transparent pointer-events-none" />
          <div className="absolute top-2 left-2">
            <TypeBadge type={experience.type} />
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <div className={cn(
            'w-full h-full bg-gradient-to-br flex items-center justify-center',
            typeGradients[experience.type]
          )} />
          <div className="absolute top-2 left-2">
            <TypeBadge type={experience.type} />
          </div>
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-semibold text-foreground tracking-wide truncate">
          {experience.title}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-light">
            {experience.date}
          </span>
        </div>
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