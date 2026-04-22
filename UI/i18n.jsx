// Bilingual copy + language context for PetitsHéros
const I18N = {
  // Shared navigation / global
  nav: {
    books_kids: { fr: "Livres pour enfants", en: "Books for Kids" },
    books_adults: { fr: "Livres pour adultes", en: "Books for Adults" },
    about: { fr: "À propos", en: "About" },
    faq: { fr: "FAQ", en: "FAQ" },
    account: { fr: "Mon compte", en: "Account" },
    cart: { fr: "Panier", en: "Cart" },
    announcement: {
      fr: "Livraison gratuite au Canada dès 75 $ · Imprimé localement",
      en: "Free shipping in Canada over $75 · Printed locally",
    },
  },

  hero: {
    eyebrow: { fr: "Livres personnalisés, imprimés au Québec", en: "Personalized books, printed in Quebec" },
    title_a: {
      fr: ["Rendez votre enfant", "le héros", "de sa propre histoire."],
      en: ["Make your child", "the hero", "of their own story."],
    },
    subtitle: {
      fr: "Un livre relié, magnifiquement imprimé, où l’enfant que vous aimez devient le personnage principal.",
      en: "A beautifully bound keepsake where the child you love becomes the main character.",
    },
    cta_primary: { fr: "Créer un aperçu gratuit", en: "Create your free preview" },
    cta_secondary: { fr: "Voir les histoires", en: "Browse the library" },
    trust_a: { fr: "150 000+ familles", en: "150,000+ families" },
    trust_b: { fr: "Imprimé au Canada", en: "Printed in Canada" },
    trust_c: { fr: "4,9/5 sur Trustpilot", en: "4.9/5 on Trustpilot" },
    caption: { fr: "Trois minutes pour créer. Une vie pour chérir.", en: "Three minutes to make. A lifetime to keep." },
  },

  section: {
    library_eyebrow: { fr: "La bibliothèque", en: "The Library" },
    library_title: { fr: "Choisissez votre histoire", en: "Choose your story" },
    library_sub: { fr: "Huit récits originaux, imaginés par nos auteurs, pour chaque âge et chaque soir.", en: "Eight original tales, written by our authors, for every age and every night." },
    how_eyebrow: { fr: "Comment ça marche", en: "How it works" },
    how_title: { fr: "Trois pas vers le livre.", en: "Three steps to the book." },
    how_1_t: { fr: "Choisissez une histoire", en: "Choose a story" },
    how_1_d: { fr: "Parcourez notre bibliothèque et trouvez l’univers qui lui ressemble.", en: "Browse our library and find the world that feels like them." },
    how_2_t: { fr: "Ajoutez une photo", en: "Add a photo" },
    how_2_d: { fr: "Une photo claire. Notre illustration s’adapte à son visage et à sa peau.", en: "One clear photo. Our illustration adapts to their face and skin tone." },
    how_3_t: { fr: "Recevez le livre", en: "Receive the book" },
    how_3_d: { fr: "Imprimé avec soin au Québec. Livré chez vous en 5 à 8 jours.", en: "Printed with care in Quebec. On your doorstep in 5 to 8 days." },

    voices_eyebrow: { fr: "Témoignages", en: "Voices" },
    voices_title: { fr: "Ce que les familles nous écrivent.", en: "What families write to us." },

    trust_eyebrow: { fr: "Nos promesses", en: "Our promises" },
    trust_title: { fr: "Conçu comme un cadeau.", en: "Made like a gift." },
    trust_1_t: { fr: "Vie privée respectée", en: "Privacy, guaranteed" },
    trust_1_d: { fr: "Les photos sont chiffrées, utilisées seulement pour votre livre, puis supprimées. Loi 25 + RGPD.", en: "Photos are encrypted, used only for your book, then deleted. Law 25 + GDPR compliant." },
    trust_2_t: { fr: "Satisfaction ou remboursement", en: "Love it or it's on us" },
    trust_2_d: { fr: "Si votre livre ne vous émeut pas, nous le remplaçons ou le remboursons. Sans condition.", en: "If the book doesn’t move you, we replace it or refund you. No fine print." },
    trust_3_t: { fr: "Qualité d’archives", en: "Archive-quality print" },
    trust_3_d: { fr: "Papier FSC 170 g/m², couverture rigide cousue, conçu pour durer des générations.", en: "FSC paper 170 g/m², sewn hardcover, built to last generations." },

    faq_eyebrow: { fr: "Questions fréquentes", en: "Frequently asked" },
    faq_title: { fr: "Les parents nous demandent souvent…", en: "Parents often ask…" },
    faq_1_q: { fr: "Que faites-vous avec la photo de mon enfant ?", en: "What do you do with my child's photo?" },
    faq_1_a: { fr: "Elle sert uniquement à générer votre livre, reste chiffrée, et est supprimée dans les 30 jours — ou immédiatement sur demande depuis votre compte.", en: "It's used only to create your book, kept encrypted, and deleted within 30 days — or instantly from your account on request." },
    faq_2_q: { fr: "Quel est le délai de livraison ?", en: "How long does delivery take?" },
    faq_2_a: { fr: "Entre 5 et 8 jours ouvrables au Canada, 7 à 12 jours aux États-Unis et en Europe. L’impression prend 48 heures.", en: "5–8 business days in Canada, 7–12 days to the US and Europe. Printing takes 48 hours." },
    faq_3_q: { fr: "Les livres sont-ils disponibles en français ?", en: "Are the books in French?" },
    faq_3_a: { fr: "Oui — chaque histoire est écrite à la main en français et en anglais. Vous choisissez lors de la création.", en: "Yes — every story is hand-written in both French and English. You choose at creation time." },
    faq_all: { fr: "Voir toutes les questions", en: "See all questions" },

    final_eyebrow: { fr: "Prêt à commencer ?", en: "Ready to begin?" },
    final_title: { fr: "Sa prochaine histoire préférée. Celle où il est le héros.", en: "Their next favorite story. The one where they’re the hero." },
    final_note: { fr: "Gratuit jusqu’à la commande. Aucune carte requise.", en: "Free until you order. No card required." },
  },

  footer: {
    tagline: { fr: "Des livres qui deviennent des trésors.", en: "Books that become keepsakes." },
    col_shop: { fr: "Boutique", en: "Shop" },
    col_support: { fr: "Aide", en: "Support" },
    col_company: { fr: "L’entreprise", en: "Company" },
    col_legal: { fr: "Légal", en: "Legal" },
    newsletter_t: { fr: "Recevez 10 % sur votre premier livre", en: "Get 10% off your first book" },
    newsletter_p: { fr: "Votre adresse courriel", en: "Your email address" },
    newsletter_b: { fr: "S’abonner", en: "Subscribe" },
    rights: { fr: "© 2026 PetitsHéros inc. Fait avec soin à Montréal.", en: "© 2026 PetitsHéros inc. Crafted with care in Montreal." },
  },

  // Preview flow
  flow: {
    progress: { fr: "Étape", en: "Step" },
    of: { fr: "sur", en: "of" },
    back: { fr: "Retour", en: "Back" },
    continue: { fr: "Continuer", en: "Continue" },
    cancel: { fr: "Annuler", en: "Cancel" },
    close: { fr: "Fermer", en: "Close" },

    s1_eyebrow: { fr: "Aperçu gratuit", en: "Free preview" },
    s1_title: { fr: "Voici “Les étoiles de Léo”.", en: "Meet \"Léo and the Stars.\"" },
    s1_body: { fr: "Un récit doux sur le courage, le sommeil et les petites lumières qui nous accompagnent. 24 pages, pour les 3 à 6 ans.", en: "A gentle story about courage, bedtime, and the small lights that guide us. 24 pages, for ages 3–6." },
    s1_cta: { fr: "Commençons", en: "Let’s begin" },
    s1_changebook: { fr: "Changer d’histoire", en: "Switch book" },
    s1_promise: { fr: "Aucune carte, aucune obligation.", en: "No card, no commitment." },

    s2_title: { fr: "Parlez-nous un peu de lui.", en: "Tell us about them." },
    s2_sub: { fr: "Ces détails rendent l’illustration fidèle.", en: "These details make the illustration ring true." },
    s2_name: { fr: "Son prénom", en: "Their first name" },
    s2_name_ph: { fr: "Ex. Léo, Mila, Émile…", en: "e.g. Leo, Mila, Emile…" },
    s2_age: { fr: "Âge", en: "Age" },
    s2_gender: { fr: "Genre", en: "Gender" },
    s2_g_boy: { fr: "Garçon", en: "Boy" },
    s2_g_girl: { fr: "Fille", en: "Girl" },
    s2_g_neutral: { fr: "Non précisé", en: "Non-specified" },
    s2_skin: { fr: "Teint de peau", en: "Skin tone" },
    s2_lang: { fr: "Langue du livre", en: "Language of the book" },
    s2_consent: { fr: "J’ai l’autorisation de l’adulte responsable pour créer ce livre.", en: "I have permission from the responsible adult to create this book." },

    s3_title: { fr: "Ajoutez une photo.", en: "Add a photo." },
    s3_sub: { fr: "Notre illustrateur se base sur ses traits pour dessiner un portrait fidèle.", en: "Our illustrator uses their features to draw a faithful portrait." },
    s3_drop: { fr: "Glissez une photo ici", en: "Drop a photo here" },
    s3_or: { fr: "ou", en: "or" },
    s3_browse: { fr: "Parcourir", en: "Browse" },
    s3_tips_t: { fr: "Pour une meilleure ressemblance", en: "For a better likeness" },
    s3_tip_1: { fr: "Visage bien éclairé, de face", en: "Well-lit face, straight on" },
    s3_tip_2: { fr: "Sans lunettes de soleil", en: "No sunglasses" },
    s3_tip_3: { fr: "Un seul enfant sur la photo", en: "Only one child in frame" },
    s3_good: { fr: "Bonne photo", en: "Good photo" },
    s3_bad: { fr: "À éviter", en: "Avoid" },
    s3_detecting: { fr: "Analyse du visage…", en: "Analyzing the face…" },
    s3_detected: { fr: "Visage détecté — parfait.", en: "Face detected — looking great." },
    s3_crop: { fr: "Ajuster le cadrage", en: "Adjust the crop" },
    s3_cta: { fr: "Générer mon aperçu", en: "Generate my preview" },
    s3_replace: { fr: "Changer la photo", en: "Replace photo" },
    s3_privacy: { fr: "Photo chiffrée. Supprimée sous 30 jours. Jamais partagée.", en: "Photo encrypted. Deleted within 30 days. Never shared." },

    s4_title_1: { fr: "On dessine votre héros…", en: "Drawing your hero…" },
    s4_title_2: { fr: "On ajoute son sourire…", en: "Adding their smile…" },
    s4_title_3: { fr: "On peaufine chaque page…", en: "Polishing every page…" },
    s4_title_4: { fr: "Presque prêt.", en: "Almost ready." },
    s4_sub: { fr: "Vous pouvez fermer cet onglet — on vous écrit dès que c’est prêt.", en: "You can close this tab — we’ll email you when it’s ready." },
    s4_email_ph: { fr: "Votre courriel", en: "Your email" },
    s4_email_btn: { fr: "M’avertir", en: "Notify me" },
    s4_eta: { fr: "Environ 2 minutes", en: "About 2 minutes" },

    s5_eyebrow: { fr: "Révision page par page", en: "Page-by-page review" },
    s5_title: { fr: "Choisissez votre version préférée.", en: "Pick your favorite version." },
    s5_sub: { fr: "Tapez une vignette. Vous pourrez toujours revenir en arrière.", en: "Tap a thumbnail. You can always come back." },
    s5_page: { fr: "Page", en: "Page" },
    s5_regen: { fr: "Régénérer les options", en: "Regenerate options" },
    s5_skip: { fr: "Choisir automatiquement la suite", en: "Pick best automatically for the rest" },
    s5_next: { fr: "Page suivante", en: "Next page" },
    s5_done: { fr: "Voir le livre complet", en: "See the full book" },

    s6_eyebrow: { fr: "Voici votre livre", en: "Here’s your book" },
    s6_title: { fr: "Le livre de {name}.", en: "{name}’s book." },
    s6_sub: { fr: "Feuilletez chaque page. Modifiez ce qui ne vous convient pas encore.", en: "Flip through every page. Edit anything that’s not quite right." },
    s6_edit: { fr: "Modifier cette page", en: "Edit this page" },
    s6_share: { fr: "Partager l’aperçu", en: "Share preview" },
    s6_cta: { fr: "Commander le livre", en: "Order the book" },

    s7_eyebrow: { fr: "Commande", en: "Order" },
    s7_title: { fr: "Choisissez votre format.", en: "Pick your format." },
    s7_hard: { fr: "Couverture rigide", en: "Hardcover" },
    s7_hard_d: { fr: "Reliure cousue · Papier 170 g · 24 pages · 21 × 21 cm", en: "Sewn binding · 170 g paper · 24 pages · 21 × 21 cm" },
    s7_soft: { fr: "Couverture souple", en: "Paperback" },
    s7_soft_d: { fr: "Reliure collée · Papier 150 g · 24 pages · 21 × 21 cm", en: "Glued binding · 150 g paper · 24 pages · 21 × 21 cm" },
    s7_recommended: { fr: "Recommandé", en: "Most loved" },
    s7_ship_to: { fr: "Livraison estimée à", en: "Shipping to" },
    s7_ship_free: { fr: "Gratuite au Canada > 75 $", en: "Free in Canada over $75" },
    s7_eta: { fr: "Reçu entre", en: "Delivered between" },
    s7_subtotal: { fr: "Sous-total", en: "Subtotal" },
    s7_shipping: { fr: "Livraison", en: "Shipping" },
    s7_taxes: { fr: "Taxes estimées", en: "Estimated tax" },
    s7_total: { fr: "Total", en: "Total" },
    s7_cta: { fr: "Ajouter au panier", en: "Add to cart" },
    s7_gift: { fr: "C’est un cadeau — ajouter une dédicace", en: "This is a gift — add a dedication" },
  },

  books: [
    { id: "leo-stars", title_fr: "Les étoiles de Léo", title_en: "Léo and the Stars", age_fr: "3–6 ans", age_en: "Ages 3–6", theme_fr: "Coucher", theme_en: "Bedtime", tag_fr: "Un conte pour s’endormir sans peur.", tag_en: "A tale for falling asleep without fear.", pair: ["#5B2A6F", "#F4B942"] },
    { id: "forest", title_fr: "La forêt qui chuchote", title_en: "The Whispering Forest", age_fr: "4–7 ans", age_en: "Ages 4–7", theme_fr: "Aventure", theme_en: "Adventure", tag_fr: "Un voyage chez les créatures du bois.", tag_en: "A journey among the creatures of the wood.", pair: ["#6B9072", "#FFF8EC"] },
    { id: "ocean", title_fr: "Sous la grande vague", title_en: "Under the Great Wave", age_fr: "5–8 ans", age_en: "Ages 5–8", theme_fr: "Animaux", theme_en: "Animals", tag_fr: "Une amitié au fond de l’océan.", tag_en: "A friendship at the bottom of the sea.", pair: ["#2E5E7E", "#E8B4B8"] },
    { id: "balloon", title_fr: "Le ballon rouge", title_en: "The Red Balloon", age_fr: "3–5 ans", age_en: "Ages 3–5", theme_fr: "Émotions", theme_en: "Emotions", tag_fr: "Apprendre à lâcher prise, avec douceur.", tag_en: "Learning to let go, gently.", pair: ["#C44536", "#FFF8EC"] },
    { id: "lantern", title_fr: "La lanterne d’hiver", title_en: "The Winter Lantern", age_fr: "5–8 ans", age_en: "Ages 5–8", theme_fr: "Courage", theme_en: "Courage", tag_fr: "Un village, une lumière, un héros.", tag_en: "A village, a light, a hero.", pair: ["#3F1C4F", "#F4B942"] },
    { id: "garden", title_fr: "Le jardin de grand-maman", title_en: "Grandma’s Garden", age_fr: "4–7 ans", age_en: "Ages 4–7", theme_fr: "Famille", theme_en: "Family", tag_fr: "Les saisons, la mémoire, et les confitures.", tag_en: "Seasons, memory, and jam jars.", pair: ["#8FB996", "#F5ECD9"] },
    { id: "letters", title_fr: "L’alphabet volant", title_en: "The Flying Alphabet", age_fr: "4–6 ans", age_en: "Ages 4–6", theme_fr: "Apprentissage", theme_en: "Learning", tag_fr: "26 lettres, 26 mini-aventures.", tag_en: "26 letters, 26 tiny adventures." , pair: ["#F4B942", "#3F1C4F"] },
    { id: "moon", title_fr: "La sœur de la lune", title_en: "The Moon’s Sister", age_fr: "5–8 ans", age_en: "Ages 5–8", theme_fr: "Rêve", theme_en: "Dreams", tag_fr: "Une nuit, une promesse, un secret.", tag_en: "A night, a promise, a secret.", pair: ["#1E2B58", "#E8B4B8"] },
  ],

  testimonials: [
    {
      fr: "Ma fille dort avec ce livre. Elle le présente à ses amis comme « son livre à elle ». Je n’avais jamais vu ça.",
      en: "My daughter sleeps with this book. She introduces it to her friends as \"her own book.\" I've never seen anything like it.",
      author_fr: "Camille · Maman de Léa, 5 ans",
      author_en: "Camille · Mom of Léa, 5",
      city: "Montréal",
    },
    {
      fr: "Reçu avant Noël, emballage soigné, qualité digne d’un éditeur indépendant. Mon petit-fils était sans voix.",
      en: "Arrived before Christmas, beautifully packaged, quality worthy of an indie publisher. My grandson was speechless.",
      author_fr: "Jean-Paul · Grand-père, Québec",
      author_en: "Jean-Paul · Grandfather, Quebec",
      city: "Québec",
    },
    {
      fr: "En tant que parent, je me méfiais de l’IA. Mais ici c’est fait avec goût. L’illustration est fidèle, pas effrayante.",
      en: "As a parent I was wary of AI. But this is done with taste. The illustration is faithful, not uncanny.",
      author_fr: "Sarah · Maman de Noah, 4 ans",
      author_en: "Sarah · Mom of Noah, 4",
      city: "Toronto",
    },
  ],
};

// React context + hook
const LangContext = React.createContext({ lang: "fr", setLang: () => {} });

function useT() {
  const { lang } = React.useContext(LangContext);
  const t = React.useCallback((key) => {
    const parts = key.split(".");
    let v = I18N;
    for (const p of parts) v = v && v[p];
    if (!v) return key;
    if (typeof v === "object" && (v.fr || v.en)) return v[lang] ?? v.fr ?? key;
    return v;
  }, [lang]);
  return { t, lang };
}

Object.assign(window, { I18N, LangContext, useT });
