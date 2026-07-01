# NAVARN

**India's first luxury storytelling menswear house.** *Wear your heritage.*

This repository holds the frozen brand foundation and the cinematic website build.

## The Foundation (frozen — do not edit as strategy)

| Document | Governs |
|---|---|
| `BRAND_DNA.md` | The house — manifesto, philosophy, archetypes, collections |
| `VISUAL_IDENTITY.md` | The look — logo, color, type, motion, photography, packaging |
| `VERBAL_IDENTITY.md` | The voice — taglines, tone, naming, the keeper language |
| `EXPERIENCE_BLUEPRINT.md` | The film — six-chapter cinematic architecture |
| `BRAND_UNIVERSE.md` | The long-term world (dormant; India-first for now) |
| `LAUNCH_STRATEGY.md` | Phase 1 — "India first. World later." (3-year plan) |
| `TECHNICAL_PRODUCTION_BIBLE.md` | The engineering blueprint for the build |

## The Build

**Phase 0 (foundation) + Phase 1 (cinematic homepage)** — commerce is intentionally frozen; no Shopify catalog is provisioned until the experience is approved.

### Stack
- **Next.js 14** (App Router, TypeScript) — SSR shell for speed + SEO
- **Three.js + React Three Fiber + drei + postprocessing** — the WebGL layer (interactive gold Seal, dust atmosphere), lazy-loaded and quality-adaptive
- **GSAP + ScrollTrigger** — the cinematic scroll timelines
- **Lenis** — weighted "heavy-silk" smooth scroll (the film's projector)
- **Framer Motion** — component-level interaction (the editorial Index menu, reveals)
- **Tailwind CSS + CSS-variable design tokens** — one source of truth from `VISUAL_IDENTITY.md`

### Architecture (Phase 0)
- **Design token system** — `tokens/` (colors, typography, motion) → CSS variables + Tailwind theme
- **Performance budget system** — `config/performance.ts` (quality tiers, hard budgets, FPS-downgrade thresholds)
- **Asset pipeline** — `config/assets.ts` (GLB/KTX2 manifest, Draco/KTX2 decoder paths, preload-one-chapter-ahead)
- **Three.js / R3F architecture** — `lib/three/` (WebGL detection, runtime QualityManager) + `components/three/` (adaptive `<Scene>`, `SealMesh`, `Seal3D`, `DustField3D`)
- **Accessibility architecture** — `hooks/useReducedMotion` + a dignified static path; WebGL auto-fallback to Canvas/SVG; SSR-crawlable copy; gold focus rings

### Structure
```
tokens/        design tokens — colors, typography, motion (single source of truth)
config/        performance budget system + asset pipeline manifest
app/           layout, fonts, globals (CSS-var tokens), the Film homepage
components/
  experience/  the engine — SmoothScroll (Lenis), Reveal (GSAP), ParticleField
  three/       the WebGL layer — Scene (adaptive Canvas), SealMesh, Seal3D,
               DustField3D  (all lazy, ssr:false, quality-guarded)
  ui/          the luxury interaction system — Seal, GoldButton, ChapterRail,
               Menu (Framer Motion), SoundToggle, Wordmark, HouseChrome, HouseFooter
  chapters/    the six-chapter film — Threshold + Chapters I–VI
hooks/         useReducedMotion (the dignified static path)
lib/           gsap singleton; three/ (webgl detection, quality manager)
```

### The "watched = baked, touched = live" law (TECHNICAL §1)
Real-time WebGL is spent only where the visitor *touches*: the interactive gold
**Seal** (Ch. VI), the **dust atmosphere** (Ch. I), and the **360° garment**
(Ch. V). Everything else uses GSAP/CSS/SVG/Canvas. The R3F Canvas lazy-loads
client-side, detects WebGL, adapts DPR/quality to the device, and falls back to
Canvas/SVG — so the film never stutters and never shows a broken canvas.

### Phase 2 — deepened chapters
- **Ch. II — The Arts Emerge:** an interactive experience for seven heritage
  arts (Warli, Madhubani, Sanjhi, Pichwai, Maharaja, Warrior, Untamed Horse) —
  each carried through *original heritage art → artistic reconstruction →
  luxury reinterpretation* with self-painting SVG motifs (`components/art/`).
- **Ch. III — The Transformation:** scroll-driven three-phase *heritage art →
  digital design → luxury fashion artwork*, one motif across three treatments.
- **Ch. IV — The Making:** the DTF → heat press → puff → embroidery → finishing
  line, each station with its own process cue (print sweep, press + steam, puff
  rise, stitch draw-on, gold finish).
- **Ch. V — The Revelation:** an interactive **3D oversized tee** — 360°
  rotation, fabric ripple, gold details, instanced embroidery stitches, and a
  raised puff-print motif (`components/three/GarmentMesh`). Procedural in
  Phase 2; a production GLB drops in behind the same `Garment3D` API.

> The art motifs are house interpretations for the experience layer; the
> production artwork — sourced *with* and credited *to* the origin artisans
> (VERBAL_IDENTITY §11) — replaces them in place.

### The Film (homepage)
The six-chapter descent from `EXPERIENCE_BLUEPRINT.md` — darkness → gold, loss → legacy:
1. **The Forgotten Stories** — dark opening, drifting gold motes, descent through time
2. **The Arts Emerge** — the Bharat art forms surfacing, each in its own accent
3. **The Transformation** — scroll-driven ancient↔modern seam
4. **The Making** — the DTF → heat press → puff → embroidery → finishing journey (hero)
5. **The Revelation** — the finished artifact in warm daylight
6. **Becoming a Keeper** — the Seal, the vow, the threshold

Accessibility: `prefers-reduced-motion` serves a dignified static path; all copy is SSR-rendered and crawlable.

## Develop
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Notes
- Fonts are Phase-1 open substitutes (Playfair / Cormorant / Inter) for the licensed Canela / Söhne-class families; swap in `app/fonts.ts` — the CSS variable names stay identical.
- **Commerce is frozen.** No products, collections, pages or catalog exist in Shopify yet, by instruction. The keeper CTA is a ceremonial placeholder until the experience is approved.
