"use client"

import { useState } from 'react'
import { Hero } from "@/components/sections/Hero"
import { TabNav, TabItem } from "@/components/sections/TabNav"
import { ProjectGrid } from "@/components/sections/Projects/ProjectGrid"
import { ExperienceGrid } from "@/components/sections/Experience/ExperienceGrid"
import { AchievementGrid } from "@/components/sections/Achievements/AchievementGrid"
import { ExperiencePopup } from "@/components/sections/Experience/ExperiencePopup"
import { AchievementPopup } from "@/components/sections/Achievements/AchievementPopup"
import { projects } from "@/lib/data/projects"
import { experiences } from "@/lib/data/experiences"
import { achievements } from "@/lib/data/achievements"
import { Experience, Achievement } from "@/lib/types"
import { FaBriefcase, FaAward, FaFolderOpen, FaLaptopCode } from "react-icons/fa"

export default function HomePage() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const tabs: TabItem[] = [
    {
      value: "experience",
      label: "Experience",
      icon: <FaBriefcase className="h-4 w-4" />,
      content: (
        <ExperienceGrid
          experiences={experiences}
          onSelectExperience={(exp) => setSelectedExperience(exp)}
        />
      ),
    },
    {
      value: "projects",
      label: "Projects",
      icon: <FaFolderOpen className="h-4 w-4" />,
      content: <ProjectGrid projects={projects} />,
    },
    {
      value: "achievements",
      label: "Achievements",
      icon: <FaAward className="h-4 w-4" />,
      content: (
        <AchievementGrid
          achievements={achievements}
          onSelectAchievement={(ach) => setSelectedAchievement(ach)}
        />
      ),
    },
    {
      value: "work",
      label: "Work",
      icon: <FaLaptopCode className="h-4 w-4" />,
      content: <div>Work content coming soon</div>,
    },
  ]

  return (
    <main className="min-h-screen">
      <Hero />
      <TabNav tabs={tabs} defaultValue="experience" />
      <ExperiencePopup
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
      <AchievementPopup
        achievement={selectedAchievement}
        open={!!selectedAchievement}
        onOpenChange={(open) => !open && setSelectedAchievement(null)}
      />
    </main>
  )
}