"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const STEPS: Array<{ path: string; label: { fr: string; en: string } }> = [
  { path: "/preview/start", label: { fr: "Histoire", en: "Story" } },
  { path: "/preview/details", label: { fr: "Détails", en: "Details" } },
  { path: "/preview/photo", label: { fr: "Photo", en: "Photo" } },
  { path: "/preview/generating", label: { fr: "Création", en: "Creating" } },
  { path: "/preview/review", label: { fr: "Révision", en: "Review" } },
  { path: "/preview/book", label: { fr: "Livre", en: "Book" } },
  { path: "/preview/order", label: { fr: "Commande", en: "Order" } },
];

export function PreviewTopBar() {
  const pathname = usePathname();
  const currentIdx = STEPS.findIndex((s) => pathname?.startsWith(s.path));
  const step = currentIdx === -1 ? 0 : currentIdx;

  return (
    <header
      className="flex items-center gap-4 px-5 sm:px-10 py-4 sm:py-5 flex-shrink-0"
      style={{ borderBottom: "1px solid var(--bone)", background: "var(--paper)" }}
    >
      <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold focus-ring" style={{ color: "var(--plum-deep)" }}>
        <span className="t-display" style={{ fontStyle: "italic", fontSize: 22, letterSpacing: "-0.02em" }}>Livrome</span>
      </Link>

      <div className="flex-1 hidden sm:block ml-6">
        <StepRail step={step} total={STEPS.length} />
      </div>

      <div className="flex-1 sm:hidden">
        <div className="text-[12px]" style={{ color: "var(--stone)", letterSpacing: "0.04em" }}>
          Step {step + 1} of {STEPS.length}
        </div>
        <div className="mt-1.5 h-[3px] rounded-full overflow-hidden" style={{ background: "var(--bone)" }}>
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{ background: "var(--plum)", width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <Link
        href="/"
        aria-label="Close preview"
        className="w-9 h-9 rounded-full flex items-center justify-center focus-ring transition-colors"
        style={{ color: "var(--graphite)" }}
      >
        <X size={18} strokeWidth={1.6} />
      </Link>
    </header>
  );
}

function StepRail({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full transition-colors"
            style={{
              background: done
                ? "var(--plum)"
                : active
                  ? "var(--honey)"
                  : "var(--bone)",
              boxShadow: active ? "0 0 0 3px rgba(244,185,66,0.15)" : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
