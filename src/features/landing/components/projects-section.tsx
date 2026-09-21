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

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="card overflow-hidden">
      <ProjectImage src={project.imageUrl} alt={project.title} />
      <div className="p-3 sm:p-4">
        <p className="font-display text-base sm:text-lg">{project.title}</p>
        {project.description && (
          <p className="mt-1 line-clamp-2 text-xs text-ink/60 sm:line-clamp-none sm:text-sm">
            {project.description}
          </p>
        )}
        <div className="mt-3 flex gap-3 text-xs font-medium sm:text-sm">
          {project.link && (
            <a href={project.link} target="_blank" className="text-red hover:underline">
              {project.linkLabel ?? "See"} →
            </a>
          )}
          {project.secondaryLink && (
            <a href={project.secondaryLink} target="_blank" className="text-ink/70 hover:underline">
              {project.secondaryLabel ?? "See"} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function getSubcategories(items: ProjectItem[]) {
  const labels: string[] = [];
  for (const item of items) {
    const label = item.subcategory?.trim() || "Others";
    if (!labels.includes(label)) labels.push(label);
  }
  return labels;
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const available = PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c.value));
  const [active, setActive] = useState(available[0]?.value ?? "DEVELOPMENT");
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const categoryItems = projects.filter((p) => p.category === active);
  const hasSubcategories = active === "DESIGN";
  const subcategories = hasSubcategories ? getSubcategories(categoryItems) : [];
  const activeSub = selectedSub && subcategories.includes(selectedSub) ? selectedSub : subcategories[0];

  const items = hasSubcategories
    ? categoryItems.filter((p) => (p.subcategory?.trim() || "Others") === activeSub)
    : categoryItems;

  function handleCategoryChange(value: string) {
    setActive(value);
    setSelectedSub(null);
  }

  return (
    <Section id="projects" tone="cream" eyebrow="Selected work" title="Projects">
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {available.map((c) => (
          <button
            key={c.value}
            onClick={() => handleCategoryChange(c.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors sm:px-5 sm:py-2 sm:text-sm ${
              active === c.value ? "bg-red text-cream" : "bg-blush text-ink hover:bg-pink/60"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {hasSubcategories && subcategories.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-red/50 ${
                activeSub === sub ? "bg-ink text-cream" : "bg-blush/60 text-ink/70 hover:bg-pink/40"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <div
        key={`${active}-${activeSub}`}
        className="mx-auto grid max-w-5xl animate-rise grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
      >
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
        {items.length === 0 && <EmptyNote>Belum ada project di kategori ini.</EmptyNote>}
      </div>
    </Section>
  );
}