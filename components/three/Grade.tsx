"use client";

/**
 * NAVARN — Visual Grade (postprocessing)
 * TECHNICAL_PRODUCTION_BIBLE §4 & §7. The cinematic film grade:
 *  - Bloom        → gold glints (museum lighting)
 *  - Vignette     → the gallery falloff
 *  - BrightnessContrast → luxury contrast (rich blacks)
 *  - HueSaturation → the emerald-gold push
 *  - Noise        → subtle film grain
 * Only mounted on the high quality tier (perf-gated by the caller); on
 * medium/low the scene renders ungraded to protect the frame rate.
 */

import {
  EffectComposer,
  Bloom,
  Vignette,
  BrightnessContrast,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Grade() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.28}
        mipmapBlur
      />
      <HueSaturation hue={0.0} saturation={0.08} />
      <BrightnessContrast brightness={-0.02} contrast={0.14} />
      <Vignette eskil={false} offset={0.28} darkness={0.72} />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.06} />
    </EffectComposer>
  );
}
