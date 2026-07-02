/**
 * NAVARN — VISUAL DNA (permanent calibration layer)  ██ LOCKED v1 ██
 *
 * Calibrated from the first four launch designs (Untamed · NAVARN heritage band ·
 * Timeless Rebel · Heritage 2.0 / Rooted in Culture). This layer overrides the
 * house-derived defaults in artifactSystem.ts with the brand's REAL visual DNA.
 *
 * It captures ONLY grammar — silhouette, composition, placement, negative space,
 * weight, type, colour relationships, storytelling placement, craft opportunity
 * zones, balance, emotion, hierarchy. It captures NO motifs, collections,
 * categories, art forms, or themes.
 *
 * THE GUARANTEE: swap Horse→Tiger, Warli→Japanese, Maharaja→Samurai, India→Egypt,
 * animal→deity, historical→abstract — keep this DNA — and it still reads NAVARN.
 */

/* ─ 1. OVERSIZED SILHOUETTE PROPORTIONS (from the model shots) ─────── */
export const DNA_SILHOUETTE = {
  fit: "oversized",
  shoulder: "dropped", // seam sits well below the natural shoulder
  body: "boxy", // wide, straight body; minimal taper
  bodyLengthRatio: 0.96, // length ≈ width (long-ish but not cropped)
  sleeve: "short, wide, cuff-banded",
  neck: "ribbed crew",
  weight: "heavy premium cotton, structured drape",
} as const;

/* ─ 2. FRONT / BACK COMPOSITION RATIO ──────────────────────────────── */
export const DNA_COMPOSITION = {
  front: { role: "hero + brand", weight: 0.62, elements: ["wordmark", "hero", "optional title"] },
  back: { role: "story + spine", weight: 0.85, elements: ["wordmark(nape)", "vertical spine", "headline", "tagline"] },
  rule: "front presents the hero; back tells the story down a vertical spine",
} as const;

/* ─ 3. PRINT PLACEMENT LOGIC (normalized garment space 0..1) ───────── */
export const DNA_PLACEMENT = {
  wordmarkFront: { cx: 0.5, cy: 0.24 },
  wordmarkNape: { cx: 0.5, cy: 0.12 },
  frontHero: { cx: 0.5, cy: 0.52, scale: 0.58 }, // large, chest-to-mid
  backSpine: { cx: 0.5, top: 0.2, bottom: 0.82, width: 0.06 }, // vertical band
  backHeadline: { cx: 0.5, cy: 0.42 },
  backTagline: { cx: 0.5, cy: 0.6 },
  sleeveCuffBand: { drop: 0.9 }, // band near the sleeve opening
  hemLabel: { cx: 0.72, cy: 0.9 }, // small woven label
  chestBand: { cy: 0.34, height: 0.1 }, // optional horizontal heritage band
} as const;

/* ─ 4. NEGATIVE SPACE ──────────────────────────────────────────────── */
export const DNA_NEGATIVE_SPACE = {
  groundBudget: 0.58, // ≥58% of each side is quiet ground
  heroIsolation: "one dominant hero surrounded by breathing ground",
  darkGroundBias: "more negative space on dark grounds, richer fill on light",
} as const;

/* ─ 5. VISUAL WEIGHT DISTRIBUTION ──────────────────────────────────── */
export const DNA_WEIGHT = {
  perSide: 1, // one hero per side
  gravity: "front hero centered chest-to-mid; back text stacked upper-to-mid",
  contrast: "high — subject vs quiet ground (tonal or vibrant)",
} as const;

/* ─ 6. PREMIUM TYPOGRAPHY SCALE (relative to plate) ────────────────── */
export const DNA_TYPE = {
  wordmark: { case: "upper", track: "0.34em", weightRole: "brand", relSize: 1 },
  headline: { case: "upper", track: "0.06em", family: "serif", relSize: 1.7, ornament: "dash-flanked" },
  tagline: { case: "upper", track: "0.22em", relSize: 0.8 },
  label: { case: "upper", track: "0.28em", relSize: 0.55, role: "museum caption / hem label" },
  rule: "wide-tracked caps throughout; serif for headline, nothing crossed",
} as const;

/* ─ 7. LUXURY COLOUR RELATIONSHIPS ─────────────────────────────────── */
export const DNA_COLOR = {
  modes: {
    mono: { desc: "dark ground + single metallic gold", grounds: ["espresso", "inkBlack", "charcoal"], accent: "gold" },
    vibrant: { desc: "neutral ground + folk palette", grounds: ["ivory", "washedIndigo"], accent: "folk" },
  },
  goldRole: "the luxury constant — foil / metallic / gold thread; light, not paint",
  ratio: { ground: 0.6, hero: 0.32, gold: 0.08 },
  rule: "either mono-luxury or heritage-vibrant; gold present in both",
} as const;

/* ─ 8. STORYTELLING PLACEMENT ──────────────────────────────────────── */
export const DNA_STORY = {
  home: "back", // the words live on the back
  lockup: ["wordmark(nape)", "headline", "tagline"], // stacked down the spine
  frontStory: "optional small title beneath the hero (dash-flanked)",
  order: "hero seen → wordmark → headline → tagline → price",
} as const;

/* ─ 9-12. CRAFT OPPORTUNITY ZONES ──────────────────────────────────── */
export const DNA_CRAFT = {
  dtf: ["front hero", "back spine", "all-over pattern"], // tonal or vibrant, sharp/high-contrast
  puff: ["wordmark", "headline caps", "band borders"], // bold, raisable forms
  embroidery: ["wordmark", "sleeve cuff bands", "spine border", "hem label"], // gold thread
  foilEngrave: ["wordmark", "fine gold linework", "seal", "hem label"], // fine, restrained
} as const;

/* ─ 13. PREMIUM FASHION BALANCE ────────────────────────────────────── */
export const DNA_BALANCE = {
  streetToLuxury: 0.72, // oversized street form, elevated by heritage + gold + serif
  cues: ["sleeve cuff detailing", "woven hem label", "gold restraint", "serif titling"],
  never: ["logo-slap hype", "neon", "busy clutter"],
} as const;

/* ─ 14. EMOTIONAL POSITIONING ──────────────────────────────────────── */
export const DNA_EMOTION = {
  keywords: ["sovereign", "rooted", "defiant", "timeless", "refined"],
  voice: "bold two-word title + optional forward-looking tagline",
  examples: ["a two-word headline", "an aspirational sub-line"],
} as const;

/* ─ 15. LUXURY VISUAL HIERARCHY ────────────────────────────────────── */
export const DNA_HIERARCHY = [
  "hero artwork (front)",
  "brand wordmark",
  "story headline (back)",
  "tagline",
  "bands / spine / cuff borders",
  "hem label",
] as const;

/* ─ THE RECOGNITION SIGNATURE ──────────────────────────────────────── */
export const DNA_SIGNATURE = [
  "oversized boxy drop-shoulder cut with sleeve-cuff border bands",
  "one dominant hero on the front, wordmark above it",
  "the story told down a vertical spine on the back: wordmark → serif headline → tagline",
  "either mono-luxury (dark + gold) or heritage-vibrant (neutral + folk palette) — gold always present",
  "wide-tracked caps, serif headline, dash-flanked title",
  "≥58% quiet ground; a single hero breathes",
  "a small woven hem label — the maker's mark",
] as const;
