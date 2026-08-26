import { VolunteerForm } from "@/features/volunteer/components/volunteer-form";
import { createVolunteer } from "@/features/volunteer/services/volunteer-service";

export default function NewVolunteerPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add volunteer</h1>
      <VolunteerForm action={createVolunteer} />
    </div>
  );
}