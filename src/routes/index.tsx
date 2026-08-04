import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { HeroSection } from "@/components/hero-section";
import { ImpactSection } from "@/components/impact-section";
import { SiteNav } from "@/components/site-nav";
import { VisitorCount } from "@/components/visitor-count";

// Loaded only in the browser, in its own async chunk, to keep the AI SDK's
// zod dependency out of the route's initial module graph.
const ChatSection = lazy(() =>
  import("@/components/chat-section").then((m) => ({ default: m.ChatSection })),
);

const TITLE = "Subhrojeet Saha | Technology Risk & Compliance";
const DESCRIPTION =
  "Technology risk and compliance leader with seven years at JPMorgan Chase, Diligent, Moody's, Goldman Sachs and KPMG. Governance, risk and compliance programmes engineered to withstand regulatory, audit and board-level scrutiny.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <HeroSection />
        <ImpactSection />
        <ExperienceSection />
        <ExpertiseSection />
        <ClientOnly fallback={<div className="min-h-[520px]" />}>
          <Suspense fallback={<div className="min-h-[520px]" />}>
            <ChatSection />
          </Suspense>
        </ClientOnly>
        <ContactSection />
      </main>
      <footer className="bg-ink px-6 py-10 text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 text-xs tracking-wide text-ink-muted sm:flex-row sm:items-center">
          <span className="font-serif text-sm text-ink-foreground/85">
            © {new Date().getFullYear()} Subhrojeet Saha
          </span>
          <span className="flex items-center gap-3">
            <span>Bengaluru, India</span>
            <span aria-hidden className="hidden text-ink-foreground/20 sm:inline">
              ·
            </span>
            <VisitorCount />
          </span>
        </div>
      </footer>
    </div>
  );
}
