"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

type HeartParticle = {
  id: number;
  sx: string;
  tx: string;
  rot: string;
  color: string;
  size: number;
};

const HEART_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
];

const HeartIcon = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

type HeartStyle = CSSProperties & {
  "--sx": string;
  "--tx": string;
  "--rot": string;
};

type PlayfulPopButtonProps = {
  onCountChange?: (value: number) => void;
  onFirstClick?: () => void;
};

export function PlayfulPopButton({
  onCountChange,
  onFirstClick,
}: PlayfulPopButtonProps) {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [hasClicked, setHasClicked] = useState(false);

  const incrementLocalFallback = () => {
    try {
      const raw = window.localStorage.getItem("loveCounterLocal");
      const current = raw ? Number.parseInt(raw, 10) : 0;
      const safeCurrent = Number.isFinite(current) ? current : 0;
      const next = safeCurrent + 1;
      window.localStorage.setItem("loveCounterLocal", String(next));
      onCountChange?.(next);
    } catch {
      onCountChange?.(1);
    }
  };

  const incrementGlobalCount = async () => {
    try {
      const response = await fetch("/api/love-counter", {
        method: "POST",
        cache: "no-store",
      });

      if (!response.ok) {
        incrementLocalFallback();
        return;
      }

      const data = (await response.json()) as { count?: number };
      if (typeof data.count === "number") {
        onCountChange?.(data.count);
      } else {
        incrementLocalFallback();
      }
    } catch {
      incrementLocalFallback();
    }
  };

  const handleClick = () => {
    if (!hasClicked) {
      setHasClicked(true);
      onFirstClick?.();
    }
    void incrementGlobalCount();

    const randomTx = Math.random() * 90 - 45;
    const randomSx = Math.random() * 26 - 13;
    const randomRot = Math.random() * 90 - 45;
    const randomColor =
      HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

    const newHeart: HeartParticle = {
      id: Date.now() + Math.random(),
      sx: `${randomSx}px`,
      tx: `${randomTx}px`,
      rot: `${randomRot}deg`,
      color: randomColor,
      size: 14 + Math.round(Math.random() * 6),
    };

    setHearts((prev) => [...prev, newHeart]);
  };

  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== id));
  };

  return (
    <span className="relative inline-flex items-center overflow-visible">
      <style>{`
        @keyframes float-pop {
          0% { transform: translate(var(--sx), 0) scale(0.2) rotate(0deg); opacity: 1; }
          20% { transform: translate(calc(var(--sx) + (var(--tx) * 0.3)), -32px) scale(1) rotate(var(--rot)); }
          100% { transform: translate(calc(var(--sx) + var(--tx)), -140px) scale(0.65) rotate(calc(var(--rot) * 2)); opacity: 0; }
        }
      `}</style>

      <span className="pointer-events-none absolute left-1/2 top-0 z-0 h-0 w-0">
        {hearts.map((heart) => {
          const heartStyle: HeartStyle = {
            "--sx": heart.sx,
            "--tx": heart.tx,
            "--rot": heart.rot,
            color: heart.color,
          };

          return (
            <span
              key={heart.id}
              onAnimationEnd={() => removeHeart(heart.id)}
              className="absolute left-0 top-0 animate-[float-pop_1.4s_ease-out_forwards]"
              style={heartStyle}
            >
              <HeartIcon
                className="drop-shadow-sm"
                style={{ width: heart.size, height: heart.size }}
              />
            </span>
          );
        })}
      </span>

      <button
        type="button"
        onClick={handleClick}
        className="group relative z-10 inline-flex items-center gap-1 rounded-sm text-inherit text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span>Made with love</span>
        <span
          className="text-red-500/90 transition-all duration-200 group-hover:scale-105 group-hover:text-red-500"
          aria-hidden="true"
        >
          &lt;3
        </span>
      </button>
    </span>
  );
}
