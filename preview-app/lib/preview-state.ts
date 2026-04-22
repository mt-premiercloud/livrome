"use client";

/**
 * Preview flow client state — persisted to sessionStorage so refreshes
 * and back-button navigation don't wipe progress. Only the preview UI
 * uses this; we'll sync to a server-side session later (S8+).
 */
import { useEffect, useState } from "react";

const KEY = "livrome.preview.v1";

export type PreviewData = {
  bookId: string;
  name: string;
  age: number | null;
  gender: "boy" | "girl" | "neutral" | null;
  skinIdx: number | null;
  bookLang: "fr" | "en";
  consentGiven: boolean;
  photoDataUrl: string | null;
  generated: boolean;
  pageChoices: Record<number, number>;
  format: "hard" | "soft";
};

export const EMPTY_PREVIEW: PreviewData = {
  bookId: "leo-stars",
  name: "",
  age: null,
  gender: null,
  skinIdx: null,
  bookLang: "fr",
  consentGiven: false,
  photoDataUrl: null,
  generated: false,
  pageChoices: {},
  format: "hard",
};

function read(): PreviewData {
  if (typeof window === "undefined") return EMPTY_PREVIEW;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return EMPTY_PREVIEW;
    return { ...EMPTY_PREVIEW, ...JSON.parse(raw) };
  } catch {
    return EMPTY_PREVIEW;
  }
}

function write(data: PreviewData) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* quota exceeded or disabled — non-fatal */
  }
}

export function usePreviewState() {
  const [data, setData] = useState<PreviewData>(EMPTY_PREVIEW);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(read());
    setHydrated(true);
  }, []);

  const patch = (updates: Partial<PreviewData>) => {
    setData((prev) => {
      const next = { ...prev, ...updates };
      write(next);
      return next;
    });
  };

  const reset = () => {
    setData(EMPTY_PREVIEW);
    if (typeof window !== "undefined") sessionStorage.removeItem(KEY);
  };

  return { data, patch, reset, hydrated };
}
