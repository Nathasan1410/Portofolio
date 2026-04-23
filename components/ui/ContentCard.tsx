'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { contentTypeTheme, ContentType } from '@/lib/primitives'

interface ContentCardProps {
  title: string
  highlight?: string
  type: ContentType
  media?: {
    src?: string
    alt?: string
  }
  footer?: React.ReactNode
  onClick: () => void
  isMobile?: boolean
  className?: string
}

export function ContentCard({
  title,
  highlight,
  type,
  media,
  footer,
  onClick,
  isMobile = false,
  className,
}: ContentCardProps) {
  const theme = contentTypeTheme[type]
  const gradientClass = `bg-gradient-to-br ${theme.gradient.from} ${theme.gradient.to}`
  const hasMedia = media?.src

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative w-full rounded-xl border bg-card text-left',
        'shadow-sm hover:shadow-lg',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isMobile ? 'p-3' : 'p-5',
        className
      )}
    >
      {/* Media Section */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-lg',
          isMobile ? 'aspect-[4/3]' : 'aspect-video'
        )}
      >
        {hasMedia ? (
          <Image
            src={media.src!}
            alt={media.alt || ''}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center',
              gradientClass
            )}
          />
        )}

        {/* Subtle bottom gradient to blend image into card content */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white via-white/5 to-transparent pointer-events-none" />

        {/* TypeBadge positioned top-left */}
        <div className="absolute top-2 left-2">
          <TypeBadge type={type} />
        </div>
      </div>

      {/* Content Section */}
      <div className={isMobile ? 'mt-3' : 'mt-4'}>
        <h3 className="font-semibold text-foreground truncate">{title}</h3>

        {highlight && (
          <p
            className={cn(
              'text-sm text-muted-foreground line-clamp-2',
              isMobile ? 'mt-1' : 'mt-2'
            )}
          >
            {highlight}
          </p>
        )}

        {/* Footer slot */}
        {footer && (
          <div className={isMobile ? 'mt-2' : 'mt-3'}>{footer}</div>
        )}
      </div>

      {/* Hover border/shadow effect */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 group-hover:shadow-[0_0_20px_rgba(120,80,200,0.15)] dark:group-hover:shadow-[0_0_20px_rgba(100,80,255,0.1)] transition-all duration-300" />
    </motion.button>
  )
}

export type { ContentCardProps }
