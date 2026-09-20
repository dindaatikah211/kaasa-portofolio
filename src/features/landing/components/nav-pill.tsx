"use client";

import { useState } from "react";
import { NAV_LINKS } from "../constants";

export function NavPill() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-6 sm:px-6">
      <nav
        className="relative flex w-full max-w-md items-center justify-between rounded-full border px-3 py-2 shadow-sm backdrop-blur-md sm:w-auto sm:justify-start sm:gap-6"
        style={{ borderColor: "var(--sage-dark)", background: "rgba(255,255,255,0.85)" }}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm text-white"
          style={{ background: "linear-gradient(135deg, var(--pink), var(--sage-dark))" }}
        >
          D
        </span>

        <div className="hidden gap-5 pr-2 text-sm text-[var(--ink)]/70 sm:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-[var(--sage)]/50 hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:hidden"
          style={{ background: "var(--sage)" }}
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
          <div
            className="absolute left-0 right-0 top-full mt-2 flex flex-col gap-1 rounded-2xl border p-3 shadow-lg sm:hidden"
            style={{ borderColor: "var(--sage-dark)", background: "rgba(255,255,255,0.95)" }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm text-[var(--ink)]/80 transition-colors hover:bg-[var(--sage)]/50"
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