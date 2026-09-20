import Image from "next/image";
import type { CertificationItem } from "../types";

export function CertificationsSection({ items }: { items: CertificationItem[] }) {
  return (
    <section id="certifications" className="px-6 py-24 sm:px-16" style={{ background: "var(--blush)" }}>
      <p className="mb-2 text-center text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sage-dark)" }}>
        Verified
      </p>
      <h2 className="mb-10 text-center font-display text-4xl">Certifications</h2>
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-6">
        {items.map((c) => (
          <div key={c.id} className="overflow-hidden rounded-2xl bg-white/70">
            {c.imageUrl && (
              <div className="relative aspect-[4/3] w-full">
                <Image src={c.imageUrl} alt={c.title} fill unoptimized className="object-cover" />
              </div>
            )}
            <p className="p-3 text-xs font-medium sm:p-4 sm:text-sm">{c.title}</p>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-sm italic text-[var(--ink)]/50">Belum ada data.</p>
        )}
      </div>
    </section>
  );
}