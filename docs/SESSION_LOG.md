# Livrome — Session Log

Running log of each build session. Most recent at top.

---

## S1 — Repo foundations & docs (2026-04-22, in progress)

**Objective**: Repo skeleton + doc scaffolding + Shopify theme picked & installed.

**Built so far**:
- Monorepo directory layout under `C:\Users\Titouza\Documents\petit hero\`: `shopify/`, `preview-app/`, `preview-api/`, `pdf-service/`, `content/book-01/base-scenes/`, `docs/`
- `docs/ARCHITECTURE.md` — locked architecture, repo layout, component descriptions, key flows, env separation
- `docs/PROGRESS.md` — S1-S19 status tracker, blockers, external dep status
- `docs/SESSION_LOG.md` — this file
- `docs/DECISIONS.md` — 10 ADRs (D001–D010) seeded from plan's architectural decisions
- `docs/API_CONTRACTS.md` — empty shell with section headers for S8/S12/S13/S14 to fill in
- `README.md` — project overview + dev setup + session model

**Pending in S1 (blocked on user decision)**:
- Theme choice: Impulse / Prestige / Broadcast / Dawn (free)
- Shopify handle rename: keep `petithero.myshopify.com` or rename to `livrome.myshopify.com`
- Once decided: install theme via Shopify MCP, apply brand primitives (colors from `UI/tokens.css`, Fraunces/Inter/Caveat fonts), set email sender to "Livrome"

**Decisions made**:
- Brand name: PetitsHéros → **Livrome** (rebranded)
- Domain: `livrome.com` registered, DNS wiring deferred to S18
- See `DECISIONS.md` D001–D010 for architectural decisions

**Blockers / risks surfaced**: none new

**Commits**: not yet (git init at end of S1)

**Next session (S2)**: Create Shopify homepage sections + placeholder product + legal stubs (FR-CA + EN) via MCP. Read `UI/i18n.jsx` for copy, `UI/artboard_homepage.jsx` for layout intent.

---
