import { SKILL_CATEGORY_LABELS } from "../constants";
import type { SkillItem } from "../types";

export function SkillsSection({ skills }: { skills: SkillItem[] }) {
  const grouped = skills.reduce<Record<string, SkillItem[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="px-6 py-24 sm:px-16" style={{ background: "var(--blush)" }}>
      <p className="mb-2 text-center text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sage-dark)" }}>
        What I bring
      </p>
      <h2 className="mb-10 text-center font-display text-4xl">Skills</h2>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-6">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="rounded-2xl bg-white/70 p-3 sm:p-5">
            <h3 className="mb-2 text-xs font-semibold sm:mb-3 sm:text-sm" style={{ color: "var(--sage-dark)" }}>
              {SKILL_CATEGORY_LABELS[cat]}
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {items.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full px-2.5 py-1 text-[10px] sm:px-3 sm:text-xs"
                  style={{ background: "var(--sage)", color: "var(--ink)" }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}