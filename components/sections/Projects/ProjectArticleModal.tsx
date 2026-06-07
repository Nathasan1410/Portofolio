'use client'

import { FiExternalLink } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { Project } from '@/lib/types'
import ReactMarkdown from 'react-markdown'
import { BentoGallery } from './BentoGallery'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { ArticleViewerModal } from '@/components/ui/ArticleViewerModal'

interface ProjectArticleModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export function ProjectArticleModal({ isOpen, onClose, project }: ProjectArticleModalProps) {
  if (!isOpen || !project) {
    return null
  }

  const demoLink = project.demoUrl || project.links?.demo
  const githubLink = project.githubUrl || project.links?.github

  return (
    <ArticleViewerModal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      meta={<TypeBadge type={project.type} />}
      lead={project.highlight || project.description}
      taxonomy={
        <>
          {project.role && (
            <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
              {project.role}
            </span>
          )}
          {project.tags?.map((tag, idx) => (
            <span key={idx} className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-semibold tracking-wide text-gray-700">
              {tag}
            </span>
          ))}
          {project.techStack?.slice(0, 4).map((tech, idx) => (
            <span key={`tech-${idx}`} className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
              {tech}
            </span>
          ))}
        </>
      }
      hero={
        project.thumbnail ? (
          <figure className="-mx-6 md:-mx-12">
            <img src={project.thumbnail} alt={project.title} className="aspect-video w-full object-cover" />
          </figure>
        ) : undefined
      }
      actions={
        <>
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 shadow-sm"
            >
              <FiExternalLink className="h-4 w-4" />
              View Project
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 shadow-sm"
            >
              <FaGithub className="h-4 w-4" />
              Source Code
            </a>
          )}
        </>
      }
    >
      <div className="prose prose-lg max-w-none font-serif text-gray-800 md:prose-xl">
        {project.content ? (
          <ReactMarkdown>{project.content}</ReactMarkdown>
        ) : (
          <ReactMarkdown>{project.description}</ReactMarkdown>
        )}
      </div>

      {project.showGallery && project.galleryImages && project.galleryImages.length > 0 && (
        <BentoGallery images={project.galleryImages} />
      )}
      {!project.showGallery && project.photos && project.photos.length > 0 && (
        <BentoGallery images={project.photos} title="Screenshots" />
      )}
    </ArticleViewerModal>
  )
}
