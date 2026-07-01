"use client";

/**
 * CHAPTER I — THE FORGOTTEN STORIES
 * Ancient India. The dark cinematic opening. Awe, then a pang of loss.
 * EXPERIENCE_BLUEPRINT Ch. I. Scroll = descent through time.
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ParticleField from "@/components/experience/ParticleField";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ChapterI() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      // The lines surface one at a time as we descend
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line, i) => {
        gsap.fromTo(
          line,
          { autoAlpha: 0, y: 30, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1.4,
            scrollTrigger: { trigger: line, start: "top 78%" },
          }
        );
      });
      // A faint parallax sink on the whole title block
      gsap.to("[data-sink]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="chapter-i"
      ref={root}
      className="chapter bg-charcoal"
      aria-label="Chapter One — The Forgotten Stories"
    >
      {/* Vignette + the single gold light source */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 8%, rgba(169,130,60,0.18), rgba(12,39,31,0.35) 42%, #0c0c0b 78%)",
        }}
      />
      <ParticleField density={110} />

      <div
        data-sink
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <span data-line className="caption mb-10 text-brass">
          Chapter I — Ancient India
        </span>
        <h2
          data-line
          className="font-display text-[clamp(2.4rem,7vw,6rem)] font-medium leading-tight text-ivory"
        >
          Three thousand years<br />of stories.
        </h2>
        <p
          data-line
          className="mt-8 font-editorial text-2xl italic text-stone md:text-3xl"
        >
          Nearly lost in three generations.
        </p>
        <p
          data-line
          className="mt-14 max-w-reading font-body text-sm font-light leading-relaxed tracking-wide text-stone/80"
        >
          Before the alphabet, India drew its soul on walls of earth and cloth
          of the gods. This is where the story begins.
        </p>

        <div data-line className="mt-16 flex flex-col items-center gap-3">
          <span className="caption text-stone/60">Scroll to descend</span>
          <span
            aria-hidden
            className="h-10 w-[1px] bg-gradient-to-b from-champagne/70 to-transparent"
          />
        </div>
      </div>

      {/* Millennia timeline at the edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {["3000 BCE", "1500 BCE", "600 CE", "1600 CE", "Today"].map((y, i) => (
          <span
            key={y}
            className="font-body text-[0.55rem] uppercase tracking-[0.24em]"
            style={{ color: i === 4 ? "var(--champagne-gold)" : "rgba(138,133,120,0.4)" }}
          >
            {y}
          </span>
        ))}
      </div>
    </section>
  );
}
