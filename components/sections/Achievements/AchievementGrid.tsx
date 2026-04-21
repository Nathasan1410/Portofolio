'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAward, FaTrophy, FaStar } from 'react-icons/fa'
import { FiImage } from 'react-icons/fi'
import { Achievement, AchievementFilterType } from '@/lib/types'
import { AchievementCard } from './AchievementCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AchievementGridProps {
  achievements: Achievement[]
  onSelectAchievement: (achievement: Achievement) => void
}

const filterOptions: { label: string; value: AchievementFilterType; icon: typeof FaAward }[] = [
  { label: 'All', value: 'all', icon: FaAward },
  { label: 'Certificates', value: 'certificate', icon: FaAward },
  { label: 'Hackathon Wins', value: 'hackathon_win', icon: FaTrophy },
  { label: 'Recognitions', value: 'recognition', icon: FaStar },
]

export function AchievementGrid({ achievements, onSelectAchievement }: AchievementGridProps) {
  const [activeFilter, setActiveFilter] = useState<AchievementFilterType>('all')

  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'all') return achievements
    return achievements.filter((ach) => ach.type === activeFilter)
  }, [achievements, activeFilter])

  const counts = useMemo(() => ({
    all: achievements.length,
    certificate: achievements.filter((a) => a.type === 'certificate').length,
    hackathon_win: achievements.filter((a) => a.type === 'hackathon_win').length,
    recognition: achievements.filter((a) => a.type === 'recognition').length,
  }), [achievements])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((option) => {
          const Icon = option.icon
          return (
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
              <Icon className="mr-1.5 h-3.5 w-3.5" />
              {option.label}
              {option.value !== 'all' && (
                <span className="ml-1.5 opacity-70">
                  ({counts[option.value]})
                </span>
              )}
            </Button>
          )
        })}
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
