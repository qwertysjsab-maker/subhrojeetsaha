import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { HeroSection } from "@/components/hero-section";
import { ImpactSection } from "@/components/impact-section";
import { SiteNav } from "@/components/site-nav";
import { VisitorCount } from "@/components/visitor-count";
import { CERTIFICATIONS, COMPETENCIES, EXPERIENCE, FRAMEWORKS, PROFILE } from "@/lib/profile";

// Loaded only in the browser, in its own async chunk, to keep the AI SDK's
// zod dependency out of the route's initial module graph.
const ChatSection = lazy(() =>
  import("@/components/chat-section").then((m) => ({ default: m.ChatSection })),
);

const TITLE = "Subhrojeet Saha | Technology Risk & Compliance";
const DESCRIPTION =
  "Technology risk and compliance leader with seven years at JPMorgan Chase, Diligent, Moody's, Goldman Sachs and KPMG. Review my record or submit an enquiry.";
const SITE_URL = "https://subhrojeetsaha.lovable.app";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: `${PROFILE.title} Leader`,
  description: PROFILE.summary,
  url: SITE_URL,
  sameAs: [PROFILE.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "India",
  },
  knowsAbout: [...COMPETENCIES, ...FRAMEWORKS, "Governance, Risk and Compliance", "Cybersecurity"],
  hasCredential: CERTIFICATIONS.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert,
  })),
  worksFor: EXPERIENCE.map((role) => ({
    "@type": "Organization",
    name: role.company,
    employee: {
      "@type": "EmployeeRole",
      roleName: role.role,
      startDate: role.period.split(" — ")[0],
      endDate: role.period.split(" — ")[1] === "Present" ? undefined : role.period.split(" — ")[1],
    },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(PERSON_SCHEMA),
      },
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
