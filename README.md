# M&A Design System

A token-driven design system and component library for an M&A / deal-management product, rebuilt
from a Figma UI kit into a documented, tested, dark-mode-ready system with Figma → code token
parity. Built as a portfolio piece modeled on how Google Material Design 3, IBM Carbon, Atlassian,
and Shopify Polaris structure their public design systems.

**Live Storybook:** _add your published Chromatic / GitHub Pages link here after first deploy_
**Figma file:** _add your view-only Figma link here_

---

## Problem

The original Figma file had no tokens (hard-coded hex values throughout), inconsistent layer/component
naming, no documented type scale, and no dark mode story. It looked like a UI kit, not a system —
there was no single source of truth an engineer could actually consume.

## Process

1. **Audited** the existing file and reorganized it into Foundations → Tokens → Atoms → Molecules → Organisms → Patterns → Documentation.
2. **Rebuilt color** as a three-tier token system: primitive tonal ramps → semantic (mode-aware) tokens → component tokens, following Material 3's ramp methodology and Atlassian's token-layering model.
3. **Rebuilt type** as a role-based scale (display/headline/title/body/label), matching Material 3's naming so it reads as intentional, not ad hoc.
4. **Created Figma Variables** with two modes (Light/Dark) on the semantic collection, so dark mode is a parallel mapping over the same primitives — not a filter or inversion.
5. **Built this repo** as the code side of the system: the exact same token source data drives both Figma (via variables) and this codebase (via Style Dictionary), so there's one source of truth, not two systems that drift apart.

## Architecture

```
tokens/                     ← source of truth (mirrors Figma Variables)
  primitive.json             primitive color ramps, spacing, radius, type scale
  semantic.light.json        semantic tokens, Light mode
  semantic.dark.json         semantic tokens, Dark mode

build-tokens.mjs            ← Style Dictionary pipeline: JSON -> CSS vars + JS/TS modules
src/tokens/                 ← generated, do not edit directly (npm run tokens to rebuild)
  global.css                  primitive tokens as CSS custom properties
  theme.light.css             semantic tokens scoped to [data-theme="light"]
  theme.dark.css              semantic tokens scoped to [data-theme="dark"]
  *.js / *.d.ts                same tokens as typed JS, for non-CSS consumers (charts, native, etc.)

src/components/             ← React components, 100% token-driven via Tailwind config
  Button/                     atom
  Input/                      molecule (label + input + helper text)
  Badge/                      molecule, M&A-specific (deal-stage status)

.storybook/                 ← Storybook 10 + a11y addon + light/dark theme toolbar toggle
src/Foundations.mdx         ← documentation page: live color/type/spacing tokens
.github/workflows/ci.yml    ← type-check, build, Storybook build, optional GitHub Pages deploy
```

**Why this order matters:** `tokens/*.json` is the only place values are authored. Everything else
— CSS variables, the Tailwind theme, the components, the Storybook docs — derives from it. Change a
color once in `tokens/semantic.light.json`, run `npm run tokens`, and it propagates everywhere,
which is the actual point of a design system rather than a component kit.

## Key decisions & tradeoffs

- **Three-tier tokens (primitive/semantic/component) vs. two-tier.** Went three-tier because it's
  what lets a single component (e.g. a themed white-label variant) be re-skinned without touching
  global semantics. Cost: more indirection to trace a value back to its source, which is why the
  Foundations doc page exists — to make that traceability visible.
- **Tailwind mapped onto CSS variables, not raw Tailwind colors.** This keeps Tailwind as a utility
  layer over the token system rather than a second, competing source of truth for color/spacing.
- **Style Dictionary over a hand-rolled script.** Amazon's open-source tool, actively used across
  real design systems teams, and it gets platform-format export (iOS/Android/CSS/JS) for free if
  this needs to go cross-platform later.

## What's next

- Wire up **Figma Code Connect** to map these React components back to their Figma counterparts.
- Add **Chromatic** visual regression testing to CI.
- Expand token export to iOS/Android platforms via Style Dictionary (the pipeline already supports it — just add platforms to `build-tokens.mjs`).
- Add component-level test coverage (interaction tests via Storybook's test runner).

## Getting started

```bash
npm install
npm run tokens          # build CSS/JS tokens from tokens/*.json
npm run dev              # run the demo app
npm run storybook        # run Storybook locally on :6006
npm run build-storybook  # static build, output to storybook-static/
```

## Publishing this repo

1. `git init && git add -A && git commit -m "Initial design system: tokens, components, Storybook"`
2. Create a new **public** GitHub repo, then `git remote add origin <your-repo-url> && git push -u origin main`.
3. Publish Storybook: either connect the repo to [Chromatic](https://www.chromatic.com) (free tier, gives you a live hosted Storybook URL + visual regression testing), or enable **GitHub Pages** (Settings → Pages → Source: GitHub Actions) — the included `.github/workflows/ci.yml` already has a `deploy-storybook` job ready to go once Pages is enabled.
4. Drop the live Storybook link and the Figma view-only link at the top of this README.
