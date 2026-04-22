"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";

import { usePreviewState } from "@/lib/preview-state";

/** Duration in milliseconds until we auto-advance. Shorter than prod — S10 will stream real events. */
const FAKE_DURATION_MS = 8000;

export default function GeneratingPage() {
  const router = useRouter();
  const { data, patch, hydrated } = usePreviewState();
  const lang = data.bookLang;
  const t = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    const tick = 60;
    const step = (tick / FAKE_DURATION_MS) * 100;
    const iv = setInterval(() => {
      setProgress((p) => {
        const np = Math.min(100, p + step);
        if (np >= 100) {
          clearInterval(iv);
          setTimeout(() => {
            patch({ generated: true });
            router.push("/preview/review");
          }, 500);
        }
        return np;
      });
    }, tick);
    return () => clearInterval(iv);
  }, [hydrated, patch, router]);

  const phase = progress < 30 ? 1 : progress < 65 ? 2 : progress < 95 ? 3 : 4;
  const titles = {
    1: t("On dessine votre héros…", "Drawing your hero…"),
    2: t("On ajoute son sourire…", "Adding their smile…"),
    3: t("On peaufine chaque page…", "Polishing every page…"),
    4: t("Presque prêt.", "Almost ready."),
  };

  const submitEmail = () => {
    if (!email.includes("@")) return;
    // TODO (S15): POST to our resume-link endpoint → Klaviyo.
    setEmailSaved(true);
  };

  if (!hydrated) return null;

  return (
    <div className="text-center py-8 sm:py-14">
      {/* Magical illustration */}
      <div
        className="relative mx-auto mb-8"
        style={{ width: "clamp(220px, 40vw, 280px)", height: "clamp(220px, 40vw, 280px)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(244,185,66,0.3), transparent 60%)",
            animation: "sparkle-float 2.4s ease-in-out infinite",
          }}
        />
        <StarField count={14} />
        <div
          className="absolute flex items-center justify-center"
          style={{
            inset: "18%",
            background: "var(--plum-deep)",
            borderRadius: 4,
            boxShadow: "0 12px 32px rgba(30,20,30,0.3)",
            animation: "spin-slow 8s linear infinite",
          }}
        >
          <Sparkles size={32} color="var(--honey)" strokeWidth={1.6} />
        </div>
      </div>

      <h1
        key={phase}
        className="t-display anim-fade-slide mb-2"
        style={{ color: "var(--plum-deep)", fontSize: "clamp(24px, 4vw, 40px)", letterSpacing: "-0.02em" }}
      >
        {titles[phase]}
      </h1>
      <p className="mb-7" style={{ fontSize: 15, color: "var(--stone)" }}>
        {t("Environ 2 minutes", "About 2 minutes")}
      </p>

      {/* Progress bar */}
      <div className="mx-auto mb-9" style={{ maxWidth: 420 }}>
        <div
          className="relative overflow-hidden"
          style={{ height: 8, background: "var(--bone)", borderRadius: 999 }}
        >
          <div
            className="h-full transition-[width] duration-200 ease-linear"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--plum) 0%, var(--honey) 50%, var(--plum) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s linear infinite",
              borderRadius: 999,
            }}
          />
        </div>
        <div
          className="mt-2 text-[12px]"
          style={{ color: "var(--stone)", fontVariantNumeric: "tabular-nums" }}
        >
          {Math.round(progress)}%
        </div>
      </div>

      {/* Email capture */}
      <div
        className="mx-auto text-left"
        style={{
          background: "var(--cream-deep)",
          borderRadius: 14,
          padding: "clamp(20px, 4vw, 24px) clamp(16px, 4vw, 28px)",
          maxWidth: 480,
        }}
      >
        <div
          className="mb-1"
          style={{ fontSize: 13, fontWeight: 600, color: "var(--plum-deep)" }}
        >
          {t(
            "Vous pouvez fermer cet onglet — on vous écrit dès que c'est prêt.",
            "You can close this tab — we'll email you when it's ready.",
          )}
        </div>
        {emailSaved ? (
          <div
            className="flex items-center gap-2 mt-3"
            style={{ color: "var(--success)", fontSize: 14 }}
          >
            <Check size={14} color="var(--success)" /> {email}
          </div>
        ) : (
          <div className="flex gap-2 mt-3 items-stretch">
            <input
              type="email"
              className="ph-input flex-1"
              placeholder={t("Votre courriel", "Your email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
            />
            <button
              type="button"
              className="ph-btn ph-btn--primary ph-btn--sm focus-ring"
              onClick={submitEmail}
            >
              {t("M'avertir", "Notify me")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StarField({ count }: { count: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    top: `${(i * 37) % 90}%`,
    left: `${(i * 53 + 7) % 90}%`,
    size: 4 + ((i * 3) % 8),
    delay: ((i * 0.23) % 1.6).toFixed(2),
  }));
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: "var(--honey)",
            borderRadius: "50%",
            opacity: 0.5,
            animation: `sparkle-float 2.4s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
