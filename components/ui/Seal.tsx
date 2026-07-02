"use client";

/**
 * NAVARN — The Keeper's Seal (the monogram emblem)
 * VISUAL_IDENTITY §1: pillars (heritage) + woven gold rules (the loom) +
 * the diagonal (transformation), in a shield/seal silhouette. Rendered as
 * crisp SVG for Phase 1; the interactive 3D gold Seal arrives in Phase 2
 * (EXPERIENCE_BLUEPRINT Ch. VI). Living metal: a permanent slow gold sheen.
 */

type SealProps = {
  size?: number;
  className?: string;
  title?: string;
};

export default function Seal({ size = 48, className, title = "NAVARN" }: SealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id="navarn-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E4CE9A" />
          <stop offset="50%" stopColor="#C9A85C" />
          <stop offset="100%" stopColor="#9C7530" />
        </linearGradient>
      </defs>
      {/* Emerald shield field */}
      <path
        d="M18 8 h34 a12 12 0 0 1 12 12 v18 h18 v62 a4 4 0 0 1 -4 4 h-34 a12 12 0 0 1 -12 -12 v-18 h-18 v-62 a4 4 0 0 1 4 -4 z"
        fill="#123A2E"
        stroke="url(#navarn-gold)"
        strokeWidth="3"
      />
      {/* The woven gold rules — the loom */}
      <g stroke="url(#navarn-gold)" strokeWidth="3" strokeLinecap="round">
        <line x1="20" y1="44" x2="46" y2="44" />
        <line x1="20" y1="58" x2="46" y2="58" />
        <line x1="54" y1="62" x2="80" y2="62" />
        <line x1="54" y1="76" x2="80" y2="76" />
      </g>
      {/* The diagonal — transformation, ancient made new */}
      <line
        x1="30"
        y1="96"
        x2="72"
        y2="30"
        stroke="url(#navarn-gold)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
