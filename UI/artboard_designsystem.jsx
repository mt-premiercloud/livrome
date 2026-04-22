// Design System reference artboard — colors, type, components
function DesignSystemArtboard() {
  const { t } = useT();
  const swatches = [
    { name: "Plum", var: "--plum", hex: "#5B2A6F", text: "#fff" },
    { name: "Plum deep", var: "--plum-deep", hex: "#3F1C4F", text: "#fff" },
    { name: "Cream", var: "--cream", hex: "#FFF8EC", text: "#2A2A2A" },
    { name: "Honey", var: "--honey", hex: "#F4B942", text: "#2A2A2A" },
    { name: "Sage", var: "--sage", hex: "#8FB996", text: "#fff" },
    { name: "Rose", var: "--rose", hex: "#E8B4B8", text: "#2A2A2A" },
    { name: "Ink", var: "--ink", hex: "#1E1A17", text: "#fff" },
    { name: "Bone", var: "--bone", hex: "#EDE5D6", text: "#2A2A2A" },
  ];

  const section = (title, sub, children) => (
    <div style={{ marginBottom: 44 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--plum)", marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ fontSize: 14, color: "var(--stone)", marginBottom: 18 }}>{sub}</div>}
      {children}
    </div>
  );

  return (
    <div className="artboard-scroll" style={{ width: "100%", height: "100%", background: "var(--paper)", padding: "56px 64px", fontFamily: "var(--f-body)", color: "var(--ink)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, paddingBottom: 28, borderBottom: "1px solid var(--bone)" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginBottom: 10 }}>Design system · v0.1</div>
          <div className="t-display" style={{ fontSize: 56, color: "var(--plum-deep)" }}>
            Petits<em style={{ fontStyle: "italic" }}>Héros</em>
          </div>
          <div style={{ fontSize: 16, color: "var(--graphite)", marginTop: 10, maxWidth: 560, lineHeight: 1.5 }}>
            A warm, editorial system for a bilingual children’s book brand. Aesop meets Le Petit Prince — premium restraint, with magical accents reserved for moments that matter.
          </div>
        </div>
        <div style={{ fontFamily: "var(--f-hand)", fontSize: 34, color: "var(--plum-soft)", transform: "rotate(-3deg)" }}>
          Made with care.
        </div>
      </div>

      {/* Colors */}
      {section("Color", "Warm plum anchors. Honey is the hero CTA. Cream is the page.", (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {swatches.map(s => (
            <div key={s.name} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--bone)" }}>
              <div style={{ background: s.hex, color: s.text, padding: "28px 16px 20px", height: 120, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className="t-display" style={{ fontSize: 20, opacity: 0.92 }}>Aa</div>
                <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.name}</div>
              </div>
              <div style={{ padding: "10px 14px", fontSize: 12, fontFamily: "monospace", background: "#fff", color: "var(--stone)", display: "flex", justifyContent: "space-between" }}>
                <span>{s.hex}</span><span style={{ opacity: 0.5 }}>{s.var}</span>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Typography */}
      {section("Typography", "Fraunces for story. Inter for rails. Caveat for flourishes.", (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>Fraunces · Display</div>
            <div className="t-display" style={{ fontSize: 64, color: "var(--plum-deep)", lineHeight: 0.98 }}>
              Héros <em style={{ fontStyle: "italic", color: "var(--honey-deep)" }}>minuscule</em>.
            </div>
            <div className="t-display" style={{ fontSize: 28, color: "var(--ink)", marginTop: 20 }}>
              48 / 56 / 64 — Regular, Italic
            </div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--stone)", marginTop: 10 }}>-0.02em tracking, 1.04 leading</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>Inter · Body</div>
            <div style={{ fontSize: 22, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4, marginBottom: 10 }}>Warm, quiet, trustworthy.</div>
            <div style={{ fontSize: 16, color: "var(--graphite)", lineHeight: 1.55 }}>
              Body copy is a comfortable 16/1.55 with Inter at 400. Labels step down to 13px medium, small caps at 11/0.18em tracked.
            </div>
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>Caveat · Hand</div>
              <div className="t-hand" style={{ fontSize: 34, color: "var(--plum)" }}>un livre qui lui ressemble</div>
            </div>
          </div>
        </div>
      ))}

      {/* Type scale */}
      {section("Scale", null, (
        <div style={{ background: "#fff", padding: "20px 24px", borderRadius: 12, border: "1px solid var(--bone)" }}>
          {[
            ["Display XL", 64, "Fraunces", "var(--plum-deep)"],
            ["Display L", 44, "Fraunces", "var(--ink)"],
            ["Display M", 28, "Fraunces", "var(--ink)"],
            ["Body L", 18, "Inter", "var(--graphite)"],
            ["Body", 15, "Inter", "var(--graphite)"],
            ["Label", 13, "Inter", "var(--stone)"],
            ["Caps", 11, "Inter", "var(--plum)"],
          ].map(([n, s, f, c]) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", padding: "10px 0", borderBottom: "1px solid var(--bone)", alignItems: "baseline" }}>
              <div style={{ fontSize: 12, color: "var(--stone)" }}>{n}</div>
              <div style={{ fontSize: 12, fontFamily: "monospace", color: "var(--stone)" }}>{s}px</div>
              <div style={{ fontSize: s, fontFamily: f === "Fraunces" ? "var(--f-display)" : "var(--f-body)", color: c, lineHeight: 1.1, letterSpacing: f === "Fraunces" ? "-0.02em" : "0" }}>
                {n === "Caps" ? "UN LIVRE POUR ELLE" : "Un livre pour elle"}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Buttons */}
      {section("Buttons", "Pill buttons throughout. Honey for primary, plum for secondary.", (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
          <button className="ph-btn ph-btn--primary">Créer un aperçu</button>
          <button className="ph-btn ph-btn--primary ph-btn--lg">Créer un aperçu</button>
          <button className="ph-btn ph-btn--secondary">Voir les histoires</button>
          <button className="ph-btn ph-btn--sage">Page suivante</button>
          <button className="ph-btn ph-btn--ghost">Annuler</button>
          <button className="ph-btn ph-btn--primary ph-btn--sm">Ajouter au panier</button>
        </div>
      ))}

      {/* Inputs */}
      {section("Fields", null, (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 620 }}>
          <div>
            <label className="ph-label">Prénom</label>
            <input className="ph-input" placeholder="Ex. Léo, Mila…" defaultValue="Léo" />
          </div>
          <div>
            <label className="ph-label">Courriel</label>
            <input className="ph-input" placeholder="nom@courriel.ca" />
          </div>
        </div>
      ))}

      {/* Badges */}
      {section("Badges", null, (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="ph-badge ph-badge--plum">Nouveau</span>
          <span className="ph-badge ph-badge--honey">3–6 ans</span>
          <span className="ph-badge ph-badge--sage">Français</span>
          <span className="ph-badge ph-badge--rose">Populaire</span>
          <span className="ph-badge ph-badge--cream">Cadeau</span>
        </div>
      ))}

      {/* Card */}
      {section("Cards", null, (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {I18N.books.slice(0, 3).map(b => (
            <div key={b.id} className="ph-card ph-card--hover" style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 18px" }}>
                <BookCover book={b} lang="fr" w={140} />
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <span className="ph-badge ph-badge--cream">{b.age_fr}</span>
                <span className="ph-badge ph-badge--sage">{b.theme_fr}</span>
              </div>
              <div className="t-display" style={{ fontSize: 22, color: "var(--ink)" }}>{b.title_fr}</div>
              <div style={{ fontSize: 14, color: "var(--stone)", marginTop: 6, lineHeight: 1.45 }}>{b.tag_fr}</div>
            </div>
          ))}
        </div>
      ))}

      {/* Motifs */}
      {section("Motifs", "Quiet decorative elements. Used sparingly.", (
        <div style={{ display: "flex", gap: 28, alignItems: "center", padding: "20px 0" }}>
          <Sparkle size={28} color="var(--honey)" />
          <Sparkle size={18} color="var(--plum)" />
          <StarDot size={10} color="var(--plum)" />
          <StarDot size={6} color="var(--honey)" />
          <Swirl w={140} color="var(--plum)" opacity={0.35} />
          <Swirl w={100} color="var(--honey-deep)" opacity={0.45} />
        </div>
      ))}

      <div style={{ fontFamily: "var(--f-hand)", fontSize: 22, color: "var(--stone)", marginTop: 20 }}>— fin de la feuille de style —</div>
    </div>
  );
}

Object.assign(window, { DesignSystemArtboard });
