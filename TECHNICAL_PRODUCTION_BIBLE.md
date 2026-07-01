# NAVARN — TECHNICAL & PRODUCTION BIBLE

### The Engineering Blueprint for the Cinematic 3D Website Experience

> This is **not** a strategy document. The six frozen foundation documents — `BRAND_DNA.md`, `VISUAL_IDENTITY.md`, `VERBAL_IDENTITY.md`, `EXPERIENCE_BLUEPRINT.md`, `BRAND_UNIVERSE.md`, `LAUNCH_STRATEGY.md` — are final and govern *what* and *why*. This document governs **how we build it**: stack, architecture, 3D pipeline, performance, assets, content model, and delivery phases. It is the bridge from the bibles to the codebase.

**The engineering mandate:** deliver an Awwwards-grade cinematic 3D experience that feels like *heavy silk* — reverent, weighted, museum-grade — while loading fast, running at 60fps, degrading gracefully on mobile and low-power devices, and never letting the reverence become friction. **Cinematic must never mean slow.**

---

## 1. GUIDING ENGINEERING PRINCIPLES

1. **Performance is a luxury feature.** A stutter breaks the spell more than a missing effect. Budget-first, effects-second. Target 60fps desktop, smooth 30fps+ mobile.
2. **Hybrid rendering, not 3D-everywhere.** Use real-time 3D only where interactivity demands it (the Seal, the garment 360, the transformation slider, the craft build). Use pre-rendered cinematic video/image sequences for heavy, non-interactive spectacle (Ch. I descent, Ch. IV macro craft). This is how Awwwards cinematic sites stay fast.
3. **Progressive, chapter-lazy loading.** The film loads one chapter ahead of the scroll, never all at once. First paint is near-instant; the descent buys load time.
4. **Graceful degradation is designed, not patched.** The reduced-motion / low-power / no-WebGL path is a first-class deliverable (per `EXPERIENCE_BLUEPRINT.md` scroll laws), not an afterthought.
5. **Content is structured and decoupled.** Realms → Collections → Artifacts live in a headless CMS; commerce lives in headless Shopify. The frontend is a presentation layer over clean data — so the universe can grow without redeploys.
6. **The design system is tokenized.** Every color, type ramp, easing curve and spacing unit from `VISUAL_IDENTITY.md` becomes a code token — one source of truth.
7. **Accessibility is non-negotiable.** WCAG 2.2 AA, keyboard paths, reduced-motion, semantic structure — a house of reverence respects every visitor.

---

## 2. RECOMMENDED TECHNOLOGY STACK

| Layer | Recommendation | Why |
|---|---|---|
| **Framework** | **Next.js (App Router, React 18+, TypeScript)** | SSR/SSG for SEO + speed, streaming, image optimization, mature ecosystem, best-in-class for headless commerce |
| **3D / WebGL** | **React Three Fiber (Three.js)** + **@react-three/drei** + **@react-three/postprocessing** | Declarative 3D in React; drei for helpers/loaders; postprocessing for cinematic grade (bloom, DOF, grain) |
| **Scroll engine** | **Lenis** (smooth scroll) + **GSAP** with **ScrollTrigger** | The industry standard for weighted, scroll-linked cinematic timelines; buttery, controllable easing |
| **UI animation** | **GSAP** (primary) + **Framer Motion** (component-level) | GSAP for the film timelines; Framer Motion for UI micro-interactions |
| **Asset compression** | **Draco** / **Meshopt** (geometry), **KTX2 / Basis** (textures) | Radically smaller GLB payloads; GPU-friendly textures |
| **Audio** | **Howler.js** | Reliable cross-browser audio; the drone, craft ASMR, resolve — muted by default, gold toggle |
| **CMS (content)** | **Sanity** (headless, structured) | Perfect for the Realm→Collection→Artifact model; rich editorial; portable text for the storytelling arc; real-time preview |
| **Commerce** | **Headless Shopify (Storefront API + Hydrogen React)** | Shopify runs cart/checkout/inventory/payments; frontend stays fully custom & cinematic. (Shopify MCP is available in this environment for store/product setup.) |
| **State / data** | **Zustand** (client 3D/scroll state) + **TanStack Query** (server/commerce data) | Lightweight global state for the experience layer; robust data fetching/caching for commerce |
| **Styling** | **Tailwind CSS** + **CSS variables (design tokens)** | Token-driven, fast, consistent; CSS vars carry the `VISUAL_IDENTITY` palette |
| **Fonts** | Self-hosted **next/font** (licensed: display serif, editorial serif, sans) | Performance + no FOUT; license the Canela/Söhne-class families per `VISUAL_IDENTITY.md` |
| **Hosting / CDN** | **Vercel** (frontend) + Shopify CDN (commerce) + **Cloudinary/Mux** (media/video) | Edge delivery, image/video optimization, adaptive streaming for cinematic footage |
| **Analytics** | **Vercel Analytics / Plausible** (privacy-first) + Shopify analytics + Sentry (errors) | Measure without cheapening; catch runtime/WebGL failures |

