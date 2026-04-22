"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { usePreviewState } from "@/lib/preview-state";

const SKIN_TONES = ["#F5DCC7", "#E8C0A6", "#C9936B", "#8E5A3B", "#5A3922"] as const;
const AGES = [3, 4, 5, 6, 7, 8] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter a first name.").max(24, "Too long."),
  age: z.number().int().min(2).max(12),
  gender: z.enum(["boy", "girl", "neutral"]),
  skinIdx: z.number().int().min(0).max(SKIN_TONES.length - 1),
  bookLang: z.enum(["fr", "en"]),
  consentGiven: z.literal(true, { message: "Parental consent is required to continue." }),
});

type FormValues = z.infer<typeof schema>;

export default function DetailsPage() {
  const router = useRouter();
  const { data, patch, hydrated } = usePreviewState();

  const defaults = useMemo<FormValues>(
    () => ({
      name: data.name,
      age: data.age ?? 5,
      gender: data.gender ?? "neutral",
      skinIdx: data.skinIdx ?? 1,
      bookLang: data.bookLang,
      consentGiven: data.consentGiven as true,
    }),
    [data],
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onBlur",
  });

  const [lang, setLang] = useState<"fr" | "en">(data.bookLang);
  const currentLang = watch("bookLang") ?? lang;

  const t = (fr: string, en: string) => (currentLang === "fr" ? fr : en);

  const onSubmit = (values: FormValues) => {
    patch({
      name: values.name.trim(),
      age: values.age,
      gender: values.gender,
      skinIdx: values.skinIdx,
      bookLang: values.bookLang,
      consentGiven: true,
    });
    router.push("/preview/photo");
  };

  if (!hydrated) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="pt-2 sm:pt-6">
      <div className="text-center mb-8 sm:mb-10">
        <h1
          className="t-display mb-2"
          style={{ color: "var(--plum-deep)", fontSize: "clamp(28px, 4.5vw, 44px)", letterSpacing: "-0.02em" }}
        >
          {t("Parlez-nous un peu de lui.", "Tell us about them.")}
        </h1>
        <p style={{ color: "var(--stone)", fontSize: 16 }}>
          {t("Ces détails rendent l'illustration fidèle.", "These details make the illustration ring true.")}
        </p>
      </div>

      <div className="ph-card flex flex-col gap-6 p-5 sm:p-8" style={{ background: "var(--white)" }}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="ph-label">
            {t("Son prénom", "Their first name")}
          </label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            placeholder={t("Ex. Léo, Mila, Émile…", "e.g. Leo, Mila, Emile…")}
            className="ph-input"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name?.message && (
            <div className="mt-2 text-[12px]" style={{ color: "var(--error)" }}>
              {errors.name.message}
            </div>
          )}
        </div>

        {/* Age + Gender */}
        <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
          <div>
            <div className="ph-label">{t("Âge", "Age")}</div>
            <Controller
              control={control}
              name="age"
              render={({ field }) => (
                <div className="flex gap-1.5">
                  {AGES.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className="ph-opt focus-ring"
                      style={{ minWidth: 40, padding: "10px 0" }}
                      aria-pressed={field.value === a}
                      onClick={() => field.onChange(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          <div>
            <div className="ph-label">{t("Genre", "Gender")}</div>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <div className="flex gap-2">
                  {(
                    [
                      ["boy", t("Garçon", "Boy")],
                      ["girl", t("Fille", "Girl")],
                      ["neutral", t("Non précisé", "Non-specified")],
                    ] as const
                  ).map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      className="ph-opt focus-ring"
                      aria-pressed={field.value === v}
                      onClick={() => field.onChange(v)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>
        </div>

        {/* Skin tone */}
        <div>
          <div className="ph-label">{t("Teint de peau", "Skin tone")}</div>
          <Controller
            control={control}
            name="skinIdx"
            render={({ field }) => (
              <div className="flex gap-2.5">
                {SKIN_TONES.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${t("Teint", "Tone")} ${i + 1}`}
                    aria-pressed={field.value === i}
                    className="focus-ring"
                    onClick={() => field.onChange(i)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: c,
                      border: field.value === i ? "3px solid var(--plum)" : "3px solid transparent",
                      boxShadow:
                        field.value === i
                          ? "0 0 0 1.5px var(--white) inset"
                          : "inset 0 0 0 1px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transform: field.value === i ? "scale(1.08)" : "scale(1)",
                      transition: "transform .15s var(--ease-out)",
                    }}
                  />
                ))}
              </div>
            )}
          />
          <div className="mt-2 text-[12px]" style={{ color: "var(--stone)" }}>
            {t(
              "Choisissez celui qui lui ressemble le plus.",
              "Pick the one that best matches them.",
            )}
          </div>
        </div>

        {/* Language */}
        <div>
          <div className="ph-label">{t("Langue du livre", "Language of the book")}</div>
          <Controller
            control={control}
            name="bookLang"
            render={({ field }) => (
              <div className="flex gap-2 max-w-[280px]">
                {(
                  [
                    ["fr", "Français"],
                    ["en", "English"],
                  ] as const
                ).map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="ph-opt focus-ring"
                    aria-pressed={field.value === v}
                    onClick={() => {
                      field.onChange(v);
                      setLang(v);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        {/* Consent */}
        <div className="pt-2" style={{ borderTop: "1px solid var(--bone)" }}>
          <Controller
            control={control}
            name="consentGiven"
            render={({ field }) => (
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-1 focus-ring"
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked as unknown as true)}
                  style={{
                    width: 18,
                    height: 18,
                    accentColor: "var(--plum)",
                    cursor: "pointer",
                  }}
                />
                <span style={{ color: "var(--graphite)", fontSize: 14, lineHeight: 1.55 }}>
                  {t(
                    "J'ai l'autorisation de l'adulte responsable pour créer ce livre. Aucune photo n'est conservée au-delà de 30 jours.",
                    "I have permission from the responsible adult to create this book. No photo is kept beyond 30 days.",
                  )}
                </span>
              </label>
            )}
          />
          {errors.consentGiven?.message && (
            <div className="mt-2 text-[12px]" style={{ color: "var(--error)" }}>
              {errors.consentGiven.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          className="ph-btn ph-btn--ghost focus-ring"
          onClick={() => router.push("/preview/start")}
        >
          <ArrowLeft size={14} strokeWidth={2.2} /> {t("Retour", "Back")}
        </button>
        <button
          type="submit"
          className="ph-btn ph-btn--primary ph-btn--lg focus-ring"
          disabled={isSubmitting}
        >
          {t("Continuer", "Continue")} <ArrowRight size={16} strokeWidth={2.2} />
        </button>
      </div>
    </form>
  );
}
