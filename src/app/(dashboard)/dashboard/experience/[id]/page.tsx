import { notFound } from "next/navigation";
import { ExperienceForm } from "@/features/experience/components/experience-form";
import { getExperience, updateExperience } from "@/features/experience/services/experience-service";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getExperience(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit experience</h1>
      <ExperienceForm initial={item} action={updateExperience.bind(null, id)} />
    </div>
  );
}