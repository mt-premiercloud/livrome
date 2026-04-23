"""Gemini Enterprise streamAssist client.

Default image-generation path for this repo. Replaces the Vertex AI direct
`/publishers/google/models/imagen-4.0-generate-001:predict` call — per
feedback_gemini_enterprise_streamassist.md, streamAssist is covered by the
Gemini Enterprise license and doesn't bill against Vertex AI.

Pattern source: `Downloads/perso/main.py`. Highlights:
  • URL: discoveryengine.googleapis.com/.../{ENGINE_ID}/assistants/
    default_assistant:streamAssist
  • Body: {"query": {"text": "…"}, "toolsSpec": {"imageGenerationSpec": {}}}
  • Header: `X-Goog-User-Project: {PROJECT_NUMBER}` is required
  • Response: streamed JSON array of chunks; images arrive as
    `part.inlineData.data` (base64) inside `chunk.answer.replies[].content.parts`
  • Auth: same OAuth refresh-token pattern (Secret Manager or REFRESH_TOKEN env)

streamAssist returns **one** image per call. For N variants we issue N
calls in parallel — same wall time as a batch Imagen call, same cost profile
(zero extra billing), and it sidesteps the fileId edge case the perso
notebook complained about.
"""

from __future__ import annotations

import asyncio
import base64
import hashlib
import json
import logging
import time
from dataclasses import dataclass
from typing import Any

import httpx

from .config import Settings

logger = logging.getLogger(__name__)

OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token"


@dataclass
class CachedToken:
    access_token: str
    expires_at: float


class GeminiEnterpriseError(RuntimeError):
    pass


class GeminiEnterpriseClient:
    """Thin async wrapper around Discovery Engine :streamAssist for image generation."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._token: CachedToken | None = None
        self._client = httpx.AsyncClient(timeout=settings.stream_timeout_seconds)

    @property
    def stream_assist_url(self) -> str:
        s = self._settings
        return (
            "https://discoveryengine.googleapis.com/v1alpha"
            f"/projects/{s.gcp_project_number}"
            f"/locations/{s.de_location}"
            "/collections/default_collection"
            f"/engines/{s.de_engine_id}"
            f"/assistants/{s.de_assistant}:streamAssist"
        )

    async def aclose(self) -> None:
        await self._client.aclose()

    # ── token plumbing (identical to perso/main.py get_access_token) ─────

    def _get_refresh_token(self) -> str:
        if self._settings.refresh_token_override:
            return self._settings.refresh_token_override

        try:
            from google.cloud import secretmanager
        except ImportError as e:  # pragma: no cover — dev convenience
            raise GeminiEnterpriseError(
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
            raise GeminiEnterpriseError(
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
            raise GeminiEnterpriseError(
                f"OAuth token exchange failed: {resp.status_code} {resp.text}"
            )
        payload = resp.json()
        self._token = CachedToken(
            access_token=payload["access_token"],
            expires_at=now + int(payload.get("expires_in", 3600)),
        )
        return self._token.access_token

    # ── streamAssist call ─────────────────────────────────────────────

    def _build_body(self, *, prompt: str, reference_image_b64: str | None) -> dict[str, Any]:
        """Shape the streamAssist request per perso/main.py:call_discovery_engine_with_media."""
        if reference_image_b64:
            query = {
                "parts": [
                    {"inlineData": {"mimeType": "image/jpeg", "data": reference_image_b64}},
                    {"text": prompt},
                ]
            }
        else:
            query = {"text": prompt}

        return {
            "query": query,
            "toolsSpec": {"imageGenerationSpec": {}},
        }

    async def _stream_once(self, body: dict[str, Any]) -> list[bytes]:
        """Issue one streamAssist call and return every inlineData image it returns."""
        token = await self._get_access_token()
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Goog-User-Project": self._settings.gcp_project_number,
        }

        logger.info("streamAssist call → %s (image)", self.stream_assist_url)
        async with self._client.stream(
            "POST", self.stream_assist_url, headers=headers, json=body
        ) as resp:
            if resp.status_code != 200:
                text = await resp.aread()
                raise GeminiEnterpriseError(
                    f"streamAssist returned {resp.status_code}: {text[:400]!r}"
                )
            raw = await resp.aread()

        return _extract_images_from_stream(raw.decode("utf-8"))

    async def generate_image(
        self,
        *,
        prompt: str,
        sample_count: int,
        reference_image_b64: str | None = None,
    ) -> list[bytes]:
        """Return `sample_count` PNG byte blobs, one per variant.

        streamAssist returns 1 image per call, so we fan out N concurrent calls.
        The prompt is the same for all, but you can inject variant hints via
        the prompt builder (e.g. "variant A: …", "variant B: …").
        """
        body = self._build_body(prompt=prompt, reference_image_b64=reference_image_b64)

        tasks = [self._stream_once(body) for _ in range(sample_count)]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        images: list[bytes] = []
        errors: list[str] = []
        for i, r in enumerate(results):
            if isinstance(r, Exception):
                errors.append(f"variant {i}: {r}")
                continue
            if not r:
                errors.append(f"variant {i}: streamAssist returned no image")
                continue
            images.append(r[0])  # one per call

        if not images:
            raise GeminiEnterpriseError(
                f"all {sample_count} streamAssist calls failed: {'; '.join(errors)}"
            )
        if errors:
            logger.warning("partial streamAssist failure: %s", "; ".join(errors))

        return images


def _extract_images_from_stream(response_text: str) -> list[bytes]:
    """Parse the streamed chunks and pull inlineData image bytes.

    Mirrors the perso/main.py chunk-walker. The response is a JSON array of
    chunks; each chunk may carry `answer.replies[].groundedContent.content.parts`
    or `answer.replies[].content.parts` with `inlineData.data` (base64).
    """
    chunks: list[dict] = []
    text = response_text.strip()
    if text.startswith("["):
        try:
            parsed = json.loads(text)
            if isinstance(parsed, list):
                chunks = [c for c in parsed if isinstance(c, dict)]
        except json.JSONDecodeError:
            chunks = []
    if not chunks:
        # Fall back to newline-delimited / comma-separated JSON
        for line in response_text.splitlines():
            line = line.strip().lstrip(",").strip()
            if not line or line in {"[", "]"}:
                continue
            try:
                obj = json.loads(line)
                if isinstance(obj, dict):
                    chunks.append(obj)
            except json.JSONDecodeError:
                continue

    images: list[bytes] = []
    for chunk in chunks:
        for reply in chunk.get("answer", {}).get("replies", []):
            for container_key in ("groundedContent", "content"):
                container = reply.get(container_key) or {}
                for part in container.get("parts", []):
                    inline = part.get("inlineData") or {}
                    data_b64 = inline.get("data")
                    if data_b64:
                        try:
                            images.append(base64.b64decode(data_b64))
                        except (ValueError, TypeError):
                            continue
    return images


def prompt_hash(prompt: str) -> str:
    return hashlib.sha1(prompt.encode("utf-8")).hexdigest()[:12]
