import Link from "next/link";
import { deleteExperience } from "../services/experience-service";
import type { Experience } from "../types";

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border p-4">
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">
              {item.company} · {item.dateLabel}
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <Link href={`/dashboard/experience/${item.id}`} className="underline">
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteExperience(item.id);
              }}
            >
              <button className="text-red-500 underline">Delete</button>
            </form>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground italic">Belum ada data.</p>
      )}
    </div>
  );
}