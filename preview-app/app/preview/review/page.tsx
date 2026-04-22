"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";

import { BookPageSpread, PAGE_PALETTES } from "@/components/book-page-spread";
import { usePreviewState } from "@/lib/preview-state";

const TOTAL_PAGES = 8; // 24-page book reduced for stub; bump to 24 when real scenes ship in S9.
const VARIANTS_PER_PAGE = 4;

export default function ReviewPage() {
  const router = useRouter();
  const { data, patch, hydrated } = usePreviewState();
  const lang = data.bookLang;
  const t = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const [pageNum, setPageNum] = useState(1);

  if (!hydrated) return null;

  const chosenVariant = data.pageChoices[pageNum] ?? 0;

  const choose = (variantIdx: number) => {
    patch({ pageChoices: { ...data.pageChoices, [pageNum]: variantIdx } });
  };

  const goNextPage = () => {
    if (pageNum < TOTAL_PAGES) setPageNum(pageNum + 1);
    else router.push("/preview/book");
  };

  const skipRest = () => {
    const choices = { ...data.pageChoices };
    for (let p = pageNum; p <= TOTAL_PAGES; p++) {
      if (choices[p] === undefined) choices[p] = 0;
    }
    patch({ pageChoices: choices });
    router.push("/preview/book");
  };

  const selectedSize = typeof window !== "undefined" && window.innerWidth < 640 ? 280 : 420;

  return (
    <div>
      <div className="text-center mb-7">
        <div className="t-eyebrow">{t("Révision page par page", "Page-by-page review")}</div>
        <h1
          className="t-display my-2"
          style={{ color: "var(--plum-deep)", fontSize: "clamp(26px, 4vw, 38px)", letterSpacing: "-0.02em" }}
        >
          {t("Choisissez votre version préférée.", "Pick your favorite version.")}
        </h1>
        <div style={{ fontSize: 14, color: "var(--stone)" }}>
          {t("Page", "Page")} {pageNum} {t("sur", "of")} {TOTAL_PAGES}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <BookPageSpread
          palette={PAGE_PALETTES[chosenVariant]}
          name={data.name}
          pageNum={pageNum}
          lang={lang}
          size={selectedSize}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 mb-7">
        {Array.from({ length: VARIANTS_PER_PAGE }).map((_, v) => {
          const active = v === chosenVariant;
          return (
            <button
              key={v}
              type="button"
              onClick={() => choose(v)}
              aria-pressed={active}
              aria-label={`${t("Variante", "Variant")} ${v + 1}`}
              className="focus-ring transition-transform"
              style={{
                padding: 0,
                border: active ? "3px solid var(--plum)" : "3px solid transparent",
                borderRadius: 8,
                cursor: "pointer",
                background: "transparent",
                transform: active ? "scale(1.04)" : "scale(1)",
              }}
            >
              <BookPageSpread
                palette={PAGE_PALETTES[v]}
                name={data.name}
                pageNum={pageNum}
                lang={lang}
                size={selectedSize < 340 ? 88 : 120}
              />
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center flex-wrap gap-3">
        <button
          type="button"
          className="ph-btn ph-btn--ghost focus-ring"
          onClick={() => {
            /* TODO S10: trigger variant regeneration */
          }}
        >
          <RefreshCw size={13} /> {t("Régénérer les options", "Regenerate options")}
        </button>

        <div className="flex gap-2.5 flex-wrap">
          <button
            type="button"
            className="ph-btn ph-btn--ghost focus-ring"
            onClick={skipRest}
          >
            {t("Choisir automatiquement la suite", "Pick best automatically for the rest")}
          </button>
          <button
            type="button"
            className="ph-btn ph-btn--primary focus-ring"
            onClick={goNextPage}
          >
            {pageNum < TOTAL_PAGES ? t("Page suivante", "Next page") : t("Voir le livre complet", "See the full book")}{" "}
            <ArrowRight size={14} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {pageNum > 1 && (
        <div className="mt-6">
          <button
            type="button"
            className="ph-btn ph-btn--ghost focus-ring"
            onClick={() => setPageNum(pageNum - 1)}
          >
            <ArrowLeft size={14} strokeWidth={2.2} /> {t("Page précédente", "Previous page")}
          </button>
        </div>
      )}
    </div>
  );
}
