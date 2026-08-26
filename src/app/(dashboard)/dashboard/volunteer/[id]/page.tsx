import { notFound } from "next/navigation";
import { VolunteerForm } from "@/features/volunteer/components/volunteer-form";
import { getVolunteer, updateVolunteer } from "@/features/volunteer/services/volunteer-service";

export default async function EditVolunteerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getVolunteer(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit volunteer</h1>
      <VolunteerForm initial={item} action={updateVolunteer.bind(null, id)} />
    </div>
  );
}