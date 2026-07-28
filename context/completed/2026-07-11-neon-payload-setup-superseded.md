> **SUPERSEDED (2026-07-21).** Payload retired. Target: Sanity + Cloudflare per [`WEBSITE-ESSENTIAL-CONTEXT.md`](../WEBSITE-ESSENTIAL-CONTEXT.md).

---
overview: Operator runbook to connect Neon Postgres, clean Sanity leftovers from `.env.local`, enable Payload `/admin` via default schema push, and set matching Vercel production env vars.
todos:
  - id: neon-project
    content: Create Neon project and copy pooled DATABASE_URL (sslmode=require)
    status: pending
  - id: env-local
    content: "Rewrite .env.local: PAYLOAD_SECRET + DATABASE_URL + NEXT_PUBLIC_SITE_URL; remove Sanity leftovers"
    status: pending
  - id: local-admin
    content: Run npm run dev, let Payload push schema, create first /admin user
    status: pending
  - id: vercel-env
    content: Set Production DATABASE_URL, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL on Vercel; remove Sanity vars; redeploy
    status: pending
  - id: publish-verify
    content: Publish CMS content and verify local + production /admin and public pages
    status: pending
isProject: false
---

# Neon + Payload CMS operator setup

Executable checklist for later. **No code changes required** for the core path — Payload adapter, admin routes, and collections are already in place. Schema uses Payload’s **default push on startup** (no `generate:db-schema` / migrations).

## Decisions (locked)

| Item | Choice |
|------|--------|
| Postgres | **Neon** (hosted) |
| Schema | **Default push** when running `npm run dev` against Neon |
| Deploy | Already on **Vercel** — set Production env vars |
| Local env | Replace Sanity leftovers in [`.env.local`](.env.local) |

## Current state (already done)

- [`payload.config.ts`](payload.config.ts) uses `postgresAdapter` + `DATABASE_URL` / `PAYLOAD_SECRET` gate
- [`app/(payload)/`](app/(payload)/) admin + REST/GraphQL routes exist
- [`.env.example`](.env.example) already documents `PAYLOAD_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`
- Public site uses typed fallbacks until CMS is configured ([`lib/cms/client.ts`](lib/cms/client.ts))

## Architecture after setup

```mermaid
flowchart LR
  subgraph local [Local]
    EnvLocal[".env.local"]
    Dev["npm run dev"]
    AdminLocal["/admin"]
  end
  subgraph neon [Neon]
    PG[(Postgres)]
  end
  subgraph vercel [Vercel]
    EnvVercel["Project env vars"]
    Prod["Production app"]
    AdminProd["/admin"]
  end
  EnvLocal --> Dev
  Dev -->|"push schema + CRUD"| PG
  AdminLocal --> Dev
  EnvVercel --> Prod
  Prod --> PG
  AdminProd --> Prod
```

Use **one Neon database** for local + Vercel Production so the first `npm run dev` push creates tables that production can use immediately.

---

## Step 1 — Create Neon project

