"use client";

/**
 * CHAPTER IV — THE MAKING  (the hero chapter)
 * The DTF → heat press → puff → embroidery → luxury finishing journey — the
 * proof-of-transformation (BRAND_UNIVERSE §0). Scroll = the production line;
 * the garment gains a layer, and each station plays its own process cue.
 * EXPERIENCE_BLUEPRINT Ch. IV. "Watched = baked."
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STATIONS = [
  { n: "01", name: "DTF Printing", line: "The digital art is laid down in ink, motif by motif." },
  { n: "02", name: "Heat Press", line: "Heat and pressure bind the story to the cloth. Steam rises." },
  { n: "03", name: "Puff Printing", line: "Key motifs rise from the surface — heritage made tactile." },
  { n: "04", name: "Embroidery", line: "The needle dives; gold thread gives the story its weight." },
  { n: "05", name: "Luxury Finishing", line: "Trimmed, pressed, sealed — finished like an heirloom." },
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
        onUpdate: (self) =>
          setStep(Math.min(STATIONS.length - 1, Math.floor(self.progress * STATIONS.length))),
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
        style={{ background: "radial-gradient(90% 80% at 30% 40%, rgba(169,130,60,0.14), transparent 60%)" }}
      />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:px-12">
        {/* The garment building layer by layer + active-station cues */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[3px] border border-white/10 bg-emerald-deep">
            {/* base fabric */}
            <div className="absolute inset-0 bg-[#0c271f]" />

            {/* 01 DTF — printed ink lines + a sweeping print head when active */}
            <Layer show={step >= 0}>
              <div
                className="absolute inset-6 rounded-sm"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(217,190,134,0.18) 16px, rgba(217,190,134,0.18) 19px)",
                }}
              />
            </Layer>
            {step === 0 && (
              <span
                aria-hidden
                className="absolute inset-y-6 w-8 animate-[navarn-sweep_2.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
              />
            )}

            {/* 02 Heat press — descending bar + steam */}
            {step === 1 && (
              <>
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[navarn-press_2.2s_ease-in-out_infinite] bg-gradient-to-b from-black/50 to-transparent" />
                <span className="absolute inset-x-8 top-1/2 h-16 animate-pulse bg-gradient-to-t from-white/10 to-transparent blur-md" />
              </>
            )}
            <Layer show={step >= 1}>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
            </Layer>

            {/* 03 Puff — raised motif that scales in */}
            <Layer show={step >= 2}>
              <div
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_8px_22px_rgba(0,0,0,0.55)] transition-transform duration-cinematic ease-reveal"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #c98b5a, #8c4a2b)",
                  transform: `translate(-50%,-50%) scale(${step >= 2 ? 1 : 0.4})`,
                }}
              />
            </Layer>

            {/* 04 Embroidery — gold dashed ring that "stitches" in */}
            <Layer show={step >= 3}>
              <svg
                key={step >= 3 ? "stitch" : "no"}
                viewBox="0 0 100 100"
                className={`absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 ${step === 3 ? "draw-on" : ""}`}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="var(--champagne-gold)"
                  strokeWidth="2.4"
                  strokeDasharray="4 5"
                />
              </svg>
            </Layer>

            {/* 05 Finishing — gold frame + seal glow + sweep */}
            <Layer show={step >= 4}>
              <div className="absolute inset-3 rounded-[2px] border border-champagne/60" />
              <div className="absolute bottom-5 right-5 h-3 w-3 rounded-full bg-champagne shadow-[0_0_12px_rgba(217,190,134,0.9)]" />
            </Layer>
            {step === 4 && (
              <span
                aria-hidden
                className="absolute inset-0 animate-[navarn-sweep_2.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-champagne/15 to-transparent"
              />
            )}
          </div>
        </div>

        {/* Station copy + stepper */}
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
                style={{ opacity: i <= step ? 1 : 0.28, transform: i === step ? "translateX(6px)" : "none" }}
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

function Layer({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-cinematic ease-reveal"
      style={{ opacity: show ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
