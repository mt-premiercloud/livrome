import { StepStub } from "@/components/step-stub";

export default function BookPage() {
  return (
    <StepStub
      eyebrow="Step 6"
      title="Here's your book."
      body="Full-book flipbook lands in S7. Placeholder."
      next={{ href: "/preview/order", label: "Order it →" }}
      back={{ href: "/preview/review", label: "Back" }}
    />
  );
}