*This stack is the recommendation, ready for your sign-off before any code is written. If the team has strong Vue/Nuxt expertise, the parallel stack is Nuxt + TresJS + GSAP + Lenis — the architecture below is framework-agnostic.*

---

## 3. SYSTEM ARCHITECTURE

Three planes, matching the `EXPERIENCE_BLUEPRINT.md` three-layer model (Film → House → Archive):

```
┌───────────────────────────────────────────────────────────────┐
│  PRESENTATION (Next.js on Vercel Edge)                          │
│  • The Film   (cinematic homepage — R3F + GSAP + Lenis)         │
│  • The House  (collections/artifacts — hybrid 3D + editorial)   │
│  • The Archive(keeper account, certificates, states map)        │
└───────────────┬───────────────────────────┬───────────────────┘
                │                           │
        (content: read)              (commerce: read/write)
                │                           │
┌───────────────▼───────────┐   ┌───────────▼───────────────────┐
│  SANITY (Headless CMS)     │   │  SHOPIFY (Headless Storefront) │
│  Realms · Collections ·    │   │  Products · Variants · Cart ·  │
│  Artifacts (story/craft) · │   │  Checkout · Inventory ·        │
│  Artisans · Art-form archive│  │  Customers · Orders            │
└────────────────────────────┘   └────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────────┐
│  MEDIA PIPELINE (Cloudinary / Mux + Vercel Image)              │
│  GLB models · KTX2 textures · cinematic video · image sequences│
│  · audio stems — all compressed, adaptive, CDN-delivered       │
└───────────────────────────────────────────────────────────────┘
```

**Data flow:** Artifact pages are composed by *joining* Sanity (story, craft, art-form lineage, the five-movement narrative) with Shopify (price, variants, inventory, add-to-cart) on a shared product handle/SKU. Sanity owns the *soul*; Shopify owns the *transaction*. The frontend marries them.

**Rendering strategy:** SSG/ISR for content pages (collections, artifacts, archive) for speed + SEO; the Film homepage is a client-heavy experience shell with an SSR'd SEO/first-paint layer beneath the WebGL canvas so it is crawlable and instant even before WebGL boots.

---

## 4. THE CINEMATIC ENGINE (the film system)

The heart of the build. The homepage is one scroll-driven timeline of six chapters.

**Core mechanism:**
- **Lenis** virtualizes scroll into a smooth, weighted value.
- A master **GSAP timeline** is scrubbed by that scroll value; each chapter is a labeled segment with pinned sections (ScrollTrigger `pin`).
- A single persistent **R3F `<Canvas>`** underlies the film; chapters mount/unmount their 3D scenes as they enter/leave the viewport (never all resident at once).
- **DOM/editorial overlays** (type, captions, story lines) are GSAP-animated in sync above the canvas.
- The **house easing tokens** (§7) enforce the "weighted silk" motion law globally.

**Per-chapter rendering plan (hybrid):**

