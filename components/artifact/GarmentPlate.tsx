"use client";

/**
 * NAVARN — GarmentPlate
 * The reusable renderer of the VISUAL_ARTIFACT_SYSTEM. Places ANY emblem/artwork
 * on the oversized-tee silhouette per the placement grammar, in the house colour
 * relationship (tone + gold hairline), with the museum caption. Change the
 * artwork, story or civilization — this plate keeps the product unmistakably
 * NAVARN. Front whispers; back speaks (COMPOSITION balance).
 *
 * Geometry is computed from lib/visual/artifactSystem (SILHOUETTE + PLACEMENT),
 * so retuning the spec moves the art with zero component changes.
 */

import { SILHOUETTE, PLACEMENT } from "@/lib/visual/artifactSystem";

const VBW = 100;
const VBH = 120;

// Oversized boxy tee outline (drop shoulder, wide body), per SILHOUETTE.
function teePath(view: "front" | "back") {
  const dip = view === "front" ? SILHOUETTE.neckDipFrontU : SILHOUETTE.neckDipBackU;
  const nl = 50 - SILHOUETTE.neckWidthU / 2;
  const nr = 50 + SILHOUETTE.neckWidthU / 2;
  return `M ${nl} 16
    L 20 18 L 6 44 L 11 57 L 25 51 L 22 110 L 78 110 L 75 51 L 89 57 L 94 44 L 80 18 L ${nr} 16
    Q 50 ${16 + dip} ${nl} 16 Z`;
}

export default function GarmentPlate({
  view = "front",
  tone,
  caption,
  children,
  className,
}: {
  view?: "front" | "back";
  tone: string;
  caption?: string;
  children: React.ReactNode; // emblem/artwork content in its own 0..100 space
  className?: string;
}) {
  const zone = view === "front" ? PLACEMENT.front.primary : PLACEMENT.back.primary;
  const markW = zone.scale * SILHOUETTE.bodyWidthU;
  const s = markW / 100;
  const zx = zone.cx * VBW;
  const zy = zone.cy * VBH;
  const tx = zx - markW / 2;
  const ty = zy - (s * 100) / 2;

  return (
    <svg
      viewBox={`0 0 ${VBW} ${VBH}`}
      className={className}
      role="img"
      aria-label={`${caption ?? "Artifact"} — ${view} of the oversized artifact`}
    >
      {/* Fabric body */}
      <path d={teePath(view)} fill="var(--emerald)" stroke={tone} strokeWidth={0.8} opacity={0.96} />
      {/* Neck ribbing hint */}
      <path
        d={`M ${50 - SILHOUETTE.neckWidthU / 2} 16 Q 50 ${16 + (view === "front" ? SILHOUETTE.neckDipFrontU : SILHOUETTE.neckDipBackU) + 3} ${50 + SILHOUETTE.neckWidthU / 2} 16`}
        fill="none"
        stroke="var(--champagne-gold)"
        strokeWidth={0.7}
        opacity={0.5}
      />
      {/* Gold hairline hem — the signature finishing (SILHOUETTE.hem) */}
      <line x1="26" y1="104" x2="74" y2="104" stroke="var(--champagne-gold)" strokeWidth={0.8} opacity={0.7} />

      {/* The artwork, placed in the print zone by the grammar */}
      <g transform={`translate(${tx} ${ty}) scale(${s})`}>{children}</g>

      {/* Museum caption */}
      {caption && (
        <text
          x="50"
          y={view === "front" ? 114 : 12}
          textAnchor="middle"
          fill="var(--stone-grey)"
          style={{ fontSize: 3.4, letterSpacing: 0.6, textTransform: "uppercase" }}
        >
          {caption}
        </text>
      )}
    </svg>
  );
}
