import { StepStub } from "@/components/step-stub";

export default function ReviewPage() {
  return (
    <StepStub
      eyebrow="Step 5"
      title="Pick your favorite version."
      body="Page-by-page variant review lands in S7. Placeholder."
      next={{ href: "/preview/book", label: "Skip to full book →" }}
      back={{ href: "/preview/generating", label: "Back" }}
    />
  );
}
