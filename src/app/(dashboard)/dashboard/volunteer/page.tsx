import Link from "next/link";
import { getVolunteers } from "@/features/volunteer/services/volunteer-service";
import { VolunteerList } from "@/features/volunteer/components/volunteer-list";

export default async function VolunteerPage() {
  const items = await getVolunteers();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Volunteer</h1>
        <Link href="/dashboard/volunteer/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Add
        </Link>
      </div>
      <VolunteerList items={items} />
    </div>
  );
}