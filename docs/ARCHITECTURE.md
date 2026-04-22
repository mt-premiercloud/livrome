# Livrome — Architecture

**Last updated**: 2026-04-22 (S1)
**Status**: LOCKED for V1 — changes require an ADR in `DECISIONS.md`.

---

## System overview

Livrome is an AI-personalized children's book e-commerce platform. Two connected systems:

- **Shopify storefront** — browse, cart, checkout, accounts, legal (built via Shopify MCP on `petithero.myshopify.com`, brand display = "Livrome", domain will be `livrome.com` in S18)
- **Custom preview app** — the 7-step photo-upload + face-swap AI preview + add-to-cart flow (Next.js 15 on Cloud Run, cannot live in Shopify because of AI + async jobs + storage)

The AI approach is **face-swap**, not page generation. 24 base illustrations exist per book with a placeholder hero. Nano-banana replaces only the hero's face with the customer's child on each page. Story text & composition are fixed.

---

## Architecture diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                               CUSTOMER BROWSER                                │
│                                                                               │
│  ┌────────────────────────┐       ┌─────────────────────────────────────┐    │
│  │ Shopify storefront     │──────>│ Next.js preview app                 │    │
│  │ livrome.com            │  "start│ preview.livrome.com (Cloud Run)     │    │
│  │ (homepage, catalog,    │  your  │   7 steps, photo upload, face det   │    │
│  │  product, FAQ, legal)  │  book" │   flipbook preview, add to cart     │    │
│  └─────────▲──────────────┘       └────────┬───────────────┬────────────┘    │
│            │ Storefront API cart             │ R2 upload   │ Inngest trigger  │
│            │ (line item w/ preview_id)       ▼              ▼                 │
└────────────┼──────────────────────┬─────────────────────────────────────────┘
             │                      │                      │
             │ webhook              │ photo bytes          │ workflow step
             │ order.created        │                      │
             ▼                      ▼                      ▼
  ┌──────────────────┐    ┌──────────────────┐   ┌──────────────────────────┐
  │ order-webhook    │    │ Cloudflare R2    │   │ Inngest (hosted)         │
  │ (Cloud Run)      │    │ photos/          │   │ workflow: 24× parallel   │
  │ → call pdf-svc   │    │ candidates/      │   │ face-swap fan-out         │
  │ → call lulu (mock│    └──────────────────┘   └─────────┬────────────────┘
  │   in V1)         │              ▲                      │
  └────────┬─────────┘              │                      │ each page
           │                        │ read/write           ▼
           ▼                        │              ┌──────────────────────────┐
  ┌──────────────────┐              │              │ preview-api (Cloud Run)  │
  │ pdf-service      │◄─────────────┤              │  POST /generate-page     │
  │ (Cloud Run,      │   Supabase   │              │  reuses perso/ pattern:  │
  │  Python FastAPI) │  (Postgres)  │              │  refresh_token →         │
  │ img2pdf, CMYK,   │              │              │  access_token →          │
  │  bleed, PDF/X-1a │              │              │  streamAssist w/         │
  └────────┬─────────┘              │              │  imageGenerationSpec +   │
           │                        │              │  reference image         │
           ▼                        │              └─────────┬────────────────┘
  ┌──────────────────┐              │                        │
  │ Lulu Direct      │              └────────────────────────┘
  │ (MOCK in V1,     │                        │
  │  real in S18)    │                        ▼
  └──────────────────┘              ┌──────────────────────────┐
                                    │ Vertex AI / Discovery    │
                                    │ Engine (pcagentspace)    │
                                    │ nano-banana-pro          │
                                    └──────────────────────────┘
