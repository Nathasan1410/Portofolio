'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Experience, FilterType } from '@/lib/types'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceTimeline } from './ExperienceTimeline'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { FaTh, FaStream, FaRocket, FaCalendar, FaUsers } from 'react-icons/fa'
import { FilterPillBar } from '@/lib/primitives'

interface ExperienceGridProps {
  experiences: Experience[]
  onSelectExperience: (experience: Experience) => void
}

const filterConfig = [
  { label: 'All', value: 'all' as FilterType, icon: FaTh },
  { label: 'Hackathons', value: 'hackathon' as FilterType, icon: FaRocket },
  { label: 'Events', value: 'event' as FilterType, icon: FaCalendar },
  { label: 'Community', value: 'community' as FilterType, icon: FaUsers },
]

export function ExperienceGrid({ experiences, onSelectExperience }: ExperienceGridProps) {
  const isMobile = useIsMobile()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('timeline')

  useEffect(() => {
    setViewMode(isMobile ? 'cards' : 'timeline')
  }, [isMobile])

  const filteredExperiences = useMemo(() => {
    if (activeFilter === 'all') return experiences
    return experiences.filter((exp) => exp.type === activeFilter)
  }, [experiences, activeFilter])

  const filterOptions = useMemo(() => {
    return filterConfig.map((config) => ({
      ...config,
      icon: <config.icon className="h-3 w-3" />,
      count: config.value === 'all'
        ? experiences.length
        : experiences.filter((e) => e.type === config.value).length,
    }))
  }, [experiences])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 self-start rounded-full border border-border bg-background/90 p-1 shadow-sm">
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('timeline')}
            className="gap-1.5 rounded-full"
          >
            <FaStream className="h-3 w-3" /> Timeline
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="gap-1.5 rounded-full"
          >
            <FaTh className="h-3 w-3" /> Cards
          </Button>
        </div>

        <FilterPillBar
          options={filterOptions}
          activeValue={activeFilter}
          onChange={(value) => setActiveFilter(value as FilterType)}
          isMobile={isMobile}
        />
      </div>

      <AnimatePresence mode="wait">
        {filteredExperiences.length > 0 ? (
          viewMode === 'timeline' ? (
            <motion.div
              key={`${activeFilter}-timeline`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ExperienceTimeline
                experiences={filteredExperiences}
                onSelectExperience={onSelectExperience}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`${activeFilter}-cards`}
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
          )
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
