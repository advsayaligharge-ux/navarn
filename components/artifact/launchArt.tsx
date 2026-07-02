/**
 * NAVARN — Launch V1 artwork compositions
 * Stylized gold-linework interpretations of the four real launch designs, so
 * every garment plate reads as the actual product — not an abstract placeholder.
 * These calibrate the SEED artifacts only; the architecture stays generic
 * (any artifact still falls back to an abstract emblem). The literal production
 * raster drops into `Artifact.artwork` when supplied.
 *
 * Rendered in the plate's gold-linework luxury treatment (engraved feel), true
 * to the launch aesthetic (gold on espresso / ink; the vibrant raster is future).
 * 0..100 viewBox; strokes = currentColor via the .artlayer CSS.
 */

import type { EmblemPaths, EmblemKey } from "@/components/art/emblems";
import { EMBLEMS } from "@/components/art/emblems";
import type { Artifact } from "@/content/artifacts";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  vectorEffect: "non-scaling-stroke" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* UNTAMED — a horse in motion, mane as flowing dust/fire lines */
const Horse: EmblemPaths = () => (
  <g {...S}>
    <path d="M30 82 Q34 58 50 52 Q52 42 60 40 Q62 33 67 35 Q64 40 69 42 Q80 44 82 34 Q86 52 68 58 Q66 72 74 84 L66 84 Q60 70 58 60 Q48 64 40 60 Q37 74 42 86 L34 86 Q30 74 32 62 Z" />
    {/* mane / dust streams */}
    <path d="M60 40 Q52 30 42 30 M62 36 Q56 26 46 24 M66 38 Q64 28 70 22" />
    <path d="M50 52 Q40 46 30 48 M52 56 Q42 54 34 60" />
    <path d="M62 34 L64 38" />
  </g>
);

/* HERITAGE STRIP — a horizontal procession band between fine borders */
const Band: EmblemPaths = () => (
  <g {...S}>
    {/* borders */}
    <path d="M8 36 L92 36 M8 64 L92 64" />
    <path d="M8 40 L92 40 M8 60 L92 60" strokeWidth={0.8} />
    {/* zig border */}
    <path d="M8 38 L12 40 L16 38 L20 40 L24 38 L28 40 L32 38 L36 40 L40 38 L44 40 L48 38 L52 40 L56 38 L60 40 L64 38 L68 40 L72 38 L76 40 L80 38 L84 40 L88 38 L92 40" strokeWidth={0.7} />
    {/* procession silhouettes */}
    <path d="M18 58 L18 46 Q22 42 26 46 L26 58" />{/* temple */}
    <path d="M22 46 L22 42" />
    <path d="M34 58 Q34 50 40 50 Q46 50 46 58 M40 50 L40 46" />{/* elephant-ish */}
    <path d="M54 58 L54 48 L58 44 L62 48 L62 58" />{/* chariot */}
    <circle cx="56" cy="58" r="2" /><circle cx="60" cy="58" r="2" />
    <path d="M74 58 L74 48 M74 48 L78 46 M72 52 L76 52" />{/* figure */}
    <circle cx="74" cy="46" r="1.6" />
  </g>
);

/* TIMELESS REBEL / HERITAGE 2.0 — a circular medallion, split-face duality */
const Medallion: EmblemPaths = () => (
  <g {...S}>
    <circle cx="50" cy="50" r="34" />
    <circle cx="50" cy="50" r="28" />
    {/* petal ring */}
    {Array.from({ length: 24 }).map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      return <circle key={i} cx={50 + Math.cos(a) * 31} cy={50 + Math.sin(a) * 31} r="0.9" />;
    })}
    {/* inner face medallion */}
    <circle cx="50" cy="50" r="18" />
    <path d="M50 32 L50 68" />{/* split line */}
    <path d="M42 46 Q45 44 47 46" />{/* left eye */}
    <path d="M53 46 Q56 44 58 46" />{/* right eye */}
    <path d="M50 52 L50 58 M46 62 Q50 64 54 62" />{/* nose + lips */}
  </g>
);

/* ROOTED IN CULTURE — a vertical kilim panel of diamonds */
const Kilim: EmblemPaths = () => (
  <g {...S}>
    <path d="M40 12 L40 88 M60 12 L60 88" />
    {[22, 42, 62, 82].map((cy, i) => (
      <g key={i}>
        <path d={`M50 ${cy - 12} L60 ${cy} L50 ${cy + 12} L40 ${cy} Z`} />
        <path d={`M50 ${cy - 6} L55 ${cy} L50 ${cy + 6} L45 ${cy} Z`} />
        <path d={`M50 ${cy - 12} L50 ${cy + 12}`} strokeWidth={0.7} />
      </g>
    ))}
  </g>
);

/** Launch compositions keyed by seed artifact id (others fall back to emblem). */
export const LAUNCH_ART: Record<string, EmblemPaths> = {
  "artifact-01": Horse, // Untamed Horse
  "artifact-02": Band, // Heritage Strip
  "artifact-04": Kilim, // Rooted in Culture
  "artifact-05": Medallion, // Heritage 2.0 / Timeless Rebel
};

/** Resolve the artwork for any artifact: launch composition, else its emblem. */
export function resolveArt(artifact: Artifact): EmblemPaths {
  return LAUNCH_ART[artifact.id] ?? EMBLEMS[artifact.emblem as EmblemKey];
}
