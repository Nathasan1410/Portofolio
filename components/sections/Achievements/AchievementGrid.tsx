'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Trophy, Star, LayoutGrid } from 'lucide-react'
import { Achievement, AchievementFilterType } from '@/lib/types'
import { AchievementCard } from './AchievementCard'
import { Button } from '@/components/ui/button'
import { SwipeableFilter } from '@/components/ui/SwipeableFilter'

interface AchievementGridProps {
  achievements: Achievement[]
  onSelectAchievement: (achievement: Achievement) => void
}

const filterConfig = [
  { id: 'all', label: 'All', value: 'all' as AchievementFilterType, icon: LayoutGrid },
  { id: 'certificate', label: 'Certificates', value: 'certificate' as AchievementFilterType, icon: Award },
  { id: 'hackathon_win', label: 'Wins', value: 'hackathon_win' as AchievementFilterType, icon: Trophy },
  { id: 'recognition', label: 'Recognition', value: 'recognition' as AchievementFilterType, icon: Star },
]

export function AchievementGrid({ achievements, onSelectAchievement }: AchievementGridProps) {
  const [activeFilter, setActiveFilter] = useState<AchievementFilterType>('all')

  const filterOptions = useMemo(() => {
    const getCount = (value: AchievementFilterType): number => {
      if (value === 'all') return achievements.length
      return achievements.filter((a) => a.type === value).length
    }
    return filterConfig.map((config) => ({
      id: config.value,
      label: config.label,
      icon: config.icon,
      count: getCount(config.value),
    }))
  }, [achievements])

  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'all') return achievements
    return achievements.filter((ach) => ach.type === activeFilter)
  }, [achievements, activeFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <SwipeableFilter
          options={filterOptions}
          value={activeFilter}
          onChange={(value) => setActiveFilter(value as AchievementFilterType)}
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
            <Award className="h-12 w-12 text-muted-foreground/50 mb-4" />
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
