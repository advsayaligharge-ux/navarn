"use client";

/**
 * CHAPTER II — THE ARTIFACTS  (pillar: Heritage + Story)
 * Design-first: independent statement pieces, each its own story — not a fixed
 * collection. The visitor chooses an artifact and watches the universal craft
 * transformation build it. Supports unlimited future design universes.
 */

import Reveal from "@/components/experience/Reveal";
import ArtEmerge from "@/components/art/ArtEmerge";

export default function ChapterII() {
  return (
    <section
      id="chapter-ii"
      className="relative bg-charcoal px-6 py-32 md:px-16 md:py-44"
      aria-label="Chapter Two — The Artifacts"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="caption text-brass">Chapter II — The Artifacts</span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-tight text-ivory">
            Not a collection.<br />A universe of stories.
          </h2>
          <p className="mx-auto mt-8 max-w-reading font-editorial text-xl italic text-stone md:text-2xl">
            Every NAVARN piece is its own artifact — a single story, told in full.
            Choose one, and watch heritage become luxury.
          </p>
        </Reveal>

        <Reveal>
          <ArtEmerge />
        </Reveal>
      </div>
    </section>
  );
}
