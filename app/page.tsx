"use client"

import { Hero } from "@/components/sections/Hero"
import { TabNav, TabItem } from "@/components/sections/TabNav"
import { ProjectGrid } from "@/components/sections/Projects/ProjectGrid"
import { ExperienceGrid } from "@/components/sections/Experience/ExperienceGrid"
import { AchievementGrid } from "@/components/sections/Achievements/AchievementGrid"
import { projects } from "@/lib/data/projects"
import { experiences } from "@/lib/data/experiences"
import { achievements } from "@/lib/data/achievements"
import { FaBriefcase, FaAward, FaFolderOpen } from "react-icons/fa"

export default function HomePage() {
  const tabs: TabItem[] = [
    {
      value: "projects",
      label: "Projects",
      icon: <FaFolderOpen className="h-4 w-4" />,
      content: <ProjectGrid projects={projects} />,
    },
    {
      value: "experience",
      label: "Experience",
      icon: <FaBriefcase className="h-4 w-4" />,
      content: (
        <ExperienceGrid
          experiences={experiences}
          onSelectExperience={() => {}}
        />
      ),
    },
    {
      value: "achievements",
      label: "Achievements",
      icon: <FaAward className="h-4 w-4" />,
      content: (
        <AchievementGrid
          achievements={achievements}
          onSelectAchievement={() => {}}
        />
      ),
    },
  ]

  return (
    <main className="min-h-screen">
      <Hero />
      <TabNav tabs={tabs} defaultValue="projects" />
    </main>
  )
}