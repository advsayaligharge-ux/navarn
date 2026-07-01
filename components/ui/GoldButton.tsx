"use client";

/**
 * NAVARN — The primary invitation (CTA)
 * VERBAL_IDENTITY §7: CTAs speak the keeper language ("Wear Your Heritage",
 * "Enter the Chapter", "Become a keeper") — never "Shop Now".
 * VISUAL_IDENTITY §4: hover = a slow champagne-gold light moving across the
 * element, never a hard flip.
 */

import { forwardRef } from "react";

type Variant = "solid" | "outline" | "quiet";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const GoldButton = forwardRef<HTMLButtonElement, Props>(function GoldButton(
  { variant = "outline", className = "", children, ...rest },
  ref
) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 px-9 py-4 " +
    "font-body text-[0.72rem] uppercase tracking-[0.28em] rounded-[2px] " +
    "transition-[color,background,border-color] duration-reveal ease-reveal " +
    "focus-visible:outline-champagne overflow-hidden";

  const variants: Record<Variant, string> = {
    solid: "bg-[var(--gold-sheen)] text-charcoal border border-transparent",
    outline:
      "border border-champagne/50 text-champagne hover:text-charcoal hover:border-champagne",
    quiet: "text-stone hover:text-champagne border border-transparent",
  };

  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {/* Gold light sweep on hover */}
      {variant === "outline" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-[var(--gold-sheen)] transition-transform duration-cinematic ease-reveal group-hover:translate-x-0"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
});

export default GoldButton;
