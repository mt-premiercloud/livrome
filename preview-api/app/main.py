"""Livrome preview generation API.

Single endpoint for the MVP:
  POST /generate-page
      → 4 variant images for one book page given child attributes.

See docs/API_CONTRACTS.md for the full contract and prompt-engineering notes.

Mock mode (default):
  USE_MOCK=1 returns deterministic SVG placeholders.

Prod mode:
  USE_MOCK=0 + OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET set → calls Imagen 4
  through Gemini Enterprise OAuth (same refresh-token pattern as
  Downloads/perso/main.py).
"""

from __future__ import annotations

import base64
import logging
import time
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .config import Settings, get_settings
from .imagen_client import ImagenClient, ImagenError, prompt_hash
from .mock import make_svg_png_placeholder, stable_seed, svg_to_data_url
from .prompts import build_prompt
from .schemas import GeneratePageRequest, GeneratePageResponse, VariantImage

logger = logging.getLogger("livrome.preview-api")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")

CONTENT_ROOT = Path(__file__).resolve().parents[2] / "content"


def create_app(settings: Settings | None = None) -> FastAPI:
    cfg = settings or get_settings()
    app = FastAPI(
        title="Livrome preview API",
        version="0.1.0",
        description="Generates personalized book-page variants. See docs/API_CONTRACTS.md.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=cfg.allowed_origins,
        allow_credentials=False,
        allow_methods=["POST", "GET", "OPTIONS"],
        allow_headers=["Content-Type"],
    )

    imagen: ImagenClient | None = None if cfg.use_mock else ImagenClient(cfg)

    @app.on_event("shutdown")
    async def _shutdown() -> None:
        if imagen:
            await imagen.aclose()

    @app.get("/health")
    def health() -> dict:
        return {
            "ok": True,
            "mode": "mock" if cfg.use_mock else "prod",
            "imagen_model": cfg.imagen_model,
        }

    @app.post("/generate-page", response_model=GeneratePageResponse)
    async def generate_page(req: GeneratePageRequest) -> GeneratePageResponse:
        t_start = time.perf_counter()
        logger.info(
            "generate-page book=%s page=%d lang=%s variants=%d mock=%s",
            req.book_id,
            req.page_num,
            req.lang,
            req.variant_count,
            cfg.use_mock,
        )

        try:
            prompt = build_prompt(
                book_id=req.book_id,
                page_num=req.page_num,
                child=req.child,
                lang=req.lang,
                content_root=CONTENT_ROOT,
            )
        except FileNotFoundError as e:
            raise HTTPException(status_code=404, detail=f"book not found: {e}") from e
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e)) from e

        p_hash = prompt_hash(prompt)

        variants: list[VariantImage] = []

        if cfg.use_mock or imagen is None:
            for v in range(req.variant_count):
                svg = make_svg_png_placeholder(
                    page_num=req.page_num,
                    variant_idx=v,
                    child_name=req.child.name,
                    lang=req.lang,
                )
                variants.append(
                    VariantImage(
                        variant_idx=v,
                        image_url=svg_to_data_url(svg),
                        seed=req.seed if req.seed is not None else stable_seed(req.book_id, req.page_num, v),
                        prompt_hash=p_hash,
                    )
                )
        else:
            try:
                png_bytes_list = await imagen.generate(
                    prompt=prompt,
                    sample_count=req.variant_count,
                    aspect_ratio=cfg.default_aspect_ratio,
                    seed=req.seed,
                )
            except ImagenError as e:
                logger.error("imagen failure: %s", e)
                raise HTTPException(status_code=502, detail=f"imagen upstream error: {e}") from e

            for v, png in enumerate(png_bytes_list):
                variants.append(
                    VariantImage(
                        variant_idx=v,
                        image_url="data:image/png;base64," + base64.b64encode(png).decode("ascii"),
                        seed=req.seed if req.seed is not None else stable_seed(req.book_id, req.page_num, v),
                        prompt_hash=p_hash,
                    )
                )

        latency_ms = int((time.perf_counter() - t_start) * 1000)
        return GeneratePageResponse(
            book_id=req.book_id,
            page_num=req.page_num,
            variants=variants,
            mock=cfg.use_mock,
            latency_ms=latency_ms,
        )

    return app


app = create_app()
