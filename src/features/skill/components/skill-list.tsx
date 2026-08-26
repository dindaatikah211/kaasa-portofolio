import Link from "next/link";
import { deleteSkill } from "../services/skill-service";
import type { Skill } from "../types";

const CATEGORY_LABELS: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DESIGN: "Design",
  TOOLS: "Tools",
  SOFT_SKILLS: "Soft Skills",
  LANGUAGES: "Languages",
};

export function SkillList({ items }: { items: Skill[] }) {
  const grouped = items.reduce<Record<string, Skill[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, skills]) => (
        <div key={category}>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
            {CATEGORY_LABELS[category]}
          </h2>
          <div className="space-y-2">
            {skills.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-3">
                <p>{item.name}</p>
                <div className="flex gap-3 text-sm">
                  <Link href={`/dashboard/skills/${item.id}`} className="underline">
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteSkill(item.id);
                    }}
                  >
                    <button className="text-red-500 underline">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground italic">Belum ada data.</p>
      )}
    </div>
  );
}