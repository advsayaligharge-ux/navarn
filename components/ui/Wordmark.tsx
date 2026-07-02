"use client";

/**
 * NAVARN — Wordmark (the engineered, wide-tracked lockup)
 * VISUAL_IDENTITY §1: NAVARN in wide-tracked geometric caps. Body sans carries
 * the wordmark's DNA. Used in the fixed home anchor and the threshold.
 */

export default function Wordmark({
  className = "",
  size = "text-xl",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={`font-body font-medium uppercase tracking-[0.34em] ${size} ${className}`}
    >
      NAVARN
    </span>
  );
}