| Chapter | Primary technique | Real-time 3D? | Notes |
|---|---|---|---|
| I — Forgotten Stories | Pre-rendered particle/descent video + WebGL particle overlay | Light | Cursor light + parallax particles in WebGL; heavy descent baked |
| II — Arts Emerge | Layered 2.5D planes (WebGL) + SVG draw-on | Yes (light) | 12 art "walls" as depth planes; draw-on via SVG/stroke-dashoffset |
| III — Transformation | Scroll-driven morph; shader crossfade | Yes | The ancient↔modern seam = shader; garment on rotatable plane |
| IV — The Making (hero) | Macro craft = pre-rendered video sequences + 3D build model | Yes | Interactive 3D garment "build"; ASMR video for macro realism |
| V — Revelation | Real-time 3D garment 360 viewer + editorial | Yes | The hero interactive: rotate/zoom finished garment |
| VI — Becoming a Keeper | Real-time 3D Seal (interactive) | Yes | Turn/press the gold Seal → wax-stamp induction |

**Golden rule:** if a moment is *watched*, bake it (video/sequence — flawless, cheap to run). If a moment is *touched*, render it live (3D — interactive, worth the GPU cost). This keeps the frame rate sacred.

**Postprocessing (cinematic grade):** subtle bloom (gold glints), depth-of-field (reverence/focus), film grain, vignette, slight chromatic aberration — all tuned low, all disabled under the performance/reduced-motion guard.

---

## 5. 3D ASSET PIPELINE & SPECS

**Format & compression (mandatory):**
- Models: **glTF 2.0 / GLB**, **Draco** or **Meshopt** geometry compression.
- Textures: **KTX2 (Basis Universal)**, power-of-two, mipmapped; PBR maps packed (ORM) where possible.
- Target GLB budgets: hero garment ≤ **3–4 MB** compressed; the Seal ≤ **1 MB**; build-model layers streamed.

**Polygon / performance budgets:**
- Hero garment: ~**80–150k tris** with LODs (LOD0 close, LOD1/2 for distance/mobile).
- The Seal: ~**20–40k tris**.
- Draw-call discipline: instancing for repeated elements (particles, dot-fields); merge static geometry.
- Mobile: swap to LOD, halve texture resolution, cap DPR at ~2, disable heavy postprocessing.

**Materials:**
- **PBR** throughout; the gold uses a metallic-rough material with an HDRI environment map for the champagne→antique gradient and realistic glints. Emerald = deep dielectric with subtle sheen. Fabric = cloth shader with normal/roughness for weave, and a **puff** height/normal treatment to read the raised print witnessed in Ch. IV.
- One shared, small **HDRI environment** (studio/gallery light) for consistent reflections across the Seal and garments.

**Production tools:** Blender (modeling/bake) → glTF export → gltf-transform (Draco/Meshopt/KTX2 optimization) → validated against budgets before commit. CLO3D/Marvelous Designer optional for realistic garment drape/cloth.

**Loading:** `Suspense` + drei `useGLTF` with preloading one chapter ahead; **DRACO/KTX2 loaders** configured; skeleton/poster states while assets stream; never block first paint on 3D.

---

## 6. PERFORMANCE BUDGET (the non-negotiable contract)

| Metric | Target |
|---|---|
| **LCP** (largest contentful paint) | < 2.5s on 4G mobile |
| **First interaction / TTI** | < 3.5s |
| **CLS** | < 0.05 (cinematic pinning must not shift layout) |
| **Frame rate** | 60fps desktop; ≥ 30fps mid-tier mobile |
| **Initial JS (before WebGL)** | < 200KB gzipped for the SSR shell |
| **Homepage total (progressive)** | First chapter < 3–4MB; rest lazy-loaded on scroll |
| **Per-chapter 3D payload** | Streamed, one ahead; never front-loaded |

**Enforcement tactics:**
- Route-level & chapter-level **code splitting**; the WebGL bundle loads after first paint.
- **Adaptive quality:** detect GPU/`hardwareConcurrency`/`deviceMemory` and battery/`prefers-reduced-motion`; scale DPR, postprocessing, particle counts, and LOD accordingly at runtime.
- **Poster-first video:** cinematic sequences start as a poster/low-res, upgrade to adaptive stream (Mux/HLS).
- **Font & image discipline:** self-hosted subset fonts, AVIF/WebP, `next/image`, lazy below-the-fold.
- **Continuous budgeting:** Lighthouse CI + a bundle-size gate in the pipeline; a frame-rate telemetry sample in production (Sentry/Web Vitals).

