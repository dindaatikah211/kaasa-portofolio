import { OrganizationForm } from "@/features/organization/components/organization-form";
import { createOrganization } from "@/features/organization/services/organization-service";

export default function NewOrganizationPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add organization</h1>
      <OrganizationForm action={createOrganization} />
    </div>
  );
}