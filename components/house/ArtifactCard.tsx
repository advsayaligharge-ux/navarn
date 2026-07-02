/**
 * NAVARN — ArtifactCard
 * A gallery card in The House: the calibrated front garment plate on the
 * artifact's own ground, with name + story. Links to the artifact detail.
 * Purely presentational; no commerce (Shopify frozen).
 */

import Link from "next/link";
import GarmentPlate from "@/components/artifact/GarmentPlate";
import { resolveArt } from "@/components/artifact/launchArt";
import { toneHex, groundHex, type Artifact } from "@/content/artifacts";
import type { CSSProperties } from "react";

export default function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const Emblem = resolveArt(artifact);
  const tone = toneHex(artifact.tone);

  return (
    <Link
      href={`/artifacts/${artifact.id}`}
      className="group flex flex-col"
      aria-label={`${artifact.name} — ${artifact.story}`}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-[3px] border border-white/8 p-6 transition-all duration-cinematic ease-reveal group-hover:border-champagne/40"
        style={{ backgroundColor: "var(--charcoal-soft)" }}
      >
        <GarmentPlate
          view="front"
          groundHex={groundHex(artifact.visual.ground)}
          tone={tone}
          mode={artifact.visual.mode}
          wordmark="NAVARN"
          title={artifact.visual.title}
          tagline={artifact.visual.tagline}
          wordmarkOn={artifact.visual.wordmarkOn}
          artwork={artifact.artwork}
          className="h-[36vh] w-auto max-w-full transition-transform duration-cinematic ease-reveal group-hover:scale-[1.03] sm:h-[40vh] md:h-[46vh] md:max-h-[440px]"
        >
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
        <span
          aria-hidden
          className="absolute left-5 top-5 h-2 w-2 rounded-full"
          style={{ background: tone, boxShadow: `0 0 8px ${tone}` }}
        />
      </div>

      <div className="mt-5">
        <h3 className="font-display text-2xl text-ivory transition-colors duration-reveal group-hover:text-champagne">
          {artifact.name}
        </h3>
        <p className="mt-1 font-editorial text-lg italic text-stone">{artifact.story}</p>
        <span className="mt-3 inline-block font-body text-[0.6rem] uppercase tracking-[0.24em] text-brass">
          Enter the artifact →
        </span>
      </div>
    </Link>
  );
}
