"use client";

import { useState } from "react";
import { PlayfulPopButton } from "@/components/ui/PlayfulPopButton";

export function Footer() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [clickCount, setClickCount] = useState<number | null>(null);

  const handleTap = () => {
    setHasInteracted(true);
    setClickCount((prev) => (prev === null ? 1 : prev + 1));
  };

  const handleCountSync = (value: number) => {
    setClickCount((prev) => (prev === null ? value : Math.max(prev, value)));
  };

  return (
    <footer className="border-t border-black/5 px-4 pb-28 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <span>&copy; 2026. All rights reserved.</span>
          <span className="text-muted-foreground/50" aria-hidden="true">
            |
          </span>
          <PlayfulPopButton
            onFirstClick={() => setHasInteracted(true)}
            onTap={handleTap}
            onCountChange={handleCountSync}
          />
        </p>
        {hasInteracted && (
          <p className="mt-1 text-xs text-muted-foreground/80 sm:text-sm">
            {clickCount === null ? "..." : clickCount}{" "}
            <span className="text-red-500/90">&lt;3</span> around the world
          </p>
        )}
      </div>
    </footer>
  );
}
