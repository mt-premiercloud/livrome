# Livrome — Session Log

Running log of each build session. Most recent at top.

---

## S2 — Storefront structure, Phase 1+2 theme side (2026-04-22, in progress)

**Objective**: create FAQ, About, Coming Soon, Track Order pages; refresh 404; add Book #1 product; draft legal policies.

**Delivered this turn (theme side, commits `e4256c0` + `da9a6df`)**:
- `templates/page.faq.json`: 10 questions via `livrome-faq` (max_blocks raised from 10 to 20) + final-cta. Topics: photos, delivery, languages, refunds, pricing, gifts, AI, child safety, format, preview flow.
- `templates/page.coming-soon.json`: reuses `livrome-library` in placeholder mode (8 canonical stories, genre filters).
- `templates/page.about.json` + `sections/livrome-about.liquid`: hero + "our story" + 3 principles block + studio footer. Principles are `<value>` blocks (glyph + title + text).
- `templates/page.track-order.json` + `sections/livrome-track-order.liquid`: lookup form posting to `/account/login`, 4 status steps (confirmed → printed → shipped → delivered).
- `templates/404.json` + `sections/livrome-404.liquid`: replaces Dawn's default 404 with brand-styled page (plum "404" mark, honey handwritten caption, dual CTAs, 4 suggested links).
- `content/policies/{privacy-policy,terms-of-service,refund-policy,shipping-policy}.html`: drafted for admin paste into Settings → Policies.

**Delivered this turn (via MCP)**:
- Book #1 "Léo and the Stars" product — GID `gid://shopify/Product/9294699364603`, ACTIVE, vendor Livrome, productType "Personalized Book", Format option with Hardcover ($29.00 CAD) + Paperback ($22.00 CAD) variants, SKUs `LIV-BOOK-01-HC` / `LIV-BOOK-01-PB`, inventory untracked (print on demand). Metafields: `livrome.book_id`, `age_range`, `theme`, `page_count`, `preview_url`. SEO title/description set.
- **Quirk**: API-created products aren't auto-published to the Online Store sales channel. `/products/leo-and-the-stars` returned 404 despite ACTIVE status. User must tick Online Store in product's Sales Channels panel to fix.

**Not delivered yet (deferred)**:
- FR-CA translations — deferred to S3 (needs translation key rework across sections).
- Main menu configuration — can't be done via MCP; deferred to S3 (user-level admin action).
- Collection curation — Book #1 auto-joined "Home page" collection by default; we'll revisit when there are more books.
- Shopify policy records still empty in admin — user pastes drafts.

**Bug hunt**: `shopify theme check` surfaced zero new errors from our additions. The 2 pre-existing `ValidSchemaTranslations` errors in `sections/featured-product.liquid` are Dawn-default bugs unrelated to our work; tracked as low-priority.

**Build artifact**: `livrome-v1-3.zip` (366 entries, 1.03 MB, POSIX paths) — user uploads + publishes via admin UI.

**Next**: user executes the 4 admin actions listed in `PROGRESS.md` "S2 pending admin actions". I verify URLs and close S2.

---

## S1 — Theme deploy + debug (2026-04-22, session 2, DONE)

**Objective**: deploy the Livrome Dawn fork to the Shopify store; verify homepage renders.

**Outcome**: theme live on `petithero.myshopify.com` (theme_id `158897996027`), homepage renders all 7 Livrome sections + Dawn header/footer. S1 complete.

**Handle rename deferred**. Shopify's `.myshopify.com` rename is a one-time-lifetime action that forces OAuth app reinstall (MCP would need re-auth + session restart). Since customers will see `livrome.com` via custom domain in S18, the internal handle stays `petithero.myshopify.com` — cosmetic-only impact. Saves the rename token for a future emergency.

**Theme upload path**: Shopify CLI `shopify theme push` device-code auth was attempted twice, expired both times before user could click the activation URL (~10 min lag). Fell back to admin UI ZIP upload. Key gotcha: PowerShell `Compress-Archive` writes backslash-separated entries which Shopify rejects ("missing template `layout/theme.liquid`"); rebuilt with Python `zipfile` (forward slashes) and upload went through.

**Post-upload bug: homepage 404 for `/`**:
- Symptom: `GET /` returned HTTP 404 with Dawn's "Page not found" template. Shopify couldn't resolve `templates/index.json`.
- Root cause: `sections/livrome-library.liquid:63` used SQL-style double-apostrophe escaping (`Grandma''s Garden`, `Moon''s Sister`) inside a `'...'` Liquid string. Invalid Liquid syntax → `LiquidHTMLSyntaxError` → `livrome-library` section failed to compile → `templates/index.json` (which references it) fell back to 404.
- Found via `shopify theme check` — the only LiquidHTMLSyntaxError in our sections.
- Fix: switched string delimiter to `"..."` and removed the doubled quotes (commit `<pending>`). Rebuilt + re-uploaded as `livrome-v1-1.zip` → published → homepage 200 OK.

**Navigation audit (end of S1)** — expected broken links, all deferred to S2:
- ✓ 200: `/`, `/cart`, `/search`, `/collections/all` (empty but renders), `/pages/contact` (Dawn default template)
- ✗ 404: `/pages/faq`, `/pages/coming-soon` — S2 will create these pages
- ✗ DNS not set: `https://preview.livrome.com/preview/start?book=book-01` — S4+ will ship the Next.js preview app + wire domain

**Password protection**: user temporarily removed it during debug to bypass `/password` redirect. Store is currently publicly accessible. **Action needed**: re-enable at Settings → Preferences → Password protection before public search engines index the placeholder content.

