"""Imagen 4 client using the Gemini Enterprise OAuth refresh-token pattern.

Mirrors the approach in Downloads/perso/main.py:
  1. Pull refresh token from Secret Manager (or env override).
  2. Exchange it for a short-lived access token at oauth2.googleapis.com.
  3. POST to the Vertex AI Imagen endpoint with the access token.

We cache the access token for its full TTL (Google gives us ~1 hour) so we
don't hammer oauth2 on every request.
"""

from __future__ import annotations

import base64
import hashlib
import logging
import time
from dataclasses import dataclass

import httpx

from .config import Settings

logger = logging.getLogger(__name__)

OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token"
IMAGEN_URL_TEMPLATE = (
    "https://{location}-aiplatform.googleapis.com/v1"
    "/projects/{project_id}/locations/{location}/publishers/google/models/{model}:predict"
)


@dataclass
class CachedToken:
    access_token: str
    expires_at: float


class ImagenError(RuntimeError):
    pass


class ImagenClient:
    """Thin wrapper around Imagen 4 `predict`."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._token: CachedToken | None = None
        self._client = httpx.AsyncClient(timeout=60.0)

    async def aclose(self) -> None:
        await self._client.aclose()

    # ── token plumbing ───────────────────────────────────────────────

    def _get_refresh_token(self) -> str:
        if self._settings.refresh_token_override:
            return self._settings.refresh_token_override

        # Lazy import so the module still loads without GCP deps in mock mode.
        try:
            from google.cloud import secretmanager
        except ImportError as e:  # pragma: no cover — dev convenience
            raise ImagenError(
                "google-cloud-secret-manager isn't installed. "
                "Either install deps or set REFRESH_TOKEN directly."
            ) from e

        client = secretmanager.SecretManagerServiceClient()
        name = (
            f"projects/{self._settings.gcp_project_number}"
            f"/secrets/{self._settings.refresh_token_secret_name}/versions/latest"
        )
        response = client.access_secret_version(request={"name": name})
        return response.payload.data.decode("utf-8")

    async def _get_access_token(self) -> str:
        now = time.time()
        if self._token and self._token.expires_at > now + 30:
            return self._token.access_token

        if not self._settings.oauth_client_id or not self._settings.oauth_client_secret:
            raise ImagenError(
                "OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET must be set in prod mode. "
                "Or set USE_MOCK=1 for local dev."
            )

        refresh_token = self._get_refresh_token()

        resp = await self._client.post(
            OAUTH_TOKEN_URL,
            data={
                "client_id": self._settings.oauth_client_id,
                "client_secret": self._settings.oauth_client_secret,
                "refresh_token": refresh_token,
                "grant_type": "refresh_token",
            },
        )
        if resp.status_code != 200:
            raise ImagenError(f"OAuth token exchange failed: {resp.status_code} {resp.text}")
        payload = resp.json()
        self._token = CachedToken(
            access_token=payload["access_token"],
            expires_at=now + int(payload.get("expires_in", 3600)),
        )
        return self._token.access_token

    # ── imagen call ──────────────────────────────────────────────────

    async def generate(
        self,
        *,
        prompt: str,
        sample_count: int,
        aspect_ratio: str,
        seed: int | None,
    ) -> list[bytes]:
        """Return `sample_count` PNG byte blobs for the given prompt."""
        url = IMAGEN_URL_TEMPLATE.format(
            location=self._settings.gcp_location,
            project_id=self._settings.gcp_project_id,
            model=self._settings.imagen_model,
        )

        token = await self._get_access_token()
        body = {
            "instances": [{"prompt": prompt}],
            "parameters": {
                "sampleCount": sample_count,
                "aspectRatio": aspect_ratio,
                "safetySetting": "block_only_high",
                "personGeneration": "allow_all",
                "addWatermark": False,
            },
        }
        if seed is not None:
            body["parameters"]["seed"] = seed

        logger.info("Imagen call: model=%s sample_count=%d", self._settings.imagen_model, sample_count)
        resp = await self._client.post(
            url,
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json=body,
        )
        if resp.status_code != 200:
            raise ImagenError(f"Imagen returned {resp.status_code}: {resp.text[:400]}")

        data = resp.json()
        predictions = data.get("predictions", [])
        if not predictions:
            raise ImagenError("Imagen returned no predictions — check prompt / quota.")

        return [base64.b64decode(p["bytesBase64Encoded"]) for p in predictions]


def prompt_hash(prompt: str) -> str:
    return hashlib.sha1(prompt.encode("utf-8")).hexdigest()[:12]