**The rule:** any feature that cannot hold the budget is downgraded or baked. The budget wins over the effect, always.

---

## 7. DESIGN TOKENS (from `VISUAL_IDENTITY.md` → code)

The single source of truth for the build's look, exported as CSS variables / a Tailwind theme / a JS token module.

**Color (core + sovereigns):**
```
--royal-cream:   #F5EEE0;   --ivory:         #FBF8F2;
--champagne-gold:#D9BE86;   --antique-gold:  #A9823C;
--deep-charcoal: #1E1E1C;   --emerald:       #123A2E;
--midnight-navy: #171A34;   --emerald-deep:  #0C271F;
--bone:          #E7DBC6;   --parchment:     #EBE2CE;
--stone-grey:    #8A8578;   --antique-brass: #8C6A2E;
/* gold gradient */ --gold-1:#E4CE9A; --gold-2:#C9A85C; --gold-3:#9C7530;
```
Plus the **11 collection accent tokens** (Warli terracotta `#A8452E` … 28 States emerald), namespaced `--accent-[collection]`, applied per collection "room."

**Typography ramp:** `--font-display` (serif), `--font-editorial` (italic serif), `--font-body` (sans); modular scale, oldstyle vs tabular numeral features toggled per context (§3.4 of `VISUAL_IDENTITY.md`).

**Motion tokens (the "weighted silk" law):**
```
--ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);   /* deep ease-out */
--ease-settle: cubic-bezier(0.22, 1, 0.36, 1);
--dur-reveal: 900ms;  --dur-micro: 400ms;  --dur-cinematic: 1200ms;
```
No spring/bounce curves permitted. Hover = slow gold light shift, never a hard flip.

**Spacing/layout:** generous whitespace scale; museum-caption tracking token for all-caps labels.

---

## 8. CONTENT MODEL (Sanity schemas)

Mirrors the frozen hierarchy `House → Realms → Collections → Artifacts`, plus the preservation-critical archive.

- **Realm** — name, poetic subtitle, order, accent palette ref, house grouping (Folk-Art / Legacy / Keystone), status (`live` / `roadmap`). *Phase 1: only Bharat is `live`.*
- **Collection** — name, poetic title (*The First Language*), realm ref, accent color, hero media, the **five-movement story** (Loss / Origin / Hands / Transformation / Keeping as portable-text blocks), art-form ref, launch year (Yr1/2/3 per `LAUNCH_STRATEGY.md`), material & technique notes, packaging concept.
- **Artifact** (garment) — name (*The Tarpa Dancer*), garment type (subtitle), collection ref, the three-line identity (name/lineage/one-line myth), craft-proof media (DTF/heat/puff/embroidery/finishing), 3D model ref (GLB), gallery, **Shopify product handle** (the join key), certificate template ref.
- **Artisan / Community** — name, region, art form, portrait, story (the preservation contract, `VERBAL_IDENTITY.md` §11). *Credited by name — a schema requirement, not optional.*
- **Art Form** (heritage archive) — name, region, history, motifs, the tradition's story.
- **Certificate** — collection ref, edition/number logic, wax-seal asset, for 28 States: state number + name.

**Join key:** `Artifact.shopifyHandle` ↔ Shopify product. Commerce data (price/inventory/variants) is *never* duplicated in Sanity — always live from Shopify.

---

## 9. COMMERCE INTEGRATION (headless Shopify)

- **Shopify owns:** products, variants, inventory, cart, checkout, payments, orders, customers, discounts. Store/products can be provisioned via the **Shopify MCP** in this environment.
- **Frontend owns:** the cinematic PDP ("The Artifact"), the curatorial browse ("The House"), and the verbal-system relabeling (cart → *Your keepings*, checkout → *Begin the ceremony*, per `VERBAL_IDENTITY.md` §10).
- **Cart/checkout:** Storefront API cart; a custom, on-brand cart drawer ("Your collection"); checkout hands to Shopify (branded checkout) — the one place we accept Shopify's flow for PCI/trust, styled to the house.
- **Product structure:** collections as Shopify collections; the story/craft/3D live in Sanity and render around the buy-module. Metafields hold the join + any commerce-side story fallback.
- **The Keeper's Archive:** Shopify customer account (orders, addresses) extended with Sanity-driven certificates and the **28 States "states collected" map** (Year-3 mechanic) computed from order history.

