# AI Workflow Rules

## Approach

Build this website incrementally using a spec-driven workflow. **Context files define what to build, how to build it, and current progress.** Always implement against these specs — do not infer product behavior or company facts from training data.

When company information is needed:

1. Read `context/` for build instructions and scope
2. Read `docs/` for authoritative company facts
3. Read CMS for published runtime content (when integrated)

> **Source:** [`docs/ai/ai-rules.md`](../docs/ai/ai-rules.md), [`docs/ai/ai-context.md`](../docs/ai/ai-context.md), [`docs/ai/canon.md`](../docs/ai/canon.md)

---

## Canon Compliance

### Hierarchy of truth

1. **User instructions** for the current task (may override for that task only)
2. **`docs/`** — Kamiyon canon (long-term source of truth)
3. **`context/`** — Website build specs derived from canon
4. **CMS** — Published website content
5. **Assumptions** — never substitute for missing canon

> **Source:** [`docs/ai/canon.md`](../docs/ai/canon.md)

### Canon vs Vision vs Proposals

| Category | Meaning | Website treatment |
| --- | --- | --- |
| **Canon** | Current reality | State as fact |
| **Vision** | Long-term aspirations | Label clearly; never imply already achieved |
| **Proposals** | Under discussion | Do not present on website unless adopted into canon |

Examples of **Vision** (not current facts): globally recognized multimedia company, publishing division, blog/careers/press kit on website, primary revenue from original IP.

### Never invent

Do not fabricate: clients, partnerships, awards, funding, revenue, office locations, employees beyond canon, published products, metrics, testimonials, certifications, release dates, or community events.

If information is missing, mark **TBD** in context or CMS — do not fill gaps with plausible fiction.

> **Source:** [`docs/ai/ai-rules.md`](../docs/ai/ai-rules.md) Rules 1–2, 13

---

## Operational Rules (from ai-rules.md)

Apply these when generating code, copy, or architecture for this repo:

| Rule | Summary |
| --- | --- |
| Protect the canon | Extend docs; do not contradict |
| Never invent company facts | TBD or suggestion — never present as fact |
| Mission before marketing | Reinforce educate / inspire / lasting impact |
| Education first | Explain clearly; reduce unnecessary complexity |
| Technology serves the problem | No trendy stack choices without rationale |
| Preserve brand voice | Professional, playful, educational; no hype |
| Think long-term | Maintainable, scalable decisions |
| Solve the real problem | Identify objective before implementing |
| Human creativity first | AI assists; humans decide creative direction |
| Respect the audience | Accessible language; accurate for experts |
| Recommend responsibly | Explain trade-offs |
| Maintain internal consistency | Shared terminology across files |
| Separate facts from suggestions | Label clearly |
| Default to simplicity | Easiest maintainable approach |
| Protect reputation | No unsupported claims |
| Honor studio identity | Multidisciplinary interactive experience studio |
| Support Filipino excellence | Inspire without exaggeration |

**Decision priority:** mission alignment → accuracy → user benefit → educational value → sustainability → maintainability → creativity.

---

## When to Read What

| Need | Read first |
| --- | --- |
| What to build, scope, pages | `context/project-overview.md` |
| CMS model, routes, fetching | `context/architecture.md` |
| Colors, fonts, layout, mascot | `context/ui-context.md` |
| TypeScript, Next.js, CMS patterns | `context/code-standards.md` |
| Current phase and next steps | `context/progress-tracker.md` |
| Completed milestones and session history | `context/completed/README.md` |
| Company mission, team, products | `docs/company/`, `docs/products/` |
| Brand voice and visual rules | `docs/branding/`, `docs/design-system/` |
| Website strategy | `docs/marketing/website-guidelines.md` |
| Services detail | `docs/services/services.md` |
| AI behavior (full rules) | `docs/ai/ai-rules.md` |

**Do not copy entire docs into context or components.** Synthesize for developers; link to source paths.

---

## Placeholder Content Rules

### Safe placeholders

