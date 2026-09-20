import { EmptyNote } from "./empty-note";
import type { TimelineItem } from "../types";

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/70 marker:text-red">
      {items.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

function CardItem({ item }: { item: TimelineItem }) {
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl">{item.title}</h3>
          <p className="text-sm text-ink/60">{item.subtitle}</p>
        </div>
        <span className="text-xs text-ink/50">{item.dateLabel}</span>
      </div>
      <Bullets items={item.bullets} />
    </div>
  );
}

function PlainItem({ item }: { item: TimelineItem }) {
  return (
    <div className="reveal grid gap-1 border-b border-pink py-10 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-x-10">
      <p className="text-sm font-medium text-red sm:pt-2">{item.dateLabel}</p>
      <div>
        <h3 className="font-display text-2xl">{item.title}</h3>
        <p className="text-ink/60">{item.subtitle}</p>
        <Bullets items={item.bullets} />
      </div>
    </div>
  );
}

export function TimelineList({ items, plain = false }: { items: TimelineItem[]; plain?: boolean }) {
  const Item = plain ? PlainItem : CardItem;

  return (
    <div className={`mx-auto flex flex-col ${plain ? "max-w-4xl" : "max-w-3xl gap-5"}`}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      {items.length === 0 && <EmptyNote>Belum ada data.</EmptyNote>}
    </div>
  );
}