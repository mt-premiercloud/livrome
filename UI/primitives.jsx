// Shared UI primitives for PetitsHéros — icons, book covers, sparkles, logos

// ──────── Logo ────────
function PHLogo({ size = 22, color = "currentColor" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9, color, fontFamily: "var(--f-display)", fontWeight: 500, fontSize: size, letterSpacing: "-0.02em", lineHeight: 1 }}>
      <svg width={size * 1.1} height={size * 1.1} viewBox="0 0 32 32" fill="none" aria-hidden>
        {/* Open book with star */}
        <path d="M4 9C4 8 4.5 7 6 7C10 7 14 8.5 16 11C18 8.5 22 7 26 7C27.5 7 28 8 28 9V24C28 25 27.2 25.7 26 25.5C22.5 25 18.5 26 16 28.5C13.5 26 9.5 25 6 25.5C4.8 25.7 4 25 4 24V9Z" fill="currentColor" opacity="0.12"/>
        <path d="M4 9C4 8 4.5 7 6 7C10 7 14 8.5 16 11C18 8.5 22 7 26 7C27.5 7 28 8 28 9V24C28 25 27.2 25.7 26 25.5C22.5 25 18.5 26 16 28.5C13.5 26 9.5 25 6 25.5C4.8 25.7 4 25 4 24V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 11V28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M16 4.5L16.8 6.2L18.5 7L16.8 7.8L16 9.5L15.2 7.8L13.5 7L15.2 6.2L16 4.5Z" fill="#F4B942" stroke="#D99A25" strokeWidth="0.7" strokeLinejoin="round"/>
      </svg>
      <span>Petits<em style={{ fontStyle: "italic", fontWeight: 400 }}>Héros</em></span>
    </span>
  );
}

// ──────── Sparkle / decorative ────────
function Sparkle({ size = 14, color = "#F4B942", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style} aria-hidden>
      <path d="M8 1L9.3 6.2L14.5 7.5L9.3 8.8L8 14L6.7 8.8L1.5 7.5L6.7 6.2L8 1Z" fill={color}/>
    </svg>
  );
}

function StarDot({ size = 6, color = "#F4B942" }) {
  return <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color, verticalAlign: "middle" }} />;
}

