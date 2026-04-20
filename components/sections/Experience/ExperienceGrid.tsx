'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Experience, FilterType } from '@/lib/types'
import { ExperienceCard } from './ExperienceCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExperienceGridProps {
  experiences: Experience[]
  onSelectExperience: (experience: Experience) => void
}

const filterOptions: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Hackathons', value: 'hackathon' },
  { label: 'Events', value: 'event' },
  { label: 'Community', value: 'community' },
]

export function ExperienceGrid({ experiences, onSelectExperience }: ExperienceGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredExperiences = useMemo(() => {
    if (activeFilter === 'all') return experiences
    return experiences.filter((exp) => exp.type === activeFilter)
  }, [experiences, activeFilter])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={activeFilter === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(option.value)}
            className={cn(
              'rounded-full text-xs font-medium px-4',
              activeFilter === option.value && 'shadow-sm'
            )}
          >
            {option.label}
            {option.value !== 'all' && (
              <span className="ml-1.5 opacity-70">
                ({experiences.filter((e) => e.type === option.value).length})
              </span>
            )}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filteredExperiences.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ExperienceCard
                  experience={experience}
                  onClick={() => onSelectExperience(experience)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <p className="text-muted-foreground">
              No experiences found for this filter.
            </p>
            <Button
              variant="link"
              onClick={() => setActiveFilter('all')}
              className="mt-2 text-primary"
            >
              View all experiences
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}