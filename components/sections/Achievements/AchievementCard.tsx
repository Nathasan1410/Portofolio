'use client'

import { motion } from 'framer-motion'
import { FaAward, FaTrophy, FaStar } from 'react-icons/fa'
import { FiImage } from 'react-icons/fi'
import { Achievement } from '@/lib/types'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { cn } from '@/lib/utils'

interface AchievementCardProps {
  achievement: Achievement
  onClick: () => void
}

const celebratoryTypes = ['certificate', 'hackathon_win']

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const isCelebratory = celebratoryTypes.includes(achievement.type)

  const getImageSource = () => {
    if (achievement.type === 'certificate' && achievement.certificateImage) {
      return achievement.certificateImage
    }
    if (achievement.photos && achievement.photos.length > 0) {
      return achievement.photos[0]
    }
    return null
  }

  const imageSource = getImageSource()

  const getGradientBg = () => {
    switch (achievement.type) {
      case 'certificate':
        return 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
      case 'hackathon_win':
        return 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
      case 'recognition':
        return 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
      default:
        return 'bg-gradient-to-br from-gray-500/20 to-gray-600/20'
    }
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative w-full rounded-xl border bg-card text-left overflow-hidden',
        'shadow-sm hover:shadow-lg',
        'transition-all duration-200',
        isCelebratory && 'hover:border-amber-500/30 dark:hover:border-amber-500/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      )}
    >
      {isCelebratory && (
        <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {achievement.type === 'certificate' && <FaAward className="h-5 w-5 text-amber-500" />}
          {achievement.type === 'hackathon_win' && <FaTrophy className="h-5 w-5 text-purple-500" />}
        </div>
      )}

      <div className="relative aspect-video w-full overflow-hidden">
        {imageSource ? (
          <>
            <img
              src={imageSource}
              alt={achievement.title}
              className="h-full w-full object-cover"
            />
            {/* Bottom-to-top gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent pointer-events-none" />
          </>
        ) : (
          <div className={cn('flex h-full w-full items-center justify-center', getGradientBg())}>
            {achievement.type === 'certificate' && <FaAward className="h-10 w-10 text-amber-500/40" />}
            {achievement.type === 'hackathon_win' && <FaTrophy className="h-10 w-10 text-purple-500/40" />}
            {achievement.type === 'recognition' && <FaStar className="h-10 w-10 text-blue-500/40" />}
          </div>
        )}

        <div className="absolute top-2 left-2">
          <TypeBadge type={achievement.type} showIcon />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate pr-6">
              {achievement.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {achievement.date}
              </span>
              {achievement.photos && achievement.photos.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FiImage className="h-3 w-3" />
                  {achievement.photos.length}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <span className="text-sm text-muted-foreground">
            Issued by {achievement.issuer}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-amber-500/20 dark:group-hover:border-amber-500/30 transition-colors duration-200 pointer-events-none" />
    </motion.button>
  )
}