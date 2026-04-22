'use client'

import { FiX } from 'react-icons/fi'
import { FiExternalLink } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { Project } from '@/lib/types'
import ReactMarkdown from 'react-markdown'
import { BentoGallery } from './BentoGallery'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-white w-[96vw] h-[96vh] max-w-5xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black z-50 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm transition-all hover:scale-105 border border-gray-200"
        >
          <FiX size={20} />
        </button>
        <div className="flex flex-col w-full h-full overflow-y-auto bg-white pb-24">
          <article className="max-w-[700px] mx-auto w-full px-6 pt-16 md:pt-24">
            <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 leading-[1.15] mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-snug mb-8">
              {project.highlight || project.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-10 pb-8 border-b border-gray-100">
              {project.tags && project.tags.map((tag, idx) => {
                let style = 'bg-gray-100 text-gray-700 border-gray-200'
                if (tag.toLowerCase().includes('winner') || tag.toLowerCase().includes('hackathon')) {
                  style = 'bg-amber-100 text-amber-800 border-amber-200'
                } else if (tag.toLowerCase().includes('community') || tag.toLowerCase().includes('leadership')) {
                  style = 'bg-purple-100 text-purple-800 border-purple-200'
                }
                return (
                  <span key={idx} className={'px-3 py-1.5 rounded-md text-sm font-semibold tracking-wide border ' + style}>
                    {tag}
                  </span>
                )
              })}
              {project.techStack && project.techStack.slice(0, 3).map((tech, idx) => {
                return (
                  <span key={'tech-' + idx} className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border-blue-200 border">
                    {tech}
                  </span>
                )
              })}
              <span className="text-gray-400 text-sm ml-auto font-medium">2024</span>
            </div>
            {project.thumbnail && (
              <figure className="mb-6 -mx-6 md:-mx-12">
                <img src={project.thumbnail} alt={project.title + ' Hero'} className="w-full aspect-video object-cover" />
              </figure>
            )}
            <div className="flex flex-wrap gap-4 mb-12 -mx-6 md:-mx-12 px-6 md:px-12">
              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <FiExternalLink className="h-4 w-4" />
                  {'View Project'}
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <FaGithub className="h-4 w-4" />
                  {'Source Code'}
                </a>
              )}
            </div>
            <div className="prose prose-lg md:prose-xl prose-gray font-serif text-gray-800 leading-relaxed max-w-none">
              {project.content ? (
                <ReactMarkdown>{project.content}</ReactMarkdown>
              ) : (
                <ReactMarkdown>{project.description}</ReactMarkdown>
              )}
            </div>
            {(project.showGallery && project.galleryImages && project.galleryImages.length > 0) && (
              <BentoGallery images={project.galleryImages} />
            )}
            {(!project.showGallery && project.photos && project.photos.length > 0) && (
              <BentoGallery images={project.photos} title="Screenshots" />
            )}
          </article>
        </div>
      </div>
    </div>
  )
}
