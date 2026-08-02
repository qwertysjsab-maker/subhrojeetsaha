import { createFileRoute } from "@tanstack/react-router";

import { ChatSection } from "@/components/chat-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { HeroSection } from "@/components/hero-section";
import { ImpactSection } from "@/components/impact-section";
import { SiteNav } from "@/components/site-nav";
import { VisitorCount } from "@/components/visitor-count";


const TITLE = "Subhrojeet Saha | Technology Risk & Compliance";
const DESCRIPTION =
  "Technology risk and compliance leader with seven years at JPMorgan Chase, Diligent, Moody's, Goldman Sachs and KPMG. Review my record or submit an enquiry.";


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
        <ChatSection />
        <ContactSection />
      </main>
      <footer className="border-t border-slate-100 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 font-mono text-xs text-slate-400 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Subhrojeet Saha</span>
          <span className="flex items-center gap-3">
            <span>Bengaluru, India</span>
            <span aria-hidden className="hidden text-slate-200 sm:inline">
              ·
            </span>
            <VisitorCount />
          </span>
        </div>
      </footer>

    </div>
  );
}
