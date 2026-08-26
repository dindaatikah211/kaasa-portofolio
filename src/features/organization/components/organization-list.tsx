import Link from "next/link";
import { deleteOrganization } from "../services/organization-service";
import type { Organization } from "../types";

export function OrganizationList({ items }: { items: Organization[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border p-4">
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">
              {item.role} · {item.dateLabel}
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <Link href={`/dashboard/organization/${item.id}`} className="underline">
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteOrganization(item.id);
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