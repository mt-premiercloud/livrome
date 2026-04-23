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

    # Discovery Engine — the streamAssist endpoint covered by the Gemini Enterprise
    # license (NO Vertex AI costs). See feedback_gemini_enterprise_streamassist.md.
    de_engine_id: str = Field(default="premiercloud_1747631331912", alias="DE_ENGINE_ID")
    de_location: str = Field(default="global", alias="DE_LOCATION")
    de_assistant: str = Field(default="default_assistant", alias="DE_ASSISTANT")

    # OAuth client (shared Gemini Enterprise app)
    oauth_client_id: str = Field(default="", alias="OAUTH_CLIENT_ID")
    oauth_client_secret: str = Field(default="", alias="OAUTH_CLIENT_SECRET")

    # Refresh token source
    refresh_token_secret_name: str = Field(default="user-refresh-token", alias="REFRESH_TOKEN_SECRET")
    # Optional override — if set, skip Secret Manager and use this directly
    refresh_token_override: str | None = Field(default=None, alias="REFRESH_TOKEN")

    # Generation knobs. streamAssist generates images via Gemini's imageGenerationSpec —
    # we don't pick the model ID explicitly (Gemini Enterprise picks nano-banana or whatever
    # is current). Variant count is enforced by issuing `variants_per_request` separate calls
    # because streamAssist returns 1 image per call.
    variants_per_request: int = Field(default=4, alias="VARIANTS_PER_REQUEST")
    stream_timeout_seconds: int = Field(default=180, alias="STREAM_TIMEOUT_SECONDS")

    # HTTP
    allowed_origins: list[str] = Field(
        default=["http://localhost:3000", "https://preview.livrome.com"],
        alias="ALLOWED_ORIGINS",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
