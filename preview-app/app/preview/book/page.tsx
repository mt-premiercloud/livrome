"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Camera, Share2, ShoppingCart } from "lucide-react";

import { BookPageSpread, PAGE_PALETTES } from "@/components/book-page-spread";
import { usePreviewState } from "@/lib/preview-state";

const TOTAL_PAGES = 8;

export default function BookPage() {
  const router = useRouter();
  const { data, hydrated } = usePreviewState();
  const lang = data.bookLang;
  const t = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const [pageIdx, setPageIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const ts = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(ts);
  }, []);

  const flip = (dir: 1 | -1) => {
    if (flipping) return;
    const next = pageIdx + dir;
    if (next < 0 || next >= TOTAL_PAGES) return;
    setFlipping(true);
    setTimeout(() => {
      setPageIdx(next);
      setFlipping(false);
    }, 280);
  };

  const paletteFor = (pNum: number) =>
    PAGE_PALETTES[(data.pageChoices[pNum] ?? 0) % PAGE_PALETTES.length];

  if (!hydrated) return null;

  const name = data.name || t("Votre enfant", "Your hero");
  const heading = lang === "fr" ? `Le livre de ${name}.` : `${name}'s book.`;

  // Use a fixed size; the book spread is wide, so we clamp to the main container.
  const spreadSize = typeof window !== "undefined" && window.innerWidth < 640 ? 320 : 560;
  const thumbSize = 7;

  return (
    <div className="text-center">
      <div className="mb-5">
        <div className="t-eyebrow">{t("Voici votre livre", "Here's your book")}</div>
        <h1
          className="t-display mt-3 mb-2"
          style={{ color: "var(--plum-deep)", fontSize: "clamp(28px, 4.5vw, 44px)", letterSpacing: "-0.02em" }}
        >
          {heading}
        </h1>
        <p className="m-0" style={{ fontSize: 15, color: "var(--stone)" }}>
          {t(
            "Feuilletez chaque page. Modifiez ce qui ne vous convient pas encore.",
            "Flip through every page. Edit anything that's not quite right.",
          )}
        </p>
      </div>

      <div
        className="relative flex justify-center"
        style={{ padding: "40px 0 20px", perspective: 1800 }}
      >
        <div
          style={{
            position: "relative",
            animation: revealed ? "book-reveal 1s cubic-bezier(0.2,0.7,0.3,1) both" : "none",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              transform: flipping ? "rotateY(-8deg)" : "rotateY(0)",
              transition: "transform .28s var(--ease-out)",
            }}
          >
            <BookPageSpread
              palette={paletteFor(pageIdx + 1)}
              name={data.name}
              pageNum={pageIdx + 1}
              lang={lang}
              size={spreadSize}
            />
          </div>

          <button
            type="button"
            onClick={() => flip(-1)}
            disabled={pageIdx === 0}
            aria-label={t("Page précédente", "Previous page")}
            className="focus-ring"
            style={arrowBtnStyle("left", pageIdx === 0)}
          >
            <ArrowLeft size={18} color="var(--plum)" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => flip(1)}
            disabled={pageIdx === TOTAL_PAGES - 1}
            aria-label={t("Page suivante", "Next page")}
            className="focus-ring"
            style={arrowBtnStyle("right", pageIdx === TOTAL_PAGES - 1)}
          >
            <ArrowRight size={18} color="var(--plum)" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Page dots */}
      <div className="flex justify-center gap-1.5 my-3 mb-6">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPageIdx(i)}
            aria-label={`Page ${i + 1}`}
            className="focus-ring transition-[width]"
            style={{
              width: i === pageIdx ? 22 : thumbSize,
              height: thumbSize,
              borderRadius: 999,
              background: i === pageIdx ? "var(--plum)" : "var(--pebble)",
              border: 0,
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2.5 flex-wrap">
        <button
          type="button"
          className="ph-btn ph-btn--ghost focus-ring"
          onClick={() => router.push("/preview/review")}
        >
          <Camera size={14} color="var(--plum)" strokeWidth={1.8} />{" "}
          {t("Modifier cette page", "Edit this page")}
        </button>
        <button
          type="button"
          className="ph-btn ph-btn--secondary focus-ring"
          onClick={() => {
            // TODO S11/S15 — generate share link that persists the preview.
            alert(t("Lien de partage bientôt disponible.", "Share link coming soon."));
          }}
        >
          <Share2 size={14} strokeWidth={1.8} />{" "}
          {t("Partager l'aperçu", "Share preview")}
        </button>
        <button
          type="button"
          className="ph-btn ph-btn--primary ph-btn--lg focus-ring"
          onClick={() => router.push("/preview/order")}
        >
          <ShoppingCart size={16} color="var(--ink)" strokeWidth={1.8} />{" "}
          {t("Commander le livre", "Order the book")}
        </button>
      </div>
    </div>
  );
}

function arrowBtnStyle(dir: "left" | "right", disabled: boolean): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [dir]: -24,
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid var(--bone)",
    background: "var(--white)",
    boxShadow: "var(--shadow-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
