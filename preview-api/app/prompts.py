"""Prompt builder for Imagen 4 calls.

We assemble prompts from four sources:
  • `book manifest` — palette, theme, page scene note.
  • `child attributes` — age, skin tone, gender (influences hair/clothing hints
    but keeps the base illustration gender-neutral when possible).
  • `style bible` — Livrome voice (watercolor, warm, keepsake).
  • `photo grounding` — (future) attach the child's photo as reference for face
    likeness. Imagen 4 accepts image reference via `subjectImages`; we pass a
    URI placeholder for now and wire the real hand-off in S10.

Prompt engineering notes live in docs/API_CONTRACTS.md.
"""

from __future__ import annotations

import json
from pathlib import Path

from .schemas import ChildAttributes

STYLE_BIBLE = (
    "Style: children's book watercolor illustration. "
    "Hand-drawn line with varied weight, soft watercolor wash, slight paper grain. "
    "Warm keepsake tone — feels like a gift. "
    "Palette: plum (#5B2A6F), plum-deep (#3F1C4F), honey (#F4B942), cream (#FFF8EC). "
    "Single dominant light source per scene. "
    "Negative space for text at bottom 15% of frame. "
    "No hard bleed edges. No text in the image."
)

SKIN_TONE_LABELS = [
    "very light skin tone",
    "light skin tone",
    "medium skin tone",
    "deep skin tone",
    "very deep skin tone",
]


def load_manifest(book_id: str, content_root: Path) -> dict:
    path = content_root / book_id / "manifest.json"
    return json.loads(path.read_text(encoding="utf-8"))


def build_prompt(
    *,
    book_id: str,
    page_num: int,
    child: ChildAttributes,
    lang: str,
    content_root: Path,
) -> str:
    manifest = load_manifest(book_id, content_root)
    page = next((p for p in manifest["pages"] if p["num"] == page_num), None)
    if page is None:
        raise ValueError(f"Page {page_num} not found in manifest for {book_id}")

    # Re-use the script's scene note via a short synthetic description per page.
    # The full brief lives in base-scenes/scene-notes.md; we pass a trimmed
    # version through to the model rather than the whole document.
    scene_note = _scene_note_for_page(page_num)

    tone = SKIN_TONE_LABELS[child.skin_idx]
    age_phrase = f"{child.age}-year-old" if child.age else "young"
    gender_phrase = {
        "boy": "child",
        "girl": "child",
        "neutral": "child",
    }[child.gender]

    parts = [
        f"A {age_phrase} {gender_phrase} with {tone}, wearing cream pyjamas with plum trim.",
        f"Scene — page {page_num} of \"[NAME] and the Stars\" (book {book_id}):",
        scene_note,
        STYLE_BIBLE,
    ]

    return " ".join(parts)


def _scene_note_for_page(page_num: int) -> str:
    """Short scene description per page — echoes scene-notes.md but terse enough for a prompt."""
    notes = {
        1: "Child sitting cross-legged on a small bed, looking toward a tall narrow window at right. Moonlight entering in a honey wedge across the floor. Quiet, awake mood.",
        2: "Wide shot of the bedroom. Child small-in-frame, tucked at the pillow. Ceiling dominates in plum-deep. Four or five stars glint through the window.",
        3: "One fist-sized honey-yellow star mid-bounce on the blanket. Child in three-quarter view, eyes wide, mouth slightly round — surprise, not fear. Honey sparks drift off the star.",
        4: "Close-up. Child leaning forward over the pillow. Tiny palm-sized star with two dot eyes and half-smile rests on the pillow, glowing. Warm honey halo.",
        5: "Camera low. Six stars of varying sizes bouncing across the bed, floor, nightstand. Child sitting up, laughing quietly, one star cupped in both hands.",
        6: "Child sitting on edge of bed, feet not yet on the floor. One star in right palm, looking up at child. Rest of stars gathered on pillow behind. Child's expression: resolved.",
        7: "Floor-level shot. Child pulling a plum-deep coat over pyjamas. Boots at left with stars peeking out of each boot. Window slightly ajar behind.",
        8: "Child crouched at the open window, back toward viewer, arm extended. One star lifting up from palm into night sky. Single tree silhouette outside, moon above.",
        9: "Night exterior. Child in coat and boots kneeling in a garden. Releasing a star above a sleeping striped cat curled near tulips. One warm lamp in a distant window.",
        10: "Cobblestone lane at night. Child walking left-to-right, hands cupped in front of chest holding three glowing stars. Gas-style lamps receding. Soft fog at ankles.",
        11: "Narrow stone stairway between tall townhouses. Stars hover above next step, glowing, marking the path. Child looking up, one hand on banister.",
        12: "Wide-angle. Child standing on the peak of a pitched slate rooftop, arms slightly out for balance. Sky fills 75% of frame. Chimney at left with warm smoke curling.",
        13: "Close-up of child's open right palm, star lifting off with a honey spiral trail upward. Child's face in three-quarter view, content.",
        14: "Child bottom-center, very small, on a slight hilltop ridge. Sky fills 80% of frame with hundreds of varied stars and a wisp of indigo cloud.",
        15: "Tight portrait. Child's face fills 45% of frame, looking directly at viewer. Starlight glints in the irises. Graded plum-deep backdrop. Calm, brave.",
        16: "Moonlit grassy hill. Child walking up at a gentle angle. Two honey stars glowing through the fabric of the coat pocket. Moon low on horizon behind.",
        17: "Wide shot. Child silhouetted on hilltop, arms at sides, looking up. Sky fills 85% of frame. One visible clear patch of dark between stars.",
        18: "Close-up on child's open upturned hands. Two honey stars rising in a tight helical trail upward. Child's face out of frame.",
        19: "Wide shot. Full star field, densely scattered honey stars. At top-center, two conspicuously brighter stars touching. Child bottom-third, back to viewer.",
        20: "Point-of-view looking up. Upper 70% of frame is sky with roughly thirty stars. Lower 30% is suggestion of child's upturned face, rim-lit warm honey on cheek and chin.",
        21: "Child walking down the grassy hill, back to viewer, toward a small village below. One window lit warm. Moon setting at left edge. Plum-deep sky softening toward horizon.",
        22: "Interior. Child sliding under the blanket. Coat draped over chair. Boots beneath. One star glimmers on the windowsill outside.",
        23: "Close-up of child's sleeping face. Tiny satisfied smile. Three soft blurred stars from a mobile at top edge of frame.",
        24: "View through the bedroom window at night, from outside. Child dimly visible asleep through the glass. One bright star mid-frame with a honey halo and faint smile.",
    }
    return notes.get(page_num, "A tender watercolor scene from the book.")
