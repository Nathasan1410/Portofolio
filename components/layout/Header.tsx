"use client";

import { FiDownload, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience-section" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
] as const;

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleDownloadCV = () => {
    const cvPath = "/cv/resume.pdf";
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Nathanael_Santoso_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Update hash for tab navigation (projects, achievements)
    if (["#projects", "#achievements"].includes(href)) {
      window.location.hash = href.slice(1);
      // Scroll to the tab section
      const tabSection = document.querySelector("#experience-section");
      if (tabSection) {
        tabSection.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(href.slice(1));
      return;
    }

    // Home and Experience section - smooth scroll
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href.slice(1));
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    // Set initial active section
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <span />
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeSection === link.href.substring(1)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5"
            onClick={handleDownloadCV}
          >
            <FiDownload className="h-4 w-4" />
            Download CV
          </Button>
          <a href="mailto:nthnael.san1410@gmail.com">
            <Button size="sm" className="rounded-full gap-1.5">
              <FiMail className="h-4 w-4" />
              Contact Me
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}