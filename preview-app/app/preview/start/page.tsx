import { Suspense } from "react";
import { StartInner } from "./start-inner";

export default function StartPage() {
  return (
    <Suspense fallback={null}>
      <StartInner />
    </Suspense>
  );
}
