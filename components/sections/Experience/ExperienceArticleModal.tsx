'use client'

import { FiX } from 'react-icons/fi'
import { FaCalendar, FaAward, FaRocket, FaUsers, FaBriefcase } from 'react-icons/fa'
import { Experience } from '@/lib/types'
import ReactMarkdown from 'react-markdown'

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
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1.5 rounded-md text-sm font-semibold tracking-wide border flex items-center gap-2 ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
                  <Icon className="h-4 w-4" />
                  {config.label}
                </span>
                <span className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCalendar className="h-3.5 w-3.5" />
                  {experience.date}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 leading-[1.15] mb-4">
                {experience.title}
              </h1>
              {experience.kpi && (
                <div className="flex items-center gap-2 mt-4">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                    <FaAward className="h-3.5 w-3.5 mr-2" />
                    {experience.kpi}
                  </span>
                </div>
              )}
            </header>

            <p className="text-xl md:text-2xl text-gray-500 font-light leading-snug mb-8">
              {experience.highlight}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-10 pb-8 border-b border-gray-100">
              {experience.roles && experience.roles.map((role, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border-blue-200 border">
                  {role}
                </span>
              ))}
            </div>

            {experience.photos && experience.photos.length > 0 && (
              <figure className="mb-6 -mx-6 md:-mx-12">
                <img src={experience.photos[0]} alt={experience.title + ' Hero'} className="w-full aspect-video object-cover" />
              </figure>
            )}

            {experience.content && (
              <div className="prose prose-lg md:prose-xl prose-gray font-serif text-gray-800 leading-relaxed max-w-none mb-12">
                <ReactMarkdown>{experience.content}</ReactMarkdown>
              </div>
            )}

            {(experience.photos && experience.photos.length > 1) && (
              <div className="mt-16 pt-12 border-t border-gray-100 font-sans">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h3>
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                  {experience.photos.slice(1).map((img, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <img
                        src={img}
                        alt={'Gallery item ' + (idx + 1)}
                        className="w-full rounded-xl object-cover hover:opacity-90 transition-opacity cursor-pointer border border-gray-100 shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experience.youtubeVideo && (
              <div className="mt-16 pt-12 border-t border-gray-100 font-sans">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Video</h3>
                <div className="aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <iframe
                    src={experience.youtubeVideo}
                    className="w-full h-full"
                    allowFullScreen
                    title="YouTube video"
                  />
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  )
}
