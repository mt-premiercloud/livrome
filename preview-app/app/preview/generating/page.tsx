import { StepStub } from "@/components/step-stub";

export default function GeneratingPage() {
  return (
    <StepStub
      eyebrow="Step 4"
      title="We're drawing your hero…"
      body="Inngest orchestration lands in S10. Placeholder for now."
      next={{ href: "/preview/review", label: "Skip to review →" }}
      back={{ href: "/preview/photo", label: "Back" }}
    />
  );
}
