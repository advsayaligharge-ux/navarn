"use client";

/**
 * NAVARN — Shared R3F Scene wrapper
 * TECHNICAL_PRODUCTION_BIBLE §3 & §6: one adaptive <Canvas> per experience
 * surface, with runtime quality management. drei <PerformanceMonitor> watches
 * FPS and downgrades DPR/quality on the fly; <AdaptiveDpr> pixelates rather
 * than stutters. The Canvas is always client-only and never blocks first paint
 * (mounted via dynamic import, ssr:false, at each usage site).
 */

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { useState, Suspense } from "react";
import type { QualitySettings } from "@/config/performance";
import Grade from "./Grade";

type SceneProps = {
  settings: QualitySettings;
  children: React.ReactNode;
  className?: string;
  cameraZ?: number;
  onDegrade?: () => void;
  /** Apply the cinematic grade (only honoured when the tier allows postprocessing). */
  grade?: boolean;
};

export default function Scene({
  settings,
  children,
  className,
  cameraZ = 5,
  onDegrade,
  grade = false,
}: SceneProps) {
  const [dpr, setDpr] = useState<number>(settings.dpr[1]);
  const [graded, setGraded] = useState<boolean>(grade && settings.postprocessing);

  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{
        antialias: settings.antialias,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, cameraZ], fov: 40 }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(settings.dpr[0]);
          setGraded(false); // drop the grade first when frames dip (TECHNICAL §6)
          onDegrade?.();
        }}
        onIncline={() => setDpr(settings.dpr[1])}
      />
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>{children}</Suspense>
      {graded && <Grade />}
    </Canvas>
  );
}
