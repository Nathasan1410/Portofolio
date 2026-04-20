'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/lib/types'
import { ProjectCard } from './ProjectCard'
import { ProjectPopup } from './ProjectPopup'
import { Button } from '@/components/ui/button'

interface ProjectGridProps {
  projects: Project[]
  filterOptions?: string[]
  defaultFilter?: string
}

export function ProjectGrid({
  projects,
  filterOptions,
  defaultFilter = 'all',
}: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState(defaultFilter)

  const filters = useMemo(() => {
    if (!filterOptions) return ['all']
    return ['all', ...filterOptions]
  }, [filterOptions])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((project) =>
      project.techStack.some(
        (tech) => tech.toLowerCase() === activeFilter.toLowerCase()
      )
    )
  }, [projects, activeFilter])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setPopupOpen(true)
  }

  const handlePopupOpenChange = (open: boolean) => {
    setPopupOpen(open)
    if (!open) {
      setTimeout(() => setSelectedProject(null), 200)
    }
  }

  return (
    <div className="w-full">
      {filters.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="capitalize"
            >
              {filter}
            </Button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          No projects found with the selected filter.
        </div>
      )}

      <ProjectPopup
        project={selectedProject}
        open={popupOpen}
        onOpenChange={handlePopupOpenChange}
      />
    </div>
  )
}
