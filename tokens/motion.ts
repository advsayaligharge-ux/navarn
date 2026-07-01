/**
 * NAVARN — Motion tokens
 * The "weighted silk" law from VISUAL_IDENTITY.md §4 + TECHNICAL_PRODUCTION_BIBLE.md §7.
 * No spring / no bounce — everything eases in and settles like heavy silk.
 */

// GSAP-style easing strings and cubic-bezier arrays (kept in sync)
export const ease = {
  // Deep ease-out — the primary reveal curve
  reveal: [0.16, 1, 0.3, 1] as const,
  // Settle — for elements coming to rest
  settle: [0.22, 1, 0.36, 1] as const,
  // Gentle in-out for ambient drifts
  drift: [0.65, 0, 0.35, 1] as const,
} as const;

// CSS cubic-bezier() strings
export const easeCss = {
  reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
  settle: "cubic-bezier(0.22, 1, 0.36, 1)",
  drift: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

// GSAP CustomEase-free power equivalents (usable directly as gsap ease strings)
export const gsapEase = {
  reveal: "power3.out",
  settle: "power2.out",
  drift: "power1.inOut",
} as const;

// Durations (ms) — reverent, never snappy
export const duration = {
  micro: 400,
  reveal: 900,
  cinematic: 1200,
} as const;

// Seconds variants for GSAP
export const dur = {
  micro: 0.4,
  reveal: 0.9,
  cinematic: 1.2,
} as const;
