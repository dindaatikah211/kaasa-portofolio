import { SkillForm } from "@/features/skill/components/skill-form";
import { createSkill } from "@/features/skill/services/skill-service";

export default function NewSkillPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add skill</h1>
      <SkillForm action={createSkill} />
    </div>
  );
}