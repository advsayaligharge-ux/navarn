"use client";

/**
 * NAVARN — The Artifact Atelier (Chapter II)
 * Renders the VISUAL_ARTIFACT_SYSTEM: any artifact, placed on the oversized
 * silhouette by the placement grammar (GarmentPlate), in the house colour
 * relationship, with its six pillars and its recommended craft techniques
 * (craftSuitability). Change the artwork/story/civilization — the product stays
 * unmistakably NAVARN. Reads from the artifact registry; no taxonomy, no motifs.
 */

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ARTIFACTS, toneHex, groundHex } from "@/content/artifacts";
import { EMBLEMS, EMBLEM_PROFILES } from "./emblems";
import GarmentPlate from "@/components/artifact/GarmentPlate";
import { craftSuitability } from "@/lib/visual/artifactSystem";

const EASE = [0.16, 1, 0.3, 1] as const;
const PILLARS_NOTE =
  "The grammar recommends the craft — the artwork may change entirely, the house does not.";

export default function ArtEmerge() {
  const [idx, setIdx] = useState(0);
  const [view, setView] = useState<"front" | "back">("front");
  const artifact = ARTIFACTS[idx];
  const Emblem = EMBLEMS[artifact.emblem];
  const tone = toneHex(artifact.tone);
  const suit = craftSuitability(EMBLEM_PROFILES[artifact.emblem]);

  const pillars: [string, string][] = [
    ["Story", artifact.story],
    ["Heritage", artifact.heritageSource],
    ["Transformation", artifact.transformation],
    ["Craft", artifact.craft.join(" · ")],
    ["Luxury", artifact.luxuryExecution],
    ["Identity", artifact.identity],
  ];

  const techniques: [string, number][] = [
    ["DTF", suit.dtf],
    ["Puff", suit.puff],
    ["Embroidery", suit.embroidery],
    ["Foil / Engrave", suit.foil],
  ];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      {/* Left — artifact index + six pillars */}
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

        <dl className="mt-8 space-y-3 border-t border-white/8 pt-6">
          {pillars.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-4">
              <dt className="w-24 shrink-0 font-body text-[0.55rem] uppercase tracking-[0.2em] text-brass">
                {k}
              </dt>
              <dd className="font-editorial text-[0.98rem] italic leading-snug text-stone">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right — the garment plate (visual system) + craft suitability */}
      <div>
        <div className="relative overflow-hidden rounded-[3px] border border-white/10 bg-charcoal-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${artifact.id}-${view}`}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center justify-center p-6"
            >
              <GarmentPlate
                view={view}
                groundHex={groundHex(artifact.visual.ground)}
                tone={tone}
                mode={artifact.visual.mode}
                wordmark="NAVARN"
                title={artifact.visual.title}
                tagline={artifact.visual.tagline}
                wordmarkOn={artifact.visual.wordmarkOn}
                className="h-[52vh] max-h-[520px] w-auto"
              >
                {/* The hero, rendered luxury-execution: gold stroke, tone glow */}
                <g
                  className="artlayer"
                  style={
                    {
                      color: "var(--champagne-gold)",
                      ["--al-stroke"]: "var(--champagne-gold)",
                      ["--al-sw"]: "2.2",
                      filter: `drop-shadow(0 0 6px ${tone}aa)`,
                    } as CSSProperties
                  }
                >
                  <Emblem />
                </g>
              </GarmentPlate>
            </motion.div>
          </AnimatePresence>

          {/* Front / back composition toggle */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-charcoal/70 p-1 backdrop-blur">
            {(["front", "back"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className="rounded-full px-4 py-1.5 font-body text-[0.55rem] uppercase tracking-[0.22em] transition-colors duration-micro"
                style={{
                  background: view === v ? "var(--champagne-gold)" : "transparent",
                  color: view === v ? "var(--deep-charcoal)" : "var(--stone-grey)",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Craft suitability grammar (DTF / puff / embroidery / foil) */}
        <div className="mt-6">
          <p className="caption mb-4 text-brass">Craft suitability · this artifact</p>
          <div className="space-y-3">
            {techniques.map(([label, val]) => (
              <div key={label} className="flex items-center gap-4">
                <span className="w-28 shrink-0 font-body text-[0.62rem] uppercase tracking-[0.16em] text-stone">
                  {label}
                </span>
                <div className="h-[3px] flex-1 bg-white/8">
                  <motion.div
                    className="h-full"
                    style={{ background: tone }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round(val * 100)}%` }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                </div>
                <span className="w-8 text-right font-body text-[0.6rem] text-champagne">
                  {Math.round(val * 100)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 font-editorial text-base italic text-stone">{PILLARS_NOTE}</p>
        </div>
      </div>
    </div>
  );
}
