# Comprehensive QA Debugging Report

**Project:** Kamiyon Studio Website  
**Purpose:** Consolidated QA findings for debugging and implementation  
**Audience:** Cursor AI / Development Team  
**Version:** 1.1  
**Status:** Triaged (2026-07-24)  
**QA environment:** Production (`kamiyonstudio.com`) **before** 2026-07-24 staging/kinetic-nav changes  

---

# Triage decisions (2026-07-24)

| Decision | Choice |
| --- | --- |
| Contact “form” | External **Google Form** link (not in-app / not Resend yet) |
| Google Form URL | https://docs.google.com/forms/d/e/1FAIpQLSeIefAWJu5FP9pwljLFz1wSUxU2ybR3--GdylUYUBsGHH0yaw/viewform |
| Same-route nav (QA-005/006/007) | **(A)** Scroll to top / target section |
| Scroll tip (QA-002/009) | Keep bounce UX; **first scroll must count** (dismiss tip without eating the scroll) |
| Hamburger (QA-008) | **Superseded** — CardNav replaced by kinetic nav (ADR-008) |
| Priority vs Wave 4 | QA streams **parallel** with staging ops |
| T8 Resend (later) | Studio inbox + visitor confirmation when form ships; confirm `CONTACT_TO_EMAIL` |

**Repo gap (closed in WS3):** Interim Google Form wired via `INTERIM_CONTACT_FORM_URL` / `CONTACT_CTA` + fallbacks. Live Sanity CMS may still need a reseed/patch if Studio content still points at `/contact`.

---

# Executive Summary

Manual QA matched the prior tracker. Remaining work is frontend interaction polish plus wiring the interim Google Form CTA. Email “confirmation” (QA-001) is a **Google Forms** receipt setting / out-of-band concern — not an app mail pipeline bug.

Overall assessment:

* **Visual design:** Excellent
* **Layout consistency:** Good
* **Content & references:** Working correctly
* **Navigation anchors:** Mostly functional
* **Primary remaining work:** Wave 4 cutover (WS4b); optional WS6; T8 Resend (WS5). WS1–WS3 polish streams done in repo.

---

# Status board

| ID | Title | Severity | Status | Owner stream |
| --- | --- | --- | --- | --- |
| QA-001 | Email confirmation (Google Form) | Medium | **Out of scope (app)** — Google Forms settings; optional ops note | Ops / Form owner |
| QA-002 | Initial scroll does not work | High | **Open** — same root as QA-009 | WS1 |
| QA-003 | Header logo disappears | Medium | **Needs re-QA** on kinetic nav / staging | WS2 |
| QA-004 | Header logo not clickable | Medium | **Needs re-QA** on kinetic nav / staging | WS2 |
| QA-005 | Contact / brand link same-route | Medium | **Resolved (WS3)** — same-route smooth-scroll | WS3 |
| QA-006 | Footer nav same-route | Medium | **Resolved (WS3)** — same-route smooth-scroll | WS3 |
| QA-007 | Get in Touch already at target | Low | **Resolved (WS3)** — in-app replay scroll; Form is external | WS3 |
| QA-008 | Hamburger freezes | High | **Superseded** (ADR-008 kinetic nav) | — |
| QA-009 | Scroll hint consumes first scroll | High | **Open** — bounce must not eat first intent | WS1 |
| QA-010 | Scroll hint × inconsistent | Medium | **Open** | WS1 (+ WS2 if overlay) |

---

# QA Comparison Summary

| Existing QA | Manual Observation | Result |
| --- | --- | --- |
| Email confirmation missing | Google Form submit; no app Resend | **Reclassified** |
| Initial scroll bug | Confirmed; bounce returns to top | Expanded → WS1 |
| Header logo disappearing | Pre-kinetic prod; re-QA staging | Needs re-QA |
| Header logo not clickable | Pre-kinetic prod; re-QA staging | Needs re-QA |
| Contact navigation issue | Same-route no feedback | **Resolved (WS3)** |
| Footer navigation issue | Same-route no feedback | **Resolved (WS3)** |
| Get in Touch behavior | Already at target | **Resolved (WS3)** |
| Hamburger menu freezes | CardNav era | **Superseded** |
| Scroll hint consumes first scroll | Bounce-back | Expanded → WS1 |
| Scroll hint X inconsistent | Confirmed | Open → WS1 |
| "I miss her" | Non-project | Ignored |

---

# Detailed Debugging Tasks

---

## QA-001 — Email Confirmation Not Received

### Module

Google Forms (external)

### Severity

Medium

### Status

**Out of scope for app code** (2026-07-24)

### Description

Contact CTA opens an external [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSeIefAWJu5FP9pwljLFz1wSUxU2ybR3--GdylUYUBsGHH0yaw/viewform). Submitter expected a confirmation email; none arrived.

### Clarification

This is **not** Resend / `/api/contact`. There is no in-app mail send for this path. Confirmation depends on Google Forms → Settings → email receipts / respondent notifications, or Gmail filters.

### App work (related, not this bug)

* Wire interim CTA/href to the Google Form URL until T8 Resend.
* T8 later: native form + Resend → studio inbox + visitor confirmation.

### Ops checklist (Form owner)

* [ ] Google Form: collect email + “Send response copy” / confirmation enabled
* [ ] Responses destination (Sheet) receiving rows
* [ ] Spam check for `kamiyonstudio@gmail.com` and respondent inbox

---

## QA-002 — Initial Scroll Does Not Work

### Module

Scrolling / `useHeroScrollBounce`

