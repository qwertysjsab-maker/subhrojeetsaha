import { PROFILE } from "@/lib/profile";

const LINKS = [
  { href: "#profile", label: "Profile" },
  { href: "#experience", label: "Experience" },
  { href: "#expertise", label: "Credentials" },
  { href: "#ai-chat", label: "Enquire" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-ink-foreground/10 bg-ink/95 text-ink-foreground backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-serif text-lg tracking-tight">Subhrojeet Saha</span>
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-ink-muted sm:inline">
            Technology Risk &amp; Compliance
          </span>
        </a>
        <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-brand-soft">
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-xs uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-brand-soft md:hidden"
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
