import Image from "next/image";
import { FlowerField } from "./flower-field";
import { NavPill } from "./nav-pill";

const ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  GitHub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.5A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM7 8.48H3V21h4V8.48zm6.32 0H9.35V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z" />
    </svg>
  ),
  WhatsApp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.83 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.77-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.04.93 1.92 1.22 2.2 1.36.28.14.44.12.6-.07.16-.19.68-.79.87-1.07.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
    </svg>
  ),
};

type SocialLink = {
  label: string;
  href: string;
};

export function Hero({
  greeting,
  name,
  tagline,
  photoUrl,
  socials,
}: {
  greeting: string;
  name: string;
  tagline: string;
  photoUrl?: string | null;
  socials: SocialLink[];
}) {
  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-32 sm:px-16"
      style={{ background: "linear-gradient(180deg, #fff8f2 0%, #ffd4a8 55%, #ff9fc7 100%)" }}
    >
      <NavPill />
      {/* <FlowerField /> */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 sm:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--ink)]/70 backdrop-blur-sm">
            {greeting}

          </div>
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl">
            {name.split(" ").slice(0, -1).join(" ")}
            <br />
            <span style={{ color: "var(--coral)" }}>{name.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-[var(--ink)]/70">{tagline}</p>
          {socials.length > 0 && (
            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, var(--coral), var(--rose))",
                    boxShadow: "0 8px 20px -6px rgba(255, 122, 107, 0.6)",
                  }}
                  aria-label={s.label}
                >
                  {ICONS[s.label]}
                </a>
              ))}
            </div>
          )}
        </div>
        {photoUrl && (
          <div className="relative mx-auto w-full max-w-sm">
            <div
              className="absolute -inset-4 rounded-full opacity-70 blur-2xl"
              style={{ background: "linear-gradient(135deg, var(--rose), var(--peach))" }}
            />
            <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-white shadow-2xl rotate-2">
              <Image src={photoUrl} alt={name} fill className="object-cover" />
            </div>
            <div
              className="absolute -bottom-3 -left-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-2xl shadow-lg"
              style={{ background: "var(--peach)" }}
            >
              ✦
            </div>
          </div>
        )}
      </div>
    </section>
  );
}