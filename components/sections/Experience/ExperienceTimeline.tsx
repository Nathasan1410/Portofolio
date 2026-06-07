'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/lib/types'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { getContentGradient } from '@/lib/primitives'

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

const TimelineCard = ({ experience, isMobile }: { experience: Experience; isMobile: boolean }) => {
  const imageUrl = experience.images?.[0] || experience.heroImage || experience.photos?.[0]
  const fallbackGradient = getContentGradient(experience.type)

  return (
    <div className={cn(
      "group flex w-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md relative transition-all duration-300",
      isMobile ? "flex-col" : "flex-col md:flex-row"
    )}>

      {/* Image Container - Full width on mobile, 30% on desktop */}
      <div className={cn(
        "relative shrink-0 bg-gray-100",
        isMobile ? "w-full aspect-video" : "w-full md:w-[30%] md:min-w-[200px] md:max-w-[320px] aspect-video"
      )}>
        {imageUrl ? (
          <img
            src={imageUrl}
            className="object-cover w-full h-full opacity-90 transition-opacity group-hover:opacity-100"
            alt={experience.title}
          />
        ) : (
          <div className={cn('h-full w-full', fallbackGradient)} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white pointer-events-none" />
      </div>

      {/* Text Content */}
      <div className={cn(
        "flex-1 min-w-0 z-10 flex justify-between gap-4",
        isMobile ? "p-3 flex-col items-start" : "p-4 sm:p-6 flex-col sm:flex-row items-start"
      )}>

        {/* LEFT SIDE: Title, KPI, Role */}
        <div className="flex-1 min-w-0 flex flex-col items-start pt-1">
          <h3 className={cn(
            "font-bold text-gray-900 leading-snug truncate w-full",
            isMobile ? "text-base" : "text-lg sm:text-xl"
          )}>
            {experience.title}
          </h3>

          {/* KPI Badge */}
          {experience.kpi && (
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm transition-colors duration-300 ${kpiHoverColors[experience.type]}`}>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-all duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[1px] ${kpiIconHoverColors[experience.type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {experience.kpi}
              </span>
            </div>
          )}

          {/* Role */}
          <div className="text-sm text-gray-800 mt-2.5">
            <span className="font-bold">{experience.mainRole}</span>
            {!isMobile && experience.extraRoles && experience.extraRoles.length > 0 && (
              <span> - {experience.extraRoles.join(' - ')}</span>
            )}
            {isMobile && experience.extraRoles && experience.extraRoles.length > 0 && (
              <span className="text-gray-500"> +{experience.extraRoles.length}</span>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Type Badge and Date */}
        <div className={cn(
          "flex shrink-0 gap-1.5",
          isMobile ? "flex-row items-center justify-between w-full mt-2" : "flex-col items-start sm:items-end text-left sm:text-right sm:min-w-[120px]"
        )}>
          <TypeBadge type={experience.type} />
          <span className={cn(
            "text-xs text-gray-500 font-medium",
            !isMobile && "mt-0.5"
          )}>
            {experience.date}
          </span>
        </div>

      </div>
    </div>
  )
}

export function ExperienceTimeline({ experiences, onSelectExperience }: ExperienceTimelineProps) {
  const isMobile = useIsMobile()

  return (
    <div className="relative py-4">
      {/* Vertical Timeline Line - Closer to edge on mobile */}
      <div className={cn(
        "absolute top-4 bottom-4 w-[2px] bg-gray-200",
        isMobile ? "left-[11px]" : "left-[27px]"
      )} />

      <div className="space-y-6 sm:space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              "relative",
              isMobile ? "pl-8" : "pl-16"
            )}
          >
            {/* Timeline Dot - Smaller on mobile */}
            <div
              className={cn(
                "absolute rounded-full border-white shadow-sm z-10",
                isMobile
                  ? "left-[6px] top-6 h-3.5 w-3.5 border-2"
                  : "left-[18px] top-8 h-5 w-5 border-4",
                typeDotColors[experience.type]
              )}
            />

            {/* Horizontal Connection Line - Hidden on mobile */}
            {!isMobile && (
              <div className="absolute left-[38px] top-[41px] h-[2px] w-[26px] bg-gray-200" />
            )}

            {/* Card Wrapper */}
            <button
              onClick={() => onSelectExperience(experience)}
              className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl transition-transform duration-300 hover:-translate-y-1 block"
            >
              <TimelineCard experience={experience} isMobile={isMobile} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