```

---

## Repository layout

```
C:\Users\Titouza\Documents\petit hero\
├── UI/              Claude Design output — READ-ONLY reference for visuals & copy
├── shopify/         Shopify theme notes, migration scripts (most work via MCP)
├── preview-app/     Next.js 15 + TS + Tailwind + Shadcn (the 7-step flow)
├── preview-api/     TypeScript Cloud Run service that calls nano-banana
├── pdf-service/     Python FastAPI Cloud Run service for PDF assembly
├── content/
│   └── book-01/     First book's script, manifest, base scenes, cover art
└── docs/
    ├── ARCHITECTURE.md   (this file — locked architecture)
    ├── PROGRESS.md       (session-by-session status tracker)
    ├── SESSION_LOG.md    (chronological log of each session's work)
    ├── DECISIONS.md      (ADRs — any arch change needs a new entry)
    └── API_CONTRACTS.md  (service-to-service interfaces)
```

---

## Components

### preview-app (Next.js)
- **Purpose**: all 7 customer-facing preview steps
- **Runtime**: Cloud Run (Node 20)
- **State**: Zustand + localStorage (client), Supabase (server, session resumption)
- **Auth**: Shopify customer session (via Storefront API) + preview session UUID
- **Key libs**: next-intl (FR/EN), react-easy-crop, @mediapipe/tasks-vision (face detect), react-pageflip, framer-motion
- **Integration points**: Inngest triggers, R2 signed uploads, Shopify Storefront API, preview-api calls

### preview-api (TypeScript Cloud Run)
- **Purpose**: single-concern face-swap endpoint calling nano-banana
- **Endpoint**: `POST /generate-page {child_photo_base64, base_scene_url, prompt} → {candidate_base64, mime_type}`
- **Auth pattern** (from `perso/main.py:72-97`):
  1. Fetch user refresh token from GCP Secret Manager (`user-refresh-token`)
  2. Exchange for access token at `oauth2.googleapis.com/token`
  3. Call `discoveryengine.googleapis.com/v1alpha/.../assistants/default_assistant:streamAssist`
  4. Body: `{query: {parts: [{inlineData: photo}, {text: prompt}]}, toolsSpec: {imageGenerationSpec: {}}}`
  5. Parse streaming chunks, extract `groundedContent.content.inlineData.data`
- **Why TS over Python**: aligns with preview-app runtime, shared types, Cloud Run cold starts faster

### pdf-service (Python FastAPI)
- **Purpose**: assemble final print-ready PDF from selected candidates
- **Endpoint**: `POST /assemble {preview_id, selected_candidates: {page_n: candidate_key}} → PDF stream`
- **Stack**: FastAPI + img2pdf + Pillow (CMYK conversion) + reportlab (cover w/ dynamic spine)
- **Specs**: 8.75"×8.75" trim, 0.125" bleed, 300 DPI, CMYK, embedded fonts, PDF/X-1a
- **Why Python**: reuses `perso/` ecosystem, img2pdf + reportlab are the best tools for print-ready PDFs

### order-webhook
- **Purpose**: Shopify order.created → trigger PDF + print
- **Runtime**: Cloud Run (lightweight, Python or TS)
- **Flow**: verify HMAC → extract `preview_id` from line item → call `pdf-service` → upload PDF to R2 → call `LuluAdapter.createPrintJob` → mark Shopify order fulfilled with tracking
- **V1**: `LuluAdapter` is a MOCK — logs, fake-fulfills, fake-tracks. Real Lulu in S18.

### Inngest (async orchestration)
- **Purpose**: fan-out 24 parallel face-swap calls per preview
- **Workflow**: `generate-preview(session_id, photo_url, book_id)` → load manifest → for each page in parallel: POST `/generate-page` → store in R2 + Supabase → emit progress event
- **SLA target**: <90s wall-clock for full 24-page generation (at 3 candidates/page = 72 calls)

### Storage
- **Cloudflare R2**: customer photos (`photos/{preview_id}.jpg`), generated candidates (`candidates/{preview_id}/page_{n}/cand_{m}.png`), final PDFs (`pdfs/{order_id}.pdf`)
- **Supabase (Postgres)**: `previews`, `pages`, `candidates`, `orders`, `photo_deletion_requests` tables
- **GCS**: book base scenes + character sheets (read-only, one-time upload per book)

---

## Key flows

### Preview creation (happy path)
1. Customer clicks "Start your book" on Shopify → redirects to `preview.livrome.com/preview/start`
2. Steps 1-3 collect: book_id, child details, photo (uploaded to R2 with signed URL)
3. Step 4 triggers Inngest workflow `generate-preview`
4. Inngest fans out 24×3 = 72 calls to `preview-api/generate-page` in parallel batches
5. Progress streamed via SSE to Step 4 UI
6. On complete, Step 5 shows candidates; customer picks one per page
7. Step 6 flipbook preview
8. Step 7 → `cartCreate` via Storefront API with line item + `preview_id` attribute
9. Redirect to Shopify checkout

### Order fulfillment
1. Shopify → `order.created` webhook fires
2. `order-webhook` verifies HMAC, extracts `preview_id` from line item properties
3. Calls `pdf-service/assemble` with selected candidates
4. Uploads PDF to R2
5. Calls `LuluAdapter.createPrintJob(pdf_url, shipping_address)`
6. Marks Shopify order fulfilled, attaches tracking
7. Klaviyo shipping email fires

---

## Environment separation

- **Dev**: local Next.js (`pnpm dev`), local preview-api (via Cloud Run emulator), Inngest CLI, Supabase local, R2 dev bucket
- **Staging**: deployed Cloud Run services, Inngest cloud, Supabase staging project, Shopify dev store password-protected
- **Prod**: same infra with prod creds, Shopify store public, real Lulu (S18 onwards)

No staging/prod split in V1 — dev runs locally, staging IS production (with Shopify password protection removed only in S19).
