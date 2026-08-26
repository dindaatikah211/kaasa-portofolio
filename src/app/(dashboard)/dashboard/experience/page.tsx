import Link from "next/link";
import { getExperiences } from "@/features/experience/services/experience-service";
import { ExperienceList } from "@/features/experience/components/experience-list";

export default async function ExperiencePage() {
  const items = await getExperiences();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <Link href="/dashboard/experience/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Add
        </Link>
      </div>
      <ExperienceList items={items} />
    </div>
  );
}