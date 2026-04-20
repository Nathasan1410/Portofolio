'use client'

import { motion } from 'framer-motion'
import { FaAward, FaTrophy, FaStar } from 'react-icons/fa'
import { Achievement } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface AchievementCardProps {
  achievement: Achievement
  onClick: () => void
}

const typeConfig = {
  certificate: {
    colors: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20',
    label: 'Certificate',
    icon: FaAward,
    celebratory: true,
  },
  hackathon_win: {
    colors: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20',
    label: 'Hackathon Win',
    icon: FaTrophy,
    celebratory: true,
  },
  recognition: {
    colors: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
    label: 'Recognition',
    icon: FaStar,
    celebratory: false,
  },
}

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const config = typeConfig[achievement.type]
  const Icon = config.icon

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative w-full rounded-xl border bg-card p-5 text-left',
        'shadow-sm hover:shadow-lg',
        'transition-all duration-200',
        config.celebratory && 'hover:border-amber-500/30 dark:hover:border-amber-500/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      )}
    >
      {config.celebratory && (
        <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon className={cn('h-5 w-5', achievement.type === 'certificate' ? 'text-amber-500' : 'text-purple-500')} />
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate pr-6">
            {achievement.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn('text-xs font-medium', config.colors)}
            >
              <Icon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {achievement.date}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <span className="text-sm text-muted-foreground">
          Issued by {achievement.issuer}
        </span>
      </div>

      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-amber-500/20 dark:group-hover:border-amber-500/30 transition-colors duration-200" />
    </motion.button>
  )
}
