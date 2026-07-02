/**
 * NAVARN — Asset Pipeline
 * TECHNICAL_PRODUCTION_BIBLE §5 & §11. GLB + Draco/Meshopt geometry, KTX2
 * textures, adaptive media. This module is the manifest + loader config the
 * 3D layer preloads from. Phase 1 ships procedural geometry (the Seal) so no
 * external GLB is required yet; when the production assets land (garment
 * models, craft footage), they register here and preload one chapter ahead.
 */

/** CDN base for optimized assets (Cloudinary/Mux in production). */
export const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "/assets";

/** Draco + KTX2 decoder locations (served statically or via CDN). */
export const DECODERS = {
  draco: `${ASSET_BASE}/decoders/draco/`,
  ktx2: `${ASSET_BASE}/decoders/ktx2/`,
} as const;

export type AssetKind = "model" | "texture" | "video" | "audio";

export interface AssetEntry {
  id: string;
  kind: AssetKind;
  src: string; // relative to ASSET_BASE
  chapter: number; // preload one chapter ahead of this
  maxMB: number; // budget guard (TECHNICAL §5)
  note?: string;
}

/**
 * The Phase-1 manifest. Procedural placeholders are marked src:"procedural"
 * — they need no download. Real assets replace these in place, keeping ids
 * stable so nothing else changes.
 */
export const MANIFEST: AssetEntry[] = [
  { id: "seal", kind: "model", src: "procedural", chapter: 6, maxMB: 1, note: "3D Keeper's Seal — extruded procedurally in Phase 1; GLB later" },
  { id: "garment-warli", kind: "model", src: "procedural", chapter: 5, maxMB: 4, note: "Hero garment — GLB w/ LODs + KTX2 when produced" },
  { id: "craft-macro", kind: "video", src: "pending", chapter: 4, maxMB: 12, note: "DTF/heat/puff/embroidery/finishing footage — the proof-of-transformation shoot" },
  { id: "drone", kind: "audio", src: "pending", chapter: 1, maxMB: 2, note: "Low drone → resolves in Ch. VI; muted by default" },
];

export const byChapter = (chapter: number) =>
  MANIFEST.filter((a) => a.chapter === chapter && a.src !== "pending");
