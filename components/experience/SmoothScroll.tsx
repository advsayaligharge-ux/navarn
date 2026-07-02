"use client";

/**
 * NAVARN — Smooth scroll engine (Lenis + GSAP ScrollTrigger)
 * TECHNICAL_PRODUCTION_BIBLE §4: Lenis virtualizes scroll into a smooth,
 * weighted value; ScrollTrigger is driven off it. This is the "projector"
 * of the film — weighted, reverent, customer-conducted.
 *
 * Under prefers-reduced-motion, Lenis is not started: native scroll is used,
 * and the reveal system shows content at rest.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      // Heavy silk: long duration, deep ease-out (VISUAL_IDENTITY §4)
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    // Bridge Lenis → ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
