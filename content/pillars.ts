/**
 * NAVARN — The Six Pillars
 * The website experience is organized around these, not around collections or
 * art forms. Every artifact is expressed through all six; every chapter of the
 * film maps to one (or more). This is the single source of the experience's
 * architecture.
 */

export interface Pillar {
  key: "story" | "transformation" | "heritage" | "craft" | "luxury" | "identity";
  index: number;
  label: string;
  line: string;
  chapterId: string; // the film chapter that leads on this pillar
}

export const PILLARS: Pillar[] = [
  { key: "story", index: 1, label: "Story", line: "Every artifact begins as a story worth preserving.", chapterId: "chapter-i" },
  { key: "heritage", index: 2, label: "Heritage", line: "Drawn from any source in the universe — India is where we begin.", chapterId: "chapter-ii" },
  { key: "transformation", index: 3, label: "Transformation", line: "The ancient, carried forward into the modern.", chapterId: "chapter-iii" },
  { key: "craft", index: 4, label: "Craft", line: "Ink, heat, thread — proven, not claimed.", chapterId: "chapter-iv" },
  { key: "luxury", index: 5, label: "Luxury", line: "Finished like an heirloom.", chapterId: "chapter-v" },
  { key: "identity", index: 6, label: "Identity", line: "The wearer becomes a keeper.", chapterId: "chapter-vi" },
];

/**
 * DESIGN-REFERENCE GUIDANCE — how to read the launch reference images.
 * EXTRACT (quality & direction): silhouette language, composition language,
 * print-placement strategy, premium fashion cues, luxury storytelling cues,
 * emotional tone. DO NOT EXTRACT as fixed structure: specific motifs, named
 * collections, art forms, or categories. The images set the *bar*, never the
 * *taxonomy*. (Pending: launch reference images to be supplied.)
 */
export const DESIGN_REFERENCE_EXTRACT = [
  "silhouette language",
  "composition language",
  "print-placement strategy",
  "premium fashion cues",
  "luxury storytelling cues",
  "emotional tone",
] as const;
