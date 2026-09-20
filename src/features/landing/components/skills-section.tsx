import { Section } from "./section";
import { SKILL_CATEGORY_ICONS, SKILL_CATEGORY_LABELS } from "../constants";
import type { SkillItem } from "../types";

export function SkillsSection({ skills }: { skills: SkillItem[] }) {
  const grouped = skills.reduce<Record<string, SkillItem[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <Section id="skills" tone="blush" eyebrow="What I bring" title="Skills">
      <div className="mx-auto max-w-6xl columns-2 gap-3 sm:gap-6 lg:columns-3">
        {Object.entries(grouped).map(([cat, items]) => {
          const Icon = SKILL_CATEGORY_ICONS[cat];

          return (
            <div key={cat} className="card mb-3 break-inside-avoid bg-cream p-4 sm:mb-6 sm:p-6">
              <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush text-red sm:h-10 sm:w-10">
                  {Icon && <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </span>
                <h3 className="font-display text-base text-ink sm:text-xl">{SKILL_CATEGORY_LABELS[cat]}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {items
                  .flatMap((s) => s.name.split(",").map((n) => n.trim()))
                  .filter(Boolean)
                  .map((name) => (
                    <span
                      key={name}
                      className="rounded-full bg-blush px-2.5 py-1 text-[11px] font-medium text-ink transition-transform hover:-translate-y-0.5 hover:-rotate-2 sm:px-3.5 sm:py-1.5 sm:text-sm"
                    >
                      {name}
                    </span>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}