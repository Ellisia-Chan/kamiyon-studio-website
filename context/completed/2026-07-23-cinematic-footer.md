# Cinematic Footer Integration (2026-07-23)

**Plan:** `.cursor/plans/cinematic_footer_integration_d22404d0.plan.md` (local)

## Summary

Replaced the static 4-column `SiteFooter` with a GSAP curtain-reveal `CinematicFooter` on every route via `PageShell`. Content is Kamiyon marketing (motto, nav, socials, contact CTA) from existing shell props.

## Files

| Action | Path |
| --- | --- |
| Added | `components/ui/motion-footer.tsx` |
| Added | `components/ui/motion-footer.test.tsx` |
| Modified | `components/layout/PageShell.tsx` |
| Modified | `components/layout/PageShell.test.tsx` |
| Modified | `app/globals.css` (token bridge + footer styles) |
| Modified | `vitest.setup.ts` (`IntersectionObserver` mock) |
| Removed | `components/layout/SiteFooter.tsx` |
| Removed | `components/layout/SiteFooter.test.tsx` |

## Behavior notes

- Curtain reveal: `main` is `relative z-10` with opaque bg; footer wrapper is `h-screen` in flow with fixed inner `<footer>`.
- `inert` until IntersectionObserver reports the wrapper intersecting (blocks focus while covered).
- GSAP via `@/lib/gsap` + `useGsapContext`; reduced-motion skips magnetic/scrub; back-to-top uses `prefersReducedMotion()`.
- Motto rendered in an accessible `<p>` (not only in `aria-hidden` marquee).

## Verification

- `vitest`: 374 passed
- ESLint on touched TSX: clean (repo-wide lint still has pre-existing errors elsewhere)
