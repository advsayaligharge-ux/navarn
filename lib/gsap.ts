/**
 * NAVARN — GSAP singleton
 * Registers ScrollTrigger once, client-side only.
 * The cinematic timelines (chapters) are scrubbed by Lenis-driven scroll.
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // House motion defaults — weighted silk (VISUAL_IDENTITY §4)
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

export { gsap, ScrollTrigger };
