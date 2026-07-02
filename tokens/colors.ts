/**
 * NAVARN — Color tokens
 * Single source of truth, derived from VISUAL_IDENTITY.md §2.
 * India-first (Phase 1): only Bharat collection accents are active here.
 */

export const color = {
  // Primary core (VISUAL_IDENTITY §2.1)
  royalCream: "#F5EEE0",
  ivory: "#FBF8F2",
  champagneGold: "#D9BE86",
  antiqueGold: "#A9823C",
  deepCharcoal: "#1E1E1C",

  // The mark's two sovereigns (elevated to core)
  emerald: "#123A2E",
  midnightNavy: "#171A34",

  // Secondary / supporting neutrals & metals (VISUAL_IDENTITY §2.2)
  bone: "#E7DBC6",
  parchment: "#EBE2CE",
  emeraldDeep: "#0C271F",
  charcoalSoft: "#2C2C28",
  stoneGrey: "#8A8578",
  antiqueBrass: "#8C6A2E",

  // The gold gradient (for the mark & precious accents)
  gold1: "#E4CE9A",
  gold2: "#C9A85C",
  gold3: "#9C7530",
} as const;

/**
 * Heritage accent TONES — universe-agnostic (NOT tied to any art form or fixed
 * collection). NAVARN is design-first: each artifact chooses a tone. New design
 * universes (animals, gods, patterns, global motifs…) reuse or extend these.
 * VISUAL_IDENTITY §2.3.
 */
export const accent = {
  terracotta: "#A8452E",
  madder: "#7E2B22",
  indigo: "#2A3A5E",
  ochre: "#B07A2B",
  saffron: "#C6772F",
  brajBlue: "#3A6EA5",
  lapis: "#1F4E79",
  emerald: "#123A2E",
  crimson: "#8C1C1C",
  dust: "#CBB894",
  cosmic: "#1B1F45",
} as const;

export type ColorToken = keyof typeof color;
export type AccentTone = keyof typeof accent;