**Next session (S2)**: Create pages (FAQ, About, Contact copy, Coming Soon, Track Order, 404 copy, legal stubs), placeholder Book #1 product, collection, main-menu entries. FR-CA + EN copy from `UI/i18n.jsx`.

---

## S1 — Repo foundations & docs (2026-04-22, session 1, DONE via session 2)

**Objective**: Repo skeleton + doc scaffolding + Shopify theme picked & installed.

**Built so far**:
- Monorepo directory layout under `C:\Users\Titouza\Documents\petit hero\`: `shopify/`, `preview-app/`, `preview-api/`, `pdf-service/`, `content/book-01/base-scenes/`, `docs/`
- `docs/ARCHITECTURE.md` — locked architecture, repo layout, component descriptions, key flows, env separation
- `docs/PROGRESS.md` — S1-S19 status tracker, blockers, external dep status
- `docs/SESSION_LOG.md` — this file
- `docs/DECISIONS.md` — 10 ADRs (D001–D010) seeded from plan's architectural decisions
- `docs/API_CONTRACTS.md` — empty shell with section headers for S8/S12/S13/S14 to fill in
- `README.md` — project overview + dev setup + session model

**Pending in S1 (blocked on Claude Code restart to load Shopify MCP)**:
- User answered: rename handle to `livrome.myshopify.com` (execute when MCP loads)
- Open question raised by user: can we use the Claude Design UI as the Shopify theme?
  - Answer: partially — tokens.css and i18n can be reused everywhere, but Shopify theme requires Liquid, not React. Three paths offered: (1) port visuals into Dawn Liquid (recommended for V1 speed), (2) full headless Next.js + Shopify backend, (3) Shopify Hydrogen. User to pick on resume.
- Once MCP loaded + paths chosen: install theme, rename handle, apply brand primitives (colors from `UI/tokens.css`, Fraunces/Inter/Caveat fonts), set email sender to "Livrome"

**Decisions made**:
- Brand name: PetitsHéros → **Livrome** (rebranded)
- Domain: `livrome.com` registered, DNS wiring deferred to S18
- See `DECISIONS.md` D001–D010 for architectural decisions

**Blockers / risks surfaced**: none new

**Commits**: not yet (git init at end of S1)

**Next session (S2)**: Create Shopify homepage sections + placeholder product + legal stubs (FR-CA + EN) via MCP. Read `UI/i18n.jsx` for copy, `UI/artboard_homepage.jsx` for layout intent.

**S1 side-quest: Dawn theme port — Claude Design misfire + in-house salvage** (2026-04-22, commit `700740c`)
- Claude Design returned homepage Liquid, but they invented a fictional independent bookshop brand called "**Paperhaven**" with copy about subscription curation, human booksellers, twine packaging, 4221 Rue Saint-Denis, etc. Bore no resemblance to Livrome (personalized children's books, one-off purchase, face-swap AI, Quebec market).
- Root cause hypothesis: Claude Design saw the `ph-` CSS class prefix in `UI/primitives.jsx` (legacy from "PetitsHéros" working name), misread it as "Paperhaven" (a common design-system placeholder brand), and hallucinated the product around that template.
- Evidence: 47 Paperhaven-specific mentions in their output (Paperhaven, bookshop, subscription, bookseller, twine, Rue Saint-Denis, independent press) vs 2 incidental Livrome/PetitsHéros mentions.
- **Resolution**: user chose to salvage Claude Design's Liquid skeleton + rewrite copy ourselves rather than round-trip for another attempt.
- Output in `shopify/theme/`: 7 new sections (`livrome-hero`, `-library`, `-how`, `-voices`, `-trust`, `-faq`, `-final-cta`), `assets/livrome-tokens.css` (Livrome palette from `UI/tokens.css` — plum #5B2A6F, honey #F4B942), `templates/index.json` rewired, `layout/theme.liquid` loads Google Fonts (Fraunces/Inter/Caveat) + tokens CSS.
- Kept `.ph-*` CSS class prefix shared with `UI/tokens.css` so Shopify theme and Next.js preview app use the same primitives. Section files and schema names use `livrome-*` / "Livrome · X" for merchant-facing clarity.
- Skipped Dawn overrides (featured-collection, footer, header, image-banner, multicolumn, card-product, icon-accordion) — Claude Design produced these but they're not needed for homepage-only scope. Defer to S2/S3.
- `UI/shopify/` and `UI/shopify-theme/` (Claude Design's raw output) deleted after port completed (2026-04-22). Never committed. If you see references to them elsewhere, they're gone.

**Previous S1 side-quest: Dawn theme handoff to Claude Design** (2026-04-22)
- Cloned Dawn 15.4.1 into `shopify/theme/` (commit `6ec...`, 369 files)
- Built `livrome-theme-handoff.zip` (1080 KB, forward-slash paths) — initially for file upload
- Claude Design requested GitHub instead → pushed to public repo **https://github.com/mt-premiercloud/livrome**
- README updated with explicit copyright + public-repo intent (Dawn's BSD-3 separately ack'd)
- Claude Design will: (1) port `UI/artboard_homepage.jsx` layout to `theme/sections/livrome-*.liquid` sections, (2) create `theme/snippets/livrome-book-cover.liquid` SVG fallback, (3) emit `shopify/metaobjects/book.schema.json` + `.md`, (4) editorial hero variant only, (5) fonts via `<link>` not font_picker
- Blocks S2 execution by ~a few hours of Claude Design turnaround, not on critical path — user can start S4 (Next.js scaffolding) in parallel if desired

---
