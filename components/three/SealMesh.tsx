"use client";

/**
 * NAVARN — The Keeper's Seal in 3D (the signature "touched = live" moment)
 * EXPERIENCE_BLUEPRINT Ch. VI: the visitor turns the gold Seal in light and
 * "presses" it to be inducted. Phase 1 extrudes the monogram procedurally
 * (pillars + loom rules + transformation diagonal) in gold PBR — no external
 * GLB needed; a production GLB drops into config/assets MANIFEST["seal"] later.
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function goldMaterial(segments: number) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C9A85C"),
    metalness: 1,
    roughness: 0.28,
    emissive: new THREE.Color("#3a2a0e"),
    emissiveIntensity: 0.35,
  });
}

export default function SealMesh({
  pressed,
  segments = 48,
}: {
  pressed: boolean;
  segments?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(0);
  const mat = useMemo(() => goldMaterial(segments), [segments]);

  // Two pillars, four loom rules, one diagonal — the mark, extruded.
  const pillars = useMemo(
    () => [
      { pos: [-0.55, 0, 0], size: [0.42, 2.1, 0.32] },
      { pos: [0.55, 0.15, 0], size: [0.42, 2.1, 0.32] },
    ],
    []
  );
  const rules = useMemo(
    () => [
      { pos: [-0.55, 0.55, 0.12], size: [0.5, 0.09, 0.14] },
      { pos: [-0.55, 0.2, 0.12], size: [0.5, 0.09, 0.14] },
      { pos: [0.55, -0.2, 0.12], size: [0.5, 0.09, 0.14] },
      { pos: [0.55, -0.55, 0.12], size: [0.5, 0.09, 0.14] },
    ],
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    // Gentle living-metal idle rotation + press impulse
    target.current += delta * (pressed ? 2.4 : 0.35);
    const eased = THREE.MathUtils.damp(
      group.current.rotation.y,
      target.current,
      4,
      delta
    );
    group.current.rotation.y = eased;
    // Subtle pointer-follow tilt
    const px = state.pointer.x * 0.25;
    const py = state.pointer.y * 0.2;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -py, 4, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, px * 0.2, 4, delta);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff4dd" />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#123A2E" />
      <Environment preset="sunset" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={group} scale={pressed ? 1.06 : 1}>
          {/* Emerald shield backing */}
          <mesh position={[0, 0, -0.2]}>
            <boxGeometry args={[1.9, 2.5, 0.18]} />
            <meshStandardMaterial color="#0f3327" metalness={0.2} roughness={0.6} />
          </mesh>
          {pillars.map((p, i) => (
            <mesh key={`p${i}`} position={p.pos as [number, number, number]} material={mat}>
              <boxGeometry args={p.size as [number, number, number]} />
            </mesh>
          ))}
          {rules.map((r, i) => (
            <mesh key={`r${i}`} position={r.pos as [number, number, number]} material={mat}>
              <boxGeometry args={r.size as [number, number, number]} />
            </mesh>
          ))}
          {/* The diagonal — transformation */}
          <mesh rotation={[0, 0, -0.9]} position={[0, 0, 0.16]} material={mat}>
            <boxGeometry args={[0.24, 2.4, 0.22]} />
          </mesh>
        </group>
      </Float>
    </>
  );
}
