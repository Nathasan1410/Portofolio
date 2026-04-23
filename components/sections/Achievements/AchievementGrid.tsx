'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAward, FaTrophy, FaStar } from 'react-icons/fa'
import { Achievement, AchievementFilterType } from '@/lib/types'
import { AchievementCard } from './AchievementCard'
import { Button } from '@/components/ui/button'
import { FilterPillBar } from '@/lib/primitives'
import { useIsMobile } from '@/hooks/use-mobile'

interface AchievementGridProps {
  achievements: Achievement[]
  onSelectAchievement: (achievement: Achievement) => void
}

const filterConfig: { label: string; value: AchievementFilterType; icon: typeof FaAward }[] = [
  { label: 'All', value: 'all', icon: FaAward },
  { label: 'Certificates', value: 'certificate', icon: FaAward },
  { label: 'Wins', value: 'hackathon_win', icon: FaTrophy },
  { label: 'Recognition', value: 'recognition', icon: FaStar },
]

export function AchievementGrid({ achievements, onSelectAchievement }: AchievementGridProps) {
  const [activeFilter, setActiveFilter] = useState<AchievementFilterType>('all')
  const isMobile = useIsMobile()

  const filterOptions = useMemo(() => {
    const getCount = (value: AchievementFilterType): number => {
      if (value === 'all') return achievements.length
      return achievements.filter((a) => a.type === value).length
    }
    return filterConfig.map((config) => ({
      ...config,
      icon: <config.icon className="h-3 w-3" />,
      count: getCount(config.value),
    }))
  }, [achievements])

  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'all') return achievements
    return achievements.filter((ach) => ach.type === activeFilter)
  }, [achievements, activeFilter])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1"></div>
        <FilterPillBar
          options={filterOptions}
          activeValue={activeFilter}
          onChange={(value) => setActiveFilter(value as AchievementFilterType)}
          isMobile={isMobile}
        />
      </div>

      <AnimatePresence mode="wait">
        {filteredAchievements.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AchievementCard
                  achievement={achievement}
                  onClick={() => onSelectAchievement(achievement)}
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
            <FaAward className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              No achievements found for this filter.
            </p>
            <Button
              variant="link"
              onClick={() => setActiveFilter('all')}
              className="mt-2 text-primary"
            >
              View all achievements
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
