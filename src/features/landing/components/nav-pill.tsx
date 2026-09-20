"use client";

import { useState } from "react";
import { NAV_LINKS } from "../constants";
import { Sparkle } from "./sparkle";

const LINK_CLASS =
  "relative px-3 py-1.5 transition-colors hover:text-red after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-red after:transition-transform hover:after:scale-x-100";

export function NavPill() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-6 sm:px-6">
      <nav className="relative flex w-full max-w-md animate-drop items-center justify-between rounded-full border border-pink bg-paper/85 px-3 py-2 shadow-sm backdrop-blur-md sm:w-auto sm:justify-start sm:gap-6">
        <a
          href="#"
          aria-label="Back to top"
          className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red text-cream"
        >
          <Sparkle className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
        </a>

        <div className="hidden gap-2 pr-2 text-sm text-ink/70 sm:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={LINK_CLASS}>
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush sm:hidden"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-2 flex animate-rise flex-col gap-1 rounded-2xl border border-pink bg-paper/95 p-3 shadow-lg sm:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm text-ink/80 transition-colors hover:bg-blush"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}