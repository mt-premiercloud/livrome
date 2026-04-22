type Palette = readonly [string, string, string];

export const PAGE_PALETTES: Palette[] = [
  ["#5B2A6F", "#F4B942", "#FFF8EC"],
  ["#3F1C4F", "#E8B4B8", "#FFF8EC"],
  ["#2E5E7E", "#F4B942", "#FFF8EC"],
  ["#8FB996", "#F4B942", "#FFF8EC"],
];

type Props = {
  palette: Palette;
  name: string;
  pageNum: number;
  lang: "fr" | "en";
  size?: number;
};

/**
 * SVG book-page spread. Placeholder art until S9 ships real illustrations.
 * The scene rotates by `pageNum % 4` so the 24-page stub feels varied.
 */
export function BookPageSpread({ palette, name, pageNum, lang, size = 420 }: Props) {
  const [primary, accent, bg] = palette;
  const h = size * 0.72;
  const scene = pageNum % 4;
  const displayName = name.trim() || (lang === "fr" ? "Votre héros" : "Your hero");
  const copy = lang === "fr"
    ? ["Un soir,", `${displayName} entendit`, "un chuchotement", "dans le jardin…"]
    : ["One evening,", `${displayName} heard`, "a whisper", "from the garden…"];

  return (
    <div
      aria-label={`Page ${pageNum} preview`}
      style={{
        width: size,
        height: h,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(30,20,30,0.18)",
        background: bg,
        position: "relative",
        display: "flex",
      }}
    >
      {/* Left page — illustration */}
      <div style={{ width: "50%", height: "100%", background: primary, position: "relative", overflow: "hidden" }}>
        {scene === 0 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <circle cx="78" cy="22" r="10" fill={accent} opacity="0.95" />
            <path d="M0 80 Q25 60 50 75 T100 70 V100 H0Z" fill={accent} opacity="0.25" />
            <circle cx="50" cy="65" r="8" fill={accent} />
            <rect x="46" y="70" width="8" height="14" fill={accent} />
            <path d="M20 40l2 2 2-2M72 48l2 2 2-2M10 20l1 1 1-1" stroke={accent} strokeWidth="1" />
          </svg>
        )}
        {scene === 1 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <path d="M0 70 Q30 55 60 62 T100 58 V100 H0Z" fill={accent} opacity="0.35" />
            <path d="M15 85L10 60L18 60L14 48L22 48L17 36L28 36L22 24L40 24L32 36L42 36L38 48L48 48L42 60L52 60L46 85Z" fill={accent} opacity="0.85" />
            <path d="M70 85L64 65L72 65L68 52L76 52L72 40L82 40L76 28L90 28L84 40L92 40L88 52L94 52L90 65L98 65L92 85Z" fill={accent} opacity="0.7" />
          </svg>
        )}
        {scene === 2 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <path d="M0 50 Q25 40 50 48 T100 46" stroke={accent} strokeWidth="1.6" fill="none" opacity="0.6" />
            <path d="M0 62 Q25 52 50 60 T100 58" stroke={accent} strokeWidth="1.6" fill="none" opacity="0.5" />
            <path d="M0 74 Q25 64 50 72 T100 70" stroke={accent} strokeWidth="1.6" fill="none" opacity="0.4" />
            <path d="M50 24 C44 24 40 28 40 34 C40 42 50 48 50 48 C50 48 60 42 60 34 C60 28 56 24 50 24Z" fill={accent} />
          </svg>
        )}
        {scene === 3 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <rect x="20" y="20" width="60" height="70" rx="3" fill={accent} opacity="0.2" />
            <path d="M30 35 Q50 30 70 35 V80 Q50 75 30 80Z" fill={accent} opacity="0.85" />
            <circle cx="50" cy="20" r="3" fill={accent} />
            <path d="M18 15l2 2-2 2M82 18l-2 2 2 2" stroke={accent} strokeWidth="1" />
          </svg>
        )}
      </div>

      {/* Right page — text */}
      <div style={{ width: "50%", height: "100%", position: "relative", padding: size * 0.05, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: size * 0.045, lineHeight: 1.4, color: primary, letterSpacing: "-0.01em" }}>
          {copy.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: size * 0.03,
            right: size * 0.05,
            fontSize: size * 0.024,
            color: primary,
            opacity: 0.5,
            fontFamily: "var(--font-body)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {pageNum}
        </div>
      </div>

      {/* Spine shadow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 8,
          transform: "translateX(-50%)",
          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
