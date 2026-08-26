import { notFound } from "next/navigation";
import { OrganizationForm } from "@/features/organization/components/organization-form";
import { getOrganization, updateOrganization } from "@/features/organization/services/organization-service";

export default async function EditOrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getOrganization(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit organization</h1>
      <OrganizationForm initial={item} action={updateOrganization.bind(null, id)} />
    </div>
  );
}