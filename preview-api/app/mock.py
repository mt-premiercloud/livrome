"""Mock image generator — deterministic SVG placeholders.

Used when `USE_MOCK=1` so fresh clones of the repo can run the full preview-app
flow without GCP credentials. Returns SVG-as-data-URL; downstream clients
treat it identically to the real Imagen response.

The palette rotates through our 4 page-palette variants and the scene depicts
a gradient card with the page number centered — close enough to the
`BookPageSpread` component in the Next.js app.
"""

from __future__ import annotations

import base64
import json
import random


PAGE_PALETTES: list[tuple[str, str, str]] = [
    ("#5B2A6F", "#F4B942", "#FFF8EC"),
    ("#3F1C4F", "#E8B4B8", "#FFF8EC"),
    ("#2E5E7E", "#F4B942", "#FFF8EC"),
    ("#8FB996", "#F4B942", "#FFF8EC"),
]


def make_svg_png_placeholder(
    *,
    page_num: int,
    variant_idx: int,
    child_name: str,
    lang: str,
) -> bytes:
    """Return an SVG bytestring labelled with the page + variant.

    We intentionally return SVG (not PNG) in mock mode to keep deps light.
    The caller wraps this as `data:image/svg+xml;base64,...`.
    """
    palette = PAGE_PALETTES[variant_idx % len(PAGE_PALETTES)]
    primary, accent, bg = palette
    display_name = (child_name or ("Votre héros" if lang == "fr" else "Your hero")).strip()
    caption_line_1 = "Un soir," if lang == "fr" else "One evening,"
    caption_line_2 = f"{display_name} entendit" if lang == "fr" else f"{display_name} heard"
    caption_line_3 = "un chuchotement…" if lang == "fr" else "a whisper…"

    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 720" width="1000" height="720">
  <defs>
    <linearGradient id="bg-{page_num}-{variant_idx}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{primary}" />
      <stop offset="100%" stop-color="{primary}" stop-opacity="0.8" />
    </linearGradient>
    <radialGradient id="glow-{page_num}-{variant_idx}" cx="0.8" cy="0.2" r="0.5">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.4" />
      <stop offset="100%" stop-color="{accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1000" height="720" fill="{bg}" />
  <rect width="500" height="720" fill="url(#bg-{page_num}-{variant_idx})" />
  <rect width="500" height="720" fill="url(#glow-{page_num}-{variant_idx})" />
  <circle cx="390" cy="160" r="70" fill="{accent}" opacity="0.95" />
  <circle cx="250" cy="460" r="50" fill="{accent}" opacity="0.85" />
  <path d="M 0 560 Q 125 480 250 540 T 500 520 L 500 720 L 0 720 Z" fill="{accent}" opacity="0.25" />
  <g font-family="Georgia, serif" fill="{primary}">
    <text x="560" y="260" font-size="48" font-style="italic">{caption_line_1}</text>
    <text x="560" y="320" font-size="48" font-style="italic">{caption_line_2}</text>
    <text x="560" y="380" font-size="48" font-style="italic">{caption_line_3}</text>
  </g>
  <g font-family="Helvetica, Arial, sans-serif" fill="{primary}" opacity="0.5">
    <text x="900" y="690" font-size="22" text-anchor="end">Page {page_num} · mock variant {variant_idx}</text>
  </g>
  <rect x="498" y="0" width="4" height="720" fill="rgba(0,0,0,0.12)" />
</svg>
"""
    return svg.encode("utf-8")


def svg_to_data_url(svg_bytes: bytes) -> str:
    return "data:image/svg+xml;base64," + base64.b64encode(svg_bytes).decode("ascii")


def stable_seed(book_id: str, page_num: int, variant_idx: int) -> int:
    """Deterministic seed so 'regenerate' returns the same variant when needed."""
    return abs(hash(json.dumps([book_id, page_num, variant_idx]))) % (10**9)


def seeded_rng(seed: int) -> random.Random:
    return random.Random(seed)
