/**
 * NAVARN — Design motif library (universe-agnostic)
 * Stylized SVG motifs for the launch's design-first statement pieces. These
 * are DESIGN motifs (a horse, a heritage strip, a fusion glyph, roots, a
 * reinterpretation mark, a royal-mythic emblem) — NOT fixed art forms and NOT
 * hardcoded collections. New universes register new motifs here; nothing in the
 * architecture assumes a specific tradition.
 *
 * Drawn on a 0..100 viewBox; strokes use currentColor + non-scaling-stroke so a
 * single motif renders across every craft layer. Production artwork (which may
 * draw on any heritage, sourced and credited per VERBAL_IDENTITY §11) drops
 * into these slots.
 */

export type MotifPaths = () => JSX.Element;
export type MotifKey = "horse" | "strip" | "fusion" | "roots" | "reinterpret" | "royalMythic";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  vectorEffect: "non-scaling-stroke" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// UNTAMED HORSE — a horse in motion (freedom, the unbroken spirit)
const Horse: MotifPaths = () => (
  <g {...S}>
    <path d="M22 66 Q30 44 44 42 Q48 34 56 34 Q58 28 62 30 Q60 34 64 36 Q74 38 76 30 Q80 44 66 48 Q64 60 70 70 L64 70 Q60 60 58 52 Q50 56 42 54 Q40 64 44 72 L38 72 Q34 62 36 54 Q28 58 26 68 Z" />
    <path d="M56 36 L58 40" />
    <path d="M62 30 Q66 24 72 22 Q70 28 68 32" />
  </g>
);

// HERITAGE STRIP — woven vertical heritage bands
const Strip: MotifPaths = () => (
  <g {...S}>
    {[-18, -6, 6, 18].map((dx, i) => (
      <g key={i} transform={`translate(${50 + dx} 0)`}>
        <path d="M0 18 L0 82" />
        {Array.from({ length: 6 }).map((_, j) => (
          <path key={j} d={`M-3 ${26 + j * 10} L3 ${26 + j * 10}`} />
        ))}
      </g>
    ))}
    <rect x="24" y="14" width="52" height="72" rx="2" />
  </g>
);

// HERITAGE FUSION — an ancient arch fused with a modern frame
const Fusion: MotifPaths = () => (
  <g {...S}>
    <path d="M30 78 L30 46 Q50 28 70 46 L70 78" />
    <rect x="40" y="40" width="34" height="34" />
    <path d="M30 62 L70 62" />
    <circle cx="50" cy="46" r="3" />
  </g>
);

// ROOTED IN CULTURE — a tree of roots
const Roots: MotifPaths = () => (
  <g {...S}>
    <path d="M50 20 L50 58" />
    <path d="M50 30 Q40 30 36 22 M50 34 Q60 34 64 26 M50 42 Q42 44 38 38 M50 44 Q58 46 62 40" />
    <path d="M50 58 Q40 64 34 80 M50 58 Q60 64 66 80 M50 58 L50 82 M50 66 Q44 72 42 82 M50 66 Q56 72 58 82" />
    <circle cx="50" cy="20" r="3" />
  </g>
);

// HERITAGE 2.0 — a form half-ornate, half-reinterpreted (tradition, made new)
const Reinterpret: MotifPaths = () => (
  <g {...S}>
    <circle cx="50" cy="50" r="28" />
    {/* ornate half */}
    <path d="M50 22 Q38 30 38 50 Q38 70 50 78" />
    <path d="M50 30 Q44 38 44 50 Q44 62 50 70" />
    {/* reinterpreted (stepped/pixel) half */}
    <path d="M50 22 L58 22 L58 30 L66 30 L66 42 L60 42 L60 58 L66 58 L66 70 L58 70 L58 78 L50 78" />
    <path d="M50 50 L50 50" />
  </g>
);

// ROYAL & MYTHIC — a crown crowned by a mythic sun/serpent
const RoyalMythic: MotifPaths = () => (
  <g {...S}>
    <path d="M30 58 L36 40 L44 52 L50 34 L56 52 L64 40 L70 58 Z" />
    <path d="M30 62 L70 62" />
    <circle cx="50" cy="26" r="5" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <path
          key={i}
          d={`M${50 + Math.cos(a) * 8} ${26 + Math.sin(a) * 8} L${50 + Math.cos(a) * 12} ${26 + Math.sin(a) * 12}`}
        />
      );
    })}
    <path d="M38 70 Q50 66 62 70 L62 76 Q50 80 38 76 Z" />
  </g>
);

export const MOTIFS: Record<MotifKey, MotifPaths> = {
  horse: Horse,
  strip: Strip,
  fusion: Fusion,
  roots: Roots,
  reinterpret: Reinterpret,
  royalMythic: RoyalMythic,
};
