"""Runtime configuration, all env-driven.

We follow the pattern established in Downloads/perso/main.py — OAuth refresh
token + Vertex Imagen endpoint. The project is `pcagentspace`; LOCATION default
is `us-central1`. The refresh token lives in Secret Manager under the name
`user-refresh-token` (already provisioned there).

When `USE_MOCK=1` is set (the default in dev), the endpoint returns a
deterministic SVG placeholder instead of calling Imagen. That lets us run the
whole preview-app stack locally without GCP credentials.
"""

from __future__ import annotations

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Mock switch — on by default so fresh clones run.
    use_mock: bool = Field(default=True, alias="USE_MOCK")

    # GCP / Gemini Enterprise
    gcp_project_id: str = Field(default="pcagentspace", alias="GCP_PROJECT_ID")
    gcp_project_number: str = Field(default="9058228956", alias="GCP_PROJECT_NUMBER")
    gcp_location: str = Field(default="us-central1", alias="GCP_LOCATION")

    # OAuth client (shared Gemini Enterprise app)
    oauth_client_id: str = Field(default="", alias="OAUTH_CLIENT_ID")
    oauth_client_secret: str = Field(default="", alias="OAUTH_CLIENT_SECRET")

    # Refresh token source
    refresh_token_secret_name: str = Field(default="user-refresh-token", alias="REFRESH_TOKEN_SECRET")
    # Optional override — if set, skip Secret Manager and use this directly
    refresh_token_override: str | None = Field(default=None, alias="REFRESH_TOKEN")

    # Imagen model + pricing
    imagen_model: str = Field(default="imagen-4.0-generate-001", alias="IMAGEN_MODEL")
    default_aspect_ratio: str = Field(default="1:1", alias="DEFAULT_ASPECT_RATIO")
    variants_per_request: int = Field(default=4, alias="VARIANTS_PER_REQUEST")

    # HTTP
    allowed_origins: list[str] = Field(
        default=["http://localhost:3000", "https://preview.livrome.com"],
        alias="ALLOWED_ORIGINS",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
