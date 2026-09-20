import Image from "next/image";
import type { ReactNode } from "react";
import { NavPill } from "./nav-pill";
import { SocialLinks } from "./social-links";
import { INTERESTS, BADGE_COLORS } from "../constants";
import type { SocialLink } from "../types";
import { Sparkle } from "./sparkle";

const POLAROIDS = [
  {
    frame: "z-10 -translate-x-10 -translate-y-2 -rotate-9 sm:-translate-x-16 sm:-translate-y-4",
    tape: "rotate-9",
  },
  {
    frame: "z-30 translate-x-4 rotate-5 sm:translate-x-8",
    tape: "-rotate-5",
  },
  {
    frame: "z-20 translate-x-16 translate-y-3 -rotate-4 sm:translate-x-28 sm:translate-y-6",
    tape: "rotate-4",
  },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

function WashiTape({ className }: { className: string }) {
  return (
    <div className={`absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 bg-pink/70 ${className}`} />
  );
}

function NameLine({ ms, children }: { ms: number; children: ReactNode }) {
  return (
    <span className="block overflow-hidden pb-1">
      <span className="block animate-slide-up" style={delay(ms)}>
        {children}
      </span>
    </span>
  );
}

export function Hero({
  greeting,
  name,
  tagline,
  photoUrl,
  galleryUrls,
  socials,
}: {
  greeting: string;
  name: string;
  tagline: string;
  photoUrl?: string | null;
  galleryUrls: string[];
  socials: SocialLink[];
}) {
  const polaroids = [photoUrl, ...galleryUrls].filter(Boolean).slice(0, 3) as string[];
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(" ");

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-cream to-blush px-6 pb-28 pt-28 sm:px-16">
      <NavPill />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 sm:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex animate-rise items-center gap-2 rounded-full border border-pink bg-paper px-4 py-1.5 text-sm text-red">
            {greeting} <span>🌷</span>
          </div>

          <h1 className="font-display text-5xl leading-tight text-red sm:text-6xl lg:text-7xl">
            <NameLine ms={100}>
              {firstName}
              <Sparkle className="ml-2 mt-2 inline-block h-7 w-7 animate-twinkle align-top text-red/60 sm:h-9 sm:w-9" />
            </NameLine>
            {restName && <NameLine ms={220}>{restName}</NameLine>}
          </h1>

          <p
            className="mt-4 max-w-md animate-rise font-display text-2xl font-medium text-ink/70"
            style={delay(340)}
          >
            {tagline}
          </p>

          <div className="mt-6 flex animate-rise flex-wrap gap-2" style={delay(440)}>
            {INTERESTS.map((interest, i) => (
              <span
                key={interest}
                className={`${BADGE_COLORS[i % 2]} rounded-full px-4 py-1.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5`}
              >
                {interest}
              </span>
            ))}
          </div>

          {socials.length > 0 && (
            <div className="mt-6 animate-rise" style={delay(540)}>
              <SocialLinks socials={socials} />
            </div>
          )}
        </div>

        {polaroids.length > 0 && (
          <div className="relative mx-auto flex h-56 w-full max-w-md items-center justify-center sm:h-96">
            <div
              className="absolute left-1/2 top-1/2 z-0 h-[120%] w-2/3 origin-bottom -translate-x-1/2 -translate-y-1/2 animate-grow rounded-t-full bg-sky/60"
              style={delay(100)}
            />
            <div className="absolute bottom-0 left-2 z-0 h-14 w-14 animate-float rounded-full bg-red sm:bottom-6 sm:left-6 sm:h-20 sm:w-20" />
            <Sparkle className="absolute right-0 top-0 z-40 h-9 w-9 animate-twinkle text-red/60" />

            {polaroids.map((url, i) => (
              <div
                key={url}
                className={`absolute h-48 w-36 animate-pop transition-transform duration-300 hover:rotate-0 sm:h-72 sm:w-56 ${POLAROIDS[i].frame}`}
                style={delay(350 + i * 150)}
              >
                <div
                  className="relative h-full w-full animate-float rounded-sm bg-white p-2 pb-7 shadow-xl sm:p-3 sm:pb-9"
                  style={{ animationDelay: `${-i * 2.3}s` }}
                >
                  <WashiTape className={POLAROIDS[i].tape} />
                  <div className="relative h-full w-full overflow-hidden">
                    <Image src={url} alt="" fill unoptimized className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <a
          href="#about"
          className="flex animate-rise flex-col items-center gap-1 text-xs text-ink/50 transition-colors hover:text-red"
          style={delay(900)}
        >
          Scroll
          <svg
            className="animate-bob"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}