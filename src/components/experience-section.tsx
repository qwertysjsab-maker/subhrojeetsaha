import { EXPERIENCE } from "@/lib/profile";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          Professional Experience
        </h2>

        <div className="space-y-16">
          {EXPERIENCE.map((role) => (
            <div key={role.company} className="relative border-l-2 border-slate-100 pl-8 md:pl-12">
              <div
                className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full ring-4 ring-white ${
                  role.current ? "bg-brand" : "bg-slate-200"
                }`}
              />
              <span
                className={`mb-2 block font-mono text-xs ${
                  role.current ? "text-brand" : "text-slate-400"
                }`}
              >
                {role.period}
              </span>
              <h3 className="text-2xl font-bold">{role.role}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">
                {role.company}
              </p>
              <ul className="mt-5 space-y-3 text-slate-600">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 h-px w-4 shrink-0 bg-brand" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
