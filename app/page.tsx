"use client"

import { useState } from 'react'
import { Hero } from "@/components/sections/Hero"
import { TabNav, TabItem } from "@/components/sections/TabNav"
import { About } from "@/components/sections/About"
import { ProjectGrid } from "@/components/sections/Projects/ProjectGrid"
import { ExperienceGrid } from "@/components/sections/Experience/ExperienceGrid"
import { AchievementGrid } from "@/components/sections/Achievements/AchievementGrid"
import { ExperienceArticleModal } from "@/components/sections/Experience/ExperienceArticleModal"
import { AchievementArticleModal } from "@/components/sections/Achievements/AchievementArticleModal"
import { projects } from "@/lib/data/projects"
import { experiences } from "@/lib/data/experiences"
import { achievements } from "@/lib/data/achievements"
import { Experience, Achievement } from "@/lib/types"

export default function HomePage() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [activeTab, setActiveTab] = useState<string>("home")

  const tabs: TabItem[] = [
    {
      value: "home",
      label: "Home",
      content: <About />,
    },
    {
      value: "about",
      label: "About Me",
      content: <About />,
    },
    {
      value: "experience",
      label: "Experience",
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
      content: <ProjectGrid projects={projects} />,
    },
    {
      value: "achievements",
      label: "Achievements",
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
      content: <div>Work content coming soon</div>,
    },
  ]

  return (
    <main className="min-h-screen">
      <div id="home">
        <Hero activeTab={activeTab} />
      </div>

      <TabNav
        tabs={tabs}
        defaultValue="home"
        value={activeTab}
        onValueChange={setActiveTab}
      />

      <ExperienceArticleModal
        experience={selectedExperience}
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
      <AchievementArticleModal
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </main>
  )
}