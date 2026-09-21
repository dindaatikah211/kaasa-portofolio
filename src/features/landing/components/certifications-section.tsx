import { EmptyNote } from "./empty-note";
import { ImagePreview } from "./image-preview";
import { Section } from "./section";
import type { CertificationItem } from "../types";

const LAYOUTS = {
  2: { container: "max-w-4xl", card: "" },
  3: { container: "max-w-6xl", card: "lg:w-[calc(33.333%-1rem)]" },
  4: { container: "max-w-6xl", card: "lg:w-[calc(25%-1.125rem)]" },
};

function columnsFor(count: number) {
  if (count <= 2) return 2;
  if (count % 3 === 1) return count < 7 ? 2 : 4;
  return 3;
}

export function CertificationsSection({ items }: { items: CertificationItem[] }) {
  const layout = LAYOUTS[columnsFor(items.length)];

  return (
    <Section id="certifications" tone="blush" eyebrow="Verified" title="Certifications">
      <div className={`mx-auto flex ${layout.container} flex-wrap justify-center gap-3 sm:gap-6`}>
        {items.map((c) => (
          <div
            key={c.id}
            className={`card flex w-[calc(50%-0.375rem)] flex-col p-2 sm:w-[calc(50%-0.75rem)] sm:p-3 ${layout.card}`}
          >
            {c.imageUrl && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-pink/50 bg-white">
                <ImagePreview src={c.imageUrl} alt={c.title} contain />
              </div>
            )}
            <p className="flex-1 px-1 pb-1 pt-3 text-xs font-medium sm:px-2 sm:pb-2 sm:text-sm">{c.title}</p>
          </div>
        ))}
        {items.length === 0 && <EmptyNote>Belum ada data.</EmptyNote>}
      </div>
    </Section>
  );
}