"use client";

/**
 * NAVARN — Garment3D
 * Mounts the interactive WebGL tee when supported; otherwise a dignified
 * static artifact panel (graceful degradation, TECHNICAL §10). Loaded via
 * next/dynamic (ssr:false) at the call site so WebGL never blocks first paint.
 */

import Scene from "./Scene";
import GarmentMesh from "./GarmentMesh";
import { useQuality } from "@/lib/three/quality";

export default function Garment3D({ accent = "#A8452E" }: { accent?: string }) {
  const { settings, webgl, tier } = useQuality();

  if (!webgl) {
    // Static fallback — the artifact on its plinth
    return (
      <div className="relative flex h-full w-full items-center justify-center rounded-[3px] bg-emerald">
        <div className="absolute inset-5 rounded-[2px] border border-champagne/40" />
        <div className="h-28 w-28 rounded-full border-2 border-dashed border-champagne/70" />
        <span className="absolute bottom-6 caption text-champagne/80">The Tarpa Dancer</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Scene settings={settings} cameraZ={5.4}>
        <GarmentMesh accent={accent} highTier={tier === "high"} />
      </Scene>
      <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 caption text-champagne/60">
        Drag to turn · scroll to draw near
      </span>
    </div>
  );
}
