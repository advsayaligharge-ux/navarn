"use client";

/**
 * NAVARN — The Quiet Menu (full-screen editorial index)
 * EXPERIENCE_BLUEPRINT Part H: not a dropdown, but a beautifully composed
 * contents page of the house — "the table of contents of a rare book."
 * Labels speak the verbal system (The Film / The Collections / The Making /
 * The Heritage / The Keepers).
 */

import { useState } from "react";
import Seal from "./Seal";

const INDEX = [
  { label: "The Film", note: "The six-chapter descent", href: "#top" },
  { label: "The Collections", note: "The chapters of Bharat", href: "#chapter-ii" },
  { label: "The Making", note: "Ink, heat, thread, finishing", href: "#chapter-iv" },
  { label: "The Heritage", note: "The art forms & their keepers", href: "#chapter-ii" },
  { label: "The Keepers", note: "Become one", href: "#chapter-vi" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open the index"
        className="fixed right-6 top-6 z-50 flex items-center gap-3 font-body text-[0.62rem] uppercase tracking-[0.26em] text-champagne transition-opacity duration-micro hover:opacity-70"
      >
        Index
        <span className="flex flex-col gap-[4px]" aria-hidden>
          <span className="h-[1.5px] w-6 bg-champagne" />
          <span className="h-[1.5px] w-6 bg-champagne" />
        </span>
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="House index"
        className="fixed inset-0 z-[60] flex flex-col justify-center bg-charcoal px-8 transition-all duration-cinematic ease-reveal md:px-20"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close the index"
          className="absolute right-6 top-6 font-body text-[0.62rem] uppercase tracking-[0.26em] text-stone hover:text-champagne"
        >
          Close
        </button>

        <div className="mb-12 flex items-center gap-4">
          <Seal size={40} />
          <span className="caption">The House of NAVARN</span>
        </div>

        <ul className="flex flex-col gap-1">
          {INDEX.map((item, i) => (
            <li key={item.label}>
              <button
                onClick={() => go(item.href)}
                className="group flex w-full items-baseline justify-between border-b border-white/5 py-5 text-left transition-colors duration-reveal hover:border-champagne/40"
              >
                <span className="flex items-baseline gap-5">
                  <span className="caption text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl text-ivory transition-colors duration-reveal group-hover:text-champagne md:text-4xl">
                    {item.label}
                  </span>
                </span>
                <span className="hidden font-editorial text-lg italic text-stone md:block">
                  {item.note}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-reading font-editorial text-lg italic text-stone">
          &ldquo;We preserve stories through luxury fashion.&rdquo;
        </p>
      </div>
    </>
  );
}
