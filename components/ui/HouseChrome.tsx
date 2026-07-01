"use client";

/**
 * NAVARN — Persistent chrome (the fixed wayfinding of the night museum)
 * EXPERIENCE_BLUEPRINT Part H: at most three persistent elements — the Seal
 * (home anchor, top-left), the Chapter Rail (right edge), the Menu + Sound.
 * The film owns the rest of the space.
 */

import Seal from "./Seal";
import Wordmark from "./Wordmark";
import ChapterRail from "./ChapterRail";
import SoundToggle from "./SoundToggle";
import Menu from "./Menu";

export default function HouseChrome() {
  const home = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <button
        onClick={home}
        aria-label="NAVARN — return to the threshold"
        className="fixed left-6 top-5 z-50 flex items-center gap-3 text-champagne transition-opacity duration-micro hover:opacity-70"
      >
        <Seal size={34} />
        <Wordmark size="text-sm" className="hidden text-champagne sm:inline" />
      </button>

      <Menu />
      <ChapterRail />
      <SoundToggle />
    </>
  );
}
