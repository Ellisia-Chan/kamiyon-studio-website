# <Project> — Build Pipeline

<!--
  TEMPLATE — how to use this file
  --------------------------------
  This is the "what's happening" half of the two-document system
  (handoff.md = how the system works; this = build state + task queue).
  It is the single source of truth for status. Rules that keep it honest:

  • Every work item has a status box and an ACCEPTANCE LEVEL (the verify
    ladder below). "Done" means done to its stated level, nothing less.
  • One pipeline phase = one branch (see AGENTS.md). Don't bundle phases.
  • Spikes/gates come BEFORE the phases they de-risk. A gate that hasn't
    passed blocks everything downstream — say so explicitly.
  • Nothing is silently dropped. Cut scope lands in the Deferred registry
    with a reason; bugs land in the Bugs registry; open design questions
    land in "Decisions pending sign-off".
  • Convert relative dates to absolute (YYYY-MM-DD) when you write them.
  Delete this comment block in a real pipeline.
-->

Legend: `[ ]` todo · `[x]` done · `[-]` in progress

Design phase <status>. This pipeline is the build plan for **<version / milestone>**.

<!-- Verification ladder — reference these levels on every item's "Verify:" line.
     Adapt the wording to your stack; the point is that "done" is unambiguous. -->

**Verification ladder:**

| Level | Means |
|---|---|
| 1 | Written analysis / doc artifact exists and is reviewed |
| 2 | Typed interfaces + passing unit/integration tests |
| 3 | Runs in a dev/staging environment; happy path exercised by hand |
| 4 | Deployed endpoint / build answering real requests |
| 5 | Judged on the real target (real device / prod-like) — the feel/behavior is the question, human-confirmed |

> **CURRENT STATE (<YYYY-MM-DD>) — <one-line summary of where the build is>.**
> <2–4 sentences: what the last session landed, what's on `main`, what's
> in flight, and the single most likely next candidate. This banner is the
> fast-orientation line — a fresh session reads it first.>

**Hard gates (rules, not preferences):**

<!-- Gates are go/no-go checkpoints that, if failed, force a re-plan rather
     than a workaround. List only true gates; delete if none. -->

1. **<Gate name> (Phase <n>) is the go/no-go on <the risky assumption>.** If <failure condition>, <what gets re-decided>. No <downstream work> before this verdict.

---

## Decisions pending owner sign-off

Each blocks the pipeline item noted. The owner ratifies before the blocked item proceeds.

| # | Decision | Status | Blocks |
|---|----------|--------|--------|
| T1 | **<Decision to be made>** — <what's actually being decided and why it matters> | **Open** / **RESOLVED: <outcome> (<how/when ratified>)** | <item id(s)> |
| T2 | … | … | … |

---

## Bugs — open

<!-- One row per open bug. Symptom in one line; track its stage:
     reported → diagnosed → fix built → pending verification → (closed → move out). -->

| # | Symptom | Stage | Notes |
|---|---------|-------|-------|
| B1 | <one-line symptom> | reported / diagnosed / fix built / pending verify | <repro, suspected cause, or link> |

*(or: none)*

---

## Phase <N> — <phase name> `[ ]`

**Scope (locked <YYYY-MM-DD>):** <what this phase covers and, just as
important, what it explicitly does not — deferrals go to the registry below>.

**Non-negotiables (this phase closes against these):**

- <invariant the phase must not violate>
- <another>

> **Branch discipline:** per `AGENTS.md`, <call out any items that need their
> own branch regardless of size — e.g. anything touching schema/auth/keys/billing>.

### Phase <N>.0 — <sub-phase, e.g. Bootstrap / Scaffold>

| # | Item | Status |
|---|------|--------|
| <N>.0a | **<Item name>** — <what it delivers, acceptance criteria>. **Verify: level <n>.** | `[ ]` |
| <N>.0b | **<Item name>** — <…>. **Verify: level <n>.** | `[ ]` |

### Phase <N>.1 — <sub-phase>

<!-- If this sub-phase is a spike/gate, say so and state the deliverable
     is the VERDICT, not the code. -->

| # | Item | Status |
|---|------|--------|
| <N>.1a | **<Item>** — <…>. **Verify: level <n>.** | `[ ]` |
| <N>.1b | **<Item>** — <…>. **Verify: level <n>.** | `[ ]` |

<!-- Status-cell convention when an item is done/in-progress: replace `[ ]`
     with `[x]`/`[-]` and append a dated one-paragraph note — WHAT was built,
     HOW it was verified (to which level), and any finding that changes later
     work. That note is the audit trail; a bare `[x]` loses the "why". -->

---

## Deferred — Future Extensions

Everything deliberated and explicitly **not** in this milestone. Silent omission is how requirements get lost; these are the receipts.

| # | Deferral |
|---|----------|
| D1 | **<Feature>** — <what it is, why it's out of scope now, what would bring it back> |
| D2 | **<Feature>** — <…> (mark **explicitly rejected** vs merely deferred where it matters) |

---

## Definition of Done — <milestone> E2E Acceptance Test

Passes when this loop runs cleanly on <real target / environment>, no mock data:

1. **<Step>** — <observable outcome>
2. **<Step>** — <observable outcome>
3. **<The hard rules hold>** — <the invariants, demonstrably enforced>

*Written <YYYY-MM-DD> from <the converged decision record / design doc>. Gates (T#) must close before the phases they block.*
