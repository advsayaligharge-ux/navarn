"use client";

/**
 * NAVARN — Artwork SVG filter defs (shared)
 * The reusable SVG filters that give each production layer its material feel:
 *  - hand-drawn wobble (historical reference)
 *  - puff emboss (raised print)
 *  - cotton grain (DTF on cloth)
 *  - gold sheen gradient (luxury / embroidery)
 * Mounted once per artwork stage; referenced by url(#id) from the layers.
 */

export default function ArtworkDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      {/* Hand-drawn wobble — the artisan's imperfect, living line */}
      <filter id={`${idPrefix}-hand`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" />
      </filter>

      {/* Puff emboss — raised, soft, proud of the surface */}
      <filter id={`${idPrefix}-puff`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2.2" stdDeviation="1.4" floodColor="#000" floodOpacity="0.5" />
        <feDropShadow dx="0" dy="-1" stdDeviation="0.6" floodColor="#fff" floodOpacity="0.25" />
      </filter>

      {/* Cotton grain — subtle woven tooth for DTF-on-cloth */}
      <filter id={`${idPrefix}-cotton`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
      </filter>

      {/* Embroidery satin sheen along the thread */}
      <linearGradient id={`${idPrefix}-thread`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E4CE9A" />
        <stop offset="50%" stopColor="#C9A85C" />
        <stop offset="100%" stopColor="#9C7530" />
      </linearGradient>

      {/* Gold-leaf fill for luxury reinterpretation */}
      <linearGradient id={`${idPrefix}-gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E9D6A6" />
        <stop offset="55%" stopColor="#C9A85C" />
        <stop offset="100%" stopColor="#8C6A2E" />
      </linearGradient>
    </defs>
  );
}
