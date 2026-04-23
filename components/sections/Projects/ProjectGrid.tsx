'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/lib/types'
import { ProjectCard } from './ProjectCard'
import { ProjectArticleModal } from './ProjectArticleModal'
import { FilterPillBar } from '@/lib/primitives'
import { useIsMobile } from '@/hooks/use-mobile'

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
  const isMobile = useIsMobile()

  const filterConfig = useMemo(() => {
    const baseFilters = ['all', ...(filterOptions || [])]
    return baseFilters.map(filter => ({
      label: filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1),
      value: filter,
    }))
  }, [filterOptions])

  const filterOptionsWithCounts = useMemo(() => {
    return filterConfig.map(config => ({
      ...config,
      count: config.value === 'all'
        ? projects.length
        : projects.filter(p => p.techStack.some(t => t.toLowerCase() === config.value.toLowerCase())).length
    }))
  }, [filterConfig, projects])

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
      {filterOptionsWithCounts.length > 1 && (
        <div className="mb-6">
          <FilterPillBar
            options={filterOptionsWithCounts}
            activeValue={activeFilter}
            onChange={setActiveFilter}
            isMobile={isMobile}
          />
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

      <ProjectArticleModal
        project={selectedProject}
        isOpen={popupOpen}
        onClose={() => handlePopupOpenChange(false)}
      />
    </div>
  )
}
