import { notFound } from "next/navigation";
import { EducationForm } from "@/features/education/components/education-form";
import { getEducation, updateEducation } from "@/features/education/services/education-service";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getEducation(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit education</h1>
      <EducationForm initial={item} action={updateEducation.bind(null, id)} />
    </div>
  );
}