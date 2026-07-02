"use client";

/**
 * NAVARN — Reveal primitive
 * The house motion law: "reveal, don't perform." Elements emerge — a slow
 * upward rise with a fade, deep ease-out (VISUAL_IDENTITY §4). Scroll-linked
 * via ScrollTrigger. Honors reduced-motion (shown at rest, no transform).
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  y?: number;
  className?: string;
  /** Stagger direct children instead of animating the wrapper */
  stagger?: number;
};

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 40,
  className,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const Tag = as as any;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, y, stagger]);

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
