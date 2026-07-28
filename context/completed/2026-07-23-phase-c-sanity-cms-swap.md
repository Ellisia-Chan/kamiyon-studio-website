# Phase C — Sanity data layer swap (2026-07-23)

## Goal

Swap `lib/cms` from fallbacks-only null stubs to Sanity + GROQ + R2 media refs while preserving the public getter API and typed fallbacks.

## Delivered

- `lib/cms/groq.ts` — `defineQuery` projections for singletons, collections, slug lookups, blog
- `lib/cms/fetch.ts` — `safeSanityFetch` (null when unset / empty / error; cache tags + revalidate)
- `lib/cms/mappers.ts` — Sanity → domain types (`featuredProductSlugs`, `categorySlug`, R2 → `CmsImage`)
- `lib/cms/media.ts` — `getMediaUrl` + `mapR2AssetToCmsImage`
- `lib/cms/queries.ts` — wired getters including `getPosts` / `getPostBySlug`
- Blog domain types on `lib/cms/types.ts`
- Unit tests: fetch, mappers, media, image, queries (29 passing)

## Operator notes

- Set `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET` for live CMS
- Optional `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` for key-only media refs
- Empty Sanity dataset still serves typed fallbacks via `resolveWithFallback`

## Follow-ups

- Phase E: OpenNext, R2 upload API, webhook → `revalidateTag`
- Phase F: blog UI (T9), contact+Resend (T8), expanded E2E (T15)