### Severity

High

### Status

Open → **WS1**

### Description

Immediately after refreshing the homepage, the first mouse wheel interaction does not move the page. Users must scroll twice.

### Expected (locked)

Tip may dismiss / bounce policy may remain, but the **first scroll intent must move the page** (or equivalent: dismiss without consuming the scroll).

### Suspected cause (code)

`useHeroScrollBounce` marks wheel intent, then on scroll past threshold **smooth-returns to y=0**. That is bounce-back, not `preventDefault` on a non-passive wheel listener.

### Recommended fix

Dismiss/hide tip on first intent while allowing scroll progress to stick (or apply bounce only after a completed intentional scroll, never on the first gesture).

---

## QA-003 — Header Logo Occasionally Disappears

### Module

Header / kinetic nav

### Severity

Medium

### Status

**Needs re-QA** on staging + ADR-008 (`SterlingGateKineticNavigation`) → **WS2**

### Description

Left nav logo occasionally disappeared (observed on pre-kinetic production).

### Debug Areas

* Conditional rendering / animation lifecycle
* Scroll-triggered visibility
* Hydration/state sync in kinetic header

---

## QA-004 — Header Logo Sometimes Not Clickable

### Module

Header Navigation

### Severity

Medium

### Status

**Needs re-QA** → **WS2** (coordinate with WS1 if scroll-tip overlay steals hits)

### Debug Areas

* Pointer events / invisible overlays / z-index
* Event interception from hero helper (`z-20`)

---

## QA-005 — Kamiyon Studio Contact Link Behavior

### Module

Contact Navigation

### Severity

Medium

### Status

**Resolved (WS3)** — `SameRouteLink` + `handleSameRouteNavClick`

### Locked behavior

Same route → **smooth-scroll to top or target section** (policy A).

Different route → navigate as today.

---

## QA-006 — Footer Logo / Footer Links

### Module

Footer

### Severity

Medium

### Status

**Resolved (WS3)** — footer nav uses `SameRouteLink`

### Locked behavior

Same as QA-005: same-route → scroll to top/section.

---

## QA-007 — "Get in Touch" Button

### Module

Contact CTA

### Severity

Low

### Status

**Resolved (WS3)** — interim CTA is Google Form (external); in-app `/contact` / hash targets still same-route scroll

### Locked behavior

If already at Contact (page or `#` target): **scroll / replay** to the contact section (policy A). Interim href may be Google Form (external) — then “already here” only applies to in-app `/contact` or hash targets.

---

## QA-008 — Hamburger Menu Occasionally Freezes

### Module

Navigation (CardNav)

### Severity

High

### Status

**Superseded** (ADR-008 — kinetic overlay nav)

Do not patch `CardNav` for this. Optional cleanup: remove unused CardNav in a later PR. New freezes on kinetic toggle → file as new issue under WS2.

---

## QA-009 — Scroll Hint Consumes First Scroll

### Module

Scroll Hint / `HeroScrollHelper`

### Severity

High

### Status

Open → **WS1** (duplicate root cause with QA-002)

### Expected (locked)

Dismiss helper while preserving the original scroll action.

---

## QA-010 — Scroll Hint "X" Button Inconsistent

### Module

Scroll Hint

### Severity

Medium

### Status

Open → **WS1**

### Debug Areas

* Pointer events, z-index vs header, animation state, focus handling

---

# Cross-Issue Analysis

## 1. Hero scroll bounce (WS1)

Affects QA-002, QA-009, QA-010. Primary file ownership: `hooks/useHeroScrollBounce.ts`, `components/sections/HeroScrollHelper.tsx`.

## 2. Kinetic chrome (WS2)

Affects QA-003, QA-004; any new menu freeze. Ownership: `sterling-gate-kinetic-navigation*`, `SiteHeader`.

## 3. Same-route scroll policy (WS3)

Affects QA-005, QA-006, QA-007. One shared helper for header/footer/CTAs.

## 4. Layering / pointer events

May couple WS1 tip and WS2 logo clickability — fix tip z-index/pointer-events with WS1; re-test logo in WS2.

## 5. Route & external CTA

Google Form is external; do not invent same-route scroll when `href` is absolute to Google.

---

# Positive Findings

* Visual design and presentation
* Overall page structure and content organization
* References / external links (when wired)
* Anchor navigation outside homepage edge cases
* General layout quality

---

# Priority Recommendations

## Critical (WS1 — parallel with ops)

* QA-002 / QA-009 — first scroll must count
* QA-010 — × dismiss reliability

## High (WS2 — re-QA then fix)

* QA-003 / QA-004 — logo visibility & clickability on kinetic nav

## Medium

* QA-001 — ops-only on Google Form settings

## Closed / superseded

* QA-005 / QA-006 / QA-007 — WS3 same-route + Google Form CTA
* QA-008 — CardNav hamburger

---

# Implementation Guidance

1. **WS1 first for scroll:** change bounce so first wheel/touch/key intent is not undone; keep tip dismissible via ×.
2. **WS2:** reproduce logo issues only on staging kinetic header; do not “fix” CardNav.
3. **WS3:** shared same-route → `scrollTo` / section behavior; skip when href is external (Google Form).
4. **Form wiring:** set interim contact CTA / channel to Google Form URL in config or CMS; keep `/contact` page for channels + mailto.
5. **T8 later:** Resend native form; then retire Google Form as primary CTA if product wants.
6. **Wave 4 ops:** parallel — see `progress-tracker.md` workstreams.
