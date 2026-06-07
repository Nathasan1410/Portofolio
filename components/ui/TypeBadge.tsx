import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type ExperienceType = 'hackathon' | 'event' | 'community' | 'work'
type ProjectType = 'web3' | 'ai' | 'general'
type AnyType = ExperienceType | ProjectType

interface TypeBadgeProps {
  type: AnyType
  showIcon?: boolean
  className?: string
}

const typeConfig: Record<AnyType, { bg: string; text: string; border: string; label: string; icon?: React.ComponentType<{ className?: string }> }> = {
  hackathon: { bg: 'bg-white/90 backdrop-blur-md', text: 'text-cyan-700', border: 'border-cyan-500/40', label: 'Hackathon' },
  event: { bg: 'bg-white/90 backdrop-blur-md', text: 'text-purple-700', border: 'border-purple-500/40', label: 'Event' },
  community: { bg: 'bg-white/90 backdrop-blur-md', text: 'text-emerald-700', border: 'border-emerald-500/40', label: 'Community' },
  work: { bg: 'bg-white/90 backdrop-blur-md', text: 'text-blue-700', border: 'border-blue-500/40', label: 'Work' },
  web3: { bg: 'bg-white/90 backdrop-blur-md', text: 'text-indigo-700', border: 'border-indigo-500/40', label: 'Web3' },
  ai: { bg: 'bg-white/90 backdrop-blur-md', text: 'text-violet-700', border: 'border-violet-500/40', label: 'AI' },
  general: { bg: 'bg-white/90 backdrop-blur-md', text: 'text-gray-700', border: 'border-gray-500/40', label: 'General' },
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

export type { ExperienceType, ProjectType, AnyType, TypeBadgeProps }
