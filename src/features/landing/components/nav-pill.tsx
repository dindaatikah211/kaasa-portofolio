const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function NavPill() {
  return (
    <header className="fixed inset-x-0 top-6 z-40 flex justify-center px-6">
      <nav
        className="flex items-center gap-6 rounded-full border px-3 py-2 shadow-sm backdrop-blur-md"
        style={{ borderColor: "var(--sage-dark)", background: "rgba(255,255,255,0.75)" }}
      >
        <div className="hidden gap-5 pr-2 text-sm text-[var(--ink)]/70 sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-[var(--sage)]/50 hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}