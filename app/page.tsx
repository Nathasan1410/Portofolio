"use client"

import { useEffect, useState } from 'react'
import { Footer } from "@/components/layout/Footer"
import { About } from "@/components/sections/About"
import { ExperienceArticleModal } from "@/components/sections/Experience/ExperienceArticleModal"
import { ExperienceGrid } from "@/components/sections/Experience/ExperienceGrid"
import { Hero } from "@/components/sections/Hero"
import { ProjectGrid } from "@/components/sections/Projects/ProjectGrid"
import { TabItem, TabNav } from "@/components/sections/TabNav"
import { experiences } from "@/lib/data/experiences"
import { projects } from "@/lib/data/projects"
import { Experience } from "@/lib/types"
import {
  EXPERIENCE_SECTION_ID,
  TAB_NAV_SECTION_ID,
  getSectionFromHash,
  getSectionHash,
  isSectionId,
  sectionNavItems,
  type SectionId,
} from "@/lib/navigation"

export default function HomePage() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [activeTab, setActiveTab] = useState<SectionId>("about")

  const scrollToTabNav = () => {
    const section = document.getElementById(TAB_NAV_SECTION_ID)
    if (!section) {
      return
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleTabChange = (nextTab: string) => {
    if (!isSectionId(nextTab)) {
      return
    }

    setActiveTab(nextTab)
    window.history.replaceState(null, "", getSectionHash(nextTab))
  }

  useEffect(() => {
    const handleHashChange = () => {
      const nextTab = getSectionFromHash(window.location.hash)
      if (!nextTab) {
        return
      }

      setActiveTab(nextTab)
      window.requestAnimationFrame(() => {
        scrollToTabNav()
      })
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const tabs: TabItem[] = sectionNavItems.map((item) => {
    const Icon = item.icon

    switch (item.value) {
      case "about":
        return {
          value: item.value,
          label: item.label,
          mobileLabel: item.mobileLabel,
          icon: <Icon className="h-4 w-4" />,
          content: <About />,
        }
      case "experience":
        return {
          value: item.value,
          label: item.label,
          mobileLabel: item.mobileLabel,
          icon: <Icon className="h-4 w-4" />,
          content: (
            <ExperienceGrid
              experiences={experiences}
              onSelectExperience={(experience) => setSelectedExperience(experience)}
            />
          ),
        }
      case "projects":
        return {
          value: item.value,
          label: item.label,
          mobileLabel: item.mobileLabel,
          icon: <Icon className="h-4 w-4" />,
          content: <ProjectGrid projects={projects} />,
        }
    }
  })

  return (
    <main className="min-h-screen">
      <div id="home">
        <Hero />
      </div>
      <section id={EXPERIENCE_SECTION_ID} className="scroll-mt-20">
        <TabNav
          tabs={tabs}
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={handleTabChange}
        />
      </section>
      <Footer />
      <ExperienceArticleModal
        experience={selectedExperience}
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </main>
  )
}
