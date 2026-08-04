import { EXPERIENCE } from "@/lib/profile";

export function ExperienceSection() {
  return (
    <section id="experience" className="border-b border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <p className="text-xs uppercase tracking-[0.24em] text-brand">Professional Experience</p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            A record built inside regulated institutions.
          </h2>
        </div>

        <div className="space-y-0">
          {EXPERIENCE.map((role) => (
            <article
              key={role.company}
              className="grid gap-4 border-t border-border py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
            >
              <div>
                <p
                  className={`text-xs uppercase tracking-[0.18em] ${
                    role.current ? "text-brand" : "text-muted-foreground"
                  }`}
                >
                  {role.period}
                  {role.current ? " · Current" : ""}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground">
                  {role.company}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{role.role}</p>
              </div>

              <ul className="space-y-3.5">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2.5 h-px w-5 shrink-0 bg-brand" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
