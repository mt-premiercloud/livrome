import { StepStub } from "@/components/step-stub";

export default function PhotoPage() {
  return (
    <StepStub
      eyebrow="Step 3"
      title="Add a photo."
      body="Photo upload + face detection lands in S6. This stub just proves the route is wired."
      next={{ href: "/preview/generating", label: "Skip to generation →" }}
      back={{ href: "/preview/details", label: "Back" }}
    />
  );
}
