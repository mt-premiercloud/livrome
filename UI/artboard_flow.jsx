// Preview Flow — 7 steps. Fully interactive with real state.
function PreviewFlow({ onClose, mobile = false, initialStep = 1 }) {
  const { t, lang } = useT();
  const { setLang } = React.useContext(LangContext);
  const [step, setStep] = React.useState(initialStep);
  const [data, setData] = React.useState({
    book: I18N.books[4], // Lantern
    name: "Léo",
    age: 5,
    gender: "boy",
    skin: 2,
    bookLang: lang,
    photo: null,
    generated: false,
    pageChoices: {}, // { pageNum: variantIdx }
    format: "hard",
  });
  const set = (patch) => setData(d => ({ ...d, ...patch }));

  const totalSteps = 7;
  const next = () => setStep(s => Math.min(totalSteps, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  return (
    <div style={{ width: "100%", height: "100%", background: "var(--paper)", display: "flex", flexDirection: "column", fontFamily: "var(--f-body)", color: "var(--ink)", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ borderBottom: "1px solid var(--bone)", padding: mobile ? "14px 16px" : "18px 40px", display: "flex", alignItems: "center", gap: 16, background: "var(--paper)", flexShrink: 0 }}>
        <PHLogo size={mobile ? 18 : 20} color="var(--plum-deep)" />
        <div style={{ flex: 1, marginLeft: mobile ? 12 : 40 }}>
          <StepRail step={step} total={totalSteps} mobile={mobile} />
        </div>
        <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} style={{ background: "transparent", border: "1px solid var(--bone)", borderRadius: 999, padding: "5px 10px", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "var(--graphite)", cursor: "pointer" }}>
          {lang === "fr" ? "EN" : "FR"}
        </button>
        <button onClick={onClose} style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--stone)", padding: 6, display: "flex" }}>
          <Icon.close size={18} />
        </button>
      </div>

      {/* Step content */}
      <div className="artboard-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <div key={step} className="anim-fade-slide" style={{ padding: mobile ? "24px 16px 32px" : "48px 40px 56px", maxWidth: mobile ? "100%" : 880, margin: "0 auto" }}>
          {step === 1 && <Step1 data={data} onNext={next} mobile={mobile} />}
          {step === 2 && <Step2 data={data} set={set} onNext={next} mobile={mobile} />}
          {step === 3 && <Step3 data={data} set={set} onNext={next} mobile={mobile} />}
          {step === 4 && <Step4 data={data} set={set} onNext={next} mobile={mobile} />}
          {step === 5 && <Step5 data={data} set={set} onNext={next} mobile={mobile} />}
          {step === 6 && <Step6 data={data} onNext={next} onEdit={() => setStep(5)} mobile={mobile} />}
          {step === 7 && <Step7 data={data} set={set} onClose={onClose} mobile={mobile} />}
        </div>
      </div>

      {/* Bottom bar */}
      {step > 1 && step !== 4 && (
        <div style={{ borderTop: "1px solid var(--bone)", padding: mobile ? "12px 16px" : "16px 40px", display: "flex", justifyContent: "space-between", background: "var(--paper)", flexShrink: 0 }}>
          <button className="ph-btn ph-btn--ghost" onClick={back}>
            <Icon.chev dir="left" size={14} /> {t("flow.back")}
          </button>
          <div style={{ fontSize: 12, color: "var(--stone)", alignSelf: "center", display: mobile ? "none" : "block" }}>
            {t("flow.progress")} {step} {t("flow.of")} {totalSteps}
          </div>
        </div>
      )}
    </div>
  );
}

