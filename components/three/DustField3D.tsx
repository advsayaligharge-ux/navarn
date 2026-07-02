"use client";

/**
 * NAVARN — DustField3D (WebGL atmosphere)
 * EXPERIENCE_BLUEPRINT Ch. I: "dust in a single beam of light." A THREE.Points
 * cloud of gold motes drifting upward like memory rising. Particle count scales
 * with the quality tier (config/performance). Falls back to the Canvas 2D
 * ParticleField when WebGL is unavailable.
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";
import ParticleField from "@/components/experience/ParticleField";
import { useQuality } from "@/lib/three/quality";

function Motes({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.1 + Math.random() * 0.3;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * delta;
      if (y > 6) y = -6;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    ref.current.rotation.y += delta * 0.02;
    // gentle pointer parallax
    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      state.pointer.x * 0.4,
      3,
      delta
    );
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#D9BE86"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function DustField3D({ className }: { className?: string }) {
  const { settings, webgl, tier } = useQuality();

  if (!webgl || tier === "low") {
    return <ParticleField density={90} className={className} />;
  }

  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <Scene settings={settings} cameraZ={8}>
        <ambientLight intensity={0.5} />
        <Motes count={settings.particleCount} />
      </Scene>
    </div>
  );
}
