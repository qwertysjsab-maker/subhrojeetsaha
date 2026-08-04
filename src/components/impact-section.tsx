import { IMPACT, PROFILE } from "@/lib/profile";

export function ImpactSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          Professional Profile
        </h2>

        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-slate-600">{PROFILE.summary}</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {IMPACT.map((item) => (
            <div
              key={item.metric}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 text-4xl font-bold text-brand">{item.metric}</div>
              <p className="leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
