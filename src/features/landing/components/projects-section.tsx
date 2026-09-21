"use client";

import { useState } from "react";
import { EmptyNote } from "./empty-note";
import { ImagePreview } from "./image-preview";
import { Section } from "./section";
import { PROJECT_CATEGORIES } from "../constants";
import type { ProjectItem } from "../types";

function ProjectImage({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="relative aspect-[4/3] w-full bg-blush">
      {src ? (
        <ImagePreview src={src} alt={alt} />
      ) : (
        <span className="flex h-full items-center justify-center text-xs text-ink/60">No image yet</span>
      )}
    </div>
  );
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const available = PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c.value));
  const [active, setActive] = useState(available[0]?.value ?? "DEVELOPMENT");

  const items = projects.filter((p) => p.category === active);

  return (
    <Section id="projects" tone="cream" eyebrow="Selected work" title="Projects">
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {available.map((c) => (
          <button
            key={c.value}
            onClick={() => setActive(c.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors sm:px-5 sm:py-2 sm:text-sm ${
              active === c.value ? "bg-red text-cream" : "bg-blush text-ink hover:bg-pink/60"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        key={active}
        className="mx-auto grid max-w-5xl animate-rise grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
      >
        {items.map((p) => (
          <div key={p.id} className="card overflow-hidden">
            <ProjectImage src={p.imageUrl} alt={p.title} />
            <div className="p-3 sm:p-4">
              <p className="font-display text-base sm:text-lg">{p.title}</p>
              {p.description && (
                <p className="mt-1 line-clamp-2 text-xs text-ink/60 sm:line-clamp-none sm:text-sm">
                  {p.description}
                </p>
              )}
              <div className="mt-3 flex gap-3 text-xs font-medium sm:text-sm">
                {p.link && (
                  <a href={p.link} target="_blank" className="text-red hover:underline">
                    {p.linkLabel ?? "See"} →
                  </a>
                )}
                {p.secondaryLink && (
                  <a href={p.secondaryLink} target="_blank" className="text-ink/70 hover:underline">
                    {p.secondaryLabel ?? "See"} →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <EmptyNote>Belum ada project di kategori ini.</EmptyNote>}
      </div>
    </Section>
  );
}