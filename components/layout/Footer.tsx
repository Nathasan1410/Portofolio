import { PlayfulPopButton } from "@/components/ui/PlayfulPopButton";

export function Footer() {
  return (
    <footer className="border-t border-black/5 px-4 pb-28 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl justify-center text-center">
        <p className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <span>&copy; 2026. All rights reserved.</span>
          <span className="text-muted-foreground/50" aria-hidden="true">
            |
          </span>
          <PlayfulPopButton />
        </p>
      </div>
    </footer>
  );
}
