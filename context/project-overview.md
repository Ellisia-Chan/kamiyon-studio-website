# Kamiyon Studio Official Website

## Overview

This repository builds the **official Kamiyon Studio marketing website** — the studio's digital headquarters. The site introduces Kamiyon to prospective clients, partners, players, media, and future team members; showcases original IP and services; and builds trust through brand-compliant design and evidence-based storytelling.

**Source of truth for company facts:** [`docs/`](../docs/) (Kamiyon canon).  
**Build instructions for agents:** `context/` files (this folder).  
**Runtime content:** Sanity GROQ via `lib/cms` when configured; typed fallbacks otherwise (see [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md)).

Kamiyon Studio is a Filipino creative technology studio founded in **2024** in **Biñan City, Laguna, Philippines**. It operates as both a client-services agency and an original IP studio, creating games and interactive experiences that educate, inspire, and make a lasting impact.

> **Source:** [`docs/company/overview.md`](../docs/company/overview.md), [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md)

---

## Goals

1. **Communicate identity** — Visitors understand who Kamiyon is, what we do, and why it matters within seconds of landing.
2. **Showcase capability** — All seven site sections render from CMS with brand-compliant placeholder content until real entries exist.
3. **Build trust** — Professional, creative, approachable presentation backed by canon facts (team, values, products) — never fabricated clients or achievements.
4. **Drive meaningful action** — Clear CTAs that route to Services, Products, Portfolio, Community, or Contact.
5. **Support discoverability** — Semantic structure, meaningful headings, and performance standards per website guidelines.

---

## Website Sections (v1)

All sections defined in [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md):

| Section | Purpose | Primary canon sources |
| --- | --- | --- |
| **Home** | Value proposition, mission, featured work, highlights, CTA | website-guidelines, messaging, positioning |
| **About** | Story, mission/vision, values, team, culture | founder-story, mission-vision, core-values, overview, culture |
| **Services** | Professional offerings with outcome-focused copy | services.md, target-industries, website-guidelines |
| **Products** | Original IP showcase (Eclipse, Vocabu, Afterschool Cleanup) | future-ip, product docs |
| **Portfolio** | Case studies: challenge, solution, impact | website-guidelines (no named clients in canon — placeholders) |
| **Community** | Workshops, jams, partnerships, involvement | culture, partnerships, social-media |
| **Contact** | Google Form CTA (interim) + external links; Resend in-app form planned (T8) | Form URL + siteSettings / fallbacks |

---

## Core Visitor Flows

### Prospective clients

Home → Services (category or detail) → Portfolio → Contact

### Business partners / educational institutions

Home → About → Services → Community → Contact

### Players / community

Home → Products → Community → Contact

### Media / investors

Home → About → Products → Portfolio → Contact

### Future team members

Home → About (team, culture) → Community → Contact

---

## Features

### Home

- Hero with positioning statement and primary CTA
- Mission summary (canon)
- Featured work block (CMS — placeholder until entries)
- Company highlights (expertise areas from overview)
- Secondary CTAs (Explore Services, View Products, Contact)

### About

- Founder/company story (distilled from founder-story)
- Mission, vision (vision labeled), motto **Create. Play. Inspire.**
- Five core values with short descriptions
- Team grid: six canon members with name and role
- Culture summary (exploration, collaboration, learning)

### Services

- Four service categories from services.md
- Listing page + detail pages per service (CMS)
- Outcome-focused copy; minimal jargon
- Industries/expertise callout (education, K–12, Web3 education, gamification)
- CTA to Contact

### Products

- Three canon IP entries: Eclipse, Vocabu Wildlife Edition, Afterschool Cleanup
- Per product: overview, genre, status, key features, goals, media slots
- Development status defaults to TBD/placeholder — no fake "released" claims
- CTA to learn more / contact

### Portfolio

- Case study cards and detail pages (CMS)
- Structure: challenge, solution, impact, lessons learned
- All entries placeholder until real permitted client work is published
- No fabricated client names, logos, or testimonials

### Community

- Community item feed (CMS): workshops, game jams, hackathons, speaking, partnerships
- Philosophy from partnerships and culture docs
- All specific events placeholder until documented

### Contact

- Welcoming intro copy (CMS)
- Interim primary CTA: [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSeIefAWJu5FP9pwljLFz1wSUxU2ybR3--GdylUYUBsGHH0yaw/viewform) (linked button)
- External links: Facebook, LinkedIn, public email (mailto)
- In-app form via Resend is T8; Google Form + links must keep working until then

### Global

- Site shell: header nav (7 sections), footer with social links
- SEO metadata per page (CMS)
- Responsive, accessible layout
- Headless CMS integration with typed fallbacks

---

## Scope

### In scope (v1)

- Full marketing site: all 7 sections above
- Headless CMS integration for all page content
- Placeholder-first content strategy with typed fallbacks
- Brand-compliant design tokens and typography
- External contact channels (Facebook, LinkedIn, email)
- Team section with canon names and roles
- Product pages for three documented IP titles

### Out of scope (until ticketed)

- Calendly or booking integrations
- User authentication or accounts
- In-app admin panel (CMS admin is separate)
- Blog UI (T9), careers, press kit (deferred)
- E-commerce or client portal
- Hardcoded production copy in React components

---

## Success Criteria

1. All seven sections render with brand-compliant layout and CMS-driven (or fallback) content.
2. Every factual claim on the site traces to `docs/` canon or published CMS entries — no invented history, clients, or achievements.
3. Canon vs Vision clearly distinguished where long-term aspirations appear (e.g., global multimedia company, future site sections).
4. Contact page works via external links; no forms or auth.
5. Design uses locked brand hex tokens, Geologica/Montserrat typography, and logo/mascot usage rules.
6. `npm run build` passes after implementation phases.
7. Placeholder content is generic and brand-appropriate — never fake case studies or awards.

---

## Key Canon References

| Topic | Document |
| --- | --- |
| Company identity | [`docs/company/overview.md`](../docs/company/overview.md) |
| Mission & vision | [`docs/company/mission-vision.md`](../docs/company/mission-vision.md) |
| Website strategy | [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md) |
| Positioning | [`docs/marketing/positioning.md`](../docs/marketing/positioning.md) |
| Brand messaging | [`docs/branding/messaging.md`](../docs/branding/messaging.md) |
| Services | [`docs/services/services.md`](../docs/services/services.md) |
| Products | [`docs/products/future-ip.md`](../docs/products/future-ip.md) |
| Visual identity | [`docs/branding/visual-identity.md`](../docs/branding/visual-identity.md) |
| AI / canon rules | [`docs/ai/canon.md`](../docs/ai/canon.md) |
