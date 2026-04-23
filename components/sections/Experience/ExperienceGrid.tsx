'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Experience, FilterType } from '@/lib/types'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceTimeline } from './ExperienceTimeline'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { FaTh, FaStream, FaRocket, FaCalendar, FaUsers } from 'react-icons/fa'
import { SlideToggle } from '@/components/ui/SlideToggle'
import { SwipeableFilter } from '@/components/ui/SwipeableFilter'

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
      label: config.label,
      value: config.value,
      icon: <config.icon className="h-3.5 w-3.5" />,
      count: config.value === 'all'
        ? experiences.length
        : experiences.filter((e) => e.type === config.value).length,
    }))
  }, [experiences])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: View Toggle (desktop only) */}
        <div className="hidden sm:block">
          <SlideToggle
            options={[
              { label: 'Timeline', value: 'timeline', icon: <FaStream /> },
              { label: 'Cards', value: 'cards', icon: <FaTh /> }
            ]}
            value={viewMode}
            onChange={(value) => setViewMode(value as 'cards' | 'timeline')}
            size="sm"
          />
        </div>

        {/* Right: Filter */}
        <SwipeableFilter
          options={filterOptions}
          value={activeFilter}
          onChange={(value) => setActiveFilter(value as FilterType)}
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