- Generic section intros aligned with tone of voice
- "Coming soon" media states for products
- Stub case studies with obviously generic titles (e.g. "Sample Client Project — Placeholder")
- Stub community items (e.g. "Workshop — Details coming soon")
- Team bios: "Bio coming soon" with **canon name and role**
- Lorem-free branded stubs — short, on-voice, honest about placeholder status

### Forbidden placeholders

- Fake client company names presented as real
- Invented awards, competition wins, or press mentions
- Fabricated download/player counts
- Testimonials attributed to real or fake people
- Product status "Released" or "Available now" without canon proof
- Social URLs or email addresses invented — leave TBD until provided

### Canon content in fallbacks

These may appear in typed fallbacks (copied from docs):

- Mission, motto (**Create. Play. Inspire.**), core values
- Team names and roles (six members)
- Product titles, genres, high-level descriptions (Eclipse, Vocabu, Afterschool Cleanup)
- Service categories and service names from services.md
- Company founding year (2024), HQ (Biñan City, Laguna, Philippines)

---

## Scoping Rules

- Work on one feature unit at a time (e.g. layout shell, then Home, then About)
- Prefer small, verifiable increments over large speculative changes
- Do not combine unrelated boundaries in one step (e.g. CMS setup + all seven pages)
- If a change cannot be verified quickly (`npm run build`, route renders), scope is too broad — split it

---

## When to Split Work

Split an implementation step if it combines:

- UI changes and CMS schema changes in ways that cannot be tested independently
- Multiple unrelated routes in one PR without per-route verification
- Behavior not defined in context files

If requirements are ambiguous, add an open question to `progress-tracker.md` before implementing.

---

## Handling Missing Requirements

- Do not invent product behavior not defined in context or docs
- Do not invent hex colors — use locked website tokens in essential context §8 (`#FF7998`, `#E9C080`, `#201013`, `#F8F8F8`)
- Do not invent social URLs or email — TBD in siteSettings
- Resolve conflicts by doc priority (see canon.md); flag persistent conflicts for human review
- **Known conflict:** README motto "Play. Question. Create." vs company docs "Create. Play. Inspire." — use **Create. Play. Inspire.** on website

---

## Protected Files

Do not modify unless explicitly instructed:

- `docs/**` — company canon
- `context/CLAUDE.md` — agent read order (unless updating read order intentionally)

Always update after implementation:

- `context/progress-tracker.md` — active phase, next steps, open questions, new architecture decisions
- `context/completed/` — when closing a phase: new `YYYY-MM-DD-<slug>.md` + index row in `completed/README.md`; slim the tracker
- Relevant context file if architecture, scope, or conventions change

---

## Website-Specific Constraints (v1)

Enforce on every implementation pass:

- **Contact** — Interim: Google Form CTA + Facebook/LinkedIn/mailto; no half-built in-app form until T8 Resend. Do not claim an in-app mail pipeline exists.
- **No auth** — no Clerk, sessions, or admin routes in the marketing app (Studio auth is Sanity-hosted)
- **No hardcoded copy** — CMS or typed fallbacks
- **Seven sections** — Home, About, Services, Products, Portfolio, Community, Contact (+ Blog route when T9 lands)
- **Headless CMS** — all page content externalized
- **No careers/press kit** in v1 (Vision items); `/news` deferred

---

## Before Moving to the Next Unit

1. Current unit works end to end within its defined scope
2. No invariant in `architecture.md` was violated
3. `progress-tracker.md` reflects current phase and next steps; closed phases archived under `context/completed/`
4. `npm run build` passes (once build pipeline exists for that unit)
5. No invented company facts introduced in code or fallbacks

---

## After Meaningful Changes

Update `context/progress-tracker.md` with:

- Architecture decisions made
- New open questions
- Next steps and current phase

When closing a phase:

1. Create `context/completed/YYYY-MM-DD-<slug>.md` (goal, decisions, checklist, verification, session notes)
2. Add a row in `context/completed/README.md`
3. Remove the bulky finished block from `progress-tracker.md` (optional one-line pointer)

If implementation changes architecture, scope, or standards, update the relevant context file before continuing.
