import Link from "next/link";
import { getSkills } from "@/features/skill/services/skill-service";
import { SkillList } from "@/features/skill/components/skill-list";

export default async function SkillsPage() {
  const items = await getSkills();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <Link href="/dashboard/skills/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Add
        </Link>
      </div>
      <SkillList items={items} />
    </div>
  );
}