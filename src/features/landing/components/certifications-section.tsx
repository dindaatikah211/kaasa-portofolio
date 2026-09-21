import { EmptyNote } from "./empty-note";
import { ImagePreview } from "./image-preview";
import { Section } from "./section";
import type { CertificationItem } from "../types";

export function CertificationsSection({ items }: { items: CertificationItem[] }) {
  return (
    <Section id="certifications" tone="blush" eyebrow="Verified" title="Certifications">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-6">
        {items.map((c) => (
          <div key={c.id} className="card overflow-hidden">
            {c.imageUrl && (
              <div className="relative aspect-[4/3] w-full">
                <ImagePreview src={c.imageUrl} alt={c.title} />
              </div>
            )}
            <p className="p-3 text-xs font-medium sm:p-4 sm:text-sm">{c.title}</p>
          </div>
        ))}
        {items.length === 0 && <EmptyNote>Belum ada data.</EmptyNote>}
      </div>
    </Section>
  );
}