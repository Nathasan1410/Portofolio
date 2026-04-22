import { FaAward, FaTrophy, FaStar } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type ExperienceType = 'hackathon' | 'event' | 'community' | 'work'
type ProjectType = 'web3' | 'ai' | 'general'
type AchievementType = 'certificate' | 'hackathon_win' | 'recognition'
type AnyType = ExperienceType | ProjectType | AchievementType

interface TypeBadgeProps {
  type: AnyType
  showIcon?: boolean
  className?: string
}

const typeConfig: Record<AnyType, { bg: string; text: string; border: string; label: string; icon?: React.ComponentType<{ className?: string }> }> = {
  hackathon: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-cyan-600', border: 'border-cyan-500/30', label: 'Hackathon' },
  event: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-purple-600', border: 'border-purple-500/30', label: 'Event' },
  community: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-emerald-600', border: 'border-emerald-500/30', label: 'Community' },
  work: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-blue-600', border: 'border-blue-500/30', label: 'Work' },
  web3: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-indigo-600', border: 'border-indigo-500/30', label: 'Web3' },
  ai: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-violet-600', border: 'border-violet-500/30', label: 'AI' },
  general: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-gray-600', border: 'border-gray-500/30', label: 'General' },
  certificate: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-amber-600', border: 'border-amber-500/30', label: 'Certificate', icon: FaAward },
  hackathon_win: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-purple-600', border: 'border-purple-500/30', label: 'Hackathon Win', icon: FaTrophy },
  recognition: { bg: 'bg-white/20 backdrop-blur-sm', text: 'text-blue-600', border: 'border-blue-500/30', label: 'Recognition', icon: FaStar },
}

export function TypeBadge({ type, showIcon = false, className }: TypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium tracking-wider uppercase',
        config.bg, config.text, config.border,
        className
      )}
    >
      {showIcon && Icon && <Icon className="mr-1 h-3 w-3" />}
      {config.label}
    </Badge>
  )
}

export type { ExperienceType, ProjectType, AchievementType, AnyType, TypeBadgeProps }