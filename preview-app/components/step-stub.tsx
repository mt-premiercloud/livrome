import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  next?: { href: string; label: string };
  back?: { href: string; label: string };
};

/** Placeholder page for steps that don't have their real UI yet. */
export function StepStub({ eyebrow, title, body, next, back }: Props) {
  return (
    <div className="pt-4 sm:pt-10">
      <div className="t-eyebrow mb-3">{eyebrow}</div>
      <h1
        className="t-display mb-4"
        style={{ color: "var(--plum-deep)", fontSize: "clamp(28px, 4.5vw, 44px)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h1>
      <p style={{ color: "var(--graphite)", fontSize: 16, lineHeight: 1.6, maxWidth: 520 }}>{body}</p>

      <div className="mt-10 flex justify-between items-center flex-wrap gap-3">
        {back ? (
          <Link href={back.href} className="ph-btn ph-btn--ghost focus-ring">
            <ArrowLeft size={14} strokeWidth={2.2} /> {back.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="ph-btn ph-btn--primary focus-ring">
            {next.label} <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
