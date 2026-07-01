"use client";

/**
 * NAVARN — The Arts Emerge (Chapter II interactive experience)
 * For each heritage art (Warli, Madhubani, Sanjhi, Pichwai, Maharaja, Warrior,
 * Untamed Horse): original heritage art → artistic reconstruction → luxury
 * reinterpretation. Baked SVG + Framer Motion ("watched = baked"): the visitor
 * selects an art and advances its three stages; each motif paints itself alive.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ART_MOTIFS } from "./motifs";

const EASE = [0.16, 1, 0.3, 1] as const;

const STAGES = [
  {
    key: "original",
    label: "Original heritage art",
    note: "As the artisan drew it — on wall, on cloth, by hand.",
  },
  {
    key: "reconstruction",
    label: "Artistic reconstruction",
    note: "Studied, honoured, redrawn as precise vector line.",
  },
  {
    key: "luxury",
    label: "Luxury reinterpretation",
    note: "Raised in gold, framed, worthy of the garment.",
  },
] as const;

export default function ArtEmerge() {
  const [artIdx, setArtIdx] = useState(0);
  const [stage, setStage] = useState(0);
  const art = ART_MOTIFS[artIdx];
  const Paths = art.Paths;

  const selectArt = (i: number) => {
    setArtIdx(i);
    setStage(0);
  };

  // Per-stage treatment of the stage surface
  const surface =
    stage === 0
      ? { bg: "var(--parchment)", motif: art.color, frame: "transparent", glow: "none" }
      : stage === 1
        ? { bg: "#141412", motif: "var(--ivory)", frame: "rgba(217,190,134,0.18)", glow: "none" }
        : {
            bg: "var(--emerald)",
            motif: "var(--champagne-gold)",
            frame: "rgba(217,190,134,0.55)",
            glow: "drop-shadow(0 0 10px rgba(217,190,134,0.55))",
          };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      {/* Left — the art selector (museum wall index) */}
      <div>
        <ul className="flex flex-col">
          {ART_MOTIFS.map((a, i) => (
            <li key={a.key}>
              <button
                onClick={() => selectArt(i)}
                aria-pressed={i === artIdx}
                className="group flex w-full items-baseline justify-between border-b border-white/8 py-4 text-left transition-colors duration-reveal"
                style={{ borderColor: i === artIdx ? a.color : undefined }}
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className="h-2 w-2 rounded-full transition-all duration-reveal"
                    style={{
                      background: i === artIdx ? a.color : "rgba(138,133,120,0.35)",
                      boxShadow: i === artIdx ? `0 0 8px ${a.color}` : "none",
                    }}
                  />
                  <span
                    className="font-display text-2xl transition-colors duration-reveal md:text-3xl"
                    style={{ color: i === artIdx ? "var(--ivory)" : "var(--stone-grey)" }}
                  >
                    {a.name}
                  </span>
                </span>
                <span className="hidden font-editorial text-base italic text-stone sm:block">
                  {a.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right — the transformation stage */}
      <div>
        <motion.div
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3px] border transition-colors duration-cinematic"
          animate={{ backgroundColor: surface.bg, borderColor: surface.frame }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ color: surface.motif }}
        >
          {/* Reconstruction grid overlay */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.div
                aria-hidden
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(217,190,134,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(217,190,134,0.12) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            )}
          </AnimatePresence>

          {/* Luxury frame */}
          <AnimatePresence>
            {stage === 2 && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-4 rounded-[2px] border"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                style={{ borderColor: "rgba(217,190,134,0.5)" }}
              />
            )}
          </AnimatePresence>

          {/* The motif — remounts (key) on art/stage change to replay draw-on */}
          <svg
            key={`${art.key}-${stage}`}
            viewBox="0 0 100 100"
            className="draw-on relative z-10 h-3/4 w-3/4"
            style={{ filter: surface.glow }}
            role="img"
            aria-label={`${art.name} — ${STAGES[stage].label}`}
          >
            <Paths />
          </svg>

          <span className="absolute left-5 top-5 caption" style={{ color: surface.motif, opacity: 0.7 }}>
            {art.region}
          </span>
        </motion.div>

        {/* Stage stepper */}
        <div className="mt-6 flex items-center gap-2">
          {STAGES.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStage(i)}
              aria-pressed={i === stage}
              className="flex-1 border-t-2 pt-3 text-left transition-colors duration-reveal"
              style={{ borderColor: i <= stage ? art.color : "rgba(255,255,255,0.1)" }}
            >
              <span
                className="font-body text-[0.6rem] uppercase tracking-[0.2em]"
                style={{ color: i === stage ? "var(--champagne-gold)" : "var(--stone-grey)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="mt-1 block font-display text-sm"
                style={{ color: i === stage ? "var(--ivory)" : "var(--stone-grey)" }}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            className="mt-5 font-editorial text-lg italic text-stone"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {STAGES[stage].note}
          </motion.p>
        </AnimatePresence>

        <button
          onClick={() => setStage((s) => (s + 1) % 3)}
          className="mt-6 font-body text-[0.62rem] uppercase tracking-[0.26em] text-champagne transition-opacity duration-micro hover:opacity-70"
        >
          {stage < 2 ? "Advance the transformation →" : "Begin again ↺"}
        </button>
      </div>
    </div>
  );
}
