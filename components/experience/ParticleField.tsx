"use client";

/**
 * NAVARN — ParticleField (canvas 2D)
 * "Dust in a single beam of light" (EXPERIENCE_BLUEPRINT Ch. I).
 * A lightweight, GPU-cheap atmosphere of drifting gold motes. The pointer
 * casts a soft light — "searching in the dark." Real-time 3D (R3F) replaces
 * this in Phase 2 for the hero moments; for Phase 1 this is the baked-feel
 * atmosphere that stays fast on every device (TECHNICAL §1, §4).
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Mote = { x: number; y: number; z: number; r: number; vx: number; vy: number };

export default function ParticleField({
  density = 90,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    const motes: Mote[] = [];

    // Adaptive density — fewer motes on small / low-power devices (TECHNICAL §6)
    const count = Math.round(
      density * (window.innerWidth < 768 ? 0.5 : 1) * (reduced ? 0.35 : 1)
    );

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      motes.length = 0;
      for (let i = 0; i < count; i++) {
        const z = Math.random();
        motes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.4 + z * 1.6,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.05 - z * 0.18, // drift gently upward, like memory rising
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        // Soft glow near the pointer — "searching in the dark"
        const dx = m.x - pointer.x;
        const dy = m.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = Math.max(0, 1 - dist / 160);
        const alpha = 0.12 + m.z * 0.35 + near * 0.5;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r + near * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 190, 134, ${Math.min(alpha, 0.9)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    seed();
    draw();
    window.addEventListener("resize", () => {
      resize();
      seed();
    });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [density, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
