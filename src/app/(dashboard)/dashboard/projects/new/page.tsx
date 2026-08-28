import { ProjectForm } from "@/features/project/components/project-form";
import { createProject } from "@/features/project/services/project-service";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}