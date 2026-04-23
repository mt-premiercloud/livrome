# Livrome preview-api

FastAPI service that returns personalized book-page variants. See `docs/API_CONTRACTS.md` for the full contract and prompt-engineering notes.

## Quick start (mock mode — no credentials)

```bash
cd preview-api
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

pip install -e .[dev]
USE_MOCK=1 uvicorn app.main:app --reload --port 8787
```

Then:

```bash
curl -s -X POST http://localhost:8787/generate-page \
  -H 'content-type: application/json' \
  -d '{
    "book_id": "book-01",
    "page_num": 1,
    "child": { "name": "Léo", "age": 5, "gender": "neutral", "skin_idx": 1 },
    "photo_data_url": "data:image/png;base64,iVBORw0KGgo...",
    "lang": "fr",
    "variant_count": 4
  }' | jq
```

You'll get back four SVG placeholder variants.

## Prod mode (Gemini Enterprise streamAssist — NOT Vertex AI direct)

The generator is Discovery Engine `:streamAssist` on project `pcagentspace`, engine `premiercloud_1747631331912`. This is covered by the Gemini Enterprise license — **do not** switch to Vertex AI `:predict` direct (it bills separately). See `../memory/feedback_gemini_enterprise_streamassist.md`.

Required env vars:

| Env | Purpose |
|---|---|
| `USE_MOCK=0` | Switch off the mock generator. |
| `OAUTH_CLIENT_ID` | Gemini Enterprise app OAuth client (shared with `Downloads/perso/`). |
| `OAUTH_CLIENT_SECRET` | Same app's secret. |
| `GCP_PROJECT_ID` | Defaults to `pcagentspace`. |
| `GCP_PROJECT_NUMBER` | Defaults to `9058228956`. |
| `DE_ENGINE_ID` | Defaults to `premiercloud_1747631331912`. |
| `DE_LOCATION` | Defaults to `global`. |
| `REFRESH_TOKEN_SECRET` | Secret Manager secret name; defaults to `user-refresh-token`. |
| `REFRESH_TOKEN` | *Optional.* Bypass Secret Manager and use this value directly (dev only). |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins. Defaults to localhost:3000 + preview.livrome.com. |

## Project layout

```
preview-api/
├─ pyproject.toml           # FastAPI + Gemini Enterprise deps
├─ README.md                # this file
└─ app/
   ├─ __init__.py
   ├─ config.py             # pydantic-settings env binding
   ├─ schemas.py            # request/response types
   ├─ prompts.py            # prompt builder + scene descriptions
   ├─ mock.py               # SVG placeholder generator
   ├─ gemini_client.py      # Discovery Engine :streamAssist client
   └─ main.py               # FastAPI app + /generate-page
```

## What's next

- **S10**: Inngest orchestrator invokes this endpoint for all 24 pages in parallel, streams progress to the client.
- **S11**: Replace data-URL responses with signed R2 object URLs (+ 30-day retention job).
- **Quality spike**: run one real Imagen call per book, archive the 4 variants, iterate on the prompt template until we're consistently on-style. See `docs/API_CONTRACTS.md § quality spike`.
