/**
 * NAVARN — WebGL capability detection
 * TECHNICAL_PRODUCTION_BIBLE §10: on absence or context-loss, the house falls
 * back to the reduced-motion static / Canvas experience — never a broken canvas.
 */

export function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}
