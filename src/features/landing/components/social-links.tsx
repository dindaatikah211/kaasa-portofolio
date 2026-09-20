import { SocialIcon } from "./social-icon";
import type { SocialLink } from "../types";

export function SocialLinks({ socials, className = "" }: { socials: SocialLink[]; className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          aria-label={s.label}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-red text-cream transition-transform hover:-translate-y-1"
        >
          <SocialIcon label={s.label} />
        </a>
      ))}
    </div>
  );
}