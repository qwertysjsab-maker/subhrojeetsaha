import { CERTIFICATIONS, COMPETENCIES, EDUCATION, FRAMEWORKS, TOOLS } from "@/lib/profile";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="border-b border-border bg-secondary px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <p className="text-xs uppercase tracking-[0.24em] text-brand">
            Expertise &amp; Credentials
          </p>
          <div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Frameworks, disciplines and credentials.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              The regulatory frameworks, tooling and professional disciplines underpinning seven
              years of risk and assurance work in regulated environments.
            </p>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          <div className="bg-card p-8">
            <h3 className="mb-5 text-xs uppercase tracking-[0.18em] text-brand">
              Regulatory &amp; Assurance Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((item) => (
                <span
                  key={item}
                  className="border border-border bg-background px-3 py-1.5 text-xs font-medium tracking-wide text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>

            <h3 className="mb-5 mt-10 text-xs uppercase tracking-[0.18em] text-brand">Tooling</h3>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((item) => (
                <span
                  key={item}
                  className="border border-border bg-background px-3 py-1.5 text-xs font-medium tracking-wide text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>

            <h3 className="mb-3 mt-10 text-xs uppercase tracking-[0.18em] text-brand">
              Education
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{EDUCATION}</p>
          </div>

          <div className="bg-card p-8">
            <h3 className="mb-5 text-xs uppercase tracking-[0.18em] text-brand">
              Core Competencies
            </h3>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {COMPETENCIES.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mb-5 mt-10 text-xs uppercase tracking-[0.18em] text-brand">
              Certifications
            </h3>
            <ul className="space-y-2.5">
              {CERTIFICATIONS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
