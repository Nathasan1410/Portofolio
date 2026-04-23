'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/lib/types'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useIsMobile } from '@/hooks/use-mobile'
import { contentTypeTheme, getRoleSummary } from '@/lib/primitives'

interface ExperienceCardProps {
  experience: Experience
  onClick: () => void
}

export function ExperienceCard({ experience, onClick }: ExperienceCardProps) {
  const isMobile = useIsMobile()
  const hasPhoto = experience.photos && experience.photos.length > 0
  const showMedia = !isMobile || hasPhoto

  const theme = contentTypeTheme[experience.type]
  const gradientClass = `bg-gradient-to-br ${theme.gradient.from} ${theme.gradient.to}`

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative w-full rounded-xl border bg-card text-left',
        'shadow-sm hover:shadow-lg',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isMobile ? 'p-3' : 'p-5'
      )}
    >
      {showMedia && (
        <div className={cn(
          'relative w-full overflow-hidden rounded-lg',
          isMobile ? 'aspect-[4/3]' : 'aspect-video'
        )}>
          {hasPhoto ? (
            <Image
              src={experience.photos[0]}
              alt=""
              fill
              className="object-cover"
            />
          ) : (
            <div className={cn(
              'w-full h-full flex items-center justify-center',
              gradientClass
            )} />
          )}
          {/* Subtle bottom gradient to blend image into card content */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white via-white/5 to-transparent pointer-events-none" />
          <div className="absolute top-2 left-2">
            <TypeBadge type={experience.type} />
          </div>
        </div>
      )}

      <div className={isMobile ? 'mt-3' : 'mt-4'}>
        <h3 className="font-semibold text-foreground tracking-wide truncate">
          {experience.title}
        </h3>
        {experience.highlight && (
          <p className={cn(
            'text-xs text-muted-foreground font-light line-clamp-2',
            isMobile ? 'mt-1' : 'mt-2'
          )}>
            {experience.highlight}
          </p>
        )}
        <div className={cn(
          'flex items-center gap-2',
          isMobile ? 'mt-2' : 'mt-3'
        )}>
          <span className="text-xs text-muted-foreground font-light">
            {experience.date}
          </span>
        </div>
      </div>

      {experience.kpi && (
        <div className={isMobile ? 'mt-2' : 'mt-3'}>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary tracking-wide">
            {experience.kpi}
          </span>
        </div>
      )}

      <div className={cn(
        'flex flex-wrap gap-1',
        isMobile ? 'mt-2' : 'mt-3'
      )}>
        <span className="text-sm font-medium text-foreground">
          {getRoleSummary({
            mainRole: experience.mainRole,
            extraRoles: experience.extraRoles,
            isMobile
          })}
        </span>
        {!isMobile && experience.extraRoles && experience.extraRoles.length > 0 && (
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