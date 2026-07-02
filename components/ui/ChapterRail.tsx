"use client";

/**
 * NAVARN — The Chapter Rail (museum wayfinding)
 * EXPERIENCE_BLUEPRINT Part H: a slim vertical rail at the right edge, six
 * gold nodes for the six chapters — a museum floor-guide. Glows gold at the
 * active node; click to leap. Tracks scroll via IntersectionObserver.
 */

import { useEffect, useState } from "react";

export const CHAPTERS = [
  { id: "chapter-i", roman: "I", name: "The Forgotten Stories" },
  { id: "chapter-ii", roman: "II", name: "The Arts Emerge" },
  { id: "chapter-iii", roman: "III", name: "The Transformation" },
  { id: "chapter-iv", roman: "IV", name: "The Making" },
  { id: "chapter-v", roman: "V", name: "The Revelation" },
  { id: "chapter-vi", roman: "VI", name: "Becoming a Keeper" },
] as const;

export default function ChapterRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = CHAPTERS.findIndex((c) => c.id === entry.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex"
    >
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          onClick={() => go(c.id)}
          aria-label={`Chapter ${c.roman} — ${c.name}`}
          aria-current={active === i}
          className="group relative flex items-center"
        >
          <span
            className="absolute right-6 whitespace-nowrap font-body text-[0.6rem] uppercase tracking-[0.24em] text-champagne opacity-0 transition-opacity duration-micro group-hover:opacity-100"
          >
            {c.roman} · {c.name}
          </span>
          <span
            className="block rounded-full transition-all duration-reveal ease-reveal"
            style={{
              width: active === i ? 9 : 6,
              height: active === i ? 9 : 6,
              background:
                active === i ? "var(--champagne-gold)" : "rgba(217,190,134,0.3)",
              boxShadow: active === i ? "0 0 10px rgba(217,190,134,0.7)" : "none",
            }}
          />
        </button>
      ))}
    </nav>
  );
}
