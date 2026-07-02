"use client";

/**
 * NAVARN — Seal3D
 * Mounts the WebGL Seal when the device supports it and quality allows;
 * otherwise renders the crisp SVG Seal (graceful degradation, TECHNICAL §10).
 * Loaded via next/dynamic (ssr:false) at the call site so WebGL never blocks
 * first paint (TECHNICAL §6).
 */

import Scene from "./Scene";
import SealMesh from "./SealMesh";
import SvgSeal from "@/components/ui/Seal";
import { useQuality } from "@/lib/three/quality";

export default function Seal3D({
  pressed,
  size = 300,
}: {
  pressed: boolean;
  size?: number;
}) {
  const { settings, webgl, tier } = useQuality();

  // Low tier or no WebGL → the SVG Seal (still beautiful, still interactive)
  if (!webgl || tier === "low") {
    return <SvgSeal size={size * 0.6} />;
  }

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <Scene settings={settings} cameraZ={5.4}>
        <SealMesh pressed={pressed} segments={settings.sealSegments} />
      </Scene>
    </div>
  );
}
