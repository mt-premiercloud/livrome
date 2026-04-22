# Livrome — Progress Tracker

**Last updated**: 2026-04-22 (S2 in progress — Phase 1+2 theme work committed, waiting on user admin actions)
**Current session**: S2 — Shopify storefront structure (in progress)
**Next action**: User admin actions (see "S2 pending admin actions" below). Once done, I verify all URLs + advance S2 → done.

**S1 complete**: theme live on `petithero.myshopify.com` (theme_id `158897996027`), homepage + 7 livrome-* sections + Dawn header/footer. Handle rename deferred. Password removed (store currently public).

## S2 pending admin actions

All at https://admin.shopify.com/store/petithero. Estimated 10 minutes total.

1. **Themes** → Add theme → Upload zip `C:\Users\Titouza\Documents\petit hero\livrome-v1-3.zip` → Rename "Livrome V1.3" → **Publish**.
2. **Products** → "Léo and the Stars" (ACTIVE, GID `9294699364603`, variants Hardcover $29 / Paperback $22) → right panel **Sales channels and apps** → tick **Online Store** → Save. (Fixes `/products/leo-and-the-stars` 404.)
3. **Pages** → Add 4 pages (title / handle / template / content): FAQ — `faq` — `page.faq` — empty · Coming Soon — `coming-soon` — `page.coming-soon` — empty · About — `about` — `page.about` — empty · Track Order — `track-order` — `page.track-order` — empty. Save all as Visible.
4. **Settings → Policies** → paste each HTML file from `content/policies/` into its policy: `privacy-policy.html` → Privacy Policy · `terms-of-service.html` → Terms of Service · `refund-policy.html` → Refund Policy · `shipping-policy.html` → Shipping Policy. Save.

Optional (S3): configure main-menu (Navigation → Main menu) with "The Library" (/pages/coming-soon), "FAQ" (/pages/faq), "About" (/pages/about), "Contact" (/pages/contact).

> This file is the single source of truth for "where are we?". Read it first every session. Update it last every session.

---

## Session status

| # | Name | Status | Notes |
|---|------|--------|-------|
| S1 | Repo foundations & docs | 🟢 done | Non-MCP portion ✅ (dirs, docs, git init, commits `00d021f`, `bfaaa9c`, `85f55c8`, `9c8bbd5`, `a22fd03`). Homepage Liquid port ✅ (commit `700740c` — 7 livrome-* sections + tokens + index.json + layout). Theme uploaded as draft "Livrome V1" (theme_id `158897996027`) via ZIP upload (Shopify CLI device-code auth failed; ZIP upload via admin UI worked). Handle rename `petithero → livrome` **deferred** — Shopify's `.myshopify.com` rename is one-time-lifetime and forces MCP reinstall; customers will see `livrome.com` via custom domain in S18, so the internal handle stays `petithero` (cosmetic-only). |
| S2 | Shopify storefront structure | 🟡 in_progress | Theme side done (commits `e4256c0`, `da9a6df`): `page.faq`, `page.coming-soon`, `page.about`, `page.track-order` templates + livrome-about/track-order/404 sections. Book #1 "Léo and the Stars" product created via MCP (GID `9294699364603`, ACTIVE, Hardcover $29 / Paperback $22) — needs sales-channel tick. 4 legal-policy HTML drafts in `content/policies/`. EN-only for now; FR-CA pass deferred to S3. Remaining: user uploads v1-3 zip + publishes; ticks product sales channel; creates 4 admin page records; pastes 4 policies. Nav menu deferred to S3. |
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
