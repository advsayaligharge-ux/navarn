/**
 * NAVARN — Typography tokens
 * VISUAL_IDENTITY.md §3. Four voices, each with one job.
 *
 * Phase 1 uses high-quality open substitutes for the licensed families
 * (Canela / Söhne-class). Swap the CSS variables in app/fonts.ts when the
 * production licenses are acquired — nothing else needs to change.
 *
 *   Display  (heritage authority) → Canela / Ogg / GT Sectra  → sub: Playfair Display
 *   Editorial(the storyteller)     → Canela Text / Lyon Text   → sub: Cormorant Garamond
 *   Body     (the modern house)    → Söhne / Suisse / Neue Haas → sub: Inter
 */

export const font = {
  display: "var(--font-display)",
  editorial: "var(--font-editorial)",
  body: "var(--font-body)",
} as const;

// Modular scale (rem) — generous, museum-grade
export const scale = {
  caption: "0.75rem",
  small: "0.875rem",
  base: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "2.75rem",
  "4xl": "3.75rem",
  "5xl": "5rem",
  "6xl": "7rem",
  hero: "clamp(3rem, 9vw, 9rem)",
} as const;

// Museum-caption tracking for all-caps labels
export const tracking = {
  label: "0.28em",
  wordmark: "0.34em",
  body: "0",
} as const;

export const leading = {
  tight: "1.05",
  snug: "1.2",
  normal: "1.5",
  relaxed: "1.7",
} as const;
