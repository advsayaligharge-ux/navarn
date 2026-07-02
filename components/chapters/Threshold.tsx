"use client";

/**
 * FRAME 0 — THE THRESHOLD
 * Black screen. A single gold point of light. The mark. One line.
 * EXPERIENCE_BLUEPRINT Homepage Storyboard, Frame 0. The doorway to the film.
 */

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Seal from "@/components/ui/Seal";
import Wordmark from "@/components/ui/Wordmark";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Threshold() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-t-seal]", { autoAlpha: 0, scale: 0.8, duration: 1.6 })
        .from("[data-t-mark]", { autoAlpha: 0, y: 20, duration: 1.2 }, "-=0.9")
        .from("[data-t-line]", { autoAlpha: 0, y: 20, duration: 1.2 }, "-=0.8")
        .from("[data-t-scroll]", { autoAlpha: 0, duration: 1 }, "-=0.5");
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={root}
      className="chapter flex-col bg-charcoal"
      aria-label="The Threshold"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 42%, rgba(169,130,60,0.22), rgba(12,12,11,0.9) 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div data-t-seal>
          <Seal size={104} />
        </div>
        <div data-t-mark className="mt-10">
          <Wordmark size="text-2xl md:text-4xl" className="text-ivory" />
          <p className="caption mt-4 text-brass">
            India&rsquo;s Luxury Storytelling Menswear House
          </p>
        </div>
        <p
          data-t-line
          className="mt-14 font-editorial text-2xl italic text-stone md:text-3xl"
        >
          Some stories deserve to be worn.
        </p>
        <div data-t-scroll className="mt-20 flex flex-col items-center gap-3">
          <span className="caption text-stone/60">Enter the film</span>
          <span
            aria-hidden
            className="h-12 w-[1px] animate-pulse bg-gradient-to-b from-champagne/70 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
