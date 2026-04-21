"use client";

import { FiDownload, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience-section" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
] as const;

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <span />
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                activeSection === link.href.substring(1)
                  ? "bg-primary/15 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted/80 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <GiHamburgerMenu className="h-5 w-5" />
        </button>
        <div className="hidden md:flex items-center gap-3">
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
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
                setMobileMenuOpen(false);
              }}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                activeSection === link.href.substring(1)
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-border/50 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5 w-full justify-center"
              onClick={() => {
                handleDownloadCV();
                setMobileMenuOpen(false);
              }}
            >
              <FiDownload className="h-4 w-4" />
              Download CV
            </Button>
            <a href="mailto:nthnael.san1410@gmail.com">
              <Button size="sm" className="rounded-full gap-1.5 w-full justify-center">
                <FiMail className="h-4 w-4" />
                Contact Me
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
