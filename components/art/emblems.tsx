/**
 * NAVARN — Abstract placeholder emblems (universe-agnostic)
 *
 * These are NOT motifs, art forms, or categories. They are neutral, geometric
 * composition studies used purely as luxury placeholders while production
 * artwork is absent. An artifact references an emblem the way a museum uses a
 * plate number — it carries no fixed meaning and implies no collection.
 *
 * The real artwork for any artifact is a PRODUCTION ASSET (`Artifact.artwork`)
 * that can originate from any source in the universe — heritage, state/tribal
 * art, royalty, myth, animals, nature, architecture, patterns, cities,
 * civilizations, or concepts not yet imagined. When it lands, it replaces the
 * emblem in place. Nothing in the architecture branches on which emblem is used.
 *
 * Drawn on a 0..100 viewBox; strokes use currentColor + non-scaling-stroke.
 */

import type { VisualProfile } from "@/lib/visual/artifactSystem";

export type EmblemPaths = () => JSX.Element;
export type EmblemKey = "radiant" | "weave" | "gateway" | "interlace" | "column" | "crest";

/**
 * The visual CHARACTER of each placeholder emblem (line weight, fill density,
 * detail, scale). The VISUAL_ARTIFACT_SYSTEM's craftSuitability() reads this to
 * recommend DTF / puff / embroidery / foil. Real artwork supplies its own
 * profile; this keeps the craft grammar working with the placeholders.
 */
export const EMBLEM_PROFILES: Record<EmblemKey, VisualProfile> = {
  radiant: { lineWeight: 0.5, fillDensity: 0.3, detail: 0.6, scale: 0.7 },
  weave: { lineWeight: 0.4, fillDensity: 0.7, detail: 0.8, scale: 0.5 },
  gateway: { lineWeight: 0.7, fillDensity: 0.3, detail: 0.4, scale: 0.8 },
  interlace: { lineWeight: 0.6, fillDensity: 0.4, detail: 0.7, scale: 0.5 },
  column: { lineWeight: 0.5, fillDensity: 0.35, detail: 0.5, scale: 0.6 },
  crest: { lineWeight: 0.8, fillDensity: 0.5, detail: 0.5, scale: 0.85 },
};

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  vectorEffect: "non-scaling-stroke" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Radiant: EmblemPaths = () => (
  <g {...S}>
    <circle cx="50" cy="50" r="10" />
    <circle cx="50" cy="50" r="26" />
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2;
      return (
        <path
          key={i}
          d={`M${50 + Math.cos(a) * 28} ${50 + Math.sin(a) * 28} L${50 + Math.cos(a) * 38} ${50 + Math.sin(a) * 38}`}
        />
      );
    })}
  </g>
);

const Weave: EmblemPaths = () => (
  <g {...S}>
    <rect x="22" y="22" width="56" height="56" rx="2" />
    {[34, 46, 58, 70].map((v) => (
      <path key={`h${v}`} d={`M22 ${v} L78 ${v}`} />
    ))}
    {[34, 46, 58, 70].map((v) => (
      <path key={`v${v}`} d={`M${v} 22 L${v} 78`} />
    ))}
  </g>
);

const Gateway: EmblemPaths = () => (
  <g {...S}>
    <path d="M28 82 L28 46 Q50 24 72 46 L72 82" />
    <path d="M38 82 L38 54 Q50 40 62 54 L62 82" />
    <path d="M48 82 L48 62 Q50 58 52 62 L52 82" />
  </g>
);

const Interlace: EmblemPaths = () => (
  <g {...S}>
    <path d="M32 50 Q32 32 50 32 Q68 32 68 50 Q68 68 50 68 Q32 68 32 50" />
    <path d="M50 32 Q68 32 68 50 Q68 68 50 68" transform="rotate(90 50 50)" />
    <circle cx="50" cy="50" r="6" />
  </g>
);

const Column: EmblemPaths = () => (
  <g {...S}>
    <path d="M36 20 L36 80 M64 20 L64 80" />
    <path d="M30 20 L70 20 M30 80 L70 80" />
    <path d="M40 34 L60 34 M40 50 L60 50 M40 66 L60 66" />
  </g>
);

const Crest: EmblemPaths = () => (
  <g {...S}>
    <path d="M50 20 L74 30 L70 60 Q50 80 30 60 L26 30 Z" />
    <path d="M50 30 L50 66" />
    <path d="M36 40 L64 40" />
    <circle cx="50" cy="50" r="6" />
  </g>
);

export const EMBLEMS: Record<EmblemKey, EmblemPaths> = {
  radiant: Radiant,
  weave: Weave,
  gateway: Gateway,
  interlace: Interlace,
  column: Column,
  crest: Crest,
};
