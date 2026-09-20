import Image from "next/image";
import { NavPill } from "./nav-pill";
import { SocialIcon } from "./social-icon";
import { INTERESTS, BADGE_COLORS } from "../constants";
import type { SocialLink } from "../types";

function WashiTape({ rotate }: { rotate: number }) {
  return (
    <div
      className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 opacity-80"
      style={{ background: "var(--sage)", transform: `translateX(-50%) rotate(${rotate}deg)` }}
    />
  );
}

function Doodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <path
        d="M20 6c3 4 3 9 0 13-3-4-3-9 0-13z M20 21c3 4 3 9 0 13-3-4-3-9 0-13z M6 20c4-3 9-3 13 0-4 3-9 3-13 0z M21 20c4-3 9-3 13 0-4 3-9 3-13 0z"
        fill="var(--pink)"
      />
    </svg>
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
    <section
      className="relative min-h-screen w-full overflow-hidden px-6 pb-24 pt-40 sm:px-16"
      style={{ background: "linear-gradient(180deg, var(--cream) 0%, var(--blush) 100%)" }}
    >
      <NavPill />

      <Doodle className="absolute left-10 top-40 h-8 w-8 opacity-60 sm:left-24" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 sm:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--sage-dark)]/40 bg-white/70 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--ink)]/70">
            {greeting} <span>🌷</span>
          </div>

          <h1 className="font-display text-5xl leading-tight sm:text-6xl">
            {firstName}
            {restName && (
              <>
                <br />
                <span style={{ color: "var(--pink)" }}>{restName}</span>
              </>
            )}
          </h1>
          <p className="mt-3 font-display text-xl" style={{ color: "var(--sage-dark)" }}>
            Pixels, pastels, and a little bit of magic.
          </p>
          <p className="mt-4 max-w-md text-[var(--ink)]/70">{tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {INTERESTS.map((interest, i) => (
              <span
                key={interest}
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                style={{ background: BADGE_COLORS[i % 2], color: "var(--ink)" }}
              >
                {interest}
              </span>
            ))}
          </div>

          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:-translate-y-1"
                  style={{ background: "var(--pink)" }}
                  aria-label={s.label}
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          )}
        </div>

        {polaroids.length > 0 && (
          <div className="relative mx-auto flex h-56 w-full max-w-md items-center justify-center sm:h-96">
            {polaroids.map((url, i) => {
              const rotations = [-9, 5, -4];
              const zIndexes = [1, 3, 2];
              const offsets = [
                "-translate-x-10 -translate-y-2 sm:-translate-x-16 sm:-translate-y-4",
                "translate-x-4 sm:translate-x-8",
                "translate-x-16 translate-y-3 sm:translate-x-28 sm:translate-y-6",
              ];
              return (
                <div
                  key={url}
                  className={`absolute h-48 w-36 rounded-sm bg-white p-2 pb-7 shadow-xl sm:h-72 sm:w-56 sm:p-3 sm:pb-9 ${offsets[i]}`}
                  style={{ transform: `rotate(${rotations[i]}deg)`, zIndex: zIndexes[i] }}
                >
                  <WashiTape rotate={rotations[i] * -1} />
                  <div className="relative h-full w-full overflow-hidden">
                    <Image src={url} alt="" fill unoptimized className="object-cover" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}