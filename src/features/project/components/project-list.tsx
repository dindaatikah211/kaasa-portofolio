import Link from "next/link";
import { deleteProject } from "../services/project-service";
import { PROJECT_CATEGORIES } from "../constants";
import type { Project } from "../types";

export function ProjectList({ items }: { items: Project[] }) {
  const grouped = items.reduce<Record<string, Project[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {PROJECT_CATEGORIES.map((cat) => (
        <div key={cat.value}>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{cat.label}</h2>
          <div className="space-y-2">
            {(grouped[cat.value] ?? []).map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-3">
                <p>{item.title}</p>
                <div className="flex gap-3 text-sm">
                  <Link href={`/dashboard/projects/${item.id}`} className="underline">
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteProject(item.id);
                    }}
                  >
                    <button className="text-red-500 underline">Delete</button>
                  </form>
                </div>
              </div>
            ))}
            {(grouped[cat.value] ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground italic">Belum ada project.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}