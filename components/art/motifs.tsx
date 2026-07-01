/**
 * NAVARN — Heritage art motifs (procedural SVG)
 * Stylized, reverent line-drawings of each Phase-1 art form, used in Chapter II
 * to animate: original heritage art → artistic reconstruction → luxury
 * reinterpretation. Drawn on a 0..100 viewBox; strokes use currentColor and
 * non-scaling-stroke so a single motif renders across all three stages.
 *
 * These are house interpretations for the experience layer — the production
 * artwork (sourced with, and credited to, the origin artisans per
 * VERBAL_IDENTITY §11) replaces them in place.
 */

import { accent } from "@/tokens/colors";

type MotifPaths = () => JSX.Element;

export interface ArtMotif {
  key: string;
  name: string;
  title: string;
  region: string;
  color: string;
  Paths: MotifPaths;
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// WARLI — tarpa dancers in a ring (triangles + circles)
const Warli: MotifPaths = () => (
  <g {...S}>
    <circle cx="50" cy="50" r="26" />
    <circle cx="50" cy="50" r="6" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      const x = 50 + Math.cos(a) * 34;
      const y = 50 + Math.sin(a) * 34;
      return (
        <g key={i} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`}>
          <path d="M0 -6 L4 4 L-4 4 Z" />
          <path d="M0 4 L0 9 M0 9 L-3 12 M0 9 L3 12 M0 5 L-4 2 M0 5 L4 2" />
          <circle cx="0" cy="-9" r="2.4" />
        </g>
      );
    })}
  </g>
);

// MADHUBANI — a fish within a double-line border
const Madhubani: MotifPaths = () => (
  <g {...S}>
    <rect x="16" y="16" width="68" height="68" rx="3" />
    <rect x="20" y="20" width="60" height="60" rx="3" />
    <path d="M30 50 Q50 30 68 50 Q50 70 30 50 Z" />
    <path d="M68 50 L80 42 L80 58 Z" />
    <circle cx="40" cy="48" r="2.2" />
    <path d="M46 42 Q50 50 46 58 M54 40 Q58 50 54 60" />
  </g>
);

// SANJHI — symmetric paper-cut peacock / filigree
const Sanjhi: MotifPaths = () => (
  <g {...S}>
    <path d="M50 78 L50 44" />
    <circle cx="50" cy="38" r="6" />
    <path d="M50 34 Q46 24 50 16 Q54 24 50 34" />
    {[-1, 1].map((s) => (
      <g key={s}>
        <path d={`M50 46 Q${50 + s * 20} 40 ${50 + s * 30} 54 Q${50 + s * 22} 52 ${50 + s * 26} 62`} />
        <path d={`M50 52 Q${50 + s * 14} 54 ${50 + s * 20} 66`} />
        <circle cx={50 + s * 30} cy={54} r="2" />
      </g>
    ))}
    <path d="M38 78 Q50 72 62 78" />
  </g>
);

// PICHWAI — lotus above a cow, framed
const Pichwai: MotifPaths = () => (
  <g {...S}>
    <path d="M50 30 Q42 20 50 12 Q58 20 50 30" />
    <path d="M50 30 Q38 24 34 32 M50 30 Q62 24 66 32" />
    <path d="M40 30 Q50 40 60 30" />
    <path d="M34 62 Q34 52 44 52 L58 52 Q68 52 68 62 L68 70 Q50 78 34 70 Z" />
    <path d="M40 52 Q40 46 44 48 M62 52 Q62 46 58 48" />
    <circle cx="44" cy="62" r="1.6" />
    <circle cx="58" cy="62" r="1.6" />
  </g>
);

// MAHARAJA — a crown over a durbar arch
const Maharaja: MotifPaths = () => (
  <g {...S}>
    <path d="M28 40 L34 24 L42 36 L50 20 L58 36 L66 24 L72 40 Z" />
    <circle cx="50" cy="18" r="2.4" />
    <path d="M30 44 L70 44" />
    <path d="M34 84 L34 56 Q50 44 66 56 L66 84" />
    <path d="M42 84 L42 64 Q50 58 58 64 L58 84" />
  </g>
);

// WARRIOR — crossed blades over a shield
const Warrior: MotifPaths = () => (
  <g {...S}>
    <path d="M50 20 L70 30 L66 58 Q50 74 34 58 L30 30 Z" />
    <path d="M32 24 L64 68 M68 24 L36 68" />
    <path d="M30 22 L38 26 M70 22 L62 26" />
    <path d="M50 34 L50 60" />
  </g>
);

// HORSE — a galloping Marwari silhouette
const Horse: MotifPaths = () => (
  <g {...S}>
    <path d="M22 66 Q30 44 44 42 Q48 34 56 34 Q58 28 62 30 Q60 34 64 36 Q74 38 76 30 Q80 44 66 48 Q64 60 70 70 L64 70 Q60 60 58 52 Q50 56 42 54 Q40 64 44 72 L38 72 Q34 62 36 54 Q28 58 26 68 Z" />
    <path d="M56 36 L58 40" />
    <path d="M62 30 Q66 24 72 22 Q70 28 68 32" />
  </g>
);

export const ART_MOTIFS: ArtMotif[] = [
  { key: "warli", name: "Warli", title: "The First Language", region: "Maharashtra", color: accent.warli, Paths: Warli },
  { key: "madhubani", name: "Madhubani", title: "The Painted Prayer", region: "Bihar", color: accent.madhubani, Paths: Madhubani },
  { key: "sanjhi", name: "Sanjhi", title: "The Cut Prayer", region: "Braj", color: accent.sanjhi, Paths: Sanjhi },
  { key: "pichwai", name: "Pichwai", title: "The Cloth Behind the God", region: "Nathdwara", color: accent.pichwai, Paths: Pichwai },
  { key: "maharaja", name: "Maharaja", title: "The Weight of a Crown", region: "Rajputana", color: accent.maharaja, Paths: Maharaja },
  { key: "warrior", name: "Warrior", title: "The Vow of Valour", region: "Bharat", color: accent.warrior, Paths: Warrior },
  { key: "horse", name: "Untamed Horse", title: "The Spirit That Cannot Be Held", region: "Marwar", color: accent.horse, Paths: Horse },
];
