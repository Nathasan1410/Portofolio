'use client'

import { Experience } from '@/lib/types'
import { ContentCard } from '@/components/ui/ContentCard'
import { useIsMobile } from '@/hooks/use-mobile'
import { getRoleSummary } from '@/lib/primitives'

interface ExperienceCardProps {
  experience: Experience
  onClick: () => void
}

export function ExperienceCard({ experience, onClick }: ExperienceCardProps) {
  const isMobile = useIsMobile()
  const imageSource = experience.photos?.[0]
  const roleSummary = getRoleSummary({
    mainRole: experience.mainRole,
    extraRoles: experience.extraRoles,
    isMobile,
  })

  return (
    <ContentCard
      title={experience.title}
      highlight={experience.highlight}
      type={experience.type}
      media={imageSource ? { src: imageSource, alt: experience.title } : undefined}
      footer={
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs text-muted-foreground">{experience.date}</span>
            {experience.kpi && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {experience.kpi}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-foreground">{roleSummary}</p>
        </div>
      }
      isMobile={isMobile}
      onClick={onClick}
    />
  )
}
