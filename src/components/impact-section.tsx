import { IMPACT, PROFILE } from "@/lib/profile";

export function ImpactSection() {
  return (
    <section id="profile" className="border-b border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand">Professional Profile</p>
          </div>
          <div>
            <p className="font-serif text-2xl leading-snug text-foreground text-pretty md:text-3xl">
              {PROFILE.tagline}
            </p>
            <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
              {PROFILE.summary}
            </p>
          </div>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {IMPACT.map((item) => (
            <div key={item.metric} className="bg-card p-8">
              <dt className="text-xs uppercase tracking-[0.18em] text-brand">{item.label}</dt>
              <dd className="mt-4 font-serif text-5xl font-medium tracking-tight text-foreground">
                {item.metric}
              </dd>
              <dd className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
