"use client";

import type { Book } from "@/lib/books";

type Props = {
  book: Book;
  lang: "fr" | "en";
  width?: number;
};

/**
 * Pure-SVG book cover. No external art needed — typography + gradient card
 * gives us the keepsake feel until we have real illustrations in S9.
 */
export function BookCover({ book, lang, width = 220 }: Props) {
  const [primary, accent] = book.pair;
  const title = lang === "fr" ? book.title_fr : book.title_en;
  const theme = lang === "fr" ? book.theme_fr : book.theme_en;
  const tag = lang === "fr" ? book.tag_fr : book.tag_en;
  const age = lang === "fr" ? book.age_fr : book.age_en;

  const h = Math.round(width * 1.35);
  const pad = width * 0.1;

  return (
    <div
      aria-label={`${title} — ${theme}`}
      style={{
        width,
        height: h,
        background: `linear-gradient(155deg, ${primary} 0%, ${primary} 55%, rgba(0,0,0,0.12) 100%)`,
        borderRadius: 4,
        boxShadow: "-4px 6px 0 rgba(30,26,23,0.10), 0 18px 40px rgba(42,20,58,0.22)",
        padding: pad,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "var(--cream)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-display)",
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: width * 0.055, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.75 }}>
        Livrome · {theme}
      </div>

      <div style={{ padding: "0 4px" }}>
        <div style={{ fontSize: width * 0.11, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 500, marginBottom: 10 }}>
          {title}
        </div>
        <div
          aria-hidden
          style={{
            width: 40,
            height: 3,
            background: accent,
            margin: "12px 0",
            borderRadius: 2,
          }}
        />
        <div style={{ fontFamily: "var(--font-body)", fontSize: width * 0.052, opacity: 0.82, lineHeight: 1.35, textWrap: "pretty" as "pretty" }}>
          {tag}
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-body)", fontSize: width * 0.045, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.68 }}>
        {age}
      </div>
    </div>
  );
}
