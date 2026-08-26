import Link from "next/link";
import { deleteCertification } from "../services/certification-service";
import type { Certification } from "../types";

export function CertificationList({ items }: { items: Certification[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border p-4">
          <p className="font-medium">{item.title}</p>
          <div className="flex gap-3 text-sm">
            <Link href={`/dashboard/certifications/${item.id}`} className="underline">
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteCertification(item.id);
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