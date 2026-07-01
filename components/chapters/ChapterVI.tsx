"use client";

/**
 * CHAPTER VI — BECOMING A KEEPER
 * The customer's transformation. The threshold of ownership. The camera stops.
 * "I am not buying a t-shirt. I am becoming a keeper of India's heritage."
 * EXPERIENCE_BLUEPRINT Ch. VI. Commerce is frozen (this session) — the CTA is
 * a ceremonial placeholder until the catalog is provisioned & approved.
 */

import { useState } from "react";
import Reveal from "@/components/experience/Reveal";
import Seal from "@/components/ui/Seal";
import GoldButton from "@/components/ui/GoldButton";

export default function ChapterVI() {
  const [inducted, setInducted] = useState(false);

  return (
    <section
      id="chapter-vi"
      className="chapter flex-col bg-charcoal py-40 text-center"
      aria-label="Chapter Six — Becoming a Keeper"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 45%, rgba(169,130,60,0.16), rgba(12,39,31,0.4) 55%, #0c0c0b 85%)",
        }}
      />
      <Reveal className="relative z-10 flex flex-col items-center px-6">
        {/* The Seal — interactive induction (a preview of the Phase-2 3D seal) */}
        <button
          onClick={() => setInducted(true)}
          aria-label="Press the seal to become a keeper"
          className="group mb-12 transition-transform duration-cinematic ease-reveal hover:scale-105 active:scale-95"
        >
          <Seal size={92} />
        </button>

        <span className="caption mb-8 text-brass">Chapter VI — The Threshold</span>

        <h2 className="font-display text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[1.02] text-ivory">
          Wear your heritage.
        </h2>

        <p className="mx-auto mt-10 max-w-prose font-editorial text-2xl italic leading-snug text-stone md:text-3xl">
          You did not come here to buy a shirt. You came to carry a story India
          almost forgot.
        </p>

        <div className="mt-14 flex flex-col items-center gap-6">
          {inducted ? (
            <p className="text-gold-leaf font-display text-3xl">Welcome, keeper.</p>
          ) : (
            <GoldButton variant="outline" onClick={() => setInducted(true)}>
              Become a Keeper
            </GoldButton>
          )}
          <p className="caption text-stone/60">
            The collections open here — once the house is ready.
          </p>
        </div>

        <p className="mt-20 font-body text-xs font-light uppercase tracking-[0.3em] text-stone/60">
          To preserve India&rsquo;s stories through premium fashion.
        </p>
      </Reveal>
    </section>
  );
}
