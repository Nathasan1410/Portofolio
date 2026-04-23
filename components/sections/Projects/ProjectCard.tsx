'use client'

import { Project } from '@/lib/types'
import { TechBadge } from './TechBadge'
import { ContentCard } from '@/components/ui/ContentCard'
import { useIsMobile } from '@/hooks/use-mobile'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isMobile = useIsMobile()

  return (
    <ContentCard
      title={project.title}
      highlight={project.description}
      type={project.type}
      media={project.thumbnail ? { src: project.thumbnail } : undefined}
      footer={
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, isMobile ? 3 : 4).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {project.techStack.length > (isMobile ? 3 : 4) && (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-muted-foreground">
              +{project.techStack.length - (isMobile ? 3 : 4)}
            </span>
          )}
        </div>
      }
      isMobile={isMobile}
      onClick={onClick}
    />
  )
}
