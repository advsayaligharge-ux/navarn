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
 * Collection accent colors — Phase 1 (Bharat) priority collections.
 * VISUAL_IDENTITY §2.3 + LAUNCH_STRATEGY §3.
 */
export const accent = {
  warli: "#A8452E", // Warli Terracotta — The First Language
  madhubani: "#7E2B22", // Madder Red — The Painted Prayer
  kalamkari: "#2A3A5E", // Kalamkari Indigo — The Pen of the Storyteller
  gond: "#B07A2B", // Forest Ochre — The Song of the Forest
  pattachitra: "#C6772F", // Temple Saffron — The Cloth of the Gods
  sanjhi: "#3A6EA5", // Braj Blue — The Cut Prayer
  pichwai: "#1F4E79", // Nathdwara Lapis — The Cloth Behind the God
  maharaja: "#123A2E", // Royal Emerald — The Weight of a Crown
  warrior: "#8C1C1C", // Warrior Crimson — The Vow of Valour
  horse: "#CBB894", // Dust Bone — The Spirit That Cannot Be Held
  mythology: "#1B1F45", // Cosmic Indigo — The Endless Epic
} as const;

export type ColorToken = keyof typeof color;
export type AccentToken = keyof typeof accent;
