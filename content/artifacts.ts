/**
 * NAVARN — Artifact Registry (design-first, unbounded)
 *
 * NAVARN is a Design-First Luxury Storytelling House. It is NOT collection-first,
 * NOT art-form-first, NOT motif-first. Every product is simply an ARTIFACT.
 *
 * Architecture:
 *   HOUSE → ARTIFACT REGISTRY → ARTIFACT
 *     ARTIFACT = { story, heritageSource, transformation, craft, luxuryExecution, identity }
 *
 * An artifact's heritage source may be ANYTHING in the universe — Indian
 * heritage, state/tribal arts, royal history, mythology, animals, birds, nature,
 * architecture, patterns, historical fashion, gods & sacred symbolism, cities,
 * countries, global civilizations, abstract storytelling, or concepts not yet
 * imagined. India is the launch market; the universe is unlimited.
 *
 * The rows below are SEED DATA — the current launch products, fully replaceable.
 * NOTHING in the codebase branches on a specific artifact id, name, or emblem;
 * the site renders whatever this registry contains. Real artwork arrives as a
 * production asset (`artwork`) and replaces the placeholder emblem in place.
 */

import type { EmblemKey } from "@/components/art/emblems";
import { accent, ground, type AccentTone, type GroundToken } from "@/tokens/colors";

export type ColorMode = "mono" | "vibrant";

/** Visual execution per the locked VISUAL DNA (lib/visual/visualDNA). */
export interface ArtifactVisual {
  ground: GroundToken; // fabric colour
  mode: ColorMode; // mono-luxury (dark + gold) or heritage-vibrant
  wordmarkOn: "front" | "back";
  title?: string; // the garment headline (back spine / front)
  tagline?: string; // the forward-looking sub-line
}

/** The six-pillar artifact shape — the whole architecture, in one type. */
export interface Artifact {
  id: string;
  name: string;
  tone: AccentTone;
  emblem: EmblemKey; // abstract placeholder only — carries no fixed meaning
  artwork?: string; // production artwork URL, when it exists
  visual: ArtifactVisual;

  // ── The six pillars ──────────────────────────────────────────────
  story: string; // 1. Story — why it exists, the emotion
  heritageSource: string; // 2. Heritage — the source it draws from (any universe)
  transformation: string; // 3. Transformation — how it was carried into the modern
  craft: string[]; // 4. Craft — the techniques that build it
  luxuryExecution: string; // 5. Luxury — the finishing that makes it an heirloom
  identity: string; // 6. Identity — who the wearer becomes
}

/**
 * SEED registry — the initial launch artifacts. Replaceable data, not structure.
 * Add, remove, or reorder freely; the experience adapts with no code change.
 */
export const ARTIFACTS: Artifact[] = [
  {
    id: "artifact-01",
    name: "Untamed Horse",
    tone: "dust",
    emblem: "radiant",
    visual: { ground: "espresso", mode: "mono", wordmarkOn: "back", title: "UNTAMED" },
    story: "The spirit that cannot be held — freedom rendered as movement.",
    heritageSource: "The wild, noble horse of memory and myth.",
    transformation: "Raw motion, redrawn as a tonal gold statement graphic.",
    craft: ["DTF", "Puff", "Gold-thread embroidery"],
    luxuryExecution: "Weighted oversized cotton, gold hairline hem, sealed as an heirloom.",
    identity: "The man who will not be tamed.",
  },
  {
    id: "artifact-02",
    name: "Heritage Strip",
    tone: "saffron",
    emblem: "weave",
    visual: { ground: "inkBlack", mode: "mono", wordmarkOn: "front" },
    story: "The threads that hold a civilization together.",
    heritageSource: "A gold procession band carried as everyday pattern.",
    transformation: "A heritage band, recomposed across the chest and cuffs.",
    craft: ["Foil", "Embroidery", "Luxury finishing"],
    luxuryExecution: "Black cotton, gold band, woven hem label.",
    identity: "The man who wears where he comes from.",
  },
  {
    id: "artifact-03",
    name: "Heritage Fusion",
    tone: "indigo",
    emblem: "gateway",
    visual: { ground: "charcoal", mode: "mono", wordmarkOn: "back", title: "FUSION" },
    story: "Where the ancient meets the modern.",
    heritageSource: "An old gateway fused with a contemporary frame.",
    transformation: "Two eras layered into a single composed mark.",
    craft: ["DTF", "Puff", "Gold finishing"],
    luxuryExecution: "Matte-and-metal contrast, precise print placement.",
    identity: "The man who belongs to both worlds.",
  },
  {
    id: "artifact-04",
    name: "Rooted in Culture",
    tone: "terracotta",
    emblem: "interlace",
    visual: {
      ground: "washedIndigo",
      mode: "vibrant",
      wordmarkOn: "back",
      title: "ROOTED IN CULTURE",
      tagline: "BUILT FOR THE FUTURE",
    },
    story: "You cannot rise without roots.",
    heritageSource: "Identity that runs deeper than trend.",
    transformation: "Heritage pattern down the spine, story stacked upon it.",
    craft: ["DTF", "Embroidery"],
    luxuryExecution: "Washed heavyweight cotton, vibrant folk spine, hand-finished.",
    identity: "The man who knows his ground.",
  },
  {
    id: "artifact-05",
    name: "Heritage 2.0",
    tone: "crimson",
    emblem: "column",
    visual: { ground: "ivory", mode: "vibrant", wordmarkOn: "back", title: "TIMELESS REBEL" },
    story: "Tradition, made new.",
    heritageSource: "The ancient, reinterpreted in vivid folk colour.",
    transformation: "A centered medallion, high-contrast and sharp.",
    craft: ["DTF", "Puff", "Metallic finishing"],
    luxuryExecution: "Ivory cotton, vibrant print, sharp premium detail.",
    identity: "The man who carries the past forward.",
  },
  {
    id: "artifact-06",
    name: "Royal & Mythic",
    tone: "emerald",
    emblem: "crest",
    visual: { ground: "inkBlack", mode: "mono", wordmarkOn: "back", title: "ROYAL & MYTHIC" },
    story: "Dress like the throne remembers you.",
    heritageSource: "Crowns and myth — the bearing of kings and legend.",
    transformation: "Sovereign iconography distilled into a crest.",
    craft: ["Gold-thread embroidery", "Puff", "Luxury finishing"],
    luxuryExecution: "Deep ground, dense gold work, flagship packaging.",
    identity: "The man who commands the room.",
  },
];

export const toneHex = (t: AccentTone) => accent[t];
export const groundHex = (g: GroundToken) => ground[g];
