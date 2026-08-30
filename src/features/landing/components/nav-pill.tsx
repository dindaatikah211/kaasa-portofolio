const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function NavPill() {
  return (
    <header className="fixed inset-x-0 top-6 z-40 flex justify-center px-6">
      <nav className="flex items-center gap-6 rounded-full border border-white/40 bg-white/60 px-6 py-3 shadow-sm backdrop-blur-md">
        <span className="font-display text-sm">DAG</span>
        <div className="hidden gap-5 text-sm text-[var(--ink)]/70 sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--ink)] transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}