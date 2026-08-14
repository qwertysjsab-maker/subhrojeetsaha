import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "@/components/site-nav";
import { PROFILE } from "@/lib/profile";

const TITLE = "Third-Party Risk Management Case Study | Subhrojeet Saha";
const DESCRIPTION =
  "How I redesigned the third-party risk management framework and operating model at a global SaaS enterprise — governing 250+ vendor assessments a year and improving operating efficiency by roughly 30%.";
const SITE_URL = "https://subhrojeetsaha.lovable.app";
const PAGE_URL = `${SITE_URL}/case-studies/tprm-redesign`;

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Third-Party Risk Management: Redesigning the Framework and Operating Model",
  description: DESCRIPTION,
  url: PAGE_URL,
  about: "Third-Party Risk Management",
  author: {
    "@type": "Person",
    name: PROFILE.name,
    url: SITE_URL,
    sameAs: [PROFILE.linkedin],
  },
  publisher: { "@type": "Person", name: PROFILE.name, url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is third-party risk management?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Third-party risk management (TPRM) is the discipline of identifying, assessing, treating and monitoring the risks an organisation inherits from its suppliers, vendors and service providers — spanning information security, resilience, privacy, financial stability and regulatory compliance across the full engagement lifecycle.",
      },
    },
    {
      "@type": "Question",
      name: "How is a third-party risk assessment tiered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assessments are tiered by inherent risk: the data the supplier handles, whether it supports a critical business service, the depth of system integration and its concentration or substitutability. Criticality drives the depth of due diligence, the evidence required and the frequency of reassessment, so scarce assurance effort is spent where the exposure is greatest.",
      },
    },
    {
      "@type": "Question",
      name: "How does TPRM map to SOC 2 and BSI C5?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both frameworks expect documented supplier due diligence, contractual security obligations, ongoing monitoring of critical suppliers and evidence that findings are tracked to closure. Designing TPRM controls so a single set of artefacts satisfies both avoids duplicated assessment cycles and keeps the programme audit-ready.",
      },
    },
  ],
};

const CHALLENGES = [
  {
    title: "Assessment depth untied to risk",
    body: "Every supplier attracted broadly the same due diligence, so critical providers received no more scrutiny than low-impact ones while assessment queues lengthened.",
  },
  {
    title: "Overlapping control frameworks",
    body: "SOC 2 and BSI C5 obligations were evidenced separately, duplicating effort across assessment cycles and audit preparation.",
  },
  {
    title: "Detective, not preventive, assurance",
    body: "Control deficiencies surfaced during audit rather than in the ordinary course of business, compressing remediation windows.",
  },
  {
    title: "Reporting without a risk narrative",
    body: "Executive reporting captured assessment throughput but not residual risk, concentration exposure or remediation health.",
  },
];

const INTERVENTIONS = [
  {
    step: "01",
    title: "Risk-tiered due diligence",
    body: "Policies, standards and control requirements were rewritten so inherent risk — data sensitivity, criticality of the supported service, integration depth and substitutability — determines the depth of assessment, the evidence demanded and the reassessment cadence.",
  },
  {
    step: "02",
    title: "Control mapping to SOC 2 and BSI C5",
    body: "Supplier control requirements were mapped once against both frameworks, so a single evidence set satisfies each obligation and the programme remains continuously audit-ready rather than being reconstructed each cycle.",
  },
  {
    step: "03",
    title: "Second-line controls surveillance",
    body: "A surveillance capability was established to test control operation independently and identify deficiencies proactively, strengthening assurance coverage ahead of audit and measurably reducing findings.",
  },
  {
    step: "04",
    title: "Critical supplier review cycle",
    body: "More than fifty critical supplier reviews are conducted annually, examining resilience, subcontracting, concentration and remediation progress rather than repeating the onboarding questionnaire.",
  },
  {
    step: "05",
    title: "Executive risk reporting",
    body: "Reporting was reframed around residual risk, exception ageing and remediation health, giving leadership a defensible view of the supplier estate through IPO readiness.",
  },
];

