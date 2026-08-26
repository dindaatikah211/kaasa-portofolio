import { notFound } from "next/navigation";
import { SkillForm } from "@/features/skill/components/skill-form";
import { getSkill, updateSkill } from "@/features/skill/services/skill-service";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getSkill(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit skill</h1>
      <SkillForm initial={item} action={updateSkill.bind(null, id)} />
    </div>
  );
}