'use client'

import { FaCalendar, FaAward, FaRocket, FaUsers, FaBriefcase } from 'react-icons/fa'
import { Experience } from '@/lib/types'
import ReactMarkdown from 'react-markdown'
import { BentoGallery } from '../Projects/BentoGallery'
import { ArticleViewerModal } from '@/components/ui/ArticleViewerModal'

interface ExperienceArticleModalProps {
  isOpen: boolean
  onClose: () => void
  experience: Experience | null
}

const typeConfig = {
  hackathon: {
    label: 'Hackathon',
    icon: FaRocket,
    gradient: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-500/10',
    textColor: 'text-cyan-700',
    borderColor: 'border-cyan-200',
  },
  event: {
    label: 'Event',
    icon: FaCalendar,
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
  },
  community: {
    label: 'Community',
    icon: FaUsers,
    gradient: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
  },
  work: {
    label: 'Work',
    icon: FaBriefcase,
    gradient: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  },
}

export function ExperienceArticleModal({ isOpen, onClose, experience }: ExperienceArticleModalProps) {
  if (!isOpen || !experience) {
    return null
  }

  const config = typeConfig[experience.type]
  const Icon = config.icon

  return (
    <ArticleViewerModal
      isOpen={isOpen}
      onClose={onClose}
      title={experience.title}
      meta={
        <>
          <span className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-semibold tracking-wide ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
            <Icon className="h-4 w-4" />
            {config.label}
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <FaCalendar className="h-3.5 w-3.5" />
            {experience.date}
          </span>
        </>
      }
      lead={experience.highlight}
      taxonomy={
        <>
          {experience.kpi && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <FaAward className="mr-2 h-3.5 w-3.5" />
              {experience.kpi}
            </span>
          )}
          {experience.roles?.map((role, idx) => (
            <span key={idx} className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
              {role}
            </span>
          ))}
        </>
      }
      hero={
        experience.photos?.length ? (
          <figure className="-mx-6 md:-mx-12">
            <img src={experience.photos[0]} alt={experience.title} className="aspect-video w-full object-cover" />
          </figure>
        ) : undefined
      }
    >
      {experience.content && (
        <div className="prose prose-lg max-w-none font-serif text-gray-800 md:prose-xl">
          <ReactMarkdown>{experience.content}</ReactMarkdown>
        </div>
      )}

      {experience.photos && experience.photos.length > 1 && (
        <BentoGallery images={experience.photos.slice(1)} />
      )}

      {experience.youtubeVideo && (
        <section className="border-t border-gray-100 pt-12">
          <h3 className="mb-8 text-2xl font-bold text-gray-900">Video</h3>
          <div className="aspect-video overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <iframe
              src={experience.youtubeVideo}
              className="h-full w-full"
              allowFullScreen
              title={`${experience.title} video`}
            />
          </div>
        </section>
      )}
    </ArticleViewerModal>
  )
}
