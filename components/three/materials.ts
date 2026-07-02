/**
 * NAVARN — Material System
 * TECHNICAL_PRODUCTION_BIBLE §5. Production PBR materials for the WebGL layer.
 * Factory functions (not singletons) so each surface can carry its own color.
 * Premium cotton uses MeshPhysicalMaterial sheen for a true fabric bloom;
 * puff/embroidery/gold/packaging tune metalness, roughness, clearcoat and a
 * procedural micro-normal injected via onBeforeCompile.
 */

import * as THREE from "three";

/** Inject a cheap procedural weave normal (no texture download) into a std material. */
function injectWeave(mat: THREE.MeshStandardMaterial, scale = 260, strength = 0.35) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uWeaveScale = { value: scale };
    shader.uniforms.uWeaveStrength = { value: strength };
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>\n varying vec2 vUvW;`
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <uv_vertex>",
      `#include <uv_vertex>\n vUvW = uv;`
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>\n varying vec2 vUvW; uniform float uWeaveScale; uniform float uWeaveStrength;`
    );
    // Perturb the normal with a woven grid pattern
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <normal_fragment_maps>",
      `#include <normal_fragment_maps>
       float wv = sin(vUvW.x * uWeaveScale) * cos(vUvW.y * uWeaveScale);
       normal = normalize(normal + vec3(wv, wv, 0.0) * uWeaveStrength * 0.04);`
    );
  };
  mat.customProgramCacheKey = () => `weave-${scale}-${strength}`;
  return mat;
}

/** Premium cotton — matte body with a soft fabric sheen (the emerald tee). */
export function premiumCotton(color = "#123A2E", weave = true) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.86,
    metalness: 0.0,
    sheen: 1.0,
    sheenRoughness: 0.7,
    sheenColor: new THREE.Color("#2c6b56"),
  });
  return weave ? injectWeave(mat as unknown as THREE.MeshStandardMaterial, 300, 0.3) : mat;
}

/** Puff print — thick, soft, slightly waxy raised ink. */
export function puffPrint(color = "#A8452E") {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.5,
    metalness: 0.04,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.05,
  });
}

/** Embroidery thread — anisotropic gold satin. */
export function embroideryThread() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#C9A85C"),
    roughness: 0.32,
    metalness: 0.9,
    sheen: 0.6,
    sheenColor: new THREE.Color("#E4CE9A"),
    emissive: new THREE.Color("#2a1e08"),
    emissiveIntensity: 0.25,
  });
}

/** Metallic gold — the crown metal (hardware, hem, seal). */
export function metallicGold() {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C9A85C"),
    metalness: 1,
    roughness: 0.28,
    emissive: new THREE.Color("#3a2a0e"),
    emissiveIntensity: 0.3,
  });
}

/** Luxury packaging — cloth-bound board with a faint clearcoat sheen. */
export function luxuryPackaging(color = "#123A2E") {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.9,
    metalness: 0,
    clearcoat: 0.25,
    clearcoatRoughness: 0.6,
    sheen: 0.4,
    sheenColor: new THREE.Color("#0c271f"),
  });
}