// Step rail — pill progress with step labels
function StepRail({ step, total, mobile }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <React.Fragment key={n}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: mobile ? 0 : (active ? "6px 14px 6px 8px" : "6px 8px"),
              background: active ? "rgba(91,42,111,0.08)" : "transparent",
              borderRadius: 999,
              transition: "all .25s var(--ease-out)",
            }}>
              <span style={{
                width: mobile ? 22 : 24, height: mobile ? 22 : 24, borderRadius: "50%",
                background: done ? "var(--plum)" : active ? "var(--honey)" : "transparent",
                border: !done && !active ? "1.5px solid var(--pebble)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: done ? "var(--cream)" : active ? "var(--ink)" : "var(--stone)",
                fontSize: 12, fontWeight: 600, flexShrink: 0,
              }}>
                {done ? <Icon.check size={11} color="var(--cream)" /> : n}
              </span>
              {active && !mobile && <span style={{ fontSize: 13, fontWeight: 500, color: "var(--plum)" }}>{stepName(n)}</span>}
            </div>
            {n < total && <div style={{ width: mobile ? 4 : 14, height: 1, background: "var(--pebble)", opacity: 0.5 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
function stepName(n) {
  const names = { 1: "Histoire", 2: "Enfant", 3: "Photo", 4: "Magie", 5: "Pages", 6: "Aperçu", 7: "Commande" };
  return names[n];
}

// ──────── Step 1 — Welcome ────────
function Step1({ data, onNext, mobile }) {
  const { t, lang } = useT();
  return (
    <div style={{ textAlign: "center", paddingTop: mobile ? 16 : 40 }}>
      <div className="t-eyebrow">{t("flow.s1_eyebrow")}</div>
      <h1 className="t-display" style={{ fontSize: mobile ? 36 : 56, color: "var(--plum-deep)", margin: "14px 0 20px", letterSpacing: "-0.02em" }}>
        {t("flow.s1_title")}
      </h1>
      <p style={{ fontSize: mobile ? 15 : 18, color: "var(--graphite)", lineHeight: 1.5, maxWidth: 520, margin: "0 auto 40px", textWrap: "pretty" }}>
        {t("flow.s1_body")}
      </p>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0 32px", position: "relative" }}>
        <div style={{ position: "absolute", inset: "10% 30%", background: "radial-gradient(ellipse, rgba(244,185,66,0.35), transparent 70%)" }} />
        <div style={{ transform: "rotate(-2deg)", position: "relative" }}>
          <BookCover book={data.book} lang={lang} w={mobile ? 180 : 220} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <button className="ph-btn ph-btn--primary ph-btn--lg" onClick={onNext}>
          {t("flow.s1_cta")} <Icon.arrow size={14} />
        </button>
        <button className="ph-btn ph-btn--ghost">{t("flow.s1_changebook")}</button>
      </div>
      <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 20, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
        <Icon.shield size={14} color="var(--sage-deep)" /> {t("flow.s1_promise")}
      </div>
    </div>
  );
}

// ──────── Step 2 — Child details ────────
function Step2({ data, set, onNext, mobile }) {
  const { t } = useT();
  const [touched, setTouched] = React.useState({});
  const nameError = touched.name && (!data.name || data.name.trim().length < 2);

  const skinTones = ["#F5DCC7", "#E8C0A6", "#C9936B", "#8E5A3B", "#5A3922"];
  const ages = [3, 4, 5, 6, 7, 8];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 className="t-display" style={{ fontSize: mobile ? 32 : 44, color: "var(--plum-deep)", margin: "0 0 10px" }}>{t("flow.s2_title")}</h1>
        <p style={{ fontSize: 16, color: "var(--stone)" }}>{t("flow.s2_sub")}</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: mobile ? 20 : 32, boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Name */}
        <div>
          <label className="ph-label">{t("flow.s2_name")}</label>
          <input className="ph-input" placeholder={t("flow.s2_name_ph")} value={data.name}
            onChange={(e) => set({ name: e.target.value })}
            onBlur={() => setTouched(x => ({ ...x, name: true }))}
            style={nameError ? { borderColor: "var(--error)" } : {}} />
          {nameError && <div style={{ fontSize: 12, color: "var(--error)", marginTop: 6 }}>
            {t("flow.s2_name_ph") && "Merci d'entrer un prénom"}
          </div>}
        </div>

        {/* Age + Gender */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1.3fr", gap: 20 }}>
          <div>
            <label className="ph-label">{t("flow.s2_age")}</label>
            <div style={{ display: "flex", gap: 6 }}>
              {ages.map(a => (
                <button key={a} onClick={() => set({ age: a })}
                  className="focus-ring"
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 10,
                    border: data.age === a ? "1.5px solid var(--plum)" : "1.5px solid var(--bone)",
                    background: data.age === a ? "rgba(91,42,111,0.06)" : "#fff",
                    color: data.age === a ? "var(--plum)" : "var(--graphite)",
                    fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "var(--f-body)",
                    transition: "all .15s",
                  }}>{a}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="ph-label">{t("flow.s2_gender")}</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[["boy", t("flow.s2_g_boy")], ["girl", t("flow.s2_g_girl")], ["neutral", t("flow.s2_g_neutral")]].map(([v, label]) => (
                <button key={v} onClick={() => set({ gender: v })}
                  style={{
                    flex: 1, padding: "10px 6px", borderRadius: 10,
                    border: data.gender === v ? "1.5px solid var(--plum)" : "1.5px solid var(--bone)",
                    background: data.gender === v ? "rgba(91,42,111,0.06)" : "#fff",
                    color: data.gender === v ? "var(--plum)" : "var(--graphite)",
                    fontWeight: data.gender === v ? 600 : 500, fontSize: 13, cursor: "pointer", fontFamily: "var(--f-body)",
                  }}>{label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Skin */}
        <div>
          <label className="ph-label">{t("flow.s2_skin")}</label>
          <div style={{ display: "flex", gap: 10 }}>
            {skinTones.map((c, i) => (
              <button key={i} onClick={() => set({ skin: i })}
                aria-label={`Skin tone ${i + 1}`}
                style={{
                  width: 44, height: 44, borderRadius: "50%", background: c,
                  border: data.skin === i ? "3px solid var(--plum)" : "3px solid transparent",
                  boxShadow: data.skin === i ? "0 0 0 1.5px #fff inset" : "inset 0 0 0 1px rgba(0,0,0,0.1)",
                  cursor: "pointer", transition: "transform .15s",
                  transform: data.skin === i ? "scale(1.08)" : "scale(1)",
                }} />
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="ph-label">{t("flow.s2_lang")}</label>
          <div style={{ display: "flex", gap: 8, maxWidth: 280 }}>
            {[["fr", "Français"], ["en", "English"]].map(([v, label]) => (
              <button key={v} onClick={() => set({ bookLang: v })}
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 10,
                  border: data.bookLang === v ? "1.5px solid var(--plum)" : "1.5px solid var(--bone)",
                  background: data.bookLang === v ? "rgba(91,42,111,0.06)" : "#fff",
                  color: data.bookLang === v ? "var(--plum)" : "var(--graphite)",
                  fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "var(--f-body)",
                }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <button
          className="ph-btn ph-btn--primary ph-btn--lg"
          onClick={() => { if (data.name && data.name.trim().length >= 2) onNext(); else setTouched({ name: true }); }}>
          {t("flow.continue")} <Icon.arrow size={14} />
        </button>
      </div>
    </div>
  );
}

// ──────── Step 3 — Photo upload ────────
function Step3({ data, set, onNext, mobile }) {
  const { t } = useT();
  const [dragOver, setDragOver] = React.useState(false);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [detected, setDetected] = React.useState(false);
  const inputRef = React.useRef(null);

  const demoPhotos = [
    "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&q=80",
    "https://images.unsplash.com/photo-1544776193-0dd1c1c8cb4e?w=400&q=80",
    "https://images.unsplash.com/photo-1511424400163-1c66a2d5b3ee?w=400&q=80",
  ];

  const loadPhoto = (src) => {
    set({ photo: src });
    setAnalyzing(true);
    setDetected(false);
    setTimeout(() => { setAnalyzing(false); setDetected(true); }, 1400);
  };

  const onFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => loadPhoto(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 className="t-display" style={{ fontSize: mobile ? 32 : 44, color: "var(--plum-deep)", margin: "0 0 10px" }}>{t("flow.s3_title")}</h1>
        <p style={{ fontSize: 16, color: "var(--stone)", maxWidth: 520, margin: "0 auto" }}>{t("flow.s3_sub")}</p>
      </div>

      {!data.photo ? (
        <>
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); onFile(e.dataTransfer.files[0]); }}
            onClick={() => inputRef.current?.click()}
            style={{
              background: dragOver ? "rgba(244,185,66,0.12)" : "rgba(91,42,111,0.03)",
              border: `2px dashed ${dragOver ? "var(--honey)" : "var(--plum-soft)"}`,
              borderRadius: 20, padding: mobile ? "44px 20px" : "64px 40px",
              textAlign: "center", cursor: "pointer", transition: "all .2s",
            }}>
            <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => onFile(e.target.files[0])} />
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "50%", background: "rgba(91,42,111,0.08)", marginBottom: 20 }}>
              <Icon.upload size={28} color="var(--plum)" />
            </div>
            <div className="t-display" style={{ fontSize: 24, color: "var(--ink)", marginBottom: 6 }}>{t("flow.s3_drop")}</div>
            <div style={{ fontSize: 14, color: "var(--stone)", marginBottom: 16 }}>{t("flow.s3_or")}</div>
            <span className="ph-btn ph-btn--secondary">{t("flow.s3_browse")}</span>
          </div>

          {/* Demo photos */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 10 }}>{mobile ? "Essayer avec une photo de démo" : "Or try a demo photo for this prototype"}</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {demoPhotos.map((p, i) => (
                <button key={i} onClick={() => loadPhoto(p)}
                  style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--bone)", padding: 0, cursor: "pointer", background: "transparent" }}>
                  <img src={p} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 20, marginTop: 32 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid var(--bone)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage-deep)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon.check size={14} color="var(--sage-deep)" /> {t("flow.s3_good")}
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: 14, color: "var(--graphite)", display: "flex", flexDirection: "column", gap: 8 }}>
                {[1, 2, 3].map(n => (
                  <li key={n} style={{ display: "flex", gap: 8 }}>
                    <span style={{ color: "var(--sage-deep)" }}>·</span>{t(`flow.s3_tip_${n}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid var(--bone)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--error)", marginBottom: 12 }}>
                × {t("flow.s3_bad")}
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: 14, color: "var(--graphite)", display: "flex", flexDirection: "column", gap: 8 }}>
                <li style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--error)" }}>·</span>Plusieurs personnes</li>
                <li style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--error)" }}>·</span>Visage flou ou caché</li>
                <li style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--error)" }}>·</span>Photo très sombre</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Preview with face detection */}
          <div style={{ background: "#fff", borderRadius: 16, padding: mobile ? 20 : 32, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "240px 1fr", gap: 24, alignItems: "center" }}>
              <div style={{ aspectRatio: "1", borderRadius: 12, overflow: "hidden", position: "relative", background: "var(--bone)" }}>
                <img src={data.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {detected && (
                  <svg viewBox="0 0 240 240" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                    <rect x="72" y="56" width="96" height="120" rx="48" fill="none" stroke="#6BAA75" strokeWidth="2.5" strokeDasharray="4 4" className="anim-fade-slide" />
                  </svg>
                )}
              </div>
              <div>
                {analyzing ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 22, height: 22, border: "2.5px solid var(--bone)", borderTopColor: "var(--plum)", borderRadius: "50%", animation: "spin-slow .8s linear infinite" }} />
                    <span style={{ fontSize: 15, color: "var(--graphite)" }}>{t("flow.s3_detecting")}</span>
                  </div>
                ) : detected ? (
                  <>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--success)", fontSize: 13, fontWeight: 600, padding: "5px 11px", background: "rgba(107,170,117,0.15)", borderRadius: 999, marginBottom: 12 }}>
                      <Icon.check size={13} color="var(--success)" /> {t("flow.s3_detected")}
                    </div>
                    <div className="t-display" style={{ fontSize: 22, color: "var(--ink)", margin: "0 0 6px" }}>
                      {data.name || "Votre enfant"}, {data.age} ans
                    </div>
                    <div style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.5 }}>
                      {t("flow.s3_crop")} · <span style={{ color: "var(--plum)", cursor: "pointer", fontWeight: 500 }} onClick={() => set({ photo: null })}>{t("flow.s3_replace")}</span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: "var(--stone)", textAlign: "center", margin: "20px 0 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon.shield size={14} color="var(--sage-deep)" /> {t("flow.s3_privacy")}
          </div>

          <div style={{ textAlign: "center" }}>
            <button className="ph-btn ph-btn--primary ph-btn--lg" disabled={!detected} onClick={onNext}
              style={!detected ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
              {t("flow.s3_cta")} <Icon.arrow size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ──────── Step 4 — Generation ────────
function Step4({ data, set, onNext, mobile }) {
  const { t } = useT();
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);

  React.useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const np = Math.min(100, p + 1.2);
        setPhase(np < 30 ? 1 : np < 65 ? 2 : np < 95 ? 3 : 4);
        if (np >= 100) { clearInterval(iv); setTimeout(() => { set({ generated: true }); onNext(); }, 600); }
        return np;
      });
    }, 60);
    return () => clearInterval(iv);
  }, []);

  const phaseKey = `flow.s4_title_${phase}`;

  return (
    <div style={{ textAlign: "center", padding: mobile ? "20px 0" : "40px 0" }}>
      {/* Magical illustration */}
      <div style={{ position: "relative", width: mobile ? 220 : 280, height: mobile ? 220 : 280, margin: "0 auto 32px" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(244,185,66,0.3), transparent 60%)", animation: "sparkle-float 2.4s ease-in-out infinite" }} />
        <StarField count={14} color="var(--honey)" />
        {/* Rotating book */}
        <div style={{ position: "absolute", inset: "18%", background: "var(--plum-deep)", borderRadius: 4, boxShadow: "0 12px 32px rgba(30,20,30,0.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spin-slow 8s linear infinite" }}>
          <Sparkle size={32} color="var(--honey)" />
        </div>
      </div>

      <h1 key={phase} className="t-display anim-fade-slide" style={{ fontSize: mobile ? 28 : 40, color: "var(--plum-deep)", margin: "0 0 10px" }}>
        {t(phaseKey)}
      </h1>
      <p style={{ fontSize: 15, color: "var(--stone)", margin: "0 0 28px" }}>{t("flow.s4_eta")}</p>

      {/* Progress bar */}
      <div style={{ maxWidth: 420, margin: "0 auto 36px" }}>
        <div style={{ height: 8, background: "var(--bone)", borderRadius: 999, overflow: "hidden", position: "relative" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, var(--plum) 0%, var(--honey) 50%, var(--plum) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
            borderRadius: 999, transition: "width .2s linear",
          }} />
        </div>
        <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 8, fontVariantNumeric: "tabular-nums" }}>{Math.round(progress)}%</div>
      </div>

      {/* Email capture */}
      <div style={{ background: "var(--cream-deep)", borderRadius: 14, padding: mobile ? "20px 16px" : "24px 28px", maxWidth: 480, margin: "0 auto", textAlign: "left" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--plum-deep)", marginBottom: 4 }}>{t("flow.s4_sub")}</div>
        {emailSent ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--success)", fontSize: 14, marginTop: 10 }}>
            <Icon.check size={14} color="var(--success)" /> {email}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input className="ph-input" placeholder={t("flow.s4_email_ph")} value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1 }} />
            <button className="ph-btn ph-btn--primary ph-btn--sm" onClick={() => email.includes("@") && setEmailSent(true)}>{t("flow.s4_email_btn")}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────── Step 5 — Page-by-page review ────────
function Step5({ data, set, onNext, mobile }) {
  const { t, lang } = useT();
  const totalPages = 8; // reduced for demo
  const [page, setPage] = React.useState(1);

  const variantsForPage = (p) => {
    // Generate 4 variants using different palettes
    const palettes = [
      ["#5B2A6F", "#F4B942", "#FFF8EC"],
      ["#3F1C4F", "#E8B4B8", "#FFF8EC"],
      ["#2E5E7E", "#F4B942", "#FFF8EC"],
      ["#8FB996", "#F4B942", "#FFF8EC"],
    ];
    return palettes.map((p, i) => ({ id: i, palette: p }));
  };

  const variants = variantsForPage(page);
  const chosen = data.pageChoices[page] ?? 0;

  const choose = (v) => set({ pageChoices: { ...data.pageChoices, [page]: v } });

  const goNextPage = () => {
    if (page < totalPages) setPage(page + 1);
    else onNext();
  };

  const skipRest = () => {
    const choices = { ...data.pageChoices };
    for (let p = page; p <= totalPages; p++) if (choices[p] === undefined) choices[p] = 0;
    set({ pageChoices: choices });
    onNext();
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div className="t-eyebrow">{t("flow.s5_eyebrow")}</div>
        <h1 className="t-display" style={{ fontSize: mobile ? 28 : 38, color: "var(--plum-deep)", margin: "12px 0 8px" }}>{t("flow.s5_title")}</h1>
        <div style={{ fontSize: 14, color: "var(--stone)" }}>{t("flow.s5_page")} {page} {t("flow.of")} {totalPages}</div>
      </div>

      {/* Main selected page */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <BookPageSpread palette={variants[chosen].palette} name={data.name} pageNum={page} lang={lang} size={mobile ? 280 : 420} />
      </div>

      {/* Variant thumbnails */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
        {variants.map(v => (
          <button key={v.id} onClick={() => choose(v.id)}
            style={{
              padding: 0, border: v.id === chosen ? "3px solid var(--plum)" : "3px solid transparent",
              borderRadius: 8, cursor: "pointer", background: "transparent", transition: "transform .15s",
              transform: v.id === chosen ? "scale(1.04)" : "scale(1)",
            }}>
            <BookPageSpread palette={v.palette} name={data.name} pageNum={page} lang={lang} size={mobile ? 92 : 120} />
          </button>
        ))}
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <button className="ph-btn ph-btn--ghost">{t("flow.s5_regen")}</button>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="ph-btn ph-btn--ghost" onClick={skipRest}>{t("flow.s5_skip")}</button>
          <button className="ph-btn ph-btn--primary" onClick={goNextPage}>
            {page < totalPages ? t("flow.s5_next") : t("flow.s5_done")} <Icon.arrow size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// A stylized book page spread rendered in SVG
function BookPageSpread({ palette, name, pageNum, lang, size = 420 }) {
  const [primary, accent, bg] = palette;
  const h = size * 0.72;
  // Different scene per page
  const scene = pageNum % 4;
  const copy = lang === "fr"
    ? ["Un soir,", `${name} entendit`, "un chuchotement", "dans le jardin…"]
    : ["One evening,", `${name} heard`, "a whisper", "from the garden…"];
  return (
    <div style={{ width: size, height: h, borderRadius: 4, overflow: "hidden", boxShadow: "0 10px 28px rgba(30,20,30,0.18)", background: bg, position: "relative", display: "flex" }}>
      {/* left page (illustration) */}
      <div style={{ width: "50%", height: "100%", background: primary, position: "relative", overflow: "hidden" }}>
        {scene === 0 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <circle cx="78" cy="22" r="10" fill={accent} opacity="0.95"/>
            <path d="M0 80 Q25 60 50 75 T100 70 V100 H0Z" fill={accent} opacity="0.25"/>
            <circle cx="50" cy="65" r="8" fill={accent}/>
            <rect x="46" y="70" width="8" height="14" fill={accent}/>
            <path d="M20 40l2 2 2-2M72 48l2 2 2-2M10 20l1 1 1-1" stroke={accent} strokeWidth="1"/>
          </svg>
        )}
        {scene === 1 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <path d="M0 70 Q30 55 60 62 T100 58 V100 H0Z" fill={accent} opacity="0.35"/>
            <path d="M15 85L10 60L18 60L14 48L22 48L17 36L28 36L22 24L40 24L32 36L42 36L38 48L48 48L42 60L52 60L46 85Z" fill={accent} opacity="0.85"/>
            <path d="M70 85L64 65L72 65L68 52L76 52L72 40L82 40L76 28L90 28L84 40L92 40L88 52L94 52L90 65L98 65L92 85Z" fill={accent} opacity="0.7"/>
          </svg>
        )}
        {scene === 2 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <path d="M0 50 Q25 40 50 48 T100 46" stroke={accent} strokeWidth="1.6" fill="none" opacity="0.6"/>
            <path d="M0 62 Q25 52 50 60 T100 58" stroke={accent} strokeWidth="1.6" fill="none" opacity="0.5"/>
            <path d="M0 74 Q25 64 50 72 T100 70" stroke={accent} strokeWidth="1.6" fill="none" opacity="0.4"/>
            <path d="M50 24 C44 24 40 28 40 34 C40 42 50 48 50 48 C50 48 60 42 60 34 C60 28 56 24 50 24Z" fill={accent}/>
          </svg>
        )}
        {scene === 3 && (
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <rect x="20" y="20" width="60" height="70" rx="3" fill={accent} opacity="0.2"/>
            <path d="M30 35 Q50 30 70 35 V80 Q50 75 30 80Z" fill={accent} opacity="0.85"/>
            <circle cx="50" cy="20" r="3" fill={accent}/>
            <path d="M18 15l2 2-2 2M82 18l-2 2 2 2" stroke={accent} strokeWidth="1"/>
          </svg>
        )}
      </div>
      {/* right page (text) */}
      <div style={{ width: "50%", height: "100%", position: "relative", padding: size * 0.05, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: size * 0.045, lineHeight: 1.4, color: primary, letterSpacing: "-0.01em", textWrap: "balance" }}>
          {copy.map((c, i) => <div key={i}>{c}</div>)}
        </div>
        <div style={{ position: "absolute", bottom: size * 0.03, right: size * 0.05, fontSize: size * 0.024, color: primary, opacity: 0.5, fontFamily: "var(--f-body)", fontVariantNumeric: "tabular-nums" }}>
          {pageNum}
        </div>
      </div>
      {/* center spine shadow */}
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 8, transform: "translateX(-50%)", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)", pointerEvents: "none" }} />
    </div>
  );
}

// ──────── Step 6 — Reveal ────────
function Step6({ data, onNext, onEdit, mobile }) {
  const { t, lang } = useT();
  const [revealed, setRevealed] = React.useState(false);
  const [pageIdx, setPageIdx] = React.useState(0);
  const [flipping, setFlipping] = React.useState(false);
  const totalPages = 8;

  React.useEffect(() => {
    setTimeout(() => setRevealed(true), 200);
  }, []);

  const palettes = [
    ["#5B2A6F", "#F4B942", "#FFF8EC"],
    ["#3F1C4F", "#E8B4B8", "#FFF8EC"],
    ["#2E5E7E", "#F4B942", "#FFF8EC"],
    ["#8FB996", "#F4B942", "#FFF8EC"],
  ];
  const paletteFor = (p) => palettes[(data.pageChoices[p] ?? 0) % palettes.length];

  const flip = (dir) => {
    if (flipping) return;
    const next = pageIdx + dir;
    if (next < 0 || next >= totalPages) return;
    setFlipping(true);
    setTimeout(() => { setPageIdx(next); setFlipping(false); }, 280);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: 20 }}>
        <div className="t-eyebrow">{t("flow.s6_eyebrow")}</div>
        <h1 className="t-display" style={{ fontSize: mobile ? 30 : 44, color: "var(--plum-deep)", margin: "12px 0 8px", letterSpacing: "-0.02em" }}>
          {t("flow.s6_title").replace("{name}", data.name)}
        </h1>
        <p style={{ fontSize: 15, color: "var(--stone)", margin: 0 }}>{t("flow.s6_sub")}</p>
      </div>

      {/* Flipbook */}
      <div style={{ position: "relative", padding: "40px 0 20px", display: "flex", justifyContent: "center", perspective: 1800 }}>
        {revealed && <StarField count={14} color="var(--honey)" style={{ opacity: 0.6 }} />}
        <div style={{
          position: "relative",
          animation: revealed ? "book-reveal 1s cubic-bezier(0.2,0.7,0.3,1) both" : "none",
          transformStyle: "preserve-3d",
        }}>
          <div style={{ transform: flipping ? "rotateY(-8deg)" : "rotateY(0)", transition: "transform .28s var(--ease-out)" }}>
            <BookPageSpread palette={paletteFor(pageIdx + 1)} name={data.name} pageNum={pageIdx + 1} lang={lang} size={mobile ? 320 : 560} />
          </div>
          {/* Flip arrows */}
          <button onClick={() => flip(-1)} disabled={pageIdx === 0} style={arrowBtn("left", pageIdx === 0)}><Icon.chev dir="left" color="var(--plum)" /></button>
          <button onClick={() => flip(1)} disabled={pageIdx === totalPages - 1} style={arrowBtn("right", pageIdx === totalPages - 1)}><Icon.chev dir="right" color="var(--plum)" /></button>
        </div>
      </div>

      {/* Page dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "12px 0 24px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPageIdx(i)} aria-label={`Page ${i + 1}`}
            style={{ width: i === pageIdx ? 22 : 7, height: 7, borderRadius: 999, background: i === pageIdx ? "var(--plum)" : "var(--pebble)", border: 0, padding: 0, cursor: "pointer", transition: "width .2s" }} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="ph-btn ph-btn--ghost" onClick={onEdit}>
          <Icon.camera size={14} color="var(--plum)" /> {t("flow.s6_edit")}
        </button>
        <button className="ph-btn ph-btn--secondary">{t("flow.s6_share")}</button>
        <button className="ph-btn ph-btn--primary ph-btn--lg" onClick={onNext}>{t("flow.s6_cta")} <Icon.arrow size={14} /></button>
      </div>
    </div>
  );
}
function arrowBtn(dir, disabled) {
  return {
    position: "absolute",
    top: "50%", [dir]: -24, transform: "translateY(-50%)",
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid var(--bone)", background: "#fff", boxShadow: "var(--shadow-sm)",
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1,
    display: "flex", alignItems: "center", justifyContent: "center",
  };
}

// ──────── Step 7 — Order ────────
function Step7({ data, set, onClose, mobile }) {
  const { t, lang } = useT();
  const prices = { hard: 54.99, soft: 39.99 };
  const shipping = 0;
  const subtotal = prices[data.format];
  const tax = subtotal * 0.14975;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div className="t-eyebrow">{t("flow.s7_eyebrow")}</div>
        <h1 className="t-display" style={{ fontSize: mobile ? 32 : 44, color: "var(--plum-deep)", margin: "12px 0 0" }}>{t("flow.s7_title")}</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          { id: "hard", price: 54.99, t: t("flow.s7_hard"), d: t("flow.s7_hard_d"), recommended: true },
          { id: "soft", price: 39.99, t: t("flow.s7_soft"), d: t("flow.s7_soft_d"), recommended: false },
        ].map(f => {
          const sel = data.format === f.id;
          return (
            <button key={f.id} onClick={() => set({ format: f.id })}
              style={{
                textAlign: "left", padding: 24, borderRadius: 16,
                border: sel ? "2px solid var(--plum)" : "2px solid var(--bone)",
                background: sel ? "rgba(91,42,111,0.03)" : "#fff",
                cursor: "pointer", fontFamily: "var(--f-body)", color: "var(--ink)", position: "relative",
              }}>
              {f.recommended && <span style={{ position: "absolute", top: -10, left: 20, background: "var(--honey)", color: "var(--ink)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 999 }}>{t("flow.s7_recommended")}</span>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div className="t-display" style={{ fontSize: 22, color: "var(--ink)" }}>{f.t}</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 26, color: "var(--plum-deep)" }}>${f.price}</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--stone)", lineHeight: 1.5 }}>{f.d}</div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", border: sel ? "5px solid var(--plum)" : "1.5px solid var(--pebble)", background: sel ? "#fff" : "transparent", transition: "all .15s" }} />
                <span style={{ fontSize: 13, color: sel ? "var(--plum)" : "var(--stone)", fontWeight: sel ? 600 : 400 }}>{sel ? (lang === "fr" ? "Sélectionné" : "Selected") : (lang === "fr" ? "Choisir" : "Choose")}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div style={{ background: "var(--cream)", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 13, color: "var(--stone)", marginBottom: 4 }}>{t("flow.s7_ship_to")} Montréal, QC · <b style={{ color: "var(--sage-deep)", fontWeight: 600 }}>{t("flow.s7_ship_free")}</b></div>
        <div style={{ fontSize: 13, color: "var(--stone)", marginBottom: 16 }}>{t("flow.s7_eta")} <b style={{ color: "var(--ink)", fontWeight: 600 }}>28 avril — 2 mai</b></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: "1px solid var(--bone)", paddingTop: 14 }}>
          {[
            [t("flow.s7_subtotal"), `$${subtotal.toFixed(2)}`],
            [t("flow.s7_shipping"), lang === "fr" ? "Gratuite" : "Free"],
            [t("flow.s7_taxes"), `$${tax.toFixed(2)}`],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--graphite)" }}>
              <span>{l}</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "var(--ink)", fontWeight: 600, marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--bone)" }}>
            <span>{t("flow.s7_total")}</span><span style={{ fontVariantNumeric: "tabular-nums" }}>${total.toFixed(2)}</span>
          </div>
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: "var(--plum)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon.plus size={13} color="var(--plum)" /> {t("flow.s7_gift")}
        </div>
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button className="ph-btn ph-btn--primary ph-btn--lg" onClick={onClose}>
          <Icon.cart size={16} color="var(--ink)" /> {t("flow.s7_cta")} · ${total.toFixed(2)}
        </button>
        <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Icon.shield size={13} color="var(--sage-deep)" /> {lang === "fr" ? "Paiement sécurisé · Visa, Mastercard, Apple Pay, PayPal" : "Secure checkout · Visa, Mastercard, Apple Pay, PayPal"}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PreviewFlow });
