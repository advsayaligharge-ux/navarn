"use client";

/**
 * NAVARN — GarmentPlate (calibrated to VISUAL DNA v1)
 * The reusable renderer of the locked visual system. Reproduces the launch
 * design grammar so ANY artifact reads as NAVARN:
 *   • oversized boxy drop-shoulder cut with sleeve-cuff bands
 *   • FRONT: brand wordmark above one dominant hero
 *   • BACK: the story down a vertical spine — wordmark → serif headline → tagline
 *   • gold hairline hem + small woven hem label
 * Geometry & placement come from lib/visual/visualDNA; change the artwork,
 * story or civilization — this plate keeps the product unmistakably NAVARN.
 */

import { DNA_PLACEMENT } from "@/lib/visual/visualDNA";

const VBW = 100;
const VBH = 120;
const GOLD = "#C9A85C";

function teePath(view: "front" | "back") {
  const dip = view === "front" ? 10 : 3;
  return `M 37 16 L 20 18 L 6 44 L 11 57 L 25 51 L 22 110 L 78 110 L 75 51 L 89 57 L 94 44 L 80 18 L 63 16 Q 50 ${16 + dip} 37 16 Z`;
}

// Relative luminance to choose readable ink on any ground.
function isLight(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
}

export default function GarmentPlate({
  view = "front",
  groundHex,
  tone,
  mode = "mono",
  wordmark = "NAVARN",
  title,
  tagline,
  wordmarkOn = "back",
  children,
  className,
}: {
  view?: "front" | "back";
  groundHex: string;
  tone: string;
  mode?: "mono" | "vibrant";
  wordmark?: string;
  title?: string;
  tagline?: string;
  wordmarkOn?: "front" | "back";
  children: React.ReactNode; // hero emblem/artwork in its own 0..100 space
  className?: string;
}) {
  const light = isLight(groundHex);
  const headlineInk = light ? "#22314f" : "var(--ivory)";
  const brandInk = light ? tone : GOLD;
  const spineFill = mode === "vibrant" ? tone : GOLD;

  const p = DNA_PLACEMENT;
  const showWordmark = wordmarkOn === view || (view === "back" && wordmarkOn === "back");

  // front hero transform
  const hero = p.frontHero;
  const bodyW = 56;
  const markW = hero.scale * bodyW;
  const s = markW / 100;
  const hx = hero.cx * VBW - markW / 2;
  const hy = hero.cy * VBH - (s * 100) / 2;

  const titleWords = (title ?? "").trim().split(/\s+/).filter(Boolean);

  return (
    <svg viewBox={`0 0 ${VBW} ${VBH}`} className={className} role="img" aria-label={`${title ?? wordmark} — ${view}`}>
      {/* Fabric body */}
      <path d={teePath(view)} fill={groundHex} stroke={light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.06)"} strokeWidth={0.6} />
      {/* Neck ribbing */}
      <path
        d={`M 37 16 Q 50 ${16 + (view === "front" ? 13 : 6)} 63 16`}
        fill="none"
        stroke={brandInk}
        strokeWidth={0.6}
        opacity={0.45}
      />

      {/* Sleeve-cuff bands — a NAVARN signature */}
      {[
        [8, 24],
        [76, 92],
      ].map(([x1, x2], i) => (
        <g key={i} opacity={0.9}>
          <rect x={x1} y={49} width={x2 - x1} height={4.4} fill={spineFill} opacity={mode === "vibrant" ? 0.85 : 0.55} />
          <line x1={x1} y1={48.6} x2={x2} y2={48.6} stroke={GOLD} strokeWidth={0.5} />
          <line x1={x1} y1={53.6} x2={x2} y2={53.6} stroke={GOLD} strokeWidth={0.5} />
        </g>
      ))}

      {/* Gold hairline hem + woven hem label */}
      <line x1="26" y1="104" x2="74" y2="104" stroke={GOLD} strokeWidth={0.7} opacity={0.7} />
      <rect x={p.hemLabel.cx * VBW - 5} y={p.hemLabel.cy * VBH - 2} width={10} height={4} fill="none" stroke={brandInk} strokeWidth={0.5} opacity={0.7} />

      {view === "front" ? (
        <>
          {/* Wordmark above the hero */}
          {(wordmarkOn === "front") && (
            <text x={p.wordmarkFront.cx * VBW} y={p.wordmarkFront.cy * VBH} textAnchor="middle" fill={brandInk}
              style={{ fontFamily: "var(--font-body)", fontSize: 4.4, letterSpacing: 1.4, textTransform: "uppercase" }}>
              {wordmark}
            </text>
          )}
          {/* The hero */}
          <g transform={`translate(${hx} ${hy}) scale(${s})`}>{children}</g>
          {/* Optional front title, dash-flanked */}
          {title && wordmarkOn === "front" && (
            <text x="50" y="98" textAnchor="middle" fill={headlineInk}
              style={{ fontFamily: "var(--font-display)", fontSize: 4, letterSpacing: 1.2, textTransform: "uppercase" }}>
              — {title} —
            </text>
          )}
        </>
      ) : (
        <>
          {/* Vertical spine band */}
          <g>
            <rect x={p.backSpine.cx * VBW - (p.backSpine.width * VBW) / 2} y={p.backSpine.top * VBH}
              width={p.backSpine.width * VBW} height={(p.backSpine.bottom - p.backSpine.top) * VBH}
              fill={spineFill} opacity={mode === "vibrant" ? 0.8 : 0.4} />
            <line x1={p.backSpine.cx * VBW - (p.backSpine.width * VBW) / 2 - 1} y1={p.backSpine.top * VBH} x2={p.backSpine.cx * VBW - (p.backSpine.width * VBW) / 2 - 1} y2={p.backSpine.bottom * VBH} stroke={GOLD} strokeWidth={0.4} />
            <line x1={p.backSpine.cx * VBW + (p.backSpine.width * VBW) / 2 + 1} y1={p.backSpine.top * VBH} x2={p.backSpine.cx * VBW + (p.backSpine.width * VBW) / 2 + 1} y2={p.backSpine.bottom * VBH} stroke={GOLD} strokeWidth={0.4} />
          </g>
          {/* Wordmark at the nape */}
          <text x={p.wordmarkNape.cx * VBW} y={p.wordmarkNape.cy * VBH} textAnchor="middle" fill={brandInk}
            style={{ fontFamily: "var(--font-body)", fontSize: 3.6, letterSpacing: 1.3, textTransform: "uppercase" }}>
            {wordmark}
          </text>
          {/* Headline, stacked down the spine */}
          {titleWords.length > 0 && (
            <text x="50" y={p.backHeadline.cy * VBH} textAnchor="middle" fill={headlineInk}
              style={{ fontFamily: "var(--font-display)", fontSize: 6.2, letterSpacing: 0.4, textTransform: "uppercase" }}>
              {titleWords.map((w, i) => (
                <tspan key={i} x="50" dy={i === 0 ? 0 : 7.4}>
                  {w}
                </tspan>
              ))}
            </text>
          )}
          {/* Tagline */}
          {tagline && (
            <text x="50" y={p.backTagline.cy * VBH + titleWords.length * 4} textAnchor="middle" fill={headlineInk} opacity={0.75}
              style={{ fontFamily: "var(--font-body)", fontSize: 3, letterSpacing: 1.2, textTransform: "uppercase" }}>
              {tagline}
            </text>
          )}
        </>
      )}
    </svg>
  );
}
