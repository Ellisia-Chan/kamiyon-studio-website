# Kamiyon Studio Official Website

The official marketing site for Kamiyon Studio — a Filipino creative technology studio building games and interactive experiences that educate, inspire, and make a lasting impact.

**Motto (site):** Create. Play. Inspire.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm test
npm run test:e2e
```

## Stack (target — see `context/WEBSITE-ESSENTIAL-CONTEXT.md`)

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript + React 19 |
| UI | Tailwind CSS 4 + design tokens |
| Content (current) | Typed fallbacks in `lib/cms/fallbacks/` |
| Content (target) | Sanity + GROQ; Studio at `/studio` |
| Media (target) | Cloudflare R2 |
| Hosting (target) | OpenNext on Cloudflare Pages/Workers |
| Motion | GSAP + ScrollTrigger (main site) |
| Fonts | Geologica (display/UI) + Montserrat (body) |
| Tests | Vitest + Playwright |

The public site renders from **typed fallbacks** without CMS credentials. Contact uses external links today; Resend form is planned (T8).

## Agent reading order

1. `context/WEBSITE-ESSENTIAL-CONTEXT.md`
2. `context/DECISIONS.md`
3. `context/ui-context.md`
4. `context/code-standards.md`
5. `context/progress-tracker.md`

Company facts: `docs/` (read-only unless asked).

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (default `http://localhost:3000`; prod `https://kamiyonstudio.com`) |

Sanity, R2, and Resend vars are documented in essential context §16 (Phase B–E).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke tests |
| `npm run knip` | Unused export detection |

## Dependency graph (optional)

```bash
graphify update .
```

Output is gitignored under `graphify-out/`.

## Repo Activity
![Alt](https://repobeats.axiom.co/api/embed/8301267181582ef80607a5531e63e4250c7f074f.svg "Repobeats analytics image")
---

**Last updated:** 2026-07-21 — Payload removed; Sanity scaffold next (Phase B).
