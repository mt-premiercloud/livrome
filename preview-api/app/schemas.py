"""Pydantic request / response schemas for the preview API."""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, field_validator


Gender = Literal["boy", "girl", "neutral"]
BookLanguage = Literal["fr", "en"]


class ChildAttributes(BaseModel):
    """What the preview flow collects in Step 2."""

    name: str = Field(..., min_length=1, max_length=24)
    age: int = Field(..., ge=2, le=12)
    gender: Gender
    skin_idx: int = Field(..., ge=0, le=4, description="0 (lightest) .. 4 (deepest)")

    @field_validator("name")
    @classmethod
    def _strip(cls, v: str) -> str:
        return v.strip()


class GeneratePageRequest(BaseModel):
    book_id: str = Field(..., examples=["book-01"])
    page_num: int = Field(..., ge=1, le=48, description="Up to 48 to allow future longer books")
    child: ChildAttributes
    photo_data_url: str = Field(
        ..., description="Client-uploaded photo as data:image/... URL. Stored <30 days per privacy policy."
    )
    lang: BookLanguage = "en"
    variant_count: int = Field(default=4, ge=1, le=4)
    seed: int | None = Field(default=None, description="Optional — pin for regeneration reproducibility")


class VariantImage(BaseModel):
    variant_idx: int = Field(..., ge=0, le=3)
    image_url: str = Field(..., description="Either a data: URL (mock) or a signed GCS / R2 URL (prod)")
    seed: int
    prompt_hash: str = Field(..., description="Short hash of the prompt so clients can dedupe / cache")


class GeneratePageResponse(BaseModel):
    book_id: str
    page_num: int
    variants: list[VariantImage]
    mock: bool = False
    latency_ms: int


class ErrorResponse(BaseModel):
    error: str
    detail: str | None = None
