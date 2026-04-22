# Livrome — Architecture Decision Records

ADR format: short, dated, with consequences. Once recorded, a decision can only be superseded by a new ADR (never silently changed).

---

## D001 — Monorepo in a single folder (2026-04-22)

**Context**: Three services + Shopify work + content assets need to coexist and share docs.
**Decision**: Single monorepo at `C:\Users\Titouza\Documents\petit hero\` with top-level subdirs per concern. No workspace tool (pnpm workspaces / turbo) in V1 — services have independent `package.json` / `pyproject.toml`.
**Consequences**: Easy cross-referencing, one git history. Mild friction if we ever split into separate repos; worth it for V1 velocity.

---

## D002 — Reuse `perso/` nano-banana pattern verbatim (2026-04-22)

**Context**: `perso/` already proves nano-banana via Gemini Enterprise streamAssist works with OAuth refresh-token flow on pcagentspace project.
**Decision**: `preview-api` ports `get_access_token` and `call_gemini_enterprise_stream_assist` functions from `perso/main.py:72-97` and `:1946-2104`. No direct Vertex AI Imagen. See `memory/reference_nanobanana_pattern.md`.
**Consequences**: Saves days of auth integration work. Locks us to Gemini Enterprise as long as the user holds the license seat. Alternative (direct Imagen via Vertex AI) available as fallback if quality issue emerges.

---

## D003 — Cart attribution via Storefront API cart attributes (2026-04-22)

**Context**: Need to link a Shopify order back to the preview the customer built.
**Decision**: On "Add to cart" (Step 7), call `cartCreate` with `attributes: [{key: "preview_id", value: uuid}]`. The order webhook reads `preview_id` from line item properties and looks up selected candidates.
**Consequences**: Clean, Shopify-native. Risks: attribute could get stripped by apps; S12 validates end-to-end. Fallback: URL query param on checkout return + email webhook correlation.

---

## D004 — Three candidates per page, not five (2026-04-22)

**Context**: Original spec said 5 candidates/page. Face-swap is more deterministic than full generation; 5 is overkill.
**Decision**: Generate 3 candidates/page. "Regenerate" button produces 2 more on demand. Total calls per preview: 24 × 3 = 72.
**Consequences**: ~40% cost reduction. If quality spike in S8 shows high variance, revisit (new ADR).

---

## D005 — Lulu adapter with mock implementation for V1 (2026-04-22)

**Context**: User has no Lulu Direct account yet, but we need the order → print flow working to validate the end-to-end.
**Decision**: Define `LuluAdapter` interface in S14 with a mock implementation (logs, fake-fulfills, fake-tracking email). Real implementation in S18 when user has account.
**Consequences**: Lets V1 ship to password-protected Shopify before Lulu integration. Clean boundary makes S18 swap trivial. Mock must be clearly logged so test orders don't look real.

---

## D006 — Dev-first launch posture (2026-04-22)

**Context**: Many external dependencies (biz entity, Lulu, Klaviyo) not ready. Shouldn't block coding.
**Decision**: Shopify store stays password-protected through S17. Real customers only in S19. All intermediate sessions build against mocks where needed.
**Consequences**: No revenue until S19. No accidental real orders during dev. Test data clearly marked.

---

## D007 — No multi-book abstraction in V1 (2026-04-22)

**Context**: Future plans include multiple books. V1 ships one book only.
**Decision**: Hardcode `book_id = "book-01"` in preview flow. Manifest-driven design makes adding book 2 a S20+ task. Do NOT build a book-selection UI or multi-book admin.
**Consequences**: Faster V1. Multi-book refactor deferred; will be ~1-2 sessions at that time.

---

## D008 — Session state split: R2 (blobs) + Supabase (rows) (2026-04-22)

**Context**: Need durable session state + blob storage + cheap reads.
**Decision**: Files (photos, candidates, PDFs) in Cloudflare R2 via signed URLs. Relational state (`previews`, `pages`, `candidates`, `orders`) in Supabase Postgres. No direct R2 browsing — always signed URLs with short TTL (10 min read, 5 min write).
**Consequences**: R2 egress-free keeps costs low. Supabase free tier covers V1. Split complicates deletion slightly (must remove both); addressed by `photo_deletion_requests` workflow in S16.

---

## D009 — Print-ready PDF specs locked to Lulu hardcover 8.75"×8.75" (2026-04-22)

**Context**: Lulu is the committed POD. Their specs drive PDF constraints.
**Decision**: 8.75"×8.75" trim + 0.125" bleed = 9.0"×9.0" document, 300 DPI, CMYK (via Pillow `.convert('CMYK')` with standard ICC), embedded fonts, PDF/X-1a output. Cover PDF dynamic spine based on page count via reportlab.
**Consequences**: Constrains design. Any theme change (paperback, different size) requires Lulu-spec revalidation + new ADR. S13 implements Lulu preflight API to de-risk S18.

---

## D010 — Observability minimum: Sentry + Inngest dashboard + Shopify native (2026-04-22)

**Context**: Full observability stack is overkill for V1.
**Decision**: Sentry in preview-app, preview-api, pdf-service (free tier). Inngest dashboard for workflow monitoring. Shopify Analytics for storefront. No APM, no log aggregation, no uptime monitoring until S19.
**Consequences**: Lean. If something breaks invisibly in S10-S17, we find it in S17's E2E test. Not acceptable for V2 but fine for V1 closed-beta.

---
