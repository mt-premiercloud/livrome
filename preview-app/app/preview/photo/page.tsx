"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Upload } from "lucide-react";

import { usePreviewState } from "@/lib/preview-state";

type UploadStatus = "empty" | "analyzing" | "detected" | "error";

const MAX_BYTES = 6 * 1024 * 1024; // 6MB — sessionStorage quota is ~5MB so we stay under

export default function PhotoPage() {
  const router = useRouter();
  const { data, patch, hydrated } = usePreviewState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("empty");
  const [error, setError] = useState<string | null>(null);
  const lang = data.bookLang;

  const t = useCallback((fr: string, en: string) => (lang === "fr" ? fr : en), [lang]);

  // Rehydrate status from state on load.
  useEffect(() => {
    if (!hydrated) return;
    if (data.photoDataUrl) setStatus("detected");
    else setStatus("empty");
  }, [hydrated, data.photoDataUrl]);

  const handleFile = useCallback(
    (file: File | null | undefined) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError(t("Ce fichier n'est pas une image.", "That file isn't an image."));
        setStatus("error");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError(t("L'image dépasse 6 Mo. Essayez une photo plus légère.", "Image is over 6 MB. Try a smaller photo."));
        setStatus("error");
        return;
      }
      setError(null);
      setStatus("analyzing");
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = typeof e.target?.result === "string" ? e.target.result : null;
        if (!url) {
          setError(t("Impossible de lire la photo.", "Couldn't read the photo."));
          setStatus("error");
          return;
        }
        patch({ photoDataUrl: url });
        // Fake face detection — 1.4s like the artboard.
        setTimeout(() => setStatus("detected"), 1400);
      };
      reader.onerror = () => {
        setError(t("Erreur de lecture.", "Read error."));
        setStatus("error");
      };
      reader.readAsDataURL(file);
    },
    [patch, t],
  );

  const clearPhoto = () => {
    patch({ photoDataUrl: null });
    setStatus("empty");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (!hydrated) return null;

  const heading = t("Ajoutez une photo.", "Add a photo.");
  const sub = t(
    "Notre illustrateur se base sur ses traits pour dessiner un portrait fidèle.",
    "Our illustrator uses their features to draw a faithful portrait.",
  );

  return (
    <div className="pt-2 sm:pt-6">
      <div className="text-center mb-7">
        <h1
          className="t-display mb-2"
          style={{ color: "var(--plum-deep)", fontSize: "clamp(28px, 4.5vw, 44px)", letterSpacing: "-0.02em" }}
        >
          {heading}
        </h1>
        <p className="mx-auto" style={{ color: "var(--stone)", fontSize: 16, maxWidth: 520 }}>
          {sub}
        </p>
      </div>

      {!data.photoDataUrl ? (
        <>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={t("Glisser une photo", "Drop a photo")}
            className="focus-ring text-center cursor-pointer transition-all"
            style={{
              background: dragOver ? "rgba(244,185,66,0.12)" : "rgba(91,42,111,0.03)",
              border: `2px dashed ${dragOver ? "var(--honey)" : "var(--plum-soft)"}`,
              borderRadius: 20,
              padding: "clamp(44px, 6vw, 64px) clamp(20px, 4vw, 40px)",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <div
              className="inline-flex items-center justify-center rounded-full mb-5"
              style={{ width: 64, height: 64, background: "rgba(91,42,111,0.08)" }}
            >
              <Upload size={28} color="var(--plum)" strokeWidth={1.8} />
            </div>
            <div className="t-display mb-1.5" style={{ fontSize: 24, color: "var(--ink)" }}>
              {t("Glissez une photo ici", "Drop a photo here")}
            </div>
            <div className="mb-4" style={{ fontSize: 14, color: "var(--stone)" }}>
              {t("ou", "or")}
            </div>
            <span className="ph-btn ph-btn--secondary">{t("Parcourir", "Browse")}</span>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 text-center text-[14px]"
              style={{ color: "var(--error)" }}
            >
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 mt-8">
            <div className="ph-card p-5" style={{ background: "var(--white)" }}>
              <div
                className="mb-3 flex items-center gap-1.5"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--sage-deep)",
                }}
              >
                <Check size={14} color="var(--sage-deep)" /> {t("Bonne photo", "Good photo")}
              </div>
              <ul className="m-0 p-0 list-none flex flex-col gap-2" style={{ fontSize: 14, color: "var(--graphite)" }}>
                <li className="flex gap-2"><span style={{ color: "var(--sage-deep)" }}>·</span>{t("Visage bien éclairé, de face", "Well-lit face, straight on")}</li>
                <li className="flex gap-2"><span style={{ color: "var(--sage-deep)" }}>·</span>{t("Sans lunettes de soleil", "No sunglasses")}</li>
                <li className="flex gap-2"><span style={{ color: "var(--sage-deep)" }}>·</span>{t("Un seul enfant sur la photo", "Only one child in frame")}</li>
              </ul>
            </div>
            <div className="ph-card p-5" style={{ background: "var(--white)" }}>
              <div
                className="mb-3"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--error)",
                }}
              >
                × {t("À éviter", "Avoid")}
              </div>
              <ul className="m-0 p-0 list-none flex flex-col gap-2" style={{ fontSize: 14, color: "var(--graphite)" }}>
                <li className="flex gap-2"><span style={{ color: "var(--error)" }}>·</span>{t("Plusieurs personnes", "Multiple people")}</li>
                <li className="flex gap-2"><span style={{ color: "var(--error)" }}>·</span>{t("Visage flou ou caché", "Blurry or hidden face")}</li>
                <li className="flex gap-2"><span style={{ color: "var(--error)" }}>·</span>{t("Photo très sombre", "Very dark photo")}</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ph-card p-5 sm:p-8" style={{ background: "var(--white)" }}>
            <div className="grid gap-6" style={{ gridTemplateColumns: "240px 1fr" }}>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "1", borderRadius: 12, background: "var(--bone)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.photoDataUrl}
                  alt={t("Photo de l'enfant", "Child photo")}
                  className="w-full h-full object-cover"
                />
                {status === "detected" && (
                  <svg
                    viewBox="0 0 240 240"
                    className="absolute inset-0 w-full h-full pointer-events-none anim-fade-slide"
                  >
                    <rect
                      x="72"
                      y="56"
                      width="96"
                      height="120"
                      rx="48"
                      fill="none"
                      stroke="#6BAA75"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                    />
                  </svg>
                )}
              </div>
              <div>
                {status === "analyzing" && (
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        border: "2.5px solid var(--bone)",
                        borderTopColor: "var(--plum)",
                        animation: "spin-slow .8s linear infinite",
                      }}
                    />
                    <span style={{ fontSize: 15, color: "var(--graphite)" }}>
                      {t("Analyse du visage…", "Analyzing the face…")}
                    </span>
                  </div>
                )}
                {status === "detected" && (
                  <>
                    <div
                      className="inline-flex items-center gap-1.5 mb-3"
                      style={{
                        color: "var(--success)",
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "5px 11px",
                        background: "rgba(107,170,117,0.15)",
                        borderRadius: 999,
                      }}
                    >
                      <Check size={13} color="var(--success)" /> {t("Visage détecté — parfait.", "Face detected — looking great.")}
                    </div>
                    <div className="t-display mb-1" style={{ fontSize: 22, color: "var(--ink)" }}>
                      {data.name || t("Votre enfant", "Your child")}
                      {data.age ? `, ${data.age} ${lang === "fr" ? "ans" : "yrs"}` : ""}
                    </div>
                    <div style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.5 }}>
                      {t("Ajuster le cadrage", "Adjust the crop")} ·{" "}
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="underline-offset-4 hover:underline focus-ring"
                        style={{ color: "var(--plum)", fontWeight: 500, cursor: "pointer", background: "none", border: "none", padding: 0, font: "inherit" }}
                      >
                        {t("Changer la photo", "Replace photo")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-1.5 my-5 text-[12px]"
            style={{ color: "var(--stone)" }}
          >
            <ShieldCheck size={14} color="var(--sage-deep)" />{" "}
            {t(
              "Photo chiffrée. Supprimée sous 30 jours. Jamais partagée.",
              "Photo encrypted. Deleted within 30 days. Never shared.",
            )}
          </div>
        </>
      )}

      <div className="flex justify-between items-center mt-8 flex-wrap gap-3">
        <button
          type="button"
          className="ph-btn ph-btn--ghost focus-ring"
          onClick={() => router.push("/preview/details")}
        >
          <ArrowLeft size={14} strokeWidth={2.2} /> {t("Retour", "Back")}
        </button>
        <button
          type="button"
          className="ph-btn ph-btn--primary ph-btn--lg focus-ring"
          disabled={status !== "detected"}
          onClick={() => router.push("/preview/generating")}
        >
          {t("Générer mon aperçu", "Generate my preview")} <ArrowRight size={16} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
