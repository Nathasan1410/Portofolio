'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/lib/types'

interface ExperienceTimelineProps {
  experiences: Experience[]
  onSelectExperience: (experience: Experience) => void
}

const typeDotColors = {
  hackathon: 'bg-cyan-500',
  event: 'bg-purple-500',
  community: 'bg-emerald-500',
  work: 'bg-blue-500',
}

const kpiHoverColors = {
  hackathon: 'group-hover:border-cyan-300 group-hover:bg-cyan-50 group-hover:text-cyan-800',
  event: 'group-hover:border-purple-300 group-hover:bg-purple-50 group-hover:text-purple-800',
  community: 'group-hover:border-emerald-300 group-hover:bg-emerald-50 group-hover:text-emerald-800',
  work: 'group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:text-blue-800',
}

const kpiIconHoverColors = {
  hackathon: 'group-hover:text-cyan-600',
  event: 'group-hover:text-purple-600',
  community: 'group-hover:text-emerald-600',
  work: 'group-hover:text-blue-600',
}

function TypeBadge({ type }: { type: Experience['type'] }) {
  const typeColors = {
    hackathon: 'text-cyan-700 bg-cyan-100 border-cyan-200',
    event: 'text-purple-700 bg-purple-100 border-purple-200',
    community: 'text-emerald-700 bg-emerald-100 border-emerald-200',
    work: 'text-blue-700 bg-blue-100 border-blue-200',
  }

  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${typeColors[type]}`}>
      {type}
    </span>
  )
}

const TimelineCard = ({ experience }: { experience: Experience }) => {
  // Fallback to heroImage, then photos, then placeholder
  const imageUrl = experience.images?.[0] || experience.heroImage || experience.photos?.[0] || '/placeholder-experience.jpg'

  return (
    <div className="group flex flex-col md:flex-row w-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md relative transition-all duration-300">

      {/* 16:9 Image Container with Bottom-to-Top Gradient */}
      <div className="relative w-full md:w-[30%] min-w-[200px] max-w-[320px] aspect-video shrink-0 bg-gray-100">
        <img
          src={imageUrl}
          className="object-cover w-full h-full opacity-90 transition-opacity group-hover:opacity-100"
          alt={experience.title}
        />
        {/* Bottom-to-top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Text Content */}
      <div className="p-4 sm:p-6 flex-1 min-w-0 z-10 flex flex-col sm:flex-row justify-between items-start gap-4">

        {/* LEFT SIDE: Title, KPI (Neutral Badge), Role */}
        <div className="flex-1 min-w-0 flex flex-col items-start pt-1">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-snug truncate w-full">
            {experience.title}
          </h3>

          {/* KPI with Neutral Subtle Badge -> Color pop on Hover */}
          {experience.kpi && (
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold shadow-sm transition-all duration-300 ${kpiHoverColors[experience.type]}`}>
                <svg className={`w-3.5 h-3.5 transition-all duration-300 group-hover:-translate-y-[1px] ${kpiIconHoverColors[experience.type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {experience.kpi}
              </span>
            </div>
          )}

          {/* Role formatting: [Main Role Bold - Sub roles] */}
          <div className="text-sm text-gray-800 mt-2.5">
            <span className="font-bold">{experience.mainRole}</span>
            {experience.extraRoles && experience.extraRoles.length > 0 && (
              <span> - {experience.extraRoles.join(' - ')}</span>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Label on Top, Date below */}
        <div className="flex flex-col items-start sm:items-end text-left sm:text-right gap-1.5 shrink-0 sm:min-w-[120px]">
          <TypeBadge type={experience.type} />
          <span className="text-xs text-gray-500 font-medium mt-0.5">
            {experience.date}
          </span>
        </div>

      </div>
    </div>
  )
}

export function ExperienceTimeline({ experiences, onSelectExperience }: ExperienceTimelineProps) {
  return (
    <div className="relative py-4">
      {/* Vertical Global Line */}
      <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gray-200" />

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative pl-16"
          >
            {/* Timeline Dot */}
            <div
              className={`absolute left-[18px] top-8 h-5 w-5 rounded-full border-4 border-white ${typeDotColors[experience.type]} shadow-sm z-10`}
            />

            {/* Horizontal Connection Line */}
            <div className="absolute left-[38px] top-[41px] h-[2px] w-[26px] bg-gray-200" />

            {/* Card Wrapper */}
            <button
              onClick={() => onSelectExperience(experience)}
              className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl transition-transform duration-300 hover:-translate-y-1 block"
            >
              <TimelineCard experience={experience} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
