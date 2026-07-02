"use client";

/**
 * NAVARN — The Artifact Atelier (Chapter II)
 * Design-first: the visitor chooses a STATEMENT PIECE (an independent artifact,
 * not a fixed collection) and inspects the universal craft transformation that
 * builds it — the same five stages every NAVARN artifact passes through:
 *   Heritage reference → Luxury reinterpretation → DTF print → Puff print → Embroidery
 * Reads from the artifact registry (content/artifacts), so unlimited future
 * design universes appear here with no structural change. Baked SVG.
 */

import { useId, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ARTIFACTS, toneHex } from "@/content/artifacts";
import { EMBLEMS } from "./emblems";
import ArtworkDefs from "./ArtworkDefs";

const EASE = [0.16, 1, 0.3, 1] as const;

const LAYERS = [
  { key: "reference", label: "Heritage reference", note: "The story at its source — the living, imperfect hand." },
  { key: "luxury", label: "Luxury reinterpretation", note: "Honoured and refined, raised into gold." },
  { key: "dtf", label: "DTF print", note: "Laid to cloth in vivid, registered ink." },
  { key: "puff", label: "Puff print", note: "Key forms raised, proud of the surface." },
  { key: "embroidery", label: "Embroidery", note: "Stitched in gold thread — the story given weight." },
] as const;

type LayerKey = (typeof LAYERS)[number]["key"];

export default function ArtEmerge() {
  const [idx, setIdx] = useState(0);
  const [layer, setLayer] = useState<LayerKey>("reference");
  const artifact = ARTIFACTS[idx];
  const Paths = EMBLEMS[artifact.emblem];
  const tone = toneHex(artifact.tone);
  const pfx = useId().replace(/:/g, "");

  const f = (name: string) => `url(#${pfx}-${name})`;
  const surface: Record<
    LayerKey,
    { bg: string; frame?: boolean; cotton?: boolean; caption: string; group: CSSProperties }
  > = {
    reference: {
      bg: "var(--parchment)",
      caption: "Heritage source",
      group: { color: "#5a4632", ["--al-stroke" as string]: "#5a4632", ["--al-sw" as string]: "1.9", filter: f("hand") },
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
      group: { color: tone, ["--al-stroke" as string]: tone, ["--al-fill" as string]: `${tone}22`, ["--al-sw" as string]: "2" },
    },
    puff: {
      bg: "#14110e",
      caption: "Puff · raised print",
      group: { color: tone, ["--al-fill" as string]: tone, ["--al-stroke" as string]: tone, ["--al-sw" as string]: "2.4", filter: f("puff") },
    },
    embroidery: {
      bg: "var(--emerald-deep)",
      cotton: true,
      caption: "Embroidery · gold thread",
      group: { color: "#C9A85C", ["--al-stroke" as string]: "#C9A85C", ["--al-sw" as string]: "2.8" },
    },
  };
  const s = surface[layer];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      {/* Left — the artifact index */}
      <div>
        <ul className="flex flex-col">
          {ARTIFACTS.map((a, i) => (
            <li key={a.id}>
              <button
                onClick={() => setIdx(i)}
                aria-pressed={i === idx}
                className="group flex w-full items-baseline justify-between border-b border-white/8 py-4 text-left transition-colors duration-reveal"
                style={{ borderColor: i === idx ? toneHex(a.tone) : undefined }}
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className="h-2 w-2 rounded-full transition-all duration-reveal"
                    style={{
                      background: i === idx ? toneHex(a.tone) : "rgba(138,133,120,0.35)",
                      boxShadow: i === idx ? `0 0 8px ${toneHex(a.tone)}` : "none",
                    }}
                  />
                  <span
                    className="font-display text-2xl transition-colors duration-reveal md:text-3xl"
                    style={{ color: i === idx ? "var(--ivory)" : "var(--stone-grey)" }}
                  >
                    {a.name}
                  </span>
                </span>
                <span className="hidden font-editorial text-base italic text-stone sm:block">
                  {a.story}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* The six pillars of the selected artifact — the architecture, surfaced */}
        <dl className="mt-8 space-y-3 border-t border-white/8 pt-6">
          {[
            ["Story", artifact.story],
            ["Heritage", artifact.heritageSource],
            ["Transformation", artifact.transformation],
            ["Craft", artifact.craft.join(" · ")],
            ["Luxury", artifact.luxuryExecution],
            ["Identity", artifact.identity],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-4">
              <dt className="w-24 shrink-0 font-body text-[0.55rem] uppercase tracking-[0.2em] text-brass">
                {k}
              </dt>
              <dd className="font-editorial text-[0.98rem] italic leading-snug text-stone">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right — the craft atelier */}
      <div>
        <motion.div
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3px] border border-white/10 transition-colors duration-cinematic"
          animate={{ backgroundColor: s.bg }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {s.cotton && <span aria-hidden className="absolute inset-0 opacity-60" style={{ filter: f("cotton") }} />}
          {s.frame && <span aria-hidden className="pointer-events-none absolute inset-4 rounded-[2px] border border-champagne/50" />}

          <AnimatePresence mode="wait">
            <motion.svg
              key={`${artifact.id}-${layer}`}
              viewBox="0 0 100 100"
              className={`artlayer relative z-10 h-3/4 w-3/4 ${layer === "reference" ? "draw-on" : ""}`}
              style={s.group}
              role="img"
              aria-label={`${artifact.name} — ${LAYERS.find((l) => l.key === layer)!.label}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ArtworkDefs idPrefix={pfx} />
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

        {/* Layer selector — the universal craft transformation */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {LAYERS.map((l, i) => (
            <button
              key={l.key}
              onClick={() => setLayer(l.key)}
              aria-pressed={layer === l.key}
              className="border-t-2 pt-3 text-left transition-colors duration-reveal"
              style={{ borderColor: layer === l.key ? tone : "rgba(255,255,255,0.1)" }}
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
