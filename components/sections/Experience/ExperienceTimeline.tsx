'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ExperienceTimelineProps {
  experiences: Experience[]
  onSelectExperience: (experience: Experience) => void
}

const typeColors = {
  hackathon: 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-500/20',
  event: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20',
  community: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20',
  work: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
}

const typeDotColors = {
  hackathon: 'bg-cyan-500',
  event: 'bg-purple-500',
  community: 'bg-emerald-500',
  work: 'bg-blue-500',
}

const typeLabels = {
  hackathon: 'Hackathon',
  event: 'Event',
  community: 'Community',
  work: 'Work',
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
                    <Badge
                      variant="outline"
                      className={cn('text-xs font-medium', typeColors[experience.type])}
                    >
                      {typeLabels[experience.type]}
                    </Badge>
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
