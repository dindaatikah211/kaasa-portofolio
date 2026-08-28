import Link from "next/link";
import { getProjects } from "@/features/project/services/project-service";
import { ProjectList } from "@/features/project/components/project-list";

export default async function ProjectsPage() {
  const items = await getProjects();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/dashboard/projects/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Add
        </Link>
      </div>
      <ProjectList items={items} />
    </div>
  );
}