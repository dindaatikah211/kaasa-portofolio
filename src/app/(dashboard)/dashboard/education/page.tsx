import Link from "next/link";
import { getEducations } from "@/features/education/services/education-service";
import { EducationList } from "@/features/education/components/education-list";

export default async function EducationPage() {
  const items = await getEducations();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Education</h1>
        <Link href="/dashboard/education/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Add
        </Link>
      </div>
      <EducationList items={items} />
    </div>
  );
}