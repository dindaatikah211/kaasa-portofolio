import { notFound } from "next/navigation";
import { ProjectForm } from "@/features/project/components/project-form";
import { getProject, updateProject } from "@/features/project/services/project-service";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getProject(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit project</h1>
      <ProjectForm initial={item} action={updateProject.bind(null, id)} />
    </div>
  );
}