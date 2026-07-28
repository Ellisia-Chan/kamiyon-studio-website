# Architecture Context

> **Target architecture:** [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md) (Sanity + OpenNext + R2 + Resend).  
> **Decision log:** [`DECISIONS.md`](./DECISIONS.md).

This file describes the **current repo** after cleanup. Do not treat Payload or Vercel as targets.

---

## Current stack (post Phase C data layer)

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) + TypeScript + React 19 | SSR, metadata, routes |
| UI | Tailwind CSS 4 + design tokens | Presentation |
| Content | Sanity GROQ via `lib/cms` + typed fallbacks | Live CMS when configured; fallbacks otherwise |
| CMS | Sanity Studio at `/studio` | Phase B scaffold + Phase C queries |
| Media | Cloudflare R2 refs (`r2Asset` / `getMediaUrl`) | Upload flow Phase E |
| Hosting (future) | OpenNext on Cloudflare | Phase E |
| Motion | GSAP + ScrollTrigger (main site) | See `lib/gsap`, `lib/motion` |
| Tests | Vitest + Playwright | Unit + smoke E2E |

```
Visitors → Next.js (app/(frontend)/) → lib/cms GROQ → Sanity (or null) → resolveWithFallback → fallbacks
Editors → /studio (Sanity) → (Phase E) webhook → revalidateTag → cached GROQ → pages
Media → R2 CDN ← refs in Sanity documents
```

---

## Boundaries

| Path | Responsibility |
| --- | --- |
| `app/(frontend)/` | Public marketing routes |
| `components/` | Sections, layout, UI — props in, no CMS imports in leaves |
| `lib/cms/` | Public getters, types, fallbacks; Sanity swap keeps exports |
| `lib/seo/` | Metadata, JSON-LD, sitemap, robots |
| `docs/` | Company canon (read-only for agents unless asked) |
| `context/` | Build instructions, ADRs, progress |

---

## Content resolution

Every page loader follows:

```typescript
const data = resolveWithFallback(await getHomePage(), homePageFallback);
```

CMS getters return `null` when Sanity is unset, empty, or errors. Never throw for missing CMS content.

---

## Generated artifacts

- **graphify-out/** — not committed. Regenerate: `graphify update .` (see ADR-004).

---

## Next architecture step

**Phase E:** OpenNext + R2 upload + webhook revalidation + CF Web Analytics.
