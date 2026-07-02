"use client";

/**
 * CHAPTER III — THE TRANSFORMATION
 * heritage art → digital design → luxury fashion artwork. The pivot of the
 * film. Scroll drives the three phases; the motif is carried across each
 * treatment before the visitor's eyes. EXPERIENCE_BLUEPRINT Ch. III.
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTIFS } from "@/components/art/motifs";
import { LAUNCH_ARTIFACTS, toneHex } from "@/content/artifacts";

const PHASES = [
  { key: "heritage", label: "Heritage art", note: "Painted by hand, on the wall of a village." },
  { key: "digital", label: "Digital design", note: "Vectorised, composed, prepared for the loom." },
  { key: "luxury", label: "Luxury fashion artwork", note: "Placed on the garment, raised in gold." },
] as const;

// Data-driven: the featured launch artifact drives the transformation demo
const FEATURED = LAUNCH_ARTIFACTS[0];
const Motif = MOTIFS[FEATURED.motif];
const FEATURED_TONE = toneHex(FEATURED.tone);

export default function ChapterIII() {
  const root = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setP(0.5);
      return;
    }
    if (!root.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => setP(self.progress),
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const phase = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;

  // Opacity of each treatment layer, cross-blended by scroll
  const op = [
    Math.max(0, 1 - p * 3),
    Math.max(0, 1 - Math.abs(p - 0.5) * 3),
    Math.max(0, (p - 0.66) * 3),
  ];

  return (
    <section
      id="chapter-iii"
      ref={root}
      className="chapter bg-emerald-deep"
      aria-label="Chapter Three — The Transformation"
    >
      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        {/* The stage — three layered treatments of one motif */}
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[3px] border border-champagne/20">
          {/* Heritage — parchment, heritage-tone line */}
          <Layer opacity={op[0]} bg="var(--parchment)" color={FEATURED_TONE}>
            <Motif />
          </Layer>
          {/* Digital — dark, ivory vector on gold grid */}
          <Layer opacity={op[1]} bg="#141412" color="var(--ivory)" grid>
            <Motif />
          </Layer>
          {/* Luxury — emerald garment, gold-leaf */}
          <Layer
            opacity={op[2]}
            bg="var(--emerald)"
            color="var(--champagne-gold)"
            glow
            frame
          >
            <Motif />
          </Layer>
        </div>

        {/* The narration */}
        <div>
          <span className="caption text-champagne/70">Chapter III — The Transformation</span>
          <div className="mt-6 flex flex-col gap-4">
            {PHASES.map((ph, i) => (
              <div
                key={ph.key}
                className="transition-all duration-reveal ease-reveal"
                style={{ opacity: i === phase ? 1 : 0.3, transform: i === phase ? "translateX(6px)" : "none" }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-body text-[0.6rem] tracking-[0.24em]"
                    style={{ color: i <= phase ? "var(--champagne-gold)" : "var(--stone-grey)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-display text-2xl md:text-3xl"
                    style={{ color: i === phase ? "var(--champagne-gold)" : "var(--ivory)" }}
                  >
                    {ph.label}
                  </h3>
                </div>
                <p className="ml-8 mt-1 font-editorial text-lg italic text-stone">{ph.note}</p>
              </div>
            ))}
          </div>

          {/* progress rail */}
          <div className="mt-10 h-[2px] w-full max-w-xs bg-white/10">
            <div className="h-full bg-champagne" style={{ width: `${Math.round(p * 100)}%` }} />
          </div>
          <p className="mt-8 max-w-reading font-editorial text-xl italic text-stone">
            We did not change the story. We carried it forward.
          </p>
        </div>
      </div>
    </section>
  );
}

function Layer({
  children,
  opacity,
  bg,
  color,
  grid,
  glow,
  frame,
}: {
  children: React.ReactNode;
  opacity: number;
  bg: string;
  color: string;
  grid?: boolean;
  glow?: boolean;
  frame?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-none"
      style={{ opacity, backgroundColor: bg, color }}
      aria-hidden={opacity < 0.5}
    >
      {grid && (
        <span
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(217,190,134,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(217,190,134,0.12) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      )}
      {frame && <span className="absolute inset-4 rounded-[2px] border border-champagne/50" />}
      <svg
        viewBox="0 0 100 100"
        className="relative z-10 h-3/4 w-3/4"
        style={{ filter: glow ? "drop-shadow(0 0 10px rgba(217,190,134,0.55))" : "none" }}
      >
        {children}
      </svg>
    </div>
  );
}
