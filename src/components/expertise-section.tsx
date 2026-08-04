import { CERTIFICATIONS, COMPETENCIES, EDUCATION, FRAMEWORKS, TOOLS } from "@/lib/profile";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="md:w-1/3">
            <h2 className="mb-4 text-4xl font-bold">Expertise &amp; Credentials</h2>
            <p className="text-slate-500">
              The frameworks, tooling and disciplines underpinning seven years of risk and assurance
              work in regulated environments.
            </p>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-400">
                Education
              </h3>
              <p className="text-sm text-slate-600">{EDUCATION}</p>
            </div>
          </div>
          <div className="grid w-full gap-x-12 gap-y-10 md:w-2/3 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand">
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {FRAMEWORKS.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand">
                Tooling
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand">
                Competencies
              </h3>
              <ul className="space-y-2 text-slate-600">
                {COMPETENCIES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand">
                Certifications
              </h3>
              <ul className="space-y-2 text-slate-600">
                {CERTIFICATIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
