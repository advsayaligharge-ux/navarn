"use client";

/**
 * CHAPTER II — THE ARTS EMERGE
 * The heritage arts surfacing from the dark, each drawing itself alive in its
 * own accent. Wonder and abundance. EXPERIENCE_BLUEPRINT Ch. II.
 * Phase 1 (India-first): the priority Bharat art forms (LAUNCH_STRATEGY §3).
 */

import Reveal from "@/components/experience/Reveal";
import { accent } from "@/tokens/colors";

const ARTS = [
  { name: "Warli", title: "The First Language", region: "Maharashtra", color: accent.warli },
  { name: "Madhubani", title: "The Painted Prayer", region: "Bihar", color: accent.madhubani },
  { name: "Kalamkari", title: "The Pen of the Storyteller", region: "Andhra", color: accent.kalamkari },
  { name: "Gond", title: "The Song of the Forest", region: "Madhya Pradesh", color: accent.gond },
  { name: "Pattachitra", title: "The Cloth of the Gods", region: "Odisha", color: accent.pattachitra },
  { name: "Sanjhi", title: "The Cut Prayer", region: "Braj", color: accent.sanjhi },
  { name: "Pichwai", title: "The Cloth Behind the God", region: "Nathdwara", color: accent.pichwai },
  { name: "Maharaja", title: "The Weight of a Crown", region: "Rajputana", color: accent.maharaja },
  { name: "Warrior", title: "The Vow of Valour", region: "Bharat", color: accent.warrior },
  { name: "Untamed Horse", title: "The Spirit That Cannot Be Held", region: "Marwar", color: accent.horse },
  { name: "Mythology", title: "The Endless Epic", region: "Bharat", color: accent.mythology },
];

export default function ChapterII() {
  return (
    <section
      id="chapter-ii"
      className="relative bg-charcoal px-6 py-32 md:px-16 md:py-44"
      aria-label="Chapter Two — The Arts Emerge"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-20 text-center">
          <span className="caption text-brass">Chapter II — The Heritage Arts</span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-tight text-ivory">
            On walls of earth<br />and cloth of the gods.
          </h2>
          <p className="mx-auto mt-8 max-w-reading font-editorial text-xl italic text-stone md:text-2xl">
            India drew its soul — the tribe, the temple, the throne, the myth.
            Kept alive by hands that never let it fade.
          </p>
        </Reveal>

        <Reveal
          stagger={0.09}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-[2px] border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ARTS.map((art) => (
            <article
              key={art.name}
              className="group relative flex min-h-[220px] flex-col justify-end bg-charcoal p-8 transition-colors duration-cinematic ease-reveal"
              style={{ ["--art" as string]: art.color }}
            >
              {/* Accent wash that blooms on hover — the art form's "room" */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-cinematic ease-reveal group-hover:opacity-100"
                style={{
                  background: `radial-gradient(130% 100% at 20% 100%, ${art.color}55, transparent 70%)`,
                }}
              />
              {/* Drawn accent rule */}
              <span
                aria-hidden
                className="absolute left-8 top-8 h-[2px] w-8 origin-left scale-x-100 transition-transform duration-cinematic ease-reveal group-hover:scale-x-[3]"
                style={{ background: art.color }}
              />
              <div className="relative z-10">
                <span className="caption text-stone/70">{art.region}</span>
                <h3 className="mt-3 font-display text-3xl text-ivory">{art.name}</h3>
                <p className="mt-1 font-editorial text-lg italic text-champagne/90">
                  {art.title}
                </p>
              </div>
            </article>
          ))}
          {/* The eleventh cell is balanced by a mission plate */}
          <div className="relative flex min-h-[220px] flex-col justify-center bg-emerald-deep p-8">
            <p className="font-editorial text-2xl italic leading-snug text-champagne">
              &ldquo;Not a print.<br />A page of history.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
