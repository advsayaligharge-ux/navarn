"use client";

/**
 * NAVARN — The Quiet Menu (full-screen editorial index)
 * EXPERIENCE_BLUEPRINT Part H: "the table of contents of a rare book."
 * Uses Framer Motion (AnimatePresence + staggered children) for the reveal —
 * an ink/gold curtain lift with weighted-silk easing (VISUAL_IDENTITY §4).
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Seal from "./Seal";

const INDEX = [
  { label: "The Film", note: "The six-chapter descent", href: "#top" },
  { label: "The House", note: "The gallery of artifacts", href: "/house" },
  { label: "The Making", note: "Ink, heat, thread, finishing", href: "#chapter-iv" },
  { label: "The Heritage", note: "The stories & their keepers", href: "#chapter-i" },
  { label: "The Keepers", note: "Become one", href: "#chapter-vi" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Menu() {
  const [open, setOpen] = useState(false);

  // Escape closes; lock background scroll while open (accessibility + focus)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href; // route to another page (e.g. The House)
      return;
    }
    const id = href.replace("#", "");
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open the index"
        aria-expanded={open}
        className="fixed right-6 top-6 z-50 flex items-center gap-3 font-body text-[0.62rem] uppercase tracking-[0.26em] text-champagne transition-opacity duration-micro hover:opacity-70"
      >
        Index
        <span className="flex flex-col gap-[4px]" aria-hidden>
          <span className="h-[1.5px] w-6 bg-champagne" />
          <span className="h-[1.5px] w-6 bg-champagne" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="House index"
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-charcoal px-8 md:px-20"
            initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close the index"
              className="absolute right-6 top-6 font-body text-[0.62rem] uppercase tracking-[0.26em] text-stone hover:text-champagne"
            >
              Close
            </button>

            <motion.div
              className="mb-12 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
            >
              <Seal size={40} />
              <span className="caption">The House of NAVARN</span>
            </motion.div>

            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
            >
              {INDEX.map((item, i) => (
                <motion.li
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                >
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
                </motion.li>
              ))}
            </motion.ul>

            <p className="mt-14 max-w-reading font-editorial text-lg italic text-stone">
              &ldquo;We preserve stories through luxury fashion.&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
