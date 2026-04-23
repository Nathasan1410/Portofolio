'use client'

import { FaAward, FaTrophy } from 'react-icons/fa'
import { FiImage } from 'react-icons/fi'
import { Achievement } from '@/lib/types'
import { ContentCard } from '@/components/ui/ContentCard'
import { useIsMobile } from '@/hooks/use-mobile'
import { contentTypeTheme, ContentType } from '@/lib/primitives'

interface AchievementCardProps {
  achievement: Achievement
  onClick: () => void
}

const celebratoryTypes = ['certificate', 'hackathon_win']

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const isMobile = useIsMobile()
  const isCelebratory = celebratoryTypes.includes(achievement.type)

  const getImageSource = (): string | undefined => {
    if (achievement.type === 'certificate' && achievement.certificateImage) {
      return achievement.certificateImage
    }
    if (achievement.photos && achievement.photos.length > 0) {
      return achievement.photos[0]
    }
    return undefined
  }

  const imageSource = getImageSource()

  // Get theme for fallback gradient when no image
  const theme = contentTypeTheme[achievement.type as ContentType]

  return (
    <div className="relative group">
      {/* Celebratory corner icons - only on hover */}
      {isCelebratory && (
        <div className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
          {achievement.type === 'certificate' && (
            <FaAward className="h-5 w-5 text-amber-500" />
          )}
          {achievement.type === 'hackathon_win' && (
            <FaTrophy className="h-5 w-5 text-purple-500" />
          )}
        </div>
      )}

      <ContentCard
        title={achievement.title}
        highlight={achievement.issuer}
        type={achievement.type as ContentType}
        media={{
          src: imageSource,
          alt: achievement.title,
        }}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {achievement.date}
            </span>
            <div className="flex items-center gap-2">
              {achievement.photos && achievement.photos.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FiImage className="h-3 w-3" />
                  {achievement.photos.length}
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                Issued by {achievement.issuer}
              </span>
            </div>
          </div>
        }
        isMobile={isMobile}
        onClick={onClick}
      />
    </div>
  )
}
