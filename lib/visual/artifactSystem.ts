/**
 * NAVARN — VISUAL ARTIFACT SYSTEM   ██ LOCKED v1 — CALIBRATED ██
 *
 * Calibrated against the first four launch designs; the authoritative,
 * measured calibration lives in `lib/visual/visualDNA.ts` (the VISUAL DNA
 * layer), which this system defers to for silhouette, placement, colour modes,
 * grounds, type scale and craft zones. This file remains the structural spec
 * and the craftSuitability() engine. Treat both as LOCKED — change the DNA
 * layer (with new reference designs) to recalibrate; do not fork the grammar.
 *
 * The invariant visual grammar of the house. Its objective: a customer must
 * recognise a product as NAVARN instantly, even if the artwork, story, country,
 * civilization, animal, deity or design language changes completely.
 *
 * This file encodes ONLY grammar — silhouette, composition, placement, spacing,
 * type, storytelling, transformation, craft suitability, proportion, emotion,
 * colour relationships, visual weight. It encodes NO motifs, categories,
 * collections, or art forms. Any artifact (Horse, heritage strip, tribal fusion,
 * royal imagery, animals, birds, gods, sacred symbols, architecture, state arts,
 * historical fashion, or future abstract concepts) renders through this system.
 *
 * Every value is a tunable token. When the real launch reference designs are
 * supplied, retune the numbers here — nothing downstream changes.
 * Derived from VISUAL_IDENTITY.md (the frozen bible); pending image calibration.
 */

/* 1 ─ OVERSIZED LUXURY SILHOUETTE LANGUAGE ──────────────────────────
   Boxy, architectural, weighted. Drop shoulder, wide body, slightly long. */
export const SILHOUETTE = {
  aspect: 4 / 5, // garment plate ratio (w/h)
  bodyWidthU: 62, // relative units on a 100-wide viewBox
  bodyLengthU: 92,
  dropShoulderU: 12, // shoulder seam drops below the natural line
  sleeveLengthU: 30,
  neckWidthU: 26,
  neckDipFrontU: 10,
  neckDipBackU: 3, // higher, calmer back neckline
  hem: "gold-hairline", // the signature finishing line
  edge: "soft", // bevelled, heavy-cotton edge — never sharp/technical
} as const;

/* 2 ─ FRONT / BACK COMPOSITION BALANCE ──────────────────────────────
   Front is restrained (one quiet mark). Back carries the statement.
   Weighting keeps the two views feeling like one artifact. */
export const COMPOSITION = {
  front: { dominance: 0.35, mark: "restrained", caption: "hem" },
  back: { dominance: 0.9, mark: "statement", caption: "nape" },
  balanceRule: "front whispers, back speaks — never both loud",
  symmetry: "centered primary, optional off-axis secondary",
} as const;

/* 3 ─ PRINT PLACEMENT STRATEGY ──────────────────────────────────────
   Named zones in normalized garment space (0..1). An artifact's artwork
   maps to a zone; the grammar (not the art) decides where luxury sits. */
export const PLACEMENT = {
  front: {
    primary: { id: "center-chest", cx: 0.5, cy: 0.5, scale: 0.44 },
    secondary: { id: "left-heart", cx: 0.34, cy: 0.36, scale: 0.12 },
    caption: { id: "hem", cx: 0.5, cy: 0.9 },
  },
  back: {
    primary: { id: "full-panel", cx: 0.5, cy: 0.52, scale: 0.72 },
    caption: { id: "nape", cx: 0.5, cy: 0.14 },
  },
  safeAreaU: 8, // print never enters this margin from any seam
} as const;

/* 4 ─ PREMIUM SPACING SYSTEM ────────────────────────────────────────
   Space is the luxury. Generous, consistent, museum-grade. (rem) */
export const SPACING = {
  base: 8, // px unit
  gutter: 2, // × base
  section: 12,
  plateMargin: 0.14, // fraction of plate reserved as breathing room
  captionGap: 3,
} as const;

/* 5 ─ TYPOGRAPHY HIERARCHY ──────────────────────────────────────────
   Two voices (display serif + sans), never crossed. Small, confident. */
export const TYPE_HIERARCHY = [
  { level: "eyebrow", font: "body", size: "0.6rem", track: "0.28em", case: "upper", role: "museum caption / pillar label" },
  { level: "artifact", font: "display", size: "clamp(1.8rem,4vw,3rem)", track: "0", role: "the artifact name" },
  { level: "story", font: "editorial", size: "1.35rem", style: "italic", role: "the one-line story" },
  { level: "body", font: "body", size: "0.9rem", weight: 300, role: "detail / pillar values" },
  { level: "numeral", font: "display", role: "roman/oldstyle for indices" },
] as const;

