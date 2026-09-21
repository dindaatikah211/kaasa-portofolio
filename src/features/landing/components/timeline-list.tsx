import { EmptyNote } from "./empty-note";
import type { TimelineItem } from "../types";

const TILE_SIZES = {
  roomy: {
    pad: "p-6 sm:p-8",
    pill: "px-3 py-1 text-xs",
    title: "text-xl sm:text-2xl",
    bullets: "mt-5 text-sm",
  },
  compact: {
    pad: "p-4 sm:p-6",
    pill: "px-2.5 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs",
    title: "text-base sm:text-xl",
    bullets: "mt-3 text-xs sm:mt-5 sm:text-sm",
  },
};

type ItemProps = {
  item: TimelineItem;
  index: number;
  featured: boolean;
  size: keyof typeof TILE_SIZES;
  className: string;
};

function Bullets({ items, className = "mt-3 text-sm" }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ul className={`list-disc space-y-1 pl-5 text-ink/70 marker:text-red ${className}`}>
      {items.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

function CardItem({ item }: ItemProps) {
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

function PlainItem({ item }: ItemProps) {
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

function TileItem({ item, index, featured, size, className }: ItemProps) {
  const sizes = TILE_SIZES[size];

  return (
    <div
      className={`card text-ink ${sizes.pad} ${featured ? "bg-cream sm:col-span-2" : "bg-white"} ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full bg-blush font-medium text-red ${sizes.pill}`}>{item.dateLabel}</span>
        <span className="font-display text-sm text-red/50">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className={`mt-4 font-display ${featured ? "text-xl sm:text-3xl" : sizes.title}`}>{item.title}</h3>
      <p className="mt-1 text-xs text-ink/60 sm:text-sm">{item.subtitle}</p>
      <Bullets
        items={item.bullets}
        className={
          featured ? `${sizes.bullets} sm:columns-2 sm:gap-10 [&>li]:break-inside-avoid` : sizes.bullets
        }
      />
    </div>
  );
}

const BASE = { itemClass: "", size: "roomy", featureFirst: false } as const;

const VARIANTS = {
  card: { ...BASE, Item: CardItem, layout: "max-w-3xl flex flex-col gap-5" },
  plain: { ...BASE, Item: PlainItem, layout: "max-w-4xl flex flex-col" },
  bento: {
    ...BASE,
    Item: TileItem,
    layout: "max-w-5xl grid gap-4 sm:grid-cols-2 sm:gap-6",
    featureFirst: true,
  },
  tiles: {
    ...BASE,
    Item: TileItem,
    layout: "max-w-5xl flex flex-wrap justify-center gap-3 sm:gap-6",
    itemClass: "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]",
    size: "compact" as const,
  },
};

export function TimelineList({
  items,
  variant = "card",
}: {
  items: TimelineItem[];
  variant?: keyof typeof VARIANTS;
}) {
  const { Item, layout, itemClass, size, featureFirst } = VARIANTS[variant];

  return (
    <div className={`mx-auto ${layout}`}>
      {items.map((item, i) => (
        <Item
          key={item.id}
          item={item}
          index={i}
          featured={featureFirst && i === 0}
          size={size}
          className={itemClass}
        />
      ))}
      {items.length === 0 && <EmptyNote>Belum ada data.</EmptyNote>}
    </div>
  );
}