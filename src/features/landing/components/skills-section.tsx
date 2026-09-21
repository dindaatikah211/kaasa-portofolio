import { Section } from "./section";
import { SKILL_CATEGORY_ICONS, SKILL_CATEGORY_LABELS } from "../constants";
import type { SkillItem } from "../types";

type SkillCard = { cat: string; index: number; names: string[] };

const COLUMN_COUNT = 3;

function balanceColumns(cards: SkillCard[], count: number) {
  const columns = Array.from({ length: count }, () => ({ weight: 0, cards: [] as SkillCard[] }));

  [...cards]
    .sort((a, b) => b.names.length - a.names.length)
    .forEach((card) => {
      const lightest = columns.reduce((min, col) => (col.weight < min.weight ? col : min));
      lightest.cards.push(card);
      lightest.weight += card.names.length;
    });

  return columns
    .map((col) => col.cards.sort((a, b) => a.index - b.index))
    .filter((col) => col.length > 0)
    .sort((a, b) => a[0].index - b[0].index);
}

export function SkillsSection({ skills }: { skills: SkillItem[] }) {
  const grouped = skills.reduce<Record<string, SkillItem[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const cards = Object.entries(grouped).map(([cat, items], index) => ({
    cat,
    index,
    names: items.flatMap((s) => s.name.split(",").map((n) => n.trim())).filter(Boolean),
  }));

  return (
    <Section id="skills" tone="blush" eyebrow="What I bring" title="Skills">
      <div className="mx-auto max-w-7xl columns-2 gap-3 sm:gap-6 lg:grid lg:grid-cols-3">
        {balanceColumns(cards, COLUMN_COUNT).map((column) => (
          <div key={column[0].cat} className="contents lg:flex lg:flex-col lg:gap-6">
            {column.map(({ cat, names }) => {
              const Icon = SKILL_CATEGORY_ICONS[cat];

              return (
                <div
                  key={cat}
                  className="card mb-3 break-inside-avoid bg-cream p-4 sm:mb-6 sm:p-5 lg:mb-0 lg:flex-auto"
                >
                  <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush text-red sm:h-10 sm:w-10">
                      {Icon && <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    </span>
                    <h3 className="font-display text-base text-ink sm:text-xl">{SKILL_CATEGORY_LABELS[cat]}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {names.map((name) => (
                      <span
                        key={name}
                        className="rounded-full bg-blush px-2.5 py-1 text-[11px] font-medium text-ink transition-transform hover:-translate-y-0.5 hover:-rotate-2 sm:px-3 sm:text-[13px]"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Section>
  );
}