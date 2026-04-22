"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { BookCover } from "@/components/book-cover";
import { BOOKS, DEFAULT_BOOK_ID, getBookById, type Book } from "@/lib/books";
import { usePreviewState } from "@/lib/preview-state";

const BOOK_ID_ALIASES: Record<string, string> = {
  "book-01": "leo-stars",
  "book-02": "forest",
  "book-03": "ocean",
  "book-04": "balloon",
  "book-05": "lantern",
  "book-06": "garden",
  "book-07": "letters",
  "book-08": "moon",
};

function resolveBookId(raw: string | null): string {
  if (!raw) return DEFAULT_BOOK_ID;
  return BOOK_ID_ALIASES[raw] ?? raw;
}

export function StartInner() {
  const router = useRouter();
  const search = useSearchParams();
  const { data, patch, hydrated } = usePreviewState();

  const bookIdFromUrl = resolveBookId(search?.get("book") ?? null);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (data.bookId !== bookIdFromUrl && getBookById(bookIdFromUrl)) {
      patch({ bookId: bookIdFromUrl });
    }
  }, [bookIdFromUrl, data.bookId, hydrated, patch]);

  const book: Book = getBookById(data.bookId) ?? getBookById(DEFAULT_BOOK_ID)!;
  const lang = data.bookLang;

  const title = lang === "fr" ? book.title_fr : book.title_en;
  const copy = {
    eyebrow: lang === "fr" ? "Aperçu gratuit" : "Free preview",
    meet: lang === "fr" ? `Voici « ${title} ».` : `Meet "${title}."`,
    body:
      lang === "fr"
        ? "Un récit imaginé par nos auteurs. 24 pages faites pour l'âge et les goûts de votre enfant. Aucune carte, aucun engagement — juste trois minutes et une photo."
        : "A story written by our authors. 24 pages, matched to your child's age and mood. No card, no commitment — just three minutes and a photo.",
    begin: lang === "fr" ? "Commençons" : "Let's begin",
    switch: lang === "fr" ? "Changer d'histoire" : "Switch book",
    promise:
      lang === "fr"
        ? "Aucune carte, aucune obligation."
        : "No card, no commitment.",
  };

  return (
    <div className="text-center pt-4 sm:pt-10 anim-fade">
      <div className="t-eyebrow mb-3">{copy.eyebrow}</div>

      <h1
        className="t-display mb-4"
        style={{ color: "var(--plum-deep)", fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.02em" }}
      >
        {copy.meet}
      </h1>

      <p
        className="mx-auto mb-10"
        style={{ color: "var(--graphite)", lineHeight: 1.55, fontSize: "clamp(15px, 1.5vw, 18px)", maxWidth: 520 }}
      >
        {copy.body}
      </p>

      <div className="relative flex justify-center my-8">
        <div
          aria-hidden
          className="absolute"
          style={{
            inset: "6% 20%",
            background: "radial-gradient(ellipse, rgba(244,185,66,0.32), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ transform: "rotate(-2deg)", position: "relative" }}>
          <BookCover book={book} lang={lang} width={220} />
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        <button
          type="button"
          className="ph-btn ph-btn--primary ph-btn--lg focus-ring"
          onClick={() => router.push("/preview/details")}
        >
          {copy.begin} <ArrowRight size={16} strokeWidth={2.2} />
        </button>
        <button
          type="button"
          className="ph-btn ph-btn--ghost focus-ring"
          onClick={() => setSwitcherOpen((s) => !s)}
        >
          {copy.switch}
        </button>
      </div>

      {switcherOpen && (
        <div className="mt-8 ph-card p-5 mx-auto" style={{ maxWidth: 640 }}>
          <div className="t-eyebrow mb-3 text-left" style={{ color: "var(--graphite)" }}>
            {lang === "fr" ? "Nos huit histoires" : "Our eight stories"}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BOOKS.map((b) => {
              const active = b.id === book.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    patch({ bookId: b.id });
                    setSwitcherOpen(false);
                  }}
                  className="text-left p-2 rounded-lg transition-colors focus-ring"
                  style={{
                    background: active ? "rgba(91,42,111,0.08)" : "transparent",
                    border: active ? "1.5px solid var(--plum)" : "1.5px solid transparent",
                  }}
                >
                  <BookCover book={b} lang={lang} width={120} />
                  <div className="mt-2 text-[12px]" style={{ color: "var(--graphite)" }}>
                    {lang === "fr" ? b.title_fr : b.title_en}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div
        className="mt-6 flex items-center justify-center gap-2 text-[13px]"
        style={{ color: "var(--stone)" }}
      >
        <ShieldCheck size={14} style={{ color: "var(--sage-deep)" }} />
        {copy.promise}
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="text-[13px] underline-offset-4 hover:underline"
          style={{ color: "var(--pebble)" }}
        >
          {lang === "fr" ? "Retour à Livrome" : "Back to Livrome"}
        </Link>
      </div>
    </div>
  );
}
