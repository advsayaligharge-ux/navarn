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
- **GSAP + ScrollTrigger** — the cinematic timelines
- **Lenis** — weighted "heavy-silk" smooth scroll (the film's projector)
- **Tailwind CSS + CSS-variable design tokens** — one source of truth from `VISUAL_IDENTITY.md`
- **Canvas 2D** — the dark-chapter atmosphere (real-time R3F 3D arrives in Phase 2, per the Technical Bible's "watched = baked, touched = live" law)

### Structure
```
tokens/        design tokens — colors, typography, motion (single source of truth)
app/           layout, fonts, globals (CSS-var tokens), the Film homepage
components/
  experience/  the engine — SmoothScroll (Lenis), Reveal (GSAP), ParticleField
  ui/          the luxury interaction system — Seal, GoldButton, ChapterRail,
               Menu, SoundToggle, Wordmark, HouseChrome, HouseFooter
  chapters/    the six-chapter film — Threshold + Chapters I–VI
hooks/         useReducedMotion (the dignified static path)
lib/           gsap singleton
```

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