const OUTCOMES = [
  {
    metric: "~30%",
    body: "Improvement in operating efficiency following the redesign of the third-party risk framework and operating model against SOC 2 and BSI C5.",
  },
  {
    metric: "250+",
    body: "Risk-based vendor assessments governed each year with no service-level breach recorded.",
  },
  {
    metric: "50+",
    body: "Critical supplier reviews delivered annually, sustaining audit and IPO readiness across the estate.",
  },
];

const LESSONS = [
  "Tiering is the single highest-return change. Until assessment depth is tied to inherent risk, additional headcount only lengthens the queue.",
  "Map controls to every applicable framework once. Duplicated evidence gathering is the largest hidden cost in most TPRM functions.",
  "Assurance must be continuous. A second line that tests control operation between audits converts findings into managed work rather than escalations.",
  "Report residual risk, not throughput. Boards act on exposure and concentration; assessment counts alone do not support a decision.",
];

export const Route = createFileRoute("/case-studies/tprm-redesign")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ARTICLE_SCHEMA) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_SCHEMA) },
    ],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <header className="border-b border-slate-100 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
              Case Study · Third-Party Risk Management
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl">
              Redesigning Third-Party Risk Management for a Global SaaS Enterprise
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              As Staff GRC Analyst at Diligent Corporation, I led the security risk and third-party
              risk functions with a team of five risk professionals. This is an account of how the
              third-party risk framework and operating model were rebuilt against SOC 2 and BSI C5,
              why the programme was structured that way, and what it delivered.
            </p>
          </div>
        </header>

        <section className="bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
              Outcomes
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {OUTCOMES.map((item) => (
                <div
                  key={item.metric}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-4 text-4xl font-bold text-brand">{item.metric}</div>
                  <p className="leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <article className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-mono text-2xl font-bold tracking-tight text-primary">
              Context: what third-party risk management has to withstand
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              A software enterprise operating in regulated markets inherits risk from every supplier
              that processes its data, supports a critical service or sits inside its delivery
              chain. Customers test that exposure during procurement, auditors test it during SOC 2
              and BSI C5 engagements, and investors test it during diligence. A third-party risk
              programme therefore has to satisfy three audiences simultaneously: the business that
              needs suppliers onboarded quickly, the assurance functions that need evidence, and
              leadership that needs a defensible view of residual exposure.
            </p>

            <h2 className="mt-16 font-mono text-2xl font-bold tracking-tight text-primary">
              The problems identified
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {CHALLENGES.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-mono text-sm font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-16 font-mono text-2xl font-bold tracking-tight text-primary">
              The redesign
            </h2>
            <ol className="mt-8 space-y-8">
              {INTERVENTIONS.map((item) => (
                <li key={item.step} className="border-l-2 border-brand/30 pl-6">
                  <span className="font-mono text-xs tracking-[0.2em] text-brand">{item.step}</span>
                  <h3 className="mt-2 text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{item.body}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-16 font-mono text-2xl font-bold tracking-tight text-primary">
              What I would carry into the next programme
            </h2>
            <ul className="mt-8 space-y-4">
              {LESSONS.map((lesson) => (
                <li key={lesson} className="flex gap-4 leading-relaxed text-slate-600">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 font-mono text-2xl font-bold tracking-tight text-primary">
              Common questions on third-party risk management
            </h2>
            <dl className="mt-8 space-y-8">
              {FAQ_SCHEMA.mainEntity.map((entry) => (
                <div key={entry.name}>
                  <dt className="text-lg font-semibold text-primary">{entry.name}</dt>
                  <dd className="mt-3 leading-relaxed text-slate-600">
                    {entry.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <p className="leading-relaxed text-slate-600">
                If you are assessing a third-party risk mandate, I am happy to discuss how this
                approach would apply to your estate.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/"
                  hash="contact"
                  className="rounded-lg bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Get in touch
                </Link>
                <Link
                  to="/"
                  hash="experience"
                  className="rounded-lg border border-slate-300 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-slate-600 transition-colors hover:border-brand hover:text-brand"
                >
                  Review full experience
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <footer className="border-t border-slate-100 px-6 py-10">
        <div className="mx-auto flex max-w-6xl justify-between font-mono text-xs text-slate-400">
          <span>© {new Date().getFullYear()} Subhrojeet Saha</span>
          <span>Bengaluru, India</span>
        </div>
      </footer>
    </div>
  );
}
