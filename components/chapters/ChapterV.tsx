"use client";

/**
 * CHAPTER V — THE REVELATION
 * The final luxury oversized garment, revealed — now an interactive 3D artifact
 * the visitor turns in warm daylight (360°, fabric ripple, gold, embroidery,
 * puff). "Touched = live." EXPERIENCE_BLUEPRINT Ch. V.
 */

import dynamic from "next/dynamic";
import Reveal from "@/components/experience/Reveal";
import { accent } from "@/tokens/colors";

// The interactive WebGL tee — lazy, client-only (TECHNICAL §6)
const Garment3D = dynamic(() => import("@/components/three/Garment3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-[3px] bg-emerald">
      <span className="caption text-champagne/70">Preparing the artifact…</span>
    </div>
  ),
});

export default function ChapterV() {
  return (
    <section
      id="chapter-v"
      className="relative overflow-hidden bg-cream px-6 py-32 text-charcoal md:px-16 md:py-44"
      aria-label="Chapter Five — The Revelation"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 70% 20%, rgba(169,130,60,0.16), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        {/* The interactive artifact */}
        <Reveal className="order-2 md:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[3px] bg-emerald shadow-[0_40px_80px_-30px_rgba(18,58,46,0.6)]">
            <Garment3D accent={accent.warli} />
          </div>
        </Reveal>

        {/* The museum label */}
        <Reveal className="order-1 md:order-2">
          <span className="caption text-brass">Chapter V — The Revelation</span>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.05]">
            From a wall in a<br />forgotten village.
          </h2>
          <p className="mt-8 max-w-reading font-editorial text-2xl italic text-charcoal/70">
            To the shoulders of the modern man. This is not a print. This is a
            page of history, worn.
          </p>

          <dl className="mt-12 space-y-4 border-t border-charcoal/10 pt-8">
            {[
              ["Collection", "Warli — The First Language"],
              ["Lineage", "Warli · Maharashtra"],
              ["Craft", "DTF · Puff · Ivory-thread embroidery"],
              ["Finishing", "Gold hem · Sealed as an heirloom"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-6">
                <dt className="w-28 shrink-0 font-body text-[0.6rem] uppercase tracking-[0.24em] text-stone">
                  {k}
                </dt>
                <dd className="font-editorial text-lg italic text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 caption text-brass">
            Turn the garment · you saw it made, now hold it
          </p>
        </Reveal>
      </div>
    </section>
  );
}
