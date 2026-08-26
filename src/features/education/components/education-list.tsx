import Link from "next/link";
import { deleteEducation } from "../services/education-service";
import type { Education } from "../types";

export function EducationList({ items }: { items: Education[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border p-4">
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">
              {item.institution} · {item.dateLabel}
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <Link href={`/dashboard/education/${item.id}`} className="underline">
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteEducation(item.id);
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