# Livrome — API Contracts

Service-to-service interfaces. Filled in as each service is built.

---

## preview-api (S8)

### POST `/generate-page`

**Purpose**: Return N (default 4) variant illustrations for one page of one book, personalized to one child. The client of this endpoint is either the Next.js preview app directly (MVP) or an Inngest worker that fans out 24 pages in parallel (S10).

**Base URL**: `https://preview-api.livrome.com` (prod, S18). Locally: `http://localhost:8787`.

**Auth**: open in mock mode. In prod mode: plain HTTPS for now; Inngest HMAC signing lands in S10 once the orchestrator is wired.

**Request body** (`application/json`):

```jsonc
{
  "book_id": "book-01",              // matches content/book-XX/manifest.json
  "page_num": 1,                     // 1..page_count
  "child": {
    "name": "Léo",                   // 1..24 chars, trimmed
    "age": 5,                        // 2..12
    "gender": "boy",                 // "boy" | "girl" | "neutral"
    "skin_idx": 1                    // 0..4, maps to SKIN_TONE_LABELS
  },
  "photo_data_url": "data:image/jpeg;base64,/9j/4AAQ...",
  "lang": "fr",                      // "fr" | "en"
  "variant_count": 4,                // 1..4
  "seed": null                       // optional int; lets us pin regen output
}
```

**Response** (`GeneratePageResponse`):

```jsonc
{
  "book_id": "book-01",
  "page_num": 1,
  "variants": [
    {
      "variant_idx": 0,
      "image_url": "data:image/svg+xml;base64,...",  // or https://r2.livrome/... in S11
      "seed": 427193,
      "prompt_hash": "e3b0c44298fc"                   // 12-char SHA-1 prefix
    }
    // ...3 more
  ],
  "mock": true,
  "latency_ms": 42
}
```

**Error codes**:

| Status | When |
|---|---|
| 400 | `book_id` or `page_num` not in manifest; validation of `child` fields. |
| 404 | `content/{book_id}/manifest.json` missing. |
| 502 | Imagen upstream error (rate limit, safety block, quota). |
| 500 | Unexpected — surfaced with minimal detail; full trace in logs. |

**Modes**:

- **Mock** (`USE_MOCK=1`, default in dev): returns deterministic SVG placeholders via `app/mock.py`. Same 4-palette set used by the preview-app's `BookPageSpread` component so the UI looks coherent when the real model is absent. Zero external calls.
- **Prod** (`USE_MOCK=0`): calls Vertex AI Imagen 4 (`imagen-4.0-generate-001`) through Gemini Enterprise OAuth refresh-token — same pattern as `Downloads/perso/main.py`. Access token cached for ~1 hour. Refresh token comes from Secret Manager (`user-refresh-token`) or `REFRESH_TOKEN` env var.

### Prompt template

Assembled in `preview-api/app/prompts.py` from three sources:

1. **Child phrase** — age, skin tone, gender ("A 5-year-old child with light skin tone, wearing cream pyjamas with plum trim.").
2. **Scene note** — one sentence per page from `_scene_note_for_page(page_num)`. The terse version; the full brief for our illustrator lives in `content/book-01/base-scenes/scene-notes.md`.
3. **Style bible** — the Livrome watercolor look, palette hex values, one-light-source rule, negative-space-for-text rule.

### Quality spike

The goal of S8's spike (one-shot): run **one real `/generate-page` call** per book page, save the 4 variants to `content/spike/book-01/page-XX/`, iterate on the prompt until we're consistently on-style across all 24 pages. What "on-style" means:

- Child figure present and centered per `hero_bounds`.
- Palette matches bible (±10% on dominant hue).
- Face is paintable over; pipeline doesn't need to fight pre-rendered features.
- No text in the generated image.
- No unsafe content (should be blocked by Imagen's own safety layer anyway).

When we're happy with the spike, we lock the prompt template and advance to S10 where Inngest orchestrates 24 parallel calls per preview.

### Rate limits + quota

- Imagen 4 quota at the account level: 60 req/min. At 4 variants × 24 pages = 96 calls per preview, we hit the limit on a single preview generated in less than ~2 minutes. S10 plans: **rolling 12-concurrency** with 5-second spacing so one preview takes ~40 s of wall time but stays under quota if two happen simultaneously.
- Mock mode has no rate limit.

### Versioning

`/generate-page` is versionless for now. If we ever break the contract, we'll cut `/v2/generate-page` rather than adding query flags.

---

## Shopify Storefront API (S12)

### `cartCreate` mutation

**Purpose**: Inject a line item + `preview_id` attribute so the order webhook can correlate back to the preview.

**Request**: _TBD in S12_
**Line item properties**: `preview_id` (uuid), `child_name` (string, for display only)

---

## pdf-service (S13)

### POST `/assemble`

**Purpose**: Assemble print-ready PDF from selected candidates.

**Request**: _TBD in S13_
**Response**: _TBD in S13_ (streamed PDF or URL to R2-uploaded PDF)

---

## Shopify webhook → order-webhook (S14)

### `order.created` webhook

**Purpose**: Trigger PDF assembly + print job when customer completes checkout.

**Request**: Shopify-signed HMAC body
**Handler flow**: _TBD in S14_

### LuluAdapter interface

**Purpose**: Abstract print fulfillment so mock (V1) and real (S18) are interchangeable.

**Methods**: _TBD in S14_
```ts
interface LuluAdapter {
  createPrintJob(pdf_url: string, cover_url: string, shipping: Address): Promise<PrintJob>
  getTracking(job_id: string): Promise<TrackingInfo>
}
```

---
