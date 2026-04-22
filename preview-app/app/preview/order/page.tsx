"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Plus, ShieldCheck, ShoppingCart } from "lucide-react";

import { usePreviewState } from "@/lib/preview-state";

const PRICES = { hard: 29.0, soft: 22.0 } as const;
const TAX_RATE = 0.14975; // Quebec GST + QST
const FREE_SHIPPING_THRESHOLD = 75;

const SHOPIFY_STORE = "https://petithero.myshopify.com";
const VARIANT_IDS = {
  hard: "48774283624699",
  soft: "48774283657467",
} as const;

export default function OrderPage() {
  const router = useRouter();
  const { data, patch, hydrated } = usePreviewState();
  const lang = data.bookLang;
  const t = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [showGift, setShowGift] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!hydrated) return null;

  const subtotal = PRICES[data.format];
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8.95;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const variantId = VARIANT_IDS[data.format];

  const handleAddToCart = () => {
    setSubmitting(true);
    // S12 will use Shopify Storefront API cartCreate with the preview_id line-item
    // attribute. For now, punch out to the product page with the variant pre-selected.
    const url = `${SHOPIFY_STORE}/cart/add?id=${variantId}&quantity=1`;
    window.location.href = url;
  };

  return (
    <div>
      <div className="text-center mb-7">
        <div className="t-eyebrow">{t("Commande", "Order")}</div>
        <h1
          className="t-display mt-3"
          style={{ color: "var(--plum-deep)", fontSize: "clamp(28px, 4.5vw, 44px)", letterSpacing: "-0.02em" }}
        >
          {t("Choisissez votre format.", "Pick your format.")}
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-7">
        <FormatCard
          id="hard"
          selected={data.format === "hard"}
          recommended
          title={t("Couverture rigide", "Hardcover")}
          description={t(
            "Reliure cousue · Papier 170 g · 24 pages · 21 × 21 cm",
            "Sewn binding · 170 g paper · 24 pages · 21 × 21 cm",
          )}
          price={PRICES.hard}
          badge={t("Recommandé", "Most loved")}
          onSelect={() => patch({ format: "hard" })}
          ctaLabel={t("Choisir", "Choose")}
          selectedLabel={t("Sélectionné", "Selected")}
        />
        <FormatCard
          id="soft"
          selected={data.format === "soft"}
          title={t("Couverture souple", "Paperback")}
          description={t(
            "Reliure collée · Papier 150 g · 24 pages · 21 × 21 cm",
            "Glued binding · 150 g paper · 24 pages · 21 × 21 cm",
          )}
          price={PRICES.soft}
          onSelect={() => patch({ format: "soft" })}
          ctaLabel={t("Choisir", "Choose")}
          selectedLabel={t("Sélectionné", "Selected")}
        />
      </div>

      {/* Summary */}
      <div style={{ background: "var(--cream)", borderRadius: 14, padding: 24 }}>
        <div className="mb-1" style={{ fontSize: 13, color: "var(--stone)" }}>
          {t("Livraison estimée à", "Shipping to")} Montréal, QC ·{" "}
          <b style={{ color: "var(--sage-deep)", fontWeight: 600 }}>
            {shipping === 0 ? t("Gratuite", "Free") : `$${shipping.toFixed(2)}`}
          </b>
        </div>
        <div className="mb-4" style={{ fontSize: 13, color: "var(--stone)" }}>
          {t("Reçu entre", "Delivered between")}{" "}
          <b style={{ color: "var(--ink)", fontWeight: 600 }}>28 avril — 2 mai</b>
        </div>

        <div
          className="flex flex-col gap-1.5 pt-3.5"
          style={{ borderTop: "1px solid var(--bone)" }}
        >
          {(
            [
              [t("Sous-total", "Subtotal"), `$${subtotal.toFixed(2)}`],
              [t("Livraison", "Shipping"), shipping === 0 ? t("Gratuite", "Free") : `$${shipping.toFixed(2)}`],
              [t("Taxes estimées", "Estimated tax"), `$${tax.toFixed(2)}`],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between"
              style={{ fontSize: 14, color: "var(--graphite)" }}
            >
              <span>{label}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>
            </div>
          ))}
          <div
            className="flex justify-between mt-2.5 pt-2.5"
            style={{
              fontSize: 18,
              color: "var(--ink)",
              fontWeight: 600,
              borderTop: "1px solid var(--bone)",
            }}
          >
            <span>{t("Total", "Total")}</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowGift((s) => !s)}
          className="mt-4 flex items-center gap-1.5 focus-ring"
          style={{ fontSize: 13, color: "var(--plum)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <Plus size={13} color="var(--plum)" />{" "}
          {t("C'est un cadeau — ajouter une dédicace", "This is a gift — add a dedication")}
        </button>

        {showGift && (
          <div
            className="mt-3 anim-fade-slide"
            style={{ borderTop: "1px solid var(--bone)", paddingTop: 14 }}
          >
            <label
              className="block mb-1.5"
              htmlFor="dedication"
              style={{ fontSize: 13, color: "var(--graphite)" }}
            >
              {t("Dédicace (page 1)", "Dedication (page 1)")}
            </label>
            <textarea
              id="dedication"
              className="ph-input"
              rows={3}
              placeholder={t("Pour Léa, avec tout notre amour. — Mamie", "For Léa, with all our love. — Grandma")}
              maxLength={200}
              style={{ resize: "vertical" }}
            />
            <div
              className="text-[11px] mt-1"
              style={{ color: "var(--stone)" }}
            >
              {t("Maximum 200 caractères. Insérée avant la page 1.", "Max 200 characters. Inserted before page 1.")}
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        <button
          type="button"
          className="ph-btn ph-btn--primary ph-btn--lg focus-ring"
          onClick={handleAddToCart}
          disabled={submitting}
        >
          <ShoppingCart size={16} color="var(--ink)" strokeWidth={1.8} />{" "}
          {t("Ajouter au panier", "Add to cart")} · ${total.toFixed(2)}
        </button>

        <div
          className="flex items-center justify-center gap-1.5 mt-3"
          style={{ fontSize: 12, color: "var(--stone)" }}
        >
          <ShieldCheck size={13} color="var(--sage-deep)" />{" "}
          {t(
            "Paiement sécurisé · Visa, Mastercard, Apple Pay, PayPal",
            "Secure checkout · Visa, Mastercard, Apple Pay, PayPal",
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          className="ph-btn ph-btn--ghost focus-ring"
          onClick={() => router.push("/preview/book")}
        >
          <ArrowLeft size={14} strokeWidth={2.2} /> {t("Retour au livre", "Back to the book")}
        </button>
      </div>
    </div>
  );
}

type FormatCardProps = {
  id: "hard" | "soft";
  selected: boolean;
  recommended?: boolean;
  title: string;
  description: string;
  price: number;
  badge?: string;
  onSelect: () => void;
  ctaLabel: string;
  selectedLabel: string;
};

function FormatCard({
  selected,
  recommended,
  title,
  description,
  price,
  badge,
  onSelect,
  ctaLabel,
  selectedLabel,
}: FormatCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="text-left focus-ring relative"
      style={{
        padding: 24,
        borderRadius: 16,
        border: selected ? "2px solid var(--plum)" : "2px solid var(--bone)",
        background: selected ? "rgba(91,42,111,0.03)" : "var(--white)",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        color: "var(--ink)",
      }}
    >
      {recommended && badge && (
        <span
          className="absolute"
          style={{
            top: -10,
            left: 20,
            background: "var(--honey)",
            color: "var(--ink)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: 999,
          }}
        >
          {badge}
        </span>
      )}
      <div className="flex justify-between items-start mb-2.5">
        <div className="t-display" style={{ fontSize: 22, color: "var(--ink)" }}>
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            color: "var(--plum-deep)",
          }}
        >
          ${price.toFixed(2)}
        </div>
      </div>
      <div style={{ fontSize: 13, color: "var(--stone)", lineHeight: 1.5 }}>{description}</div>

      <div className="mt-3 flex items-center gap-2">
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: selected ? "5px solid var(--plum)" : "1.5px solid var(--pebble)",
            background: selected ? "var(--white)" : "transparent",
            transition: "all .15s",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 13,
            color: selected ? "var(--plum)" : "var(--stone)",
            fontWeight: selected ? 600 : 400,
          }}
        >
          {selected ? selectedLabel : ctaLabel}
        </span>
      </div>
    </button>
  );
}
