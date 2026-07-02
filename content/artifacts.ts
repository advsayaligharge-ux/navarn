/**
 * NAVARN — Artifact Registry (design-first, universe-agnostic)
 *
 * NAVARN is a Luxury Storytelling Menswear House. Each garment is an
 * INDEPENDENT ARTIFACT — a statement piece defined by its story and emotion,
 * NOT a member of a fixed art-form collection. The website architecture reads
 * from this flat registry, so new artifacts (and entire new design universes —
 * animals, birds, gods, warriors, kings, tribal arts, historical patterns,
 * state arts, global motifs, or anything else) are added here with zero
 * structural change. India is the launch focus; the model has no ceiling.
 *
 * `universe` is a free-form tag, never an enum — the house is deliberately
 * unbounded. `motif` points at a design motif (components/art/motifs); `tone`
 * at a heritage accent (tokens/colors). Production artwork drops into the same
 * slots, sourced & credited per VERBAL_IDENTITY §11.
 */

import type { MotifKey } from "@/components/art/motifs";
import { accent, type AccentTone } from "@/tokens/colors";

export interface Artifact {
  id: string;
  name: string;
  essence: string; // the emotion — why it exists, in one line
  heritageNote: string; // the story/source (any universe, free-form)
  universe: string; // free-form tag (Animal, Fusion, Royal & Mythic, …)
  tone: AccentTone;
  motif: MotifKey;
  craft: string[]; // the techniques that build it
}

/** The current design-first launch line — statement pieces, not collections. */
export const LAUNCH_ARTIFACTS: Artifact[] = [
  {
    id: "untamed-horse",
    name: "Untamed Horse",
    essence: "The spirit that cannot be held.",
    heritageNote: "Freedom, nobility, and unbroken motion — the eternal Indian symbol of the wild.",
    universe: "The Living World",
    tone: "dust",
    motif: "horse",
    craft: ["DTF", "Puff", "Gold-thread embroidery"],
  },
  {
    id: "heritage-strip",
    name: "Heritage Strip",
    essence: "The threads that hold a civilization together.",
    heritageNote: "Woven bands of memory — heritage carried as pattern, worn every day.",
    universe: "Pattern",
    tone: "terracotta",
    motif: "strip",
    craft: ["DTF", "Embroidery", "Luxury finishing"],
  },
  {
    id: "heritage-fusion",
    name: "Heritage Fusion",
    essence: "Where the ancient meets the modern.",
    heritageNote: "An old arch fused with a modern frame — the past, rebuilt for now.",
    universe: "Fusion",
    tone: "indigo",
    motif: "fusion",
    craft: ["DTF", "Puff", "Gold finishing"],
  },
  {
    id: "rooted-in-culture",
    name: "Rooted in Culture",
    essence: "You cannot rise without roots.",
    heritageNote: "A tree of roots — identity that runs deeper than trend.",
    universe: "Cultural",
    tone: "ochre",
    motif: "roots",
    craft: ["DTF", "Embroidery"],
  },
  {
    id: "heritage-2-0",
    name: "Heritage 2.0",
    essence: "Tradition, made new.",
    heritageNote: "Half-ornate, half-reinterpreted — the ancient rendered for the modern man.",
    universe: "Reinterpretation",
    tone: "crimson",
    motif: "reinterpret",
    craft: ["DTF", "Puff", "Metallic finishing"],
  },
  {
    id: "royal-mythic",
    name: "Royal & Mythic",
    essence: "Dress like the throne remembers you.",
    heritageNote: "Crowns and myth — the bearing of kings and the weight of legend.",
    universe: "Royal & Mythic",
    tone: "emerald",
    motif: "royalMythic",
    craft: ["Gold-thread embroidery", "Puff", "Luxury finishing"],
  },
];

export const toneHex = (t: AccentTone) => accent[t];
