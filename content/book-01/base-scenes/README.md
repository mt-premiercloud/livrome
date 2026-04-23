# Book #1 — Base scenes

This directory holds the 24 base illustrations + cover for *[NAME] and the Stars*. Each base scene is drawn **once**, by our illustrator, with a blank face oval where the child's face will be composited at preview time. The pipeline then:

1. Loads the base scene.
2. Reads the `hero_bounds` from `../manifest.json`.
3. Generates the personalized face (S8 / `/generate-page` endpoint) in the child's skin tone + features.
4. Composites the face into the oval.
5. Overlays the page text (font: Fraunces 24-32 px, color per `palette_bible`).

See `scene-notes.md` for the illustrator brief: composition, mood, color notes, hero pose per page. See `../manifest.json` for the machine-readable spec.

## Conventions

- **Size**: 2480 × 2480 px at 300 DPI (21 × 21 cm bleed-safe).
- **Format**: PNG-24 with transparent background in the face-oval region so the composite blends. Final face composite fills that oval and the pipeline re-flattens to PNG for print.
- **Filenames**: `page-XX.png` zero-padded to 2 digits. Cover is `cover.png`.
- **Color space**: sRGB for preview. CMYK conversion happens in S13 (pdf-service).

## Current state

- [ ] All 24 page scenes commissioned (waiting on illustrator)
- [ ] Cover
- [x] Scripts + manifest ready (S9, 2026-04-22)
- [x] Scene briefs written (this file + scene-notes.md)
