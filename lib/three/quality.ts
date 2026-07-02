"use client";

/**
 * NAVARN — Quality Manager
 * Picks an initial QualityTier from device signals and exposes it. The live
 * FPS downgrade happens inside the Canvas via drei <PerformanceMonitor>
 * (see components/three/Scene). TECHNICAL_PRODUCTION_BIBLE §6.
 */

import { useEffect, useState } from "react";
import { QUALITY, type QualityTier, type QualitySettings } from "@/config/performance";
import { hasWebGL } from "./webgl";

function detectInitialTier(): QualityTier {
  if (typeof window === "undefined") return "medium";

  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // @ts-expect-error — non-standard but widely available signals
  const mem: number | undefined = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 4;

  if (reduced) return "low";
  if ((mem !== undefined && mem <= 4) || cores <= 4 || mobile) return "medium";
  if (mem !== undefined && mem <= 2) return "low";
  return "high";
}

export function useQuality() {
  const [tier, setTier] = useState<QualityTier>("medium");
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    setTier(detectInitialTier());
  }, []);

  const settings: QualitySettings = QUALITY[tier];
  return { tier, setTier, settings, webgl };
}
