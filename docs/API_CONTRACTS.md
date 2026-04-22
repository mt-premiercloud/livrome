# Livrome — API Contracts

Service-to-service interfaces. Filled in as each service is built.

---

## preview-api (S8)

### POST `/generate-page`

**Purpose**: Single face-swap. Takes a child photo + a base scene + prompt, returns a candidate with the hero's face replaced.

**Request**: _TBD in S8_
**Response**: _TBD in S8_
**Errors**: _TBD in S8_
**Auth**: _TBD in S8_ (likely HMAC from Inngest workflow)

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
