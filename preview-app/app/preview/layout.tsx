import { PreviewTopBar } from "@/components/preview-top-bar";

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--paper)" }}>
      <PreviewTopBar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-5 sm:px-8 py-8 sm:py-14">
        {children}
      </main>
    </div>
  );
}
