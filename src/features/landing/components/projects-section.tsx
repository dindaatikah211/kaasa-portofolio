"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECT_CATEGORIES } from "../constants";
import type { ProjectItem } from "../types";

function ProjectImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div
        className="flex h-40 w-full items-center justify-center text-xs"
        style={{ background: "var(--blush)", color: "var(--ink)" }}
      >
        No image yet
      </div>
    );
  }

  return (
    <div className="relative h-40 w-full">
      <Image src={src} alt={alt} fill unoptimized className="object-cover" />
    </div>
  );
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const available = PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c.value));
  const [active, setActive] = useState(available[0]?.value ?? "DEVELOPMENT");

  const items = projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="px-6 py-24 sm:px-16" style={{ background: "var(--cream)" }}>
      <p className="mb-2 text-center text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sage-dark)" }}>
        Selected work
      </p>
      <h2 className="mb-8 text-center font-display text-4xl">Projects</h2>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {available.map((c) => (
          <button
            key={c.value}
            onClick={() => setActive(c.value)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={{
              background: active === c.value ? "var(--pink)" : "var(--sage)",
              color: active === c.value ? "white" : "var(--ink)",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        key={active}
        className="mx-auto grid max-w-5xl animate-[fadeIn_0.4s_ease-out] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--sage)", background: "white" }}
          >
            <ProjectImage src={p.imageUrl} alt={p.title} />
            <div className="p-4">
              <p className="font-display text-lg">{p.title}</p>
              {p.description && (
                <p className="mt-1 text-sm text-[var(--ink)]/60">{p.description}</p>
              )}
              <div className="mt-3 flex gap-3 text-sm">
                {p.link && (
                  <a href={p.link} target="_blank" style={{ color: "var(--pink)" }}>
                    {p.linkLabel ?? "See"} →
                  </a>
                )}
                {p.secondaryLink && (
                  <a href={p.secondaryLink} target="_blank" style={{ color: "var(--sage-dark)" }}>
                    {p.secondaryLabel ?? "See"} →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-sm italic text-[var(--ink)]/50">
            Belum ada project di kategori ini.
          </p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}