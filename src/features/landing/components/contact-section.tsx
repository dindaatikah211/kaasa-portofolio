import { SocialIcon } from "./social-icon";
import type { SocialLink } from "../types";

export function ContactSection({ socials }: { socials: SocialLink[] }) {
  return (
    <section id="contact" className="px-6 py-24 text-center sm:px-16" style={{ background: "var(--cream)" }}>
      <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sage-dark)" }}>
        Say hello
      </p>
      <h2 className="mb-8 font-display text-4xl">Contact</h2>
      <div className="flex justify-center gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:-translate-y-1"
            style={{ background: "var(--pink)" }}
            aria-label={s.label}
          >
            <SocialIcon label={s.label} />
          </a>
        ))}
      </div>
    </section>
  );
}