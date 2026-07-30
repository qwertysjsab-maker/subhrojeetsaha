import { PROFILE } from "@/lib/profile";

export function HeroSection() {
  return (
    <header id="top" className="px-6 pb-20 pt-24">
      <div className="mx-auto max-w-6xl rise">
        <div className="mb-6 inline-block rounded-full border border-brand/25 bg-brand/5 px-3 py-1 font-mono text-xs uppercase text-brand">
          Open to senior risk &amp; compliance roles
        </div>
        <h1 className="mb-8 text-6xl font-bold leading-[0.9] tracking-tight md:text-8xl">
          Subhrojeet Saha.
        </h1>
        <div className="grid items-end gap-12 md:grid-cols-2">
          <p className="text-2xl font-light leading-tight text-slate-600 md:text-3xl">
            Technology Risk &amp; Compliance leader building{" "}
            <span className="font-medium text-primary underline decoration-brand decoration-2 underline-offset-4">
              institutional-grade governance
            </span>{" "}
            across global finance and SaaS.
          </p>
          <div className="flex flex-col gap-4 font-mono text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand" />
              JPMorgan Chase · Diligent · Moody&apos;s · Goldman Sachs · KPMG
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand" />
              7+ years in risk, audit and security governance
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand" />
              {PROFILE.location}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
