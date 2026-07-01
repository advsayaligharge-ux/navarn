"use client";

/**
 * CHAPTER IV — THE MAKING  (the hero chapter)
 * The manufacturing process revealed: DTF → heat press → puff → embroidery →
 * finishing. The proof-of-transformation (BRAND_UNIVERSE §0). Scroll = the
 * production line; the garment gains a layer at each station.
 * EXPERIENCE_BLUEPRINT Ch. IV. This is the "DTF to luxury journey."
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STATIONS = [
  {
    n: "01",
    name: "DTF Printing",
    line: "The digital art is laid down in ink, motif by motif.",
    layer: "print",
  },
  {
    n: "02",
    name: "Heat Press",
    line: "Heat and pressure bind the story to the cloth. Steam rises.",
    layer: "heat",
  },
  {
    n: "03",
    name: "Puff Printing",
    line: "Key motifs rise from the surface — heritage made tactile.",
    layer: "puff",
  },
  {
    n: "04",
    name: "Embroidery",
    line: "The needle dives; gold thread gives the story its weight.",
    layer: "thread",
  },
  {
    n: "05",
    name: "Luxury Finishing",
    line: "Trimmed, pressed, sealed — finished like an heirloom.",
    layer: "finish",
  },
];

export default function ChapterIV() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setStep(STATIONS.length - 1);
      return;
    }
    if (!root.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${STATIONS.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const s = Math.min(
            STATIONS.length - 1,
            Math.floor(self.progress * STATIONS.length)
          );
          setStep(s);
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="chapter-iv"
      ref={root}
      className="chapter bg-charcoal"
      aria-label="Chapter Four — The Making"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 80% at 30% 40%, rgba(169,130,60,0.14), transparent 60%)",
        }}
      />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:px-12">
        {/* The garment building layer by layer */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[3px] border border-white/10 bg-emerald-deep">
            {/* base fabric */}
            <div className="absolute inset-0 bg-[#0c271f]" />
            {/* print layer */}
            <Layer show={step >= 0} className="opacity-[0.9]">
              <div
                className="absolute inset-6 rounded-sm"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(217,190,134,0.18) 18px, rgba(217,190,134,0.18) 20px)",
                }}
              />
            </Layer>
            {/* heat sheen */}
            <Layer show={step >= 1}>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
            </Layer>
            {/* puff — raised motif */}
            <Layer show={step >= 2}>
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_6px_20px_rgba(0,0,0,0.5)] [background:radial-gradient(circle_at_40%_35%,#c98b5a,#8c4a2b)]" />
            </Layer>
            {/* embroidery — gold thread ring */}
            <Layer show={step >= 3}>
              <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-champagne/80" />
            </Layer>
            {/* finish — gold frame + seal glow */}
            <Layer show={step >= 4}>
              <div className="absolute inset-3 rounded-[2px] border border-champagne/60" />
              <div className="absolute bottom-5 right-5 h-3 w-3 rounded-full bg-champagne shadow-[0_0_12px_rgba(217,190,134,0.9)]" />
            </Layer>
          </div>
        </div>

        {/* The station copy + stepper */}
        <div>
          <span className="caption text-brass">Chapter IV — The Making</span>
          <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-tight text-ivory">
            Ink, heat, thread,<br />and patience.
          </h2>

          <div className="mt-10 flex flex-col gap-4">
            {STATIONS.map((s, i) => (
              <div
                key={s.n}
                className="flex items-start gap-5 transition-all duration-reveal ease-reveal"
                style={{
                  opacity: i <= step ? 1 : 0.28,
                  transform: i === step ? "translateX(6px)" : "none",
                }}
              >
                <span
                  className="mt-1 font-body text-[0.6rem] tracking-[0.24em]"
                  style={{ color: i <= step ? "var(--champagne-gold)" : "var(--stone-grey)" }}
                >
                  {s.n}
                </span>
                <div>
                  <h3
                    className="font-display text-xl"
                    style={{ color: i === step ? "var(--champagne-gold)" : "var(--ivory)" }}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-1 font-body text-sm font-light leading-relaxed text-stone">
                    {s.line}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 font-editorial text-lg italic text-champagne/90">
            This is where a story becomes a garment — and a garment becomes
            worthy of it.
          </p>
        </div>
      </div>
    </section>
  );
}

function Layer({
  show,
  children,
  className = "",
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-cinematic ease-reveal ${className}`}
      style={{ opacity: show ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
