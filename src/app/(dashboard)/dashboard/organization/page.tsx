import Link from "next/link";
import { getOrganizations } from "@/features/organization/services/organization-service";
import { OrganizationList } from "@/features/organization/components/organization-list";

export default async function OrganizationPage() {
  const items = await getOrganizations();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Organization</h1>
        <Link href="/dashboard/organization/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Add
        </Link>
      </div>
      <OrganizationList items={items} />
    </div>
  );
}