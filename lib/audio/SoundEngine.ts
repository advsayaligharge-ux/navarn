/**
 * NAVARN — Cinematic Sound Engine (Web Audio)
 * TECHNICAL_PRODUCTION_BIBLE §11. Muted by default; enabled only on a user
 * gesture (the gold Sound toggle). Rather than ship silence until recorded
 * stems exist, this synthesises the six ambiences procedurally so the house
 * has a voice today:
 *   heritage · temple · workshop (+ DTF & embroidery pulses) · reveal · silence
 * Recorded stems (config/assets) can later be layered over or replace these.
 *
 * All nodes route master → destination. Scene changes crossfade over ~1.4s
 * (weighted silk). Everything is defensive: no AudioContext, no sound, no error.
 */

export type SoundScene =
  | "heritage"
  | "temple"
  | "workshop"
  | "reveal"
  | "silence";

class SoundEngineImpl {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private layer: { nodes: AudioNode[]; gain: GainNode } | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private scene: SoundScene = "silence";
  enabled = false;

  private ensure(): boolean {
    if (typeof window === "undefined") return false;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return false;
    if (!this.ctx) {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0; // muted; enable() ramps up
      this.master.connect(this.ctx.destination);
      this.noiseBuffer = this.makeNoise(this.ctx);
    }
    return true;
  }

  private makeNoise(ctx: AudioContext): AudioBuffer {
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  enable() {
    if (!this.ensure() || !this.ctx || !this.master) return;
    this.ctx.resume();
    this.enabled = true;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 1.2);
    if (this.scene === "silence") this.setScene("heritage");
  }

  disable() {
    if (!this.ctx || !this.master) return;
    this.enabled = false;
    this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
  }

  toggle(): boolean {
    if (this.enabled) this.disable();
    else this.enable();
    return this.enabled;
  }

  setScene(scene: SoundScene) {
    this.scene = scene;
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Fade out the old layer
    if (this.layer) {
      const old = this.layer;
      old.gain.gain.cancelScheduledValues(now);
      old.gain.gain.linearRampToValueAtTime(0, now + 1.4);
      window.setTimeout(() => old.nodes.forEach((n) => (n as any).stop?.()), 1600);
    }

    if (scene === "silence") {
      this.layer = null;
      return;
    }

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(this.master);
    const nodes: AudioNode[] = [];

    // Base drone — the through-line of the whole film
    const droneFreqs = scene === "reveal" ? [110, 146.8, 220] : [55, 82.4];
    droneFreqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = scene === "reveal" ? 900 : 420;
      const g = ctx.createGain();
      g.gain.value = 0.16 / (i + 1);
      osc.connect(lp).connect(g).connect(gain);
      osc.start();
      nodes.push(osc);
    });

    // Scene colour
    if (scene === "temple") this.addBell(ctx, gain, nodes);
    if (scene === "workshop") {
      this.addNoiseBed(ctx, gain, nodes, 260, 0.05);
      this.addPulse(ctx, gain, nodes, 0.55, "dtf"); // DTF machine ticks
      this.addPulse(ctx, gain, nodes, 0.23, "stitch"); // embroidery needle
    }
    if (scene === "reveal") this.addNoiseBed(ctx, gain, nodes, 1200, 0.015);

    gain.gain.linearRampToValueAtTime(scene === "workshop" ? 0.9 : 0.7, now + 1.4);
    this.layer = { nodes, gain };
  }

  private addBell(ctx: AudioContext, out: GainNode, nodes: AudioNode[]) {
    const tick = () => {
      if (this.scene !== "temple" || !this.enabled) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 523.25 * (Math.random() > 0.5 ? 1 : 1.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
      osc.connect(g).connect(out);
      osc.start(t);
      osc.stop(t + 3.4);
      window.setTimeout(tick, 4000 + Math.random() * 4000);
    };
    window.setTimeout(tick, 1500);
  }

  private addNoiseBed(
    ctx: AudioContext,
    out: GainNode,
    nodes: AudioNode[],
    cutoff: number,
    level: number
  ) {
    if (!this.noiseBuffer) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = cutoff;
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.value = level;
    src.connect(bp).connect(g).connect(out);
    src.start();
    nodes.push(src);
  }

  private addPulse(
    ctx: AudioContext,
    out: GainNode,
    nodes: AudioNode[],
    interval: number,
    kind: "dtf" | "stitch"
  ) {
    const tick = () => {
      if (this.scene !== "workshop" || !this.enabled || !this.noiseBuffer) return;
      const t = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = kind === "dtf" ? 1800 : 3200;
      bp.Q.value = 6;
      const g = ctx.createGain();
      const peak = kind === "dtf" ? 0.05 : 0.03;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
      src.connect(bp).connect(g).connect(out);
      src.start(t);
      src.stop(t + 0.1);
      window.setTimeout(tick, interval * 1000 * (0.85 + Math.random() * 0.3));
    };
    window.setTimeout(tick, 400);
  }
}

// Singleton
export const SoundEngine =
  typeof window !== "undefined"
    ? ((window as any).__navarnSound ||= new SoundEngineImpl())
    : (new SoundEngineImpl() as SoundEngineImpl);

/** Which ambience each chapter calls for (EXPERIENCE_BLUEPRINT). */
export const CHAPTER_SCENE: Record<string, SoundScene> = {
  "chapter-i": "heritage",
  "chapter-ii": "temple",
  "chapter-iii": "heritage",
  "chapter-iv": "workshop",
  "chapter-v": "reveal",
  "chapter-vi": "reveal",
};
