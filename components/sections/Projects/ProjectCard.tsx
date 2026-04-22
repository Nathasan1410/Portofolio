'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/types'
import { TechBadge } from './TechBadge'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative w-full overflow-hidden rounded-xl border bg-card p-0 text-left',
        'shadow-sm hover:shadow-lg',
        'transition-shadow duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      )}
    >
      {project.thumbnail ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Subtle bottom gradient to blend image into card content */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white via-white/5 to-transparent pointer-events-none" />
          <div className="absolute top-2 left-2">
            <TypeBadge type={project.type} />
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20">
          {/* Subtle bottom gradient for placeholder */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white/80 via-white/10 to-transparent pointer-events-none" />
          <div className="absolute top-2 left-2">
            <TypeBadge type={project.type} />
          </div>
        </div>
      )}

      <div className="p-5">
        <h3 className="font-semibold text-foreground truncate">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {project.techStack.length > 4 && (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-border/50 transition-colors duration-200" />
    </motion.button>
  )
}
