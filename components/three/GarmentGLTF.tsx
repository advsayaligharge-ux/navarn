"use client";

/**
 * NAVARN — GarmentGLTF (production GLB pipeline)
 * TECHNICAL_PRODUCTION_BIBLE §5. Loads a Draco/KTX2-compressed oversized-tee
 * GLB, re-materials it with the house material system (premium cotton + gold),
 * and stages it with museum lighting + 360° controls. When no GLB is present
 * in the manifest (Phase-3 default), Garment3D renders the procedural
 * GarmentMesh instead — same API, graceful fallback.
 *
 * NOTE: the binary GLB is a production asset (a photoscanned/CLO3D garment)
 * that cannot be authored here; this is the loader it drops into.
 */

import { useEffect, useMemo } from "react";
import { useGLTF, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { premiumCotton, metallicGold } from "./materials";
import { DECODERS } from "@/config/assets";

export default function GarmentGLTF({ url }: { url: string }) {
  // Draco decoder path from the asset pipeline config
  const { scene } = useGLTF(url, DECODERS.draco);
  const cloth = useMemo(() => premiumCotton("#123A2E", true), []);
  const gold = useMemo(() => metallicGold(), []);

  useEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const name = mesh.name.toLowerCase();
      // Convention: meshes named *gold*/*hem*/*seal* take the metal; rest = cotton
      mesh.material = /gold|hem|seal|thread|embroid/.test(name) ? gold : cloth;
    });
  }, [scene, cloth, gold]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={2} color="#fff3da" castShadow />
      <directionalLight position={[-5, 0, -3]} intensity={0.5} color="#123A2E" />
      <Environment preset="apartment" />
      <primitive object={scene} />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={6} blur={2.6} far={3} />
      <OrbitControls
        enablePan={false}
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
