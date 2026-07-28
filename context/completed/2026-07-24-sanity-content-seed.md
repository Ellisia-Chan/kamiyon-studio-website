# Sanity content seed (WS8a–f) — 2026-07-24

## Goal

Populate Sanity dataset `kamiyon` with base documents mirroring `lib/cms/fallbacks` (plus partners + minimal blog) so Studio folders are structured field references. Keep code fallbacks.

## Delivered

- `partner` document type + homepage marquee via `resolveWithFallback`
- `scripts/sanity/seed/` builders + `pnpm sanity:seed` CLI (`--dry-run`)
- Hyphen stable IDs `{type}-{slug}` (dotted IDs path-private without read token)
- Live upsert: **42 documents** (2026-07-24)
- `getCmsImageUrl` allowlists media CDN / local paths (blocks itch.io page URLs in `next/image`)
- ADR-011; essential context Seed row; deploy-runbook seed section

## Verify

- `pnpm sanity:seed --dry-run` → 42 planned
- `pnpm sanity:seed` → upserted 42
- Studio: https://kamiyon.sanity.studio/

## Follow-ups (not blocking)

- Upload R2 media in Studio; rotate any write token exposed in chat
- Optional: `SANITY_API_READ_TOKEN` for private/draft reads
