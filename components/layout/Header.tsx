"use client";

import { FiDownload, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export function Header() {
  const handleDownloadCV = () => {
    const cvPath = "/cv/resume.pdf";
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Nathanael_Santoso_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <span />
        <span className="font-display font-bold text-lg">Nathan's Space</span>
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