# NAVARN — V1 LOCK

**NAVARN V1 is officially frozen.**

| | |
|---|---|
| **Lock date** | 2026-07-02 |
| **Frozen state commit** | `41949f9fb1442c3f708ed4efb94ed84809da5ef0` (`41949f9`) |
| **Tag** | `v1.0-locked` |
| **Branch** | `claude/navarn-brand-strategy-8f803h` |
| **Commerce** | Frozen — no Shopify, prices, cart, or checkout |

---

## Frozen Systems
- **VISUAL_DNA_V1** — `lib/visual/visualDNA.ts` (calibrated) + `lib/visual/artifactSystem.ts`
- **THE_FILM** — the six-chapter cinematic homepage (`/`)
- **THE_HOUSE** — the artifact gallery (`/house`)
- **ARTIFACT_EXPERIENCE** — the six-pillar artifact detail pages (`/artifacts/[id]`)
- **LUXURY_EXPERIENCE_LAYER** — museum atmosphere, premium materials, motion, luxury interaction

## Frozen Principles & Foundation
- `PRINCIPLES.md` — the permanent NAVARN principles
- `BRAND_DNA.md` — the house
- `VISUAL_IDENTITY.md` — the look
- `VERBAL_IDENTITY.md` — the voice
- `EXPERIENCE_BLUEPRINT.md` — the film & architecture
- `BRAND_UNIVERSE.md` — the long-term universe (dormant; India-first)
- `LAUNCH_STRATEGY.md` — Phase 1, design-first
- `TECHNICAL_PRODUCTION_BIBLE.md` — the engineering blueprint

## State at Lock
- 11 statically generated pages; all routes return 200
- Accessibility landmarks present (skip link, `main`, `h1`); reduced-motion path
- Zero commerce markup anywhere
- Launch artwork = stylized luxury interpretations (production raster wired via `Artifact.artwork`, pending final assets)

---

## Resume Conditions
No further architectural, experience, or Shopify changes until **one** of:

1. **Final production artwork assets are ready** — drop into the wired `Artifact.artwork` slots (no structural change).
2. **Final campaign assets are ready** — integrate into The Film / The House.
3. **Commerce phase is approved** — provision Shopify + add the buy layer.

Until then, NAVARN V1 is considered **locked**.

*NAVARN — the ancient, made new. Wear your heritage.*