1. Sign in at [https://console.neon.tech](https://console.neon.tech)
2. Create a project (e.g. `kamiyon-studio`)
3. Create/select a database (default `neondb` is fine)
4. Copy the **connection string**
   - Prefer the **pooled** connection string for Vercel serverless (host often contains `-pooler`)
   - Ensure SSL is enabled (Neon URLs usually include `sslmode=require`)
5. Keep the connection string private — never commit it

Example shape (not a real secret):

```bash
postgresql://USER:PASSWORD@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require
```

---

## Step 2 — Generate `PAYLOAD_SECRET`

On Windows PowerShell:

```powershell
# Prefer OpenSSL if available:
openssl rand -base64 32

# Or:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Use the **same** secret in `.env.local` and Vercel. Changing it later invalidates existing sessions / encrypted data.

---

## Step 3 — Clean and rewrite `.env.local`

Replace the current Sanity-era contents of [`.env.local`](.env.local) with:

```bash
# Payload CMS + Neon Postgres
PAYLOAD_SECRET=<paste generated secret>
DATABASE_URL=<paste Neon pooled connection string>

# Canonical site URL (local default OK for now)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Remove entirely** (Sanity leftovers):

- `CMS_PROJECT_ID`
- `CMS_DATASET`
- `CMS_API_TOKEN`
- Any `# Sanity CMS` comments

Do **not** commit `.env.local`. Confirm [`.gitignore`](.gitignore) still ignores it.

---

## Step 4 — Push schema + open Admin (local)

1. From repo root: `npm run dev` (or `pnpm`/`npm` consistently — prefer the lockfile you already use; this repo has `package-lock.json`)
2. First boot against Neon should **auto-push** Drizzle/Payload tables (default adapter behavior in development)
3. Open `http://localhost:3000/admin`
4. Create the **first admin user** (email + password)
5. Smoke-check: Users collection loads; create a trivial Media or Site Settings edit if desired

If `/admin` errors:

- Confirm both `DATABASE_URL` and `PAYLOAD_SECRET` are set (secret is required when DB URL is set — see [`payload.config.ts`](payload.config.ts))
- Confirm Neon project is active and the connection string is pooled + SSL
- Check terminal logs for Postgres connection / SSL errors

---

## Step 5 — Vercel Production env vars

In Vercel → Project → **Settings → Environment Variables**, set for **Production** (and Preview if you want CMS on preview deploys):

| Variable | Value | Notes |
|----------|--------|--------|
| `DATABASE_URL` | Same Neon pooled URL as local | Required for `/admin` + live CMS |
| `PAYLOAD_SECRET` | Same secret as local | Must match |
| `NEXT_PUBLIC_SITE_URL` | Production canonical URL (e.g. `https://your-domain.com`) | No trailing slash |

Also:

1. **Remove** any leftover Sanity vars on Vercel if present (`CMS_PROJECT_ID`, `CMS_DATASET`, `CMS_API_TOKEN`)
2. **Redeploy** Production after saving env vars (env changes do not apply to the old deployment)
3. Open `https://<production-host>/admin` and sign in with the user created in Step 4 (same DB)

---

## Step 6 — Publish content (cutover from fallbacks)

Until content exists in Payload, the public site keeps using [`lib/cms/fallbacks/*`](lib/cms/fallbacks/).

In `/admin`, publish at least the globals/collections you care about first (order suggested by site IA):

1. **Site Settings** (nav, socials, SEO defaults)
2. **Home / About / Contact** globals
3. Collections as needed: Services, Case Studies, Products, Team, Community, Media

After publish, hard-refresh production; ISR cache is ~1h ([`lib/cms/queries.ts`](lib/cms/queries.ts)) — redeploy or wait if content does not appear immediately.

---

## Step 7 — Verification checklist

- [ ] `.env.local` has only Payload + site URL vars (no Sanity keys)
- [ ] `npm run dev` connects to Neon without secret/DB errors
- [ ] `http://localhost:3000/admin` works; first user exists
- [ ] Vercel Production has `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`
- [ ] Sanity env vars removed from Vercel
- [ ] Production redeployed; `/admin` works on production host
- [ ] Editing a global in admin changes public page after cache refresh

---

## Known limitation (do not block this runbook)

**Media uploads on Vercel** use Payload’s default local disk storage ([`collections/Media.ts`](collections/Media.ts) `upload: true`). On Vercel’s ephemeral filesystem, uploaded files will not persist reliably in production.

- Text/text content in Postgres is fine
- For durable CMS images later: add a storage adapter (e.g. Vercel Blob / S3) — **out of scope for this runbook**
- Until then: prefer existing `/assets/**` static files or accept local-only media testing

---

## Out of scope

- `npx payload generate:db-schema` / Drizzle migration workflow
- Docker Compose Postgres
- Draft/preview
- Payload schema sign-off as v1 canon
- Installing Vercel Blob storage

---

## After completion (docs hygiene)

When this runbook is done, update [`context/progress-tracker.md`](context/progress-tracker.md) to mark the operator CMS setup item complete and note Neon + Vercel env are live.