// ──────── Book cover — CSS illustrated, not a real image ────────
// Each cover uses two brand colors + a stylized silhouette motif.
function BookCover({ book, lang = "fr", w = 180, showTitle = true, rotate = 0, style = {} }) {
  const [bg, fg] = book.pair;
  const title = book[`title_${lang}`];
  const h = w * 1.38;
  // Pick a motif per book id
  const motif = MOTIFS[book.id] || MOTIFS.default;

  return (
    <div style={{
      width: w, height: h, background: bg, borderRadius: 3,
      position: "relative", overflow: "hidden",
      boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 18px 36px -12px rgba(30,20,30,0.3), inset 2px 0 0 rgba(0,0,0,0.08), inset -1px 0 0 rgba(255,255,255,0.06)",
      transform: `rotate(${rotate}deg)`,
      fontFamily: "var(--f-display)",
      ...style,
    }}>
      {/* Spine highlight */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(90deg, rgba(0,0,0,0.22), transparent)" }} />
      {/* Motif */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.95 }}>
        {motif({ fg, bg, w })}
      </div>
      {/* Title */}
      {showTitle && (
        <div style={{ position: "absolute", left: w * 0.09, right: w * 0.09, top: w * 0.08, color: fg, fontSize: w * 0.115, lineHeight: 1.05, letterSpacing: "-0.01em", fontWeight: 400, textShadow: "0 1px 0 rgba(0,0,0,0.12)" }}>
          {title}
        </div>
      )}
      {/* Imprint */}
      <div style={{ position: "absolute", bottom: w * 0.06, left: 0, right: 0, textAlign: "center", color: fg, opacity: 0.55, fontSize: w * 0.055, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--f-body)" }}>
        PetitsHéros
      </div>
    </div>
  );
}

// Motif renderers — simple stylized silhouettes per book
const MOTIFS = {
  "leo-stars": ({ fg, w }) => (
    <svg width={w * 0.7} height={w * 0.7} viewBox="0 0 100 100" fill="none" style={{ marginTop: w * 0.25 }}>
      <circle cx="50" cy="62" r="18" fill={fg} opacity="0.92"/>
      <path d="M50 40L52 48L60 50L52 52L50 60L48 52L40 50L48 48L50 40Z" fill={fg}/>
      <circle cx="28" cy="32" r="1.5" fill={fg}/>
      <circle cx="72" cy="28" r="1.2" fill={fg}/>
      <circle cx="82" cy="52" r="1.6" fill={fg}/>
      <circle cx="18" cy="56" r="1.2" fill={fg}/>
      <path d="M20 80 Q50 72 80 80" stroke={fg} strokeWidth="1.2" fill="none" opacity="0.5"/>
    </svg>
  ),
  forest: ({ fg, w }) => (
    <svg width={w * 0.72} height={w * 0.72} viewBox="0 0 100 100" fill="none" style={{ marginTop: w * 0.22 }}>
      <path d="M30 85L20 55L35 55L28 35L40 35L30 15L50 15L40 35L52 35L45 55L60 55L50 85Z" fill={fg} opacity="0.9"/>
      <path d="M70 85L62 60L74 60L68 42L78 42L70 22L88 22L80 42L90 42L84 60L94 60L86 85Z" fill={fg} opacity="0.7"/>
      <circle cx="55" cy="20" r="1.3" fill={fg}/>
      <circle cx="22" cy="30" r="1" fill={fg} opacity="0.6"/>
    </svg>
  ),
  ocean: ({ fg, w }) => (
    <svg width={w * 0.8} height={w * 0.8} viewBox="0 0 100 100" fill="none" style={{ marginTop: w * 0.2 }}>
      <path d="M10 50 Q25 38 40 50 T70 50 T100 50" stroke={fg} strokeWidth="1.6" fill="none"/>
      <path d="M10 62 Q25 50 40 62 T70 62 T100 62" stroke={fg} strokeWidth="1.6" fill="none" opacity="0.7"/>
      <path d="M10 74 Q25 62 40 74 T70 74 T100 74" stroke={fg} strokeWidth="1.6" fill="none" opacity="0.4"/>
      <path d="M50 30 C45 30 42 34 42 38 C42 44 50 48 50 48 C50 48 58 44 58 38 C58 34 55 30 50 30Z" fill={fg}/>
    </svg>
  ),
  balloon: ({ fg, w }) => (
    <svg width={w * 0.6} height={w * 0.75} viewBox="0 0 60 80" fill="none" style={{ marginTop: w * 0.22 }}>
      <ellipse cx="30" cy="28" rx="22" ry="26" fill={fg}/>
      <path d="M30 54 L28 58 L32 58 L30 54" fill={fg}/>
      <path d="M30 58 Q28 66 32 74" stroke={fg} strokeWidth="1.2" fill="none"/>
      <ellipse cx="22" cy="20" rx="4" ry="6" fill="rgba(255,255,255,0.35)"/>
    </svg>
  ),
  lantern: ({ fg, w }) => (
    <svg width={w * 0.7} height={w * 0.8} viewBox="0 0 70 80" fill="none" style={{ marginTop: w * 0.15 }}>
      <rect x="28" y="10" width="14" height="3" fill={fg}/>
      <path d="M35 13 V20" stroke={fg} strokeWidth="1.2"/>
      <path d="M22 22 L48 22 L52 56 L18 56 Z" fill={fg} opacity="0.95"/>
      <path d="M28 26 L42 26 L44 52 L26 52 Z" fill="rgba(0,0,0,0.2)"/>
      <circle cx="35" cy="40" r="6" fill="rgba(255,255,255,0.4)"/>
      <circle cx="15" cy="65" r="1.5" fill={fg}/>
      <circle cx="55" cy="70" r="1.2" fill={fg}/>
    </svg>
  ),
  garden: ({ fg, w }) => (
    <svg width={w * 0.75} height={w * 0.75} viewBox="0 0 100 100" fill="none" style={{ marginTop: w * 0.2 }}>
      <path d="M50 30 L52 40 L62 38 L55 46 L62 54 L52 52 L50 62 L48 52 L38 54 L45 46 L38 38 L48 40 Z" fill={fg}/>
      <path d="M50 62 V85" stroke={fg} strokeWidth="1.5"/>
      <path d="M50 72 Q40 70 35 78" stroke={fg} strokeWidth="1.2" fill="none"/>
      <path d="M50 78 Q60 76 65 82" stroke={fg} strokeWidth="1.2" fill="none"/>
      <circle cx="20" cy="30" r="3" fill={fg}/>
      <circle cx="80" cy="25" r="2" fill={fg} opacity="0.7"/>
    </svg>
  ),
  letters: ({ fg, w }) => (
    <div style={{ fontFamily: "var(--f-display)", color: fg, fontSize: w * 0.35, fontStyle: "italic", marginTop: w * 0.28, letterSpacing: "-0.02em" }}>
      Abc
    </div>
  ),
  moon: ({ fg, w }) => (
    <svg width={w * 0.75} height={w * 0.75} viewBox="0 0 100 100" fill="none" style={{ marginTop: w * 0.22 }}>
      <path d="M60 20 C42 20 28 34 28 52 C28 70 42 84 60 84 C48 78 40 66 40 52 C40 38 48 26 60 20Z" fill={fg}/>
      <circle cx="75" cy="30" r="1.3" fill={fg}/>
      <circle cx="82" cy="50" r="1.5" fill={fg}/>
      <circle cx="78" cy="70" r="1" fill={fg} opacity="0.7"/>
      <circle cx="20" cy="25" r="1" fill={fg} opacity="0.7"/>
    </svg>
  ),
  default: ({ fg, w }) => (
    <div style={{ fontFamily: "var(--f-display)", color: fg, fontSize: w * 0.4, opacity: 0.6 }}>✦</div>
  ),
};

// ──────── Icons (outline, warm) ────────
const Icon = {
  chev: ({ size = 16, dir = "right", color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === "right" ? "M6 4l4 4-4 4" : dir === "left" ? "M10 4l-4 4 4 4" : dir === "down" ? "M4 6l4 4 4-4" : "M4 10l4-4 4 4"}/>
    </svg>
  ),
  close: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
  ),
  check: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.5 3.5L13 5"/></svg>
  ),
  upload: ({ size = 22, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12M7 8l5-5 5 5M4 16v4a1 1 0 001 1h14a1 1 0 001-1v-4"/>
    </svg>
  ),
  camera: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round">
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  heart: ({ size = 16, color = "currentColor", fill = "none" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 20.5s-7-4.5-9-9.5c-1.3-3.2 1-6 4-6 1.8 0 3.5 1 5 3 1.5-2 3.2-3 5-3 3 0 5.3 2.8 4 6-2 5-9 9.5-9 9.5z"/>
    </svg>
  ),
  cart: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M4 5h2l2 12h12l2-8H7"/>
      <circle cx="9" cy="21" r="1.3"/><circle cx="19" cy="21" r="1.3"/>
    </svg>
  ),
  user: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="9" r="4"/>
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/>
    </svg>
  ),
  search: ({ size = 18, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg>
  ),
  shield: ({ size = 22, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>
  ),
  quality: ({ size = 22, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3l2.5 5.5L20 9.5l-4 4 1 5.5L12 16.5 7 19l1-5.5-4-4 5.5-1L12 3z"/>
    </svg>
  ),
  leaf: ({ size = 22, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"><path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16l-2-2z"/><path d="M4 20c4-4 8-7 12-9"/></svg>
  ),
  play: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}><path d="M5 3v10l8-5z"/></svg>
  ),
  plus: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>
  ),
  arrow: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
  ),
};

