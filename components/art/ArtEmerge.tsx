"use client";

/**
 * NAVARN — Heritage Artwork System (Chapter II atelier)
 * Production-quality pass: for each of the seven Phase-1 arts (Warli, Madhubani,
 * Sanjhi, Pichwai, Maharaja, Warrior, Untamed Horse) the visitor inspects five
 * production layers, exactly as the garment is actually built:
 *   Historical reference → Luxury reinterpretation → DTF print → Puff print → Embroidery
 * Baked SVG + Framer Motion ("watched = baked"). The motifs are house
 * interpretations; production artwork — sourced with & credited to the origin
 * artisans (VERBAL_IDENTITY §11) — drops into the same layer slots.
 */

import { useId, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ART_MOTIFS } from "./motifs";
import ArtworkDefs from "./ArtworkDefs";

const EASE = [0.16, 1, 0.3, 1] as const;

const LAYERS = [
  { key: "reference", label: "Historical reference", note: "As the artisan drew it — the living, imperfect hand." },
  { key: "luxury", label: "Luxury reinterpretation", note: "Honoured and refined, raised into gold." },
  { key: "dtf", label: "DTF print", note: "Laid to cloth in vivid, registered ink." },
  { key: "puff", label: "Puff print", note: "Key motifs raised, proud of the surface." },
  { key: "embroidery", label: "Embroidery", note: "Stitched in gold thread — the story given weight." },
] as const;

type LayerKey = (typeof LAYERS)[number]["key"];

export default function ArtEmerge() {
  const [artIdx, setArtIdx] = useState(0);
  const [layer, setLayer] = useState<LayerKey>("reference");
  const art = ART_MOTIFS[artIdx];
  const Paths = art.Paths;
  const pfx = useId().replace(/:/g, "");

  const selectArt = (i: number) => setArtIdx(i);

  // Per-layer surface + motif treatment
  const f = (name: string) => `url(#${pfx}-${name})`;
  const surface: Record<
    LayerKey,
    { bg: string; frame?: boolean; grid?: boolean; cotton?: boolean; caption: string; group: CSSProperties }
  > = {
    reference: {
      bg: "var(--parchment)",
      caption: art.region,
      group: {
        color: "#5a4632",
        ["--al-stroke" as string]: "#5a4632",
        ["--al-sw" as string]: "1.9",
        filter: f("hand"),
      },
    },
    luxury: {
      bg: "var(--emerald)",
      frame: true,
      caption: "Luxury",
      group: {
        color: "var(--champagne-gold)",
        ["--al-stroke" as string]: "var(--champagne-gold)",
        ["--al-sw" as string]: "1.7",
        filter: "drop-shadow(0 0 9px rgba(217,190,134,0.55))",
      },
    },
    dtf: {
      bg: "var(--ivory)",
      cotton: true,
      caption: "DTF · digital film transfer",
      group: {
        color: art.color,
        ["--al-stroke" as string]: art.color,
        ["--al-fill" as string]: `${art.color}22`,
        ["--al-sw" as string]: "2",
      },
    },
    puff: {
      bg: "#14110e",
      caption: "Puff · raised print",
      group: {
        color: art.color,
        ["--al-fill" as string]: art.color,
        ["--al-stroke" as string]: art.color,
        ["--al-sw" as string]: "2.4",
        filter: f("puff"),
      },
    },
    embroidery: {
      bg: "var(--emerald-deep)",
      cotton: true,
      caption: "Embroidery · gold thread",
      group: {
        color: "#C9A85C",
        ["--al-stroke" as string]: "#C9A85C",
        ["--al-sw" as string]: "2.8",
      },
    },
  };

  const s = surface[layer];

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

      {/* Right — the layer atelier */}
      <div>
        <motion.div
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3px] border border-white/10 transition-colors duration-cinematic"
          animate={{ backgroundColor: s.bg }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {s.grid && (
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(217,190,134,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(217,190,134,0.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          )}
          {s.cotton && (
            <span
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{ filter: f("cotton") }}
            />
          )}
          {s.frame && (
            <span aria-hidden className="pointer-events-none absolute inset-4 rounded-[2px] border border-champagne/50" />
          )}

          <AnimatePresence mode="wait">
            <motion.svg
              key={`${art.key}-${layer}`}
              viewBox="0 0 100 100"
              className={`artlayer relative z-10 h-3/4 w-3/4 ${layer === "reference" ? "draw-on" : ""}`}
              style={s.group}
              role="img"
              aria-label={`${art.name} — ${LAYERS.find((l) => l.key === layer)!.label}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ArtworkDefs idPrefix={pfx} />
              {/* DTF registration ghosts (cyan/magenta) beneath the ink */}
              {layer === "dtf" && (
                <>
                  <g transform="translate(1.1 0.8)" style={{ ["--al-stroke" as string]: "#3aa8c8", opacity: 0.35 } as CSSProperties}>
                    <Paths />
                  </g>
                  <g transform="translate(-1.1 -0.6)" style={{ ["--al-stroke" as string]: "#c0508f", opacity: 0.35 } as CSSProperties}>
                    <Paths />
                  </g>
                </>
              )}
              {/* Embroidery: dashed stitch pass behind the satin pass */}
              {layer === "embroidery" && (
                <g style={{ ["--al-stroke" as string]: "#8C6A2E", strokeDasharray: "3 4" } as CSSProperties}>
                  <Paths />
                </g>
              )}
              <Paths />
            </motion.svg>
          </AnimatePresence>

          <span className="absolute left-5 top-5 caption" style={{ opacity: 0.7 }}>
            {s.caption}
          </span>
        </motion.div>

        {/* Layer selector */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {LAYERS.map((l, i) => (
            <button
              key={l.key}
              onClick={() => setLayer(l.key)}
              aria-pressed={layer === l.key}
              className="border-t-2 pt-3 text-left transition-colors duration-reveal"
              style={{ borderColor: layer === l.key ? art.color : "rgba(255,255,255,0.1)" }}
            >
              <span
                className="font-body text-[0.55rem] uppercase tracking-[0.16em]"
                style={{ color: layer === l.key ? "var(--champagne-gold)" : "var(--stone-grey)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="mt-1 block font-display text-[0.82rem] leading-tight"
                style={{ color: layer === l.key ? "var(--ivory)" : "var(--stone-grey)" }}
              >
                {l.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={layer}
            className="mt-5 font-editorial text-lg italic text-stone"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {LAYERS.find((l) => l.key === layer)!.note}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
