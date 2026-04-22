# Livrome

AI-personalized children's books for the Quebec / French-Canadian market. Shopify storefront + Next.js preview app + Python PDF service, all orchestrated via Inngest, powered by nano-banana (Gemini Enterprise) face-swap.

**Domain**: livrome.com (registered)
**Shopify store**: petithero.myshopify.com (handle may be renamed in S1)
**GCP project**: pcagentspace

---

## Repo layout

```
.
├── UI/              Claude Design output — READ-ONLY reference
├── shopify/         Shopify theme notes, migration scripts
├── preview-app/     Next.js 15 + TS + Tailwind + Shadcn (the 7-step flow)
├── preview-api/     TypeScript Cloud Run — calls nano-banana for face-swap
├── pdf-service/     Python FastAPI Cloud Run — print-ready PDF assembly
├── content/
│   └── book-01/     First book: script, manifest, base scenes, cover
└── docs/            Architecture, progress, session log, decisions, API contracts
```

## The 5 docs (read these first, always)

| File | What it is | Read when |
|---|---|---|
| `docs/ARCHITECTURE.md` | Locked system architecture + diagram | Touching a new service boundary |
| `docs/PROGRESS.md` | Session-by-session status + blockers | **Start of every session** |
| `docs/SESSION_LOG.md` | Chronological log of each session | Start of every session (last 1-2 entries) |
| `docs/DECISIONS.md` | ADRs — locked decisions, supersede-only | Before making an arch change |
| `docs/API_CONTRACTS.md` | Service-to-service interfaces | Touching cross-service calls |

---

## Build model

This project is built in **19 incremental sessions**, each 2-4 hours. Sessions are atomic and self-contained. See the full plan at `C:\Users\Titouza\.claude\plans\good-now-this-is-prancy-wombat.md`.

**Start-of-session ritual**:
1. Read `docs/PROGRESS.md`
2. Read last entry in `docs/SESSION_LOG.md`
3. Read other docs only if relevant to session's work

**End-of-session ritual**:
1. Update `docs/PROGRESS.md` (mark done, set next action)
2. Append entry to `docs/SESSION_LOG.md`
3. New ADR in `docs/DECISIONS.md` if architecture changed
4. Commit WIP

---

## Development (to be set up in later sessions)

Nothing to run yet. S4 scaffolds `preview-app`, S8 scaffolds `preview-api`, S13 scaffolds `pdf-service`. Each will add its own run commands here.

---

## Reference implementation

The nano-banana AI pattern (auth + streamAssist + reference-image multimodal) is already working in `C:\Users\Titouza\Downloads\perso\main.py`. `preview-api` is a minimal TS port of that pattern. See `memory/reference_nanobanana_pattern.md` in the Claude Code memory system for the distilled reference.

---

## License & ownership

Proprietary. All rights reserved.
