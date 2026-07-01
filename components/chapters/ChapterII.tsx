"use client";

/**
 * CHAPTER II — THE ARTS EMERGE
 * The heritage arts surfacing from the dark, each carried through three stages:
 * original heritage art → artistic reconstruction → luxury reinterpretation.
 * Wonder and abundance. EXPERIENCE_BLUEPRINT Ch. II. India-first (Bharat).
 */

import Reveal from "@/components/experience/Reveal";
import ArtEmerge from "@/components/art/ArtEmerge";

export default function ChapterII() {
  return (
    <section
      id="chapter-ii"
      className="relative bg-charcoal px-6 py-32 md:px-16 md:py-44"
      aria-label="Chapter Two — The Arts Emerge"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="caption text-brass">Chapter II — The Heritage Arts</span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-tight text-ivory">
            On walls of earth<br />and cloth of the gods.
          </h2>
          <p className="mx-auto mt-8 max-w-reading font-editorial text-xl italic text-stone md:text-2xl">
            India drew its soul — the tribe, the temple, the throne, the myth.
            Choose a story, and watch it become luxury.
          </p>
        </Reveal>

        <Reveal>
          <ArtEmerge />
        </Reveal>
      </div>
    </section>
  );
}
