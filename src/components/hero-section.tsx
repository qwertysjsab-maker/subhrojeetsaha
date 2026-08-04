import { ArrowDown, Download } from "lucide-react";
import { PROFILE } from "@/lib/profile";
import resumeAsset from "@/assets/resume.pdf.asset.json";

const INSTITUTIONS = ["JPMorgan Chase", "Diligent", "Moody's", "Goldman Sachs", "KPMG"];

export function HeroSection() {
  return (
    <header id="top" className="bg-ink px-6 pb-20 pt-24 text-ink-foreground md:pb-28 md:pt-32">
      <div className="rise mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-px w-10 bg-brand-soft" aria-hidden />
          <p className="text-xs uppercase tracking-[0.28em] text-brand-soft">
            Technology Risk &amp; Compliance
          </p>
        </div>

        <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[1.05] tracking-tight text-balance md:text-7xl">
          Governance that withstands regulatory, audit and board-level scrutiny.
        </h1>

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-2xl text-lg font-light leading-relaxed text-ink-muted md:text-xl">
            {PROFILE.name} designs and leads risk, compliance and security governance programmes
            across global financial services and enterprise software — seven years of practice
            inside the world&apos;s most closely regulated institutions.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
            <a
              href={resumeAsset.url}
              download="Subhrojeet_Saha_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 bg-brand-soft px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" aria-hidden />
              Curriculum vitae
            </a>
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 border border-ink-foreground/25 px-6 py-3 text-sm text-ink-foreground transition-colors hover:border-brand-soft hover:text-brand-soft"
            >
              <ArrowDown className="h-4 w-4" aria-hidden />
              Review the record
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-ink-foreground/10 pt-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            Experience gained at
          </p>
          <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-3">
            {INSTITUTIONS.map((name) => (
              <li key={name} className="font-serif text-lg text-ink-foreground/85 md:text-xl">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
