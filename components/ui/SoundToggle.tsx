"use client";

/**
 * NAVARN — Sound toggle
 * EXPERIENCE_BLUEPRINT: a single gold sound toggle; audio is muted by
 * default (the drone, the craft ASMR). Phase 1 ships the control and state;
 * the audio stems (Howler) are wired when produced (TECHNICAL §11).
 */

import { useState } from "react";

export default function SoundToggle() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label={on ? "Silence the house" : "Hear the house"}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-[0.24em] text-stone transition-colors duration-micro hover:text-champagne"
    >
      <span className="flex h-4 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-current transition-all duration-reveal ease-reveal"
            style={{ height: on ? `${4 + ((i * 5) % 12)}px` : "3px" }}
          />
        ))}
      </span>
      {on ? "Sound on" : "Sound"}
    </button>
  );
}
