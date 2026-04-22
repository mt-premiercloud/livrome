# Livrome — Discount strategy

Spec for the discount programs Livrome will offer. Created in Shopify admin → **Discounts**. Low priority for launch — pick one or two to start.

## 1. Welcome 10% (newsletter signup)

| Field | Value |
|---|---|
| Type | Amount off products |
| Code | `WELCOME10` |
| Customer gets | 10% off entire order |
| Minimum purchase | None |
| Customer eligibility | Specific customers who subscribed via newsletter form (tag: `newsletter`) |
| Usage limits | One use per customer |
| Combinations | Do **not** combine with other discounts |
| Active dates | Ongoing |

**Wire-up**: newsletter signup form → Shopify customer tag `newsletter` → Klaviyo welcome flow sends the code. S15 work.

## 2. Gift bundle (buy 2, save $10)

| Field | Value |
|---|---|
| Type | Buy X get Y |
| Customer buys | 2 products from collection **All books** |
| Customer gets | $10 off |
| Combinations | Do not combine |
| Usage limits | None (runs automatically) |
| Dates | Ongoing |

**Intent**: reward grandparents buying 2 books (often one per grandchild).

## 3. Referral ($5 off for referrer + referee)

Out of scope for S3. Requires a referral app (ReferralCandy, Yotpo Loyalty, or similar) in S15+ when we have enough orders to justify the SaaS cost.

## 4. Seasonal (manual, case-by-case)

- Black Friday (late November): `BF25` — 25% off hardcover
- Fête des Mères / Mother's Day: `MAMAN20` — 20% off
- Christmas cutoff booster: `NOEL15` — 15% off, expires ship-by date

Create per-campaign, expire automatically after the window.

## Stacking rules (global)

- Only one code per order.
- Welcome 10% is not combinable with any automatic discount (so grandparents buying 2 books get the $10 bundle, not the 10% — our margin math checked).
- Free shipping threshold ($75 CAD, Canada only) is not a "discount" in Shopify — it's a shipping rate rule, applied automatically regardless of discount codes.

## Metrics to watch

| Metric | Target (first 3 months) |
|---|---|
| Welcome code redemption rate | > 20% of subscribers |
| Average order value with bundle | $48 CAD (vs. $29 solo) |
| Discount-attributable revenue | < 20% of total revenue (otherwise we're subsidizing, not incentivizing) |
| Usage per code | Monitor for abuse patterns (same IP, multiple accounts) |
