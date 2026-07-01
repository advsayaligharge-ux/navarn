"use client";

/**
 * CHAPTER III — THE TRANSFORMATION
 * Ancient artwork becomes modern fashion design. The pivot of the film.
 * Scroll = the transformation slider: scrolling wipes ancient → modern.
 * EXPERIENCE_BLUEPRINT Ch. III. "We did not change the story. We carried it
 * forward — from the wall, to the loom."
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ChapterIII() {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setProgress(0.5);
      return;
    }
    if (!root.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const pct = Math.round(progress * 100);

  return (
    <section
      id="chapter-iii"
      ref={root}
      className="chapter bg-emerald-deep"
      aria-label="Chapter Three — The Transformation"
    >
      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <span className="caption mb-10 block text-champagne/70">
          Chapter III — The Transformation
        </span>

        {/* The seam: ancient (left) wiped into modern (right) by scroll */}
        <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-[2px] border border-champagne/20">
          {/* Ancient layer */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "repeating-linear-gradient(45deg, #2b1a12, #2b1a12 14px, #351f14 14px, #351f14 28px)",
            }}
          >
            <span className="font-display text-2xl italic text-[#d8b48a] md:text-4xl">
              The ancient wall
            </span>
          </div>
          {/* Modern layer, revealed by clip */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              clipPath: `inset(0 0 0 ${100 - pct}%)`,
              background:
                "linear-gradient(135deg, #123a2e, #0c271f 60%), radial-gradient(circle at 70% 30%, rgba(217,190,134,0.25), transparent 55%)",
            }}
          >
            <span className="text-gold-leaf font-display text-2xl font-semibold md:text-4xl">
              The modern garment
            </span>
          </div>
          {/* The seam line */}
          <div
            aria-hidden
            className="absolute inset-y-0 w-[2px] bg-champagne shadow-[0_0_16px_rgba(217,190,134,0.8)]"
            style={{ left: `${pct}%` }}
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="caption text-stone">Ancient</span>
          <div className="h-[1px] w-40 bg-white/10">
            <div
              className="h-full bg-champagne transition-none"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="caption text-champagne">Modern</span>
        </div>

        <p className="mx-auto mt-10 max-w-reading font-editorial text-xl italic text-stone md:text-2xl">
          From the wall, to the loom. From the ancient hand, to the modern one.
        </p>
      </div>
    </section>
  );
}
