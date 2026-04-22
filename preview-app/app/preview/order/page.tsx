import { StepStub } from "@/components/step-stub";

export default function OrderPage() {
  return (
    <StepStub
      eyebrow="Step 7"
      title="Pick your format."
      body="Cart injection via Shopify Storefront API lands in S12. Placeholder."
      back={{ href: "/preview/book", label: "Back" }}
    />
  );
}
