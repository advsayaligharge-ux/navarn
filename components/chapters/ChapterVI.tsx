"use client";

/**
 * CHAPTER VI — BECOMING A KEEPER
 * The customer's transformation. The threshold of ownership. The camera stops.
 * "I am not buying a t-shirt. I am becoming a keeper of India's heritage."
 * EXPERIENCE_BLUEPRINT Ch. VI. Commerce is frozen (this session) — the CTA is
 * a ceremonial placeholder until the catalog is provisioned & approved.
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Reveal from "@/components/experience/Reveal";
import Seal from "@/components/ui/Seal";

// The interactive WebGL Seal — the signature "touched = live" moment (Ch. VI)
const Seal3D = dynamic(() => import("@/components/three/Seal3D"), {
  ssr: false,
  loading: () => <Seal size={92} />,
});

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
        {/* The Seal — interactive WebGL induction; press to become a keeper */}
        <button
          onClick={() => setInducted(true)}
          aria-label="Press the seal to become a keeper"
          className="group mb-12"
        >
          <Seal3D pressed={inducted} size={300} />
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
          {inducted && (
            <p className="text-gold-leaf font-display text-3xl">Welcome, keeper.</p>
          )}
          <Link
            href="/house"
            onClick={() => setInducted(true)}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[2px] border border-champagne/50 px-9 py-4 font-body text-[0.72rem] uppercase tracking-[0.28em] text-champagne transition-colors duration-reveal ease-reveal hover:text-charcoal"
          >
            <span aria-hidden className="absolute inset-0 -translate-x-full bg-[var(--gold-sheen)] transition-transform duration-cinematic ease-reveal group-hover:translate-x-0" />
            <span className="relative z-10">Enter the House</span>
          </Link>
          <p className="caption text-stone/60">The artifacts await.</p>
        </div>

        <p className="mt-20 font-body text-xs font-light uppercase tracking-[0.3em] text-stone/60">
          To preserve India&rsquo;s stories through premium fashion.
        </p>
      </Reveal>
    </section>
  );
}
