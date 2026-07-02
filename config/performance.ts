/**
 * NAVARN — Performance Budget System
 * TECHNICAL_PRODUCTION_BIBLE §6. "The budget wins over the effect."
 *
 * Defines the quality tiers the WebGL layer adapts between at runtime, plus
 * the hard budgets the build is held to. The QualityManager (lib/three/quality)
 * consults device signals + a live FPS monitor to pick and downgrade tiers.
 */

export type QualityTier = "high" | "medium" | "low";

export interface QualitySettings {
  dpr: [number, number]; // device-pixel-ratio clamp [min, max]
  antialias: boolean;
  postprocessing: boolean; // bloom / DOF / grain
  shadows: boolean;
  particleCount: number; // dust motes in the atmosphere
  sealSegments: number; // geometry resolution for the 3D Seal
}

export const QUALITY: Record<QualityTier, QualitySettings> = {
  high: {
    dpr: [1, 2],
    antialias: true,
    postprocessing: true,
    shadows: true,
    particleCount: 1400,
    sealSegments: 64,
  },
  medium: {
    dpr: [1, 1.5],
    antialias: true,
    postprocessing: false,
    shadows: false,
    particleCount: 700,
    sealSegments: 40,
  },
  low: {
    dpr: [1, 1],
    antialias: false,
    postprocessing: false,
    shadows: false,
    particleCount: 300,
    sealSegments: 24,
  },
};

/** Hard budgets — enforced in CI and review (TECHNICAL §6). */
export const BUDGET = {
  lcpMobileMs: 2500,
  ttiMs: 3500,
  cls: 0.05,
  fpsDesktop: 60,
  fpsMobileMin: 30,
  shellJsGzipKB: 200, // SSR shell before WebGL boots
  firstChapterMB: 4, // progressive; rest lazy-loads on scroll
} as const;

/** FPS thresholds the live monitor uses to downgrade a tier. */
export const FPS_DOWNGRADE = { medium: 48, low: 34 } as const;
