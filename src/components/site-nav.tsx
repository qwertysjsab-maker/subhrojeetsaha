import { PROFILE } from "@/lib/profile";

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#expertise", label: "Expertise" },
  { href: "#ai-chat", label: "Enquire" },
  { href: "#contact", label: "Contact" },
];


export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-mono text-sm font-bold tracking-tighter text-primary sm:text-lg"
        >
          SUBHROJEET SAHA · TECHNOLOGY RISK
        </a>
        <div className="hidden gap-8 text-sm font-medium uppercase tracking-widest text-slate-500 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-brand md:hidden"
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
