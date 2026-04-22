# Livrome — Progress Tracker

**Last updated**: 2026-04-22 (S1 complete — theme uploaded as draft on petithero store)
**Current session**: S1 — Repo foundations & docs ✅
**Next action**: Begin **S2** (Shopify storefront structure) — product page, catalog, FAQ, About, Contact, Track Order, 404, legal stubs in FR-CA + EN. First S2 sub-step: build the first product page (Book #1 placeholder) with Livrome section conventions.

**S1 preview URL (draft theme "Livrome V1", theme_id 158897996027)**:
`https://petithero.myshopify.com/?_ab=0&_fd=0&_sc=1&key=a08cccff4dcfce3c755fbe4c25e3beed18df80781b15c4c8740fb48329670505&preview_theme_id=158897996027`

> This file is the single source of truth for "where are we?". Read it first every session. Update it last every session.

---

## Session status

| # | Name | Status | Notes |
|---|------|--------|-------|
| S1 | Repo foundations & docs | 🟢 done | Non-MCP portion ✅ (dirs, docs, git init, commits `00d021f`, `bfaaa9c`, `85f55c8`, `9c8bbd5`, `a22fd03`). Homepage Liquid port ✅ (commit `700740c` — 7 livrome-* sections + tokens + index.json + layout). Theme uploaded as draft "Livrome V1" (theme_id `158897996027`) via ZIP upload (Shopify CLI device-code auth failed; ZIP upload via admin UI worked). Handle rename `petithero → livrome` **deferred** — Shopify's `.myshopify.com` rename is one-time-lifetime and forces MCP reinstall; customers will see `livrome.com` via custom domain in S18, so the internal handle stays `petithero` (cosmetic-only). |
| S2 | Shopify storefront structure | ⚪ pending | Homepage, product, catalog, FAQ, About, Contact, Track Order, 404, legal stubs. FR-CA + EN. |
| S3 | Shopify polish & ops | ⚪ pending | Banner, cookie, emails, discounts, SEO, analytics. |
| S4 | Next.js scaffolding | ⚪ pending | Next.js 15 + TS + Tailwind + Shadcn, tokens import, 7 route stubs. |
| S5 | Steps 1 & 2 UI | ⚪ pending | Welcome + child details. |
| S6 | Steps 3 & 4 UI | ⚪ pending | Photo upload + face detect + generation loading. |
| S7 | Steps 5, 6, 7 UI | ⚪ pending | Review + flipbook + cart. |
| S8 | AI pipeline foundations | ⚪ pending | `/generate-page` endpoint + quality spike. |
| S9 | Book #1 content creation | ⚪ pending | Script, manifest, 24 base scenes, cover. Collaborative. |
| S10 | Inngest async orchestration | ⚪ pending | 24-page parallel gen + progress events. |
| S11 | Storage & persistence | ⚪ pending | R2 + Supabase + retention jobs. |
| S12 | Cart injection | ⚪ pending | Storefront API cartCreate + preview_id attribute. |
| S13 | PDF assembly service | ⚪ pending | FastAPI + img2pdf + CMYK + preflight. |
| S14 | Order webhook + Lulu mock | ⚪ pending | order.created → PDF → mock print. |
| S15 | Email + Klaviyo | ⚪ pending | Preview ready, resume, order, shipping flows. |
| S16 | Legal & compliance | ⚪ pending | Law 25 + GDPR privacy policy, rate limits, moderation. |
| S17 | E2E integration + QA | ⚪ pending | Playwright E2E + perf pass + a11y. |
| S18 | Real Lulu + domain + biz entity | ⚪ pending | Swap mocks for real. Pre-req: biz entity + Lulu account. |
| S19 | Soft launch | ⚪ pending | Remove password, go live, first 5 customers. |

Legend: 🟢 done | 🟡 in_progress | 🔴 blocked | ⚪ pending

---

## Open blockers

| Blocker | Owner | Need by |
|---|---|---|
| Canadian business entity registration | User | S18 (can develop through all intermediate sessions first) |
| Lulu Direct account | User | S18 |
| Book #1 script draft | User + Claude | S9 |

---

## External dependencies status

| Dependency | Status | Notes |
|---|---|---|
| Shopify store `petithero.myshopify.com` | ✅ ready | MCP connected via Dev Dashboard app (user config) |
| GCP project `pcagentspace` | ✅ ready | Vertex AI + Gemini Enterprise + refresh-token infra reused from `perso/` |
| Domain `livrome.com` | ✅ registered | DNS points nowhere yet; wired in S18 |
| Canadian business entity | ❌ not registered | Blocks Shopify Payments + Lulu contract |
| Lulu Direct account | ❌ not created | Mock adapter used until S18 |
| Klaviyo account | ❌ not created | Needed S15 |
| Cloudflare R2 bucket | ❌ not created | Needed S11 |
| Supabase project | ❌ not created | Needed S11 |
| Inngest account | ❌ not created | Needed S10 |
| Sentry project | ❌ not created | Needed S16 |

---

## Notes for next session

If resuming with a fresh context: read this file, then `SESSION_LOG.md` last entry, then `ARCHITECTURE.md` if touching a new service boundary. Don't read the full plan file (`C:\Users\Titouza\.claude\plans\good-now-this-is-prancy-wombat.md`) unless you need to refresh session-level details.
