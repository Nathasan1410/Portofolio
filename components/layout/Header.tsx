"use client";

import { FiMail } from "react-icons/fi";
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (["#projects", "#achievements"].includes(href)) {
      window.location.hash = href.slice(1);
      const tabSection = document.querySelector("#experience-section");
      if (tabSection) {
        tabSection.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(href.slice(1));
      return;
    }

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

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="flex h-14 sm:h-16 items-center px-3 sm:px-4 md:px-6 max-w-[95vw] sm:max-w-[90vw] md:max-w-[1200px] lg:max-w-[1400px] mx-auto">
        {/* Left spacer - matches right button width for symmetry */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 flex-shrink-0 w-[100px] sm:w-[120px] md:w-[140px]" />

        {/* Navigation - Truly centered */}
        <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-1 justify-center overflow-x-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-[10px] xs:text-xs sm:text-sm md:text-base font-medium transition-all whitespace-nowrap flex-shrink-0",
                activeSection === link.href.substring(1)
                  ? "bg-primary/15 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons - Right side, scalable */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 flex-shrink-0 justify-end">
          <a href="mailto:nthnael.san1410@gmail.com">
            <Button
              size="sm"
              className="rounded-full gap-1 text-[10px] xs:text-xs sm:text-sm h-7 sm:h-8 md:h-9 px-2 sm:px-3 md:px-4"
            >
              <FiMail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">Contact Me</span>
              <span className="sm:hidden">Contact</span>
            </Button>
          </a>
        </div>

        {/* Mobile hamburger - shown on small screens */}
        <button
          className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-muted/80 transition-colors ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <GiHamburgerMenu className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
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
