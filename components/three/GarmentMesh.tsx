"use client";

/**
 * NAVARN — GarmentMesh
 * Chapter V's interactive 3D oversized tee (the "touched = live" hero).
 * Procedurally built from an extruded oversized-tee silhouette — no external
 * GLB required in Phase 2; a production GLB replaces this behind the same
 * Garment3D API (config/assets MANIFEST["garment-warli"]).
 *
 * Features (EXPERIENCE_BLUEPRINT Ch. V):
 *  - 360° rotation (OrbitControls, damped)
 *  - fabric simulation (subtle wind ripple; per-vertex on high tier, breathing sway otherwise)
 *  - gold details (metallic PBR frame)
 *  - embroidery texture (a ring of instanced gold stitches)
 *  - puff print simulation (a raised, soft accent motif proud of the surface)
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { premiumCotton, puffPrint, embroideryThread, metallicGold } from "./materials";

function useTeeGeometry(curveSegments: number) {
  return useMemo(() => {
    const s = new THREE.Shape();
    // Oversized tee silhouette (symmetric), drawn clockwise from left neck
    s.moveTo(-0.35, 1.0);
    s.lineTo(-0.92, 0.96);
    s.lineTo(-1.5, 0.52);
    s.lineTo(-1.32, 0.16);
    s.lineTo(-0.78, 0.34);
    s.lineTo(-0.82, -1.28);
    s.lineTo(0.82, -1.28);
    s.lineTo(0.78, 0.34);
    s.lineTo(1.32, 0.16);
    s.lineTo(1.5, 0.52);
    s.lineTo(0.92, 0.96);
    s.lineTo(0.35, 1.0);
    // neckline dip
    s.quadraticCurveTo(0, 0.78, -0.35, 1.0);

    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.09,
      bevelSegments: 3,
      curveSegments,
    });
    geo.center();
    geo.computeVertexNormals();
    // Cache the rest positions for the fabric ripple
    geo.userData.rest = (geo.attributes.position as THREE.BufferAttribute).array.slice(0);
    return geo;
  }, [curveSegments]);
}

export default function GarmentMesh({
  accent = "#A8452E",
  highTier = true,
}: {
  accent?: string;
  highTier?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const geo = useTeeGeometry(highTier ? 14 : 8);

  // The material system (components/three/materials)
  const cloth = useMemo(() => premiumCotton("#123A2E", highTier), [highTier]);
  const gold = useMemo(() => metallicGold(), []);
  const puff = useMemo(() => puffPrint(accent), [accent]);
  const thread = useMemo(() => embroideryThread(), []);

  // Embroidery: a ring of small gold "stitches" (instanced) on the chest
  const stitches = useMemo(() => {
    const count = highTier ? 48 : 28;
    const m = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.05, 0.11, 0.03),
      thread,
      count
    );
    const dummy = new THREE.Object3D();
    const r = 0.42;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * r, Math.sin(a) * r + 0.12, 0.3);
      dummy.rotation.z = a;
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    return m;
  }, [thread, highTier]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // gentle breathing sway (the garment "lives" in a faint wind)
      group.current.rotation.z = Math.sin(t * 0.5) * 0.015;
      group.current.position.y = Math.sin(t * 0.7) * 0.03;
    }
    // Fabric ripple — per-vertex only on high tier (perf-gated, TECHNICAL §6)
    if (highTier && bodyRef.current) {
      const pos = bodyRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const rest = bodyRef.current.geometry.userData.rest as ArrayLike<number>;
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        const x = rest[ix];
        const y = rest[ix + 1];
        const wave = Math.sin(x * 2.2 + t * 1.4) * 0.02 + Math.cos(y * 1.8 + t) * 0.015;
        pos.setZ(i, rest[ix + 2] + wave);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={2} color="#fff3da" castShadow={highTier} />
      <directionalLight position={[-5, 0, -3]} intensity={0.5} color="#123A2E" />
      <Environment preset="apartment" />

      <group ref={group} rotation={[0, 0, 0]}>
        {/* Body */}
        <mesh ref={bodyRef} geometry={geo} material={cloth} castShadow receiveShadow />
        {/* Puff print — raised accent motif, proud of the surface */}
        <mesh position={[0, 0.12, 0.36]} material={puff}>
          <circleGeometry args={[0.26, highTier ? 48 : 24]} />
        </mesh>
        <mesh position={[0, 0.12, 0.4]} material={puff}>
          <torusGeometry args={[0.16, 0.05, 12, 32]} />
        </mesh>
        {/* Embroidery ring */}
        <primitive object={stitches} />
        {/* Gold finishing hem line */}
        <mesh position={[0, -1.2, 0.32]} material={gold}>
          <boxGeometry args={[1.5, 0.03, 0.02]} />
        </mesh>
      </group>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={6}
        blur={2.6}
        far={3}
        color="#000000"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate
        autoRotateSpeed={0.7}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  );
}
