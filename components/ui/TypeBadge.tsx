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
  hackathon: { bg: 'bg-cyan-500/10', text: 'text-cyan-600', border: 'border-cyan-500/20', label: 'Hackathon' },
  event: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/20', label: 'Event' },
  community: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20', label: 'Community' },
  work: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/20', label: 'Work' },
  web3: { bg: 'bg-indigo-500/10', text: 'text-indigo-600', border: 'border-indigo-500/20', label: 'Web3' },
  ai: { bg: 'bg-violet-500/10', text: 'text-violet-600', border: 'border-violet-500/20', label: 'AI' },
  general: { bg: 'bg-gray-500/10', text: 'text-gray-600', border: 'border-gray-500/20', label: 'General' },
  certificate: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', label: 'Certificate', icon: FaAward },
  hackathon_win: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/20', label: 'Hackathon Win', icon: FaTrophy },
  recognition: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/20', label: 'Recognition', icon: FaStar },
}

export function TypeBadge({ type, showIcon = false, className }: TypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium tracking-wider uppercase',
        'backdrop-blur-sm bg-white/20',
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