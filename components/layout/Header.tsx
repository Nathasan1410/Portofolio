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
      <div className="flex h-[4rem] md:h-[4.5rem] items-center px-4 sm:px-6 md:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[1200px] lg:max-w-[1400px] mx-auto">
        {/* Left spacer - matches right button width for symmetry */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0 w-[120px] sm:w-[140px]" />

        {/* Navigation - Truly centered */}
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all whitespace-nowrap flex-shrink-0",
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
        <div className="hidden md:flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0 justify-end">
          <a href="mailto:nthnael.san1410@gmail.com">
            <Button
              size="sm"
              className="rounded-full gap-1.5 text-xs sm:text-sm h-8 sm:h-9 md:h-10 px-3 sm:px-4"
            >
              <FiMail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Contact Me</span>
              <span className="sm:hidden">Contact</span>
            </Button>
          </a>
        </div>

        {/* Mobile hamburger - shown on small screens */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted/80 transition-colors ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <GiHamburgerMenu className="h-5 w-5" />
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