/* 6 ─ STORYTELLING PLACEMENT ────────────────────────────────────────
   Where words sit relative to the garment. Story leads; commerce trails. */
export const STORYTELLING = {
  order: ["eyebrow", "artifact", "story", "pillars", "craft", "price"],
  garmentSide: "opposite the text on desktop (plate ↔ narrative)",
  rule: "the story is read before the garment is priced",
} as const;

/* 7 ─ HERITAGE → LUXURY TRANSFORMATION LANGUAGE ─────────────────────
   The universal five-stage progression every artifact passes through. */
export const TRANSFORMATION = [
  "heritage reference", // the source, honestly shown
  "luxury reinterpretation", // refined, raised into gold
  "DTF print", // laid to cloth
  "puff print", // raised, tactile
  "embroidery", // stitched, weighted
] as const;

/* 8-11 ─ CRAFT SUITABILITY GRAMMAR ──────────────────────────────────
   Given an artwork's visual character, the grammar recommends techniques.
   profile: 0..1 scalars. Returns a 0..1 suitability per technique. */
export interface VisualProfile {
  lineWeight: number; // 0 fine … 1 bold
  fillDensity: number; // 0 open … 1 dense
  detail: number; // 0 simple … 1 intricate
  scale: number; // 0 small … 1 large/hero
}

export function craftSuitability(p: VisualProfile) {
  return {
    // DTF: best for fine detail & dense colour; scales down with hero size
    dtf: clamp01(0.4 + p.detail * 0.4 + p.fillDensity * 0.3 - p.scale * 0.1),
    // Puff: bold, large, low-detail forms
    puff: clamp01(0.3 + p.lineWeight * 0.4 + p.scale * 0.4 - p.detail * 0.3),
    // Embroidery: bold line, moderate detail, hero placement
    embroidery: clamp01(0.35 + p.lineWeight * 0.35 + p.scale * 0.25 - p.fillDensity * 0.15),
    // Foil / engraving: fine line, restrained fill — for seals & fine marks
    foil: clamp01(0.3 + (1 - p.fillDensity) * 0.4 + p.detail * 0.2 - p.scale * 0.1),
  };
}

/* 12 ─ PREMIUM FASHION PROPORTIONS ──────────────────────────────────*/
export const PROPORTIONS = {
  plate: 4 / 5,
  hero: 3 / 4,
  editorialColumn: 0.62, // golden-ish reading measure
  markToBody: 0.44, // primary mark ≈ 44% of body width
  negativeSpaceBudget: 0.55, // ≥55% of any composition is quiet
} as const;

/* 13 ─ EMOTIONAL POSITIONING ────────────────────────────────────────
   Every artifact is placed on these axes; the house tone stays constant. */
export const EMOTION = {
  axes: {
    reverenceToPower: 0.5, // 0 reverent (sage) … 1 sovereign (ruler)
    stillnessToMotion: 0.35, // luxury leans still
    heritageToModern: 0.5, // the ancient made new
  },
  constant: ["reverent", "sovereign", "warm", "rare"],
  never: ["hype", "loud", "playful", "cheap"],
} as const;

/* 14 ─ LUXURY COLOUR RELATIONSHIPS ──────────────────────────────────
   Ground dominates, one accent tone leads, gold is seasoning. */
export const COLOR_RELATIONSHIPS = {
  ratio: { ground: 0.75, accent: 0.15, gold: 0.1 },
  groundTokens: ["deep-charcoal", "emerald", "royal-cream", "ivory"],
  goldRole: "light, not paint — foil/emboss/glint only",
  accentRule: "exactly one heritage tone per artifact",
} as const;

/* 15 ─ VISUAL WEIGHT DISTRIBUTION ───────────────────────────────────*/
export const VISUAL_WEIGHT = {
  dominantSubjects: 1, // one hero per composition
  focalCount: "1 primary + at most 1 secondary",
  gravity: "centered or lower-third; never scattered",
  contrast: "subject emerges from shadow (chiaroscuro)",
} as const;

/* ─ THE RECOGNITION INVARIANTS ───────────────────────────────────────
   The constants that make ANY artifact read as NAVARN. Change the artwork,
   story, or civilization freely — keep these, and it is unmistakably NAVARN. */
export const RECOGNITION_INVARIANTS = [
  "oversized boxy silhouette with a drop shoulder and gold hairline hem",
  "one hero mark, centered, with ≥55% quiet space around it",
  "ink/emerald/cream ground · one heritage accent · gold as light only",
  "display serif name + wide-tracked sans museum caption, nothing crossed",
  "story read before price; the six pillars always present",
  "the Keeper's Seal as the fixed maker's mark",
  "weighted, still, reverent motion — never hype",
] as const;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