// Swirl/decorative SVG used as background accents
function Swirl({ w = 120, color = "#5B2A6F", opacity = 0.15, style }) {
  return (
    <svg width={w} height={w * 0.45} viewBox="0 0 120 54" fill="none" style={{ opacity, ...style }}>
      <path d="M2 40 C 20 20, 40 20, 60 36 C 80 52, 100 52, 118 32" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <circle cx="118" cy="32" r="2" fill={color}/>
      <path d="M8 48 L12 44 M14 50 L18 46" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

// Star field decorative — for loading, reveal, hero
function StarField({ count = 16, size = 1.5, color = "#F4B942", style }) {
  const pts = React.useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: (i * 37.13) % 100,
      y: (i * 61.7 + 11) % 100,
      s: (((i * 17) % 10) / 10) * size + size * 0.4,
      d: (i * 0.4) % 3,
    })), [count, size]);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}>
      {pts.map((p, i) => (
        <span key={i} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.s * 2, height: p.s * 2, borderRadius: "50%",
          background: color, boxShadow: `0 0 ${p.s * 3}px ${color}`,
          animation: `sparkle-float 3.4s ease-in-out ${p.d}s infinite`,
        }} />
      ))}
    </div>
  );
}

// Placeholder avatar — soft circle with initial
function Avatar({ name = "?", size = 36, color = "var(--plum)", bg = "rgba(91,42,111,0.12)" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: size, height: size, borderRadius: "50%", background: bg, color,
      fontFamily: "var(--f-display)", fontSize: size * 0.44, fontWeight: 500,
      flexShrink: 0,
    }}>{String(name).trim()[0] || "?"}</span>
  );
}

Object.assign(window, { PHLogo, Sparkle, StarDot, BookCover, Icon, Swirl, StarField, Avatar });
