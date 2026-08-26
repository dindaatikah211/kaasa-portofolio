import { ExperienceForm } from "@/features/experience/components/experience-form";
import { createExperience } from "@/features/experience/services/experience-service";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add experience</h1>
      <ExperienceForm action={createExperience} />
    </div>
  );
}