---

## 10. ACCESSIBILITY, SEO & RESPONSIVE

**Accessibility (WCAG 2.2 AA):**
- **`prefers-reduced-motion`** → the dignified static/fade path (a first-class build, per `EXPERIENCE_BLUEPRINT.md`): the six chapters become a beautiful scroll of stills, editorial type and posters — the *story survives without the spectacle*.
- Full **keyboard navigation**; visible focus (gold ring); skip-to-content and the always-present "Enter the House" skip.
- Semantic HTML beneath the canvas; ARIA for custom controls (seal, 360 viewer, sound toggle); captions/transcripts for narrated/audio content; color-contrast verified against the token palette.
- 3D/canvas has meaningful text alternatives; nothing critical is *only* in WebGL.

**SEO:**
- SSR/SSG content layer under the experience; semantic headings carrying the verbal-system copy; structured data (`Product`, `BreadcrumbList`, `Organization`); Open Graph/Twitter cinematic cards; XML sitemap from Sanity+Shopify; canonical handling for product/collection.
- The Film homepage ships a crawlable SSR narrative + hero even before WebGL mounts.

**Responsive / device strategy:**
- **Mobile-first cinematic**, not desktop-only spectacle: reflowed chapters, touch-driven scroll (Lenis touch), tap interactions for the 3D moments, reduced particle/postprocessing, capped DPR.
- Breakpoints tokenized; the chapter rail becomes a slim mobile progress indicator; the full-screen "table of contents" menu adapts to a full-height sheet.
- Test matrix: latest 2 versions of Chrome/Safari/Firefox/Edge, iOS Safari, Android Chrome; low-end device (throttled) in the matrix by mandate.

**No-WebGL / failure path:** feature-detect WebGL; on absence or context-loss, fall back to the reduced-motion static experience automatically. The house never shows a broken canvas.

---

## 11. ASSET PRODUCTION MANIFEST (what must be created)

The experience is only as good as its assets. This is the production shopping list, owned outside code:

**Logo / brand (from `VISUAL_IDENTITY.md` §1.3 version ladder):** primary gradient mark, flat two-color, single-color gold/emerald/navy/charcoal, reversed/ivory, embroidery variant, and the **Seal 3D model** (GLB, gold PBR).

**Cinematic footage & sequences:**
- Ch. I descent (particle/time-descent) — pre-rendered.
- Ch. IV **craft macro** — real filmed footage of DTF printing, heat press (steam), puff rising/curing, embroidery needle, finishing — the ASMR hero content. *This footage is the proof-of-transformation and the single most important asset shoot.*
- Ch. V editorial campaign film + stills (the sovereign man, chiaroscuro).

**Art-form assets (per launch collection, Yr1 first):** high-res source artwork (Warli, Madhubani, Kalamkari, Gond, Pattachitra, Sanjhi, Pichwai, Maharaja, Warrior, Horse, Mythology), motif SVGs for draw-on animation, accent palettes.

**3D models:** hero garments per collection (GLB, LODs, KTX2), the transformation "build" garment with layer states (base → print → puff → embroidery → finish), the Seal, a shared gallery HDRI.

**Audio stems (Howler):** the low drone (Ch. I → resolve Ch. VI), sarangi/bansuri theme, per-art draw sounds (Ch. II), the craft ASMR bed (Ch. IV), the resolve chord (Ch. VI). Muted by default; one gold toggle.

**Photography:** product packshots (utility/PDP layer), packaging shots, artisan portraits (named — preservation contract), campaign editorial.

**Copy:** all narrative already specified in `VERBAL_IDENTITY.md` — flows into Sanity, not invented in code.

*Production note (`LAUNCH_STRATEGY.md`): produce assets to the 3-year sequence — Year 1 collections (Warli, Madhubani, Maharaja) fully assetized first; do not front-load deferred collections.*

---

## 12. ENGINEERING STANDARDS & REPO

**Repository structure (proposed, Next.js App Router):**
```
/app                → routes (film, collections, artifact, archive, house)
/components         → UI + editorial components (Framer Motion)
/experience         → the cinematic engine
   /canvas          → R3F scenes, per-chapter 3D
   /chapters        → Ch. I–VI timeline modules (GSAP)
   /shaders         → morph/dissolve/grade GLSL
   /scroll          → Lenis + ScrollTrigger orchestration
/lib                → sanity client, shopify storefront client, joins
/tokens             → design tokens (color/type/motion) — single source
/hooks, /store      → Zustand experience state, TanStack Query
/public/assets      → optimized GLB/KTX2/video/audio (or CDN refs)
/content            → sanity schemas (Realm/Collection/Artifact/Artisan…)
```

**Standards:** TypeScript strict; ESLint + Prettier; Conventional Commits; component/story tests (Vitest/Playwright) for the House/Archive (commerce paths), visual/interaction smoke tests for the Film; feature flags for chapters (ship incrementally); Lighthouse CI + bundle-size gate in CI; Sentry in prod.

**Environment/secrets:** Sanity project/token, Shopify Storefront token, Cloudinary/Mux keys — via env vars, never committed. (Honors the repo's proxy/TLS setup.)

---

## 13. BUILD PHASES (delivery sequence)

Aligned to `LAUNCH_STRATEGY.md` — **build the vessel for Year-1 India, prove it, then extend.** The site is delivered in shippable milestones, not one big-bang.

- **Phase 0 — Foundations (design system + rails).** Tokens from `VISUAL_IDENTITY.md`, Next.js shell, Sanity schemas, Shopify headless connection, the Lenis+GSAP scroll engine, the R3F canvas shell, the reduced-motion path skeleton, CI + performance budget gates. *No spectacle yet — the chassis.*
- **Phase 1 — The House + Commerce (revenue-ready first).** Collections browse, the Artifact (PDP) with story+craft+buy, cart/checkout, the Archive/account, verbal-system relabeling. *The site can sell Year-1 collections even before the full film ships.*
- **Phase 2 — The Film, chapter by chapter.** Build Ch. VI (Seal) and Ch. V (garment 360) first (highest-value interactive, reusable in the House), then III, then II, then the baked I & IV. Each chapter feature-flagged and perf-gated as it lands.
- **Phase 3 — Grade, sound & polish.** Postprocessing pass, audio integration, micro-interactions, transition choreography, the "weighted silk" easing audit across the whole film.
- **Phase 4 — Hardening.** Full device/perf matrix, accessibility audit (WCAG 2.2 AA), SEO/structured-data, load/soak testing, analytics/telemetry, launch readiness.
- **Phase 5 — Year-2/3 extension hooks.** The 28 States "states collected" map mechanic, additional collections via CMS (no redeploys), and the dormant-but-ready structure for the eventual world universe (schema `status: roadmap`).

**Sequencing logic:** commerce and content ship *before* the full cinematic film, so the house is *sellable* early; the film is layered on chapter-by-chapter behind flags. Cinematic ambition never blocks revenue, and every milestone is a working site.

---

## APPENDIX — TECHNICAL LAWS (quick reference)

1. **The budget wins over the effect** — 60fps and fast load are luxury features; downgrade or bake anything that threatens them.
2. **Watched = baked, touched = live** — video/sequences for spectacle, real-time 3D only for interaction.
3. **Load one chapter ahead** — progressive, lazy, first-paint-instant; the descent buys the load.
4. **Reduced-motion is a first-class build** — the story must survive without the spectacle; auto-fallback on no-WebGL.
5. **Sanity owns the soul, Shopify owns the transaction** — joined on a product handle; never duplicate commerce data.
6. **Tokens are the single source of truth** — every color/type/easing traces to `VISUAL_IDENTITY.md`.
7. **Ship sellable first, cinematic in layers** — House + commerce before the full film; chapters behind flags.
8. **Build for Year 1, structure for the universe** — Bharat now, CMS-driven growth and a dormant world-schema ready.

*NAVARN — the ancient, made new. Engineered like an heirloom.*
