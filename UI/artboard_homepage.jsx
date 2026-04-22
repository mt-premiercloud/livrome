// Homepage artboard — desktop, with 3 hero variations
function HomepageArtboard({ heroVariant = "editorial", onOpenFlow }) {
  const { t, lang } = useT();
  const { setLang } = React.useContext(LangContext);

  return (
    <div className="artboard-scroll" style={{ width: "100%", height: "100%", background: "var(--paper)", fontFamily: "var(--f-body)", color: "var(--ink)" }}>
      {/* Announcement bar */}
      <div style={{ background: "var(--plum-deep)", color: "var(--cream)", textAlign: "center", padding: "9px 16px", fontSize: 13, letterSpacing: "0.01em" }}>
        <Sparkle size={11} color="#F4B942" style={{ marginRight: 8, verticalAlign: -1 }} />
        {t("nav.announcement")}
      </div>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(251, 247, 238, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(91,42,111,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 56px", maxWidth: 1440, margin: "0 auto" }}>
          <PHLogo size={22} color="var(--plum-deep)" />
          <nav style={{ display: "flex", gap: 32, fontSize: 14, color: "var(--graphite)" }}>
            <a style={{ cursor: "pointer", color: "var(--ink)", fontWeight: 500 }}>{t("nav.books_kids")}</a>
            <a style={{ cursor: "pointer" }}>{t("nav.books_adults")}</a>
            <a style={{ cursor: "pointer" }}>{t("nav.about")}</a>
            <a style={{ cursor: "pointer" }}>{t("nav.faq")}</a>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              style={{ background: "transparent", border: "1px solid var(--bone)", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--graphite)", cursor: "pointer", display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ color: lang === "fr" ? "var(--plum)" : "var(--pebble)" }}>FR</span>
              <span style={{ color: "var(--pebble)" }}>·</span>
              <span style={{ color: lang === "en" ? "var(--plum)" : "var(--pebble)" }}>EN</span>
            </button>
            <Icon.user size={20} color="var(--graphite)" />
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Icon.cart size={22} color="var(--graphite)" />
              <span style={{ position: "absolute", top: -4, right: -6, background: "var(--honey)", color: "var(--ink)", fontSize: 10, fontWeight: 700, borderRadius: 999, padding: "0 5px", minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>1</span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO variants */}
      {heroVariant === "editorial" && <HeroEditorial onOpenFlow={onOpenFlow} />}
      {heroVariant === "storybook" && <HeroStorybook onOpenFlow={onOpenFlow} />}
      {heroVariant === "collage" && <HeroCollage onOpenFlow={onOpenFlow} />}

      {/* Trust strip */}
      <div style={{ borderTop: "1px solid var(--bone)", borderBottom: "1px solid var(--bone)", padding: "20px 56px", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 13, color: "var(--graphite)", gap: 40 }}>
          <span><b style={{ color: "var(--ink)", fontWeight: 600 }}>150,000+</b> {t("hero.trust_a").replace("150,000+", "").replace("150 000+", "").trim()}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--honey)", letterSpacing: 2 }}>★★★★★</span>
            {t("hero.trust_c")}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon.leaf size={16} color="var(--sage-deep)" /> {t("hero.trust_b")}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon.shield size={16} color="var(--plum)" /> Loi 25 · GDPR</span>
        </div>
      </div>

      {/* Choose your story */}
      <section style={{ padding: "112px 56px 96px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
          <div>
            <div className="t-eyebrow">{t("section.library_eyebrow")}</div>
            <h2 className="t-display" style={{ fontSize: 52, color: "var(--plum-deep)", margin: "12px 0 14px", maxWidth: 640 }}>
              {t("section.library_title")}.
            </h2>
            <p style={{ fontSize: 17, color: "var(--graphite)", maxWidth: 520, lineHeight: 1.5 }}>{t("section.library_sub")}</p>
          </div>
          <button className="ph-btn ph-btn--ghost" style={{ marginBottom: 4 }}>
            {lang === "fr" ? "Toute la bibliothèque" : "Browse all"} <Icon.arrow size={14} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {I18N.books.map((b, i) => <BookGridCard key={b.id} book={b} index={i} />)}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "var(--cream)", padding: "112px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="t-eyebrow">{t("section.how_eyebrow")}</div>
            <h2 className="t-display" style={{ fontSize: 52, color: "var(--plum-deep)", margin: "12px 0 0" }}>
              {t("section.how_title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48, position: "relative" }}>
            {/* connector line */}
            <div style={{ position: "absolute", top: 52, left: "16.6%", right: "16.6%", height: 1, borderTop: "1.5px dashed rgba(91,42,111,0.25)", zIndex: 0 }} />
            {[1, 2, 3].map(n => (
              <HowStep key={n} n={n}
                title={t(`section.how_${n}_t`)}
                desc={t(`section.how_${n}_d`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Voices / testimonials */}
      <section style={{ padding: "112px 56px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div className="t-eyebrow">{t("section.voices_eyebrow")}</div>
          <h2 className="t-display" style={{ fontSize: 52, color: "var(--plum-deep)", margin: "12px 0 0", maxWidth: 640 }}>{t("section.voices_title")}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {I18N.testimonials.map((tm, i) => (
            <TestimonialCard key={i} tm={tm} lang={lang} featured={i === 1} />
          ))}
        </div>
      </section>

      {/* Trust promises */}
      <section style={{ background: "var(--plum-deep)", color: "var(--cream)", padding: "112px 56px", position: "relative", overflow: "hidden" }}>
        <StarField count={22} color="#F4B942" />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--honey)", marginBottom: 10 }}>{t("section.trust_eyebrow")}</div>
            <h2 className="t-display" style={{ fontSize: 52, color: "var(--cream)", margin: "0" }}>{t("section.trust_title")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { icon: Icon.shield, t: t("section.trust_1_t"), d: t("section.trust_1_d") },
              { icon: Icon.heart, t: t("section.trust_2_t"), d: t("section.trust_2_d") },
              { icon: Icon.quality, t: t("section.trust_3_t"), d: t("section.trust_3_d") },
            ].map((it, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "rgba(244,185,66,0.12)", marginBottom: 20, color: "var(--honey)" }}>
                  <it.icon size={26} color="var(--honey)" />
                </div>
                <div className="t-display" style={{ fontSize: 26, color: "var(--cream)", marginBottom: 10 }}>{it.t}</div>
                <div style={{ fontSize: 15, color: "rgba(255,248,236,0.75)", lineHeight: 1.55, maxWidth: 320, margin: "0 auto" }}>{it.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "112px 56px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="t-eyebrow">{t("section.faq_eyebrow")}</div>
          <h2 className="t-display" style={{ fontSize: 48, color: "var(--plum-deep)", margin: "12px 0 0" }}>{t("section.faq_title")}</h2>
        </div>
        <FAQAccordion />
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button className="ph-btn ph-btn--secondary">{t("section.faq_all")} <Icon.arrow size={13} /></button>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "0 56px 112px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", background: "var(--cream-deep)", borderRadius: 24, padding: "96px 72px", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <Swirl w={200} color="var(--plum)" opacity={0.14} style={{ position: "absolute", top: 40, left: 40 }} />
          <Swirl w={160} color="var(--honey-deep)" opacity={0.25} style={{ position: "absolute", bottom: 36, right: 60, transform: "rotate(180deg)" }} />
          <div className="t-eyebrow" style={{ marginBottom: 16 }}>{t("section.final_eyebrow")}</div>
          <h2 className="t-display" style={{ fontSize: 56, color: "var(--plum-deep)", margin: "0 auto 28px", maxWidth: 760, textWrap: "pretty" }}>{t("section.final_title")}</h2>
          <button className="ph-btn ph-btn--primary ph-btn--lg" onClick={onOpenFlow}>{t("hero.cta_primary")} <Icon.arrow size={14} /></button>
          <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 16 }}>{t("section.final_note")}</div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// ──────── Hero variants ────────
function HeroEditorial({ onOpenFlow }) {
  const { t, lang } = useT();
  const title = t("hero.title_a");
  return (
    <section style={{ padding: "72px 56px 96px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 72, alignItems: "center" }}>
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 20 }}>{t("hero.eyebrow")}</div>
          <h1 className="t-display" style={{ fontSize: 88, lineHeight: 0.98, color: "var(--plum-deep)", margin: 0, letterSpacing: "-0.025em" }}>
            {title[0]}{" "}
            <em style={{ fontStyle: "italic", color: "var(--honey-deep)", position: "relative", display: "inline-block" }}>
              {title[1]}
              <svg viewBox="0 0 200 10" style={{ position: "absolute", left: "-2%", right: "-2%", bottom: -8, width: "104%", height: 10 }} fill="none">
                <path d="M2 7 C 40 2, 80 2, 120 6 S 190 4, 198 3" stroke="var(--honey)" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </em>
            {" "}{title[2]}
          </h1>
          <p style={{ fontSize: 19, color: "var(--graphite)", lineHeight: 1.5, margin: "32px 0 40px", maxWidth: 520, textWrap: "pretty" }}>{t("hero.subtitle")}</p>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button className="ph-btn ph-btn--primary ph-btn--lg" onClick={onOpenFlow}>{t("hero.cta_primary")} <Icon.arrow size={14} /></button>
            <button className="ph-btn ph-btn--ghost">{t("hero.cta_secondary")} <Icon.arrow size={13} /></button>
          </div>
          <div style={{ fontFamily: "var(--f-hand)", fontSize: 22, color: "var(--plum-soft)", marginTop: 28, transform: "rotate(-1.5deg)", display: "inline-block" }}>
            {t("hero.caption")}
          </div>
        </div>
        {/* Right: book on stage with photograph */}
        <div style={{ position: "relative", aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: "10% 6%", background: "radial-gradient(ellipse at center, rgba(244,185,66,0.28), rgba(244,185,66,0) 65%)" }} />
          <Sparkle size={20} color="var(--honey)" style={{ position: "absolute", top: "8%", left: "12%", animation: "sparkle-float 3s ease-in-out infinite" }} />
          <Sparkle size={14} color="var(--plum)" style={{ position: "absolute", top: "18%", right: "18%", animation: "sparkle-float 4s ease-in-out 0.5s infinite" }} />
          <Sparkle size={12} color="var(--honey)" style={{ position: "absolute", bottom: "22%", left: "14%", animation: "sparkle-float 3.5s ease-in-out 1.2s infinite" }} />
          <div style={{ position: "relative", width: 360, height: 496, transform: "rotate(-3deg) perspective(800px) rotateY(-8deg)", transformOrigin: "center" }}>
            <BookCover book={I18N.books[4]} lang={lang} w={360} />
          </div>
          <div style={{ position: "absolute", right: "4%", bottom: "8%", width: 180, height: 200, borderRadius: 8, overflow: "hidden", boxShadow: "0 20px 40px rgba(30,20,30,0.25)", transform: "rotate(4deg)", border: "6px solid white" }}>
            <img src="https://images.unsplash.com/photo-1544776193-0dd1c1c8cb4e?w=400&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStorybook({ onOpenFlow }) {
  const { t, lang } = useT();
  const title = t("hero.title_a");
  return (
    <section style={{ padding: "120px 56px 120px", background: "linear-gradient(180deg, var(--cream) 0%, var(--paper) 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <StarField count={18} color="var(--honey)" style={{ opacity: 0.5 }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <div className="t-eyebrow" style={{ marginBottom: 24 }}>{t("hero.eyebrow")}</div>
        <h1 className="t-display" style={{ fontSize: 104, lineHeight: 0.98, color: "var(--plum-deep)", margin: 0, letterSpacing: "-0.025em" }}>
          {title[0]} <em style={{ fontStyle: "italic", color: "var(--honey-deep)" }}>{title[1]}</em> {title[2]}
        </h1>
        <p style={{ fontSize: 20, color: "var(--graphite)", lineHeight: 1.5, margin: "36px auto 40px", maxWidth: 580, textWrap: "pretty" }}>{t("hero.subtitle")}</p>
        <button className="ph-btn ph-btn--primary ph-btn--lg" onClick={onOpenFlow}>{t("hero.cta_primary")} <Icon.arrow size={14} /></button>
        <div style={{ display: "flex", justifyContent: "center", gap: 44, marginTop: 72, flexWrap: "wrap" }}>
          {[0, 4, 2, 5].map((i, idx) => (
            <div key={i} style={{ transform: `rotate(${[-6, -2, 3, 7][idx]}deg) translateY(${[12, 0, 6, 18][idx]}px)` }}>
              <BookCover book={I18N.books[i]} lang={lang} w={150} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroCollage({ onOpenFlow }) {
  const { t, lang } = useT();
  const title = t("hero.title_a");
  return (
    <section style={{ padding: "56px 56px 88px", position: "relative" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        {/* Left: collage */}
        <div style={{ position: "relative", aspectRatio: "1 / 1" }}>
          <div style={{ position: "absolute", top: "4%", left: "6%", width: "46%", aspectRatio: "3/4", borderRadius: 8, overflow: "hidden", boxShadow: "0 16px 32px rgba(30,20,30,0.18)", border: "6px solid white", transform: "rotate(-4deg)" }}>
            <img src="https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", top: "20%", right: "4%", width: 180 }}>
            <BookCover book={I18N.books[0]} lang={lang} w={180} rotate={6} />
          </div>
          <div style={{ position: "absolute", bottom: "8%", left: "18%", width: "50%", aspectRatio: "1/1", borderRadius: 8, overflow: "hidden", boxShadow: "0 16px 32px rgba(30,20,30,0.18)", border: "6px solid white", transform: "rotate(3deg)" }}>
            <img src="https://images.unsplash.com/photo-1604881991720-f91add269bed?w=500&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", top: "12%", left: "38%", fontFamily: "var(--f-hand)", fontSize: 26, color: "var(--plum)", transform: "rotate(-8deg)" }}>le héros, c'est toi</div>
          <Sparkle size={18} color="var(--honey)" style={{ position: "absolute", top: "2%", right: "32%" }} />
          <Sparkle size={12} color="var(--plum)" style={{ position: "absolute", bottom: "2%", right: "12%" }} />
        </div>
        {/* Right: copy */}
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 18 }}>{t("hero.eyebrow")}</div>
          <h1 className="t-display" style={{ fontSize: 76, lineHeight: 1, color: "var(--plum-deep)", margin: 0, letterSpacing: "-0.02em" }}>
            {title[0]} <em style={{ fontStyle: "italic", color: "var(--honey-deep)" }}>{title[1]}</em> {title[2]}
          </h1>
          <p style={{ fontSize: 18, color: "var(--graphite)", lineHeight: 1.55, margin: "28px 0 36px", maxWidth: 480 }}>{t("hero.subtitle")}</p>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button className="ph-btn ph-btn--primary ph-btn--lg" onClick={onOpenFlow}>{t("hero.cta_primary")}</button>
            <button className="ph-btn ph-btn--ghost">{t("hero.cta_secondary")} <Icon.arrow size={13} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────── Small components ────────
function BookGridCard({ book, index }) {
  const { lang } = useT();
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer", transition: "transform .3s var(--ease-out)", transform: hover ? "translateY(-4px)" : "none" }}>
      <div style={{ position: "relative", aspectRatio: "3/4", background: book.pair[0], borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 24px rgba(30,20,30,0.10)" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BookCover book={book} lang={lang} w={220} style={{ boxShadow: "none" }} />
        </div>
        {hover && (
          <div className="anim-fade-slide" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%)", display: "flex", alignItems: "flex-end", padding: 20 }}>
            <div style={{ color: "var(--cream)" }}>
              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>{book[`tag_${lang}`]}</div>
              <span style={{ background: "var(--honey)", color: "var(--ink)", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 999 }}>{lang === "fr" ? "Aperçu" : "Preview"} →</span>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 14, marginBottom: 6 }}>
        <span className="ph-badge ph-badge--cream">{book[`age_${lang}`]}</span>
        <span className="ph-badge ph-badge--sage">{book[`theme_${lang}`]}</span>
      </div>
      <div className="t-display" style={{ fontSize: 22, color: "var(--ink)", lineHeight: 1.15 }}>{book[`title_${lang}`]}</div>
    </div>
  );
}

function HowStep({ n, title, desc }) {
  const illos = {
    1: <svg viewBox="0 0 80 80" width="48" height="48" fill="none" stroke="var(--plum)" strokeWidth="1.4"><rect x="18" y="14" width="44" height="54" rx="2"/><path d="M18 14c8 2 14 6 22 6s14-4 22-6v54c-8 2-14 6-22 6s-14-4-22-6"/><path d="M40 20v54" strokeWidth="1"/></svg>,
    2: <svg viewBox="0 0 80 80" width="48" height="48" fill="none" stroke="var(--plum)" strokeWidth="1.4"><rect x="14" y="20" width="52" height="40" rx="3"/><circle cx="28" cy="36" r="4"/><path d="M14 56l14-14 10 10 10-8 18 16"/></svg>,
    3: <svg viewBox="0 0 80 80" width="48" height="48" fill="none" stroke="var(--plum)" strokeWidth="1.4"><path d="M16 22h40l8 8v32a2 2 0 01-2 2H16a2 2 0 01-2-2V24a2 2 0 012-2z"/><path d="M56 22v8h8"/><path d="M26 40h28M26 48h22"/></svg>,
  };
  return (
    <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
      <div style={{ width: 104, height: 104, borderRadius: "50%", background: "var(--paper)", border: "1.5px solid var(--bone)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", position: "relative" }}>
        {illos[n]}
        <div style={{ position: "absolute", top: -8, right: -6, width: 32, height: 32, borderRadius: "50%", background: "var(--plum-deep)", color: "var(--honey)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-display)", fontSize: 17, fontStyle: "italic" }}>{n}</div>
      </div>
      <div className="t-display" style={{ fontSize: 28, color: "var(--ink)", marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 15, color: "var(--stone)", lineHeight: 1.55, maxWidth: 300, margin: "0 auto" }}>{desc}</div>
    </div>
  );
}

function TestimonialCard({ tm, lang, featured }) {
  return (
    <div className="ph-card" style={{ padding: 32, background: featured ? "var(--cream)" : "#fff", position: "relative", overflow: "hidden" }}>
      <div className="t-display" style={{ fontSize: 52, color: "var(--honey)", lineHeight: 0.6, marginBottom: 12 }}>“</div>
      <p className="t-display" style={{ fontSize: 22, color: "var(--ink)", lineHeight: 1.35, margin: 0, textWrap: "pretty" }}>{tm[lang]}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--bone)" }}>
        <Avatar name={tm[`author_${lang}`]} size={36} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{tm[`author_${lang}`]}</div>
          <div style={{ fontSize: 12, color: "var(--stone)" }}>{tm.city}</div>
        </div>
        <div style={{ marginLeft: "auto", color: "var(--honey)", letterSpacing: 1, fontSize: 13 }}>★★★★★</div>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const { t } = useT();
  const [open, setOpen] = React.useState(0);
  const items = [1, 2, 3];
  return (
    <div>
      {items.map(n => {
        const isOpen = open === n;
        return (
          <div key={n} style={{ borderBottom: "1px solid var(--bone)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : n)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "transparent", border: 0, cursor: "pointer", fontFamily: "var(--f-body)", textAlign: "left" }}>
              <span className="t-display" style={{ fontSize: 24, color: "var(--ink)" }}>{t(`section.faq_${n}_q`)}</span>
              <span style={{ color: "var(--plum)", transition: "transform .25s var(--ease-out)", transform: isOpen ? "rotate(45deg)" : "none" }}>
                <Icon.plus size={20} color="var(--plum)" />
              </span>
            </button>
            {isOpen && (
              <div className="anim-fade-slide" style={{ paddingBottom: 24, paddingRight: 40, fontSize: 16, color: "var(--graphite)", lineHeight: 1.55, maxWidth: 720 }}>
                {t(`section.faq_${n}_a`)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Footer() {
  const { t, lang } = useT();
  const col = (title, items) => (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cream)", opacity: 0.7, marginBottom: 16 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(x => <a key={x} style={{ color: "var(--cream)", opacity: 0.85, fontSize: 14, cursor: "pointer" }}>{x}</a>)}
      </div>
    </div>
  );
  return (
    <footer style={{ background: "var(--ink)", color: "var(--cream)", padding: "72px 56px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,248,236,0.12)" }}>
          <div>
            <PHLogo color="var(--cream)" size={22} />
            <div style={{ fontSize: 15, opacity: 0.75, marginTop: 16, lineHeight: 1.5, maxWidth: 280 }}>{t("footer.tagline")}</div>
            <div style={{ marginTop: 24, display: "flex", gap: 10, alignItems: "center" }}>
              <input className="ph-input" placeholder={t("footer.newsletter_p")} style={{ background: "rgba(255,248,236,0.08)", border: "1px solid rgba(255,248,236,0.18)", color: "var(--cream)", fontSize: 13, padding: "10px 14px" }} />
              <button className="ph-btn ph-btn--primary ph-btn--sm">{t("footer.newsletter_b")}</button>
            </div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>{t("footer.newsletter_t")}</div>
          </div>
          {col(t("footer.col_shop"), lang === "fr" ? ["Livres 3-5 ans", "Livres 5-8 ans", "Livres pour adultes", "Cartes-cadeaux"] : ["Books 3-5", "Books 5-8", "Adult books", "Gift cards"])}
          {col(t("footer.col_support"), lang === "fr" ? ["FAQ", "Contact", "Suivi de commande", "Retours"] : ["FAQ", "Contact", "Track order", "Returns"])}
          {col(t("footer.col_company"), lang === "fr" ? ["À propos", "Notre atelier", "Presse", "Carrières"] : ["About", "Our workshop", "Press", "Careers"])}
          {col(t("footer.col_legal"), lang === "fr" ? ["Confidentialité", "Conditions", "Politique de retour", "Loi 25"] : ["Privacy", "Terms", "Refund policy", "Law 25"])}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28, fontSize: 13, opacity: 0.65 }}>
          <span>{t("footer.rights")}</span>
          <span style={{ display: "flex", gap: 14 }}>
            <span>Visa · Mastercard · Amex · Apple Pay · PayPal</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { HomepageArtboard });
