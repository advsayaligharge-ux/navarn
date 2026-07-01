"use client";

/**
 * NAVARN — Sound toggle + director
 * EXPERIENCE_BLUEPRINT: a single gold sound toggle; audio muted by default.
 * On enable, the SoundEngine (Web Audio) crossfades ambience per chapter:
 * heritage → temple → workshop (DTF + embroidery) → reveal.
 */

import { useEffect, useState } from "react";
import { SoundEngine, CHAPTER_SCENE } from "@/lib/audio/SoundEngine";

export default function SoundToggle() {
  const [on, setOn] = useState(false);

  // Director: switch ambience to whichever chapter is in view
  useEffect(() => {
    const sections = Object.keys(CHAPTER_SCENE)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const scene = CHAPTER_SCENE[e.target.id];
            if (scene) SoundEngine.setScene(scene);
          }
        });
      },
      { threshold: 0.55 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggle = () => setOn(SoundEngine.toggle());

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Silence the house" : "Hear the house"}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-[0.24em] text-stone transition-colors duration-micro hover:text-champagne"
    >
      <span className="flex h-4 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-current transition-all duration-reveal ease-reveal"
            style={{
              height: on ? `${4 + ((i * 5) % 12)}px` : "3px",
              animation: on ? `navarn-eq 1.1s ease-in-out ${i * 0.15}s infinite` : "none",
            }}
          />
        ))}
      </span>
      {on ? "Sound on" : "Sound"}
    </button>
  );
}
