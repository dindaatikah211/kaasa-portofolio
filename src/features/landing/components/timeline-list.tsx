import type { TimelineItem } from "../types";

export function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border p-6"
          style={{ borderColor: "var(--sage)", background: "var(--cream)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="text-sm text-[var(--ink)]/60">{item.subtitle}</p>
            </div>
            <span className="text-xs text-[var(--ink)]/50">{item.dateLabel}</span>
          </div>
          {item.bullets.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]/70">
              {item.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-sm italic text-[var(--ink)]/50">Belum ada data.</p>
      )}
    </div>
  );
}