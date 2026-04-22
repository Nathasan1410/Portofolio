'use client'

import { FiX, FiAward, FiFileText } from 'react-icons/fi'
import { FaCalendar, FaTrophy, FaStar, FaUsers } from 'react-icons/fa'
import { Achievement } from '@/lib/types'
import ReactMarkdown from 'react-markdown'
import { BentoGallery } from '../Projects/BentoGallery'

interface AchievementArticleModalProps {
  isOpen: boolean
  onClose: () => void
  achievement: Achievement | null
}

const typeConfig = {
  certificate: {
    label: 'Certificate',
    icon: FiAward,
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
  },
  hackathon_win: {
    label: 'Hackathon Win',
    icon: FaTrophy,
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
  },
  recognition: {
    label: 'Recognition',
    icon: FaStar,
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
}

export function AchievementArticleModal({ isOpen, onClose, achievement }: AchievementArticleModalProps) {
  if (!isOpen || !achievement) {
    return null
  }

  const config = typeConfig[achievement.type]
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
                  {achievement.date}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 leading-[1.15] mb-4">
                {achievement.title}
              </h1>
              {achievement.issuer && (
                <p className="text-lg text-gray-600">
                  Issued by <span className="font-semibold text-gray-900">{achievement.issuer}</span>
                </p>
              )}
            </header>

            <p className="text-xl md:text-2xl text-gray-500 font-light leading-snug mb-8">
              {achievement.highlight}
            </p>

            {achievement.type === 'certificate' && achievement.certificateImage && (
              <div className="mb-10 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <FiFileText className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Certificate</span>
                </div>
                <div className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-amber-200 bg-amber-50">
                  <img
                    src={achievement.certificateImage}
                    alt={`Certificate for ${achievement.title}`}
                    className="w-full h-auto object-contain max-h-64 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                      Click to view full certificate
                    </span>
                  </div>
                </div>
              </div>
            )}

            {achievement.keyAchievements && achievement.keyAchievements.length > 0 && (
              <div className="mb-10 pb-8 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiAward className="h-5 w-5 text-purple-600" />
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {achievement.keyAchievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-purple-500 font-bold mt-0.5">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {achievement.content && (
              <div className="prose prose-lg md:prose-xl prose-gray font-serif text-gray-800 leading-relaxed max-w-none mb-12">
                <ReactMarkdown>{achievement.content}</ReactMarkdown>
              </div>
            )}

            {achievement.photos && achievement.photos.length > 0 && (
              <BentoGallery images={achievement.photos} />
            )}
          </article>
        </div>
      </div>
    </div>
  )
}
