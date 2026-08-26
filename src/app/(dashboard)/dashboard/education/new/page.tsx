import { EducationForm } from "@/features/education/components/education-form";
import { createEducation } from "@/features/education/services/education-service";

export default function NewEducationPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add education</h1>
      <EducationForm action={createEducation} />
    </div>
  );
}