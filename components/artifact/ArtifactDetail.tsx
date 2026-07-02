"use client";

/**
 * NAVARN — ArtifactDetail
 * The artifact experience: front/back viewer, the six-pillar storytelling, the
 * heritage-transformation journey, the craft journey, and the luxury layer.
 * Renders any artifact through the locked VISUAL DNA. No commerce — the CTA is
 * ceremonial (Shopify frozen).
 */

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/experience/Reveal";
import GarmentPlate from "./GarmentPlate";
import { EMBLEM_PROFILES } from "@/components/art/emblems";
import { resolveArt } from "./launchArt";
import { craftSuitability } from "@/lib/visual/artifactSystem";
import { toneHex, groundHex, type Artifact } from "@/content/artifacts";

const EASE = [0.16, 1, 0.3, 1] as const;

type NavRef = { id: string; name: string } | null;

export default function ArtifactDetail({
  artifact,
  prev,
  next,
}: {
  artifact: Artifact;
  prev: NavRef;
  next: NavRef;
}) {
  const [view, setView] = useState<"front" | "back">("front");
  const Emblem = resolveArt(artifact);
  const tone = toneHex(artifact.tone);
  const suit = craftSuitability(EMBLEM_PROFILES[artifact.emblem]);

  const emblemStyle = {
    color: "var(--champagne-gold)",
    ["--al-stroke"]: "var(--champagne-gold)",
    ["--al-sw"]: "2.2",
    filter: `drop-shadow(0 0 6px ${tone}aa)`,
  } as CSSProperties;

  const pillars: [string, string][] = [
    ["Story", artifact.story],
    ["Heritage Source", artifact.heritageSource],
    ["Transformation", artifact.transformation],
    ["Craft", artifact.craft.join(" · ")],
    ["Luxury Execution", artifact.luxuryExecution],
    ["Identity", artifact.identity],
  ];

  const techniques: [string, number][] = [
    ["DTF", suit.dtf],
    ["Puff", suit.puff],
    ["Embroidery", suit.embroidery],
    ["Foil / Engrave", suit.foil],
  ];

  // The transformation journey — three treatments of the same mark
  const journey: { label: string; text: string; bg: string; stroke: string; frame?: boolean }[] = [
    { label: "Heritage", text: artifact.heritageSource, bg: "var(--parchment)", stroke: "#5a4632" },
    { label: "Transformation", text: artifact.transformation, bg: "#141412", stroke: "var(--ivory)" },
    { label: "Luxury", text: artifact.luxuryExecution, bg: "var(--emerald)", stroke: "var(--champagne-gold)", frame: true },
  ];

  return (
    <main className="bg-charcoal">
      {/* ── Hero: front/back viewer + name/story ── */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24">
        <div className="relative">
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-[3px] border border-white/8 bg-charcoal-soft p-6"
            style={{ perspective: 1400 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, rotateY: view === "front" ? -10 : 10 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: view === "front" ? 10 : -10 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="flex items-center justify-center"
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
                  artwork={artifact.artwork}
                  className="h-[42vh] w-auto max-w-full sm:h-[52vh] md:h-[58vh] md:max-h-[580px]"
                >
                  <g className="artlayer" style={emblemStyle}>
                    <Emblem />
                  </g>
                </GarmentPlate>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-charcoal/70 p-1 backdrop-blur">
              {(["front", "back"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className="rounded-full px-5 py-1.5 font-body text-[0.55rem] uppercase tracking-[0.22em] transition-colors duration-micro"
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
        </div>

        <div>
          <span className="caption text-brass">NAVARN Artifact</span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.03] text-ivory">
            {artifact.name}
          </h1>
          <p className="mt-6 max-w-reading font-editorial text-2xl italic text-stone">{artifact.story}</p>
          <p className="mt-8 font-body text-sm font-light leading-relaxed text-stone/80">
            {artifact.heritageSource}
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {artifact.craft.map((c) => (
              <span key={c} className="rounded-full border border-white/12 px-4 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.2em] text-champagne">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── The six pillars ── */}
      <section className="border-t border-white/5 bg-charcoal-soft px-6 py-20 md:px-12">
        <Reveal className="mx-auto max-w-6xl">
          <span className="caption mb-10 block text-brass">The six pillars</span>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(([k, v], i) => (
              <div key={k}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-brass">{k}</h3>
                </div>
                <p className="mt-3 font-editorial text-xl italic leading-snug text-ivory">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── The heritage transformation journey ── */}
      <section className="border-t border-white/5 px-6 py-20 md:px-12">
        <Reveal className="mx-auto max-w-6xl">
          <span className="caption mb-10 block text-brass">Heritage → Luxury</span>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {journey.map((step) => (
              <div key={step.label}>
                <div
                  className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[3px] border border-white/10"
                  style={{ backgroundColor: step.bg }}
                >
                  {step.frame && <span className="pointer-events-none absolute inset-3 rounded-[2px] border border-champagne/50" />}
                  <svg
                    viewBox="0 0 100 100"
                    className="artlayer h-3/5 w-3/5"
                    style={{ color: step.stroke, ["--al-stroke"]: step.stroke, ["--al-sw"]: "2", filter: step.frame ? "drop-shadow(0 0 8px rgba(217,190,134,0.5))" : "none" } as CSSProperties}
                  >
                    <Emblem />
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-xl text-ivory">{step.label}</h3>
                <p className="mt-1 font-body text-sm font-light leading-relaxed text-stone">{step.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── The craft journey ── */}
      <section className="border-t border-white/5 bg-charcoal-soft px-6 py-20 md:px-12">
        <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <span className="caption mb-6 block text-brass">The craft journey</span>
            <h2 className="font-display text-3xl leading-tight text-ivory">Ink, heat, thread, and patience.</h2>
            <p className="mt-6 max-w-reading font-editorial text-lg italic text-stone">
              Launch production: premium DTF printing · heat-press application ·
              premium oversized cotton. The technique will grow — embroidery,
              puff, foil, artisan work — the identity will not.
            </p>
          </div>
          <div>
            <p className="caption mb-4 text-brass">Craft suitability · this artifact</p>
            <div className="space-y-3">
              {techniques.map(([label, val]) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="w-28 shrink-0 font-body text-[0.62rem] uppercase tracking-[0.16em] text-stone">{label}</span>
                  <div className="h-[3px] flex-1 bg-white/8">
                    <motion.div
                      className="h-full"
                      style={{ background: tone }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.round(val * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                  </div>
                  <span className="w-8 text-right font-body text-[0.6rem] text-champagne">{Math.round(val * 100)}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── The luxury layer / threshold ── */}
      <section className="border-t border-white/5 px-6 py-24 text-center md:px-12">
        <Reveal className="mx-auto max-w-2xl">
          <p className="font-editorial text-3xl italic leading-snug text-ivory">{artifact.identity}</p>
          <p className="mt-8 caption text-stone/70">The collection opens here — once the house is ready.</p>
          <span className="mt-6 inline-block cursor-default rounded-[2px] border border-champagne/40 px-9 py-4 font-body text-[0.72rem] uppercase tracking-[0.28em] text-champagne">
            Become a Keeper
          </span>
        </Reveal>
      </section>

      {/* ── Prev / next ── */}
      <nav className="flex items-stretch justify-between border-t border-white/5">
        {prev ? (
          <Link href={`/artifacts/${prev.id}`} className="group flex-1 px-6 py-10 transition-colors duration-reveal hover:bg-charcoal-soft md:px-12">
            <span className="caption text-brass">← Previous artifact</span>
            <p className="mt-2 font-display text-2xl text-stone transition-colors group-hover:text-ivory">{prev.name}</p>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        <Link href="/house" className="flex items-center border-x border-white/5 px-6 font-body text-[0.6rem] uppercase tracking-[0.24em] text-stone transition-colors hover:text-champagne">
          The House
        </Link>
        {next ? (
          <Link href={`/artifacts/${next.id}`} className="group flex-1 px-6 py-10 text-right transition-colors duration-reveal hover:bg-charcoal-soft md:px-12">
            <span className="caption text-brass">Next artifact →</span>
            <p className="mt-2 font-display text-2xl text-stone transition-colors group-hover:text-ivory">{next.name}</p>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </main>
  );
}
