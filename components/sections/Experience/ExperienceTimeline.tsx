'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/lib/types'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { cn } from '@/lib/utils'

interface ExperienceTimelineProps {
  experiences: Experience[]
  onSelectExperience: (experience: Experience) => void
}

const typeDotColors = {
  hackathon: 'bg-cyan-500',
  event: 'bg-purple-500',
  community: 'bg-emerald-500',
  work: 'bg-blue-500',
}

export function ExperienceTimeline({ experiences, onSelectExperience }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative pl-12"
          >
            <div
              className={cn(
                'absolute left-2 top-5 h-4 w-4 rounded-full border-2 border-background',
                typeDotColors[experience.type]
              )}
            />

            <button
              onClick={() => onSelectExperience(experience)}
              className={cn(
                'group w-full rounded-xl border bg-card p-4 text-left',
                'shadow-sm hover:shadow-md transition-shadow duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {experience.title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <TypeBadge type={experience.type} />
                    <span className="text-xs text-muted-foreground">
                      {experience.date}
                    </span>
                  </div>
                </div>
              </div>

              {experience.kpi && (
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {experience.kpi}
                  </span>
                </div>
              )}

              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-sm font-medium text-foreground">
                  {experience.mainRole}
                </span>
                {experience.extraRoles && experience.extraRoles.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {' - '}
                    {experience.extraRoles.join(' - ')}
                  </span>
                )}
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
