import Link from "next/link";
import { getCertifications } from "@/features/certification/services/certification-service";
import { CertificationList } from "@/features/certification/components/certification-list";

export default async function CertificationsPage() {
  const items = await getCertifications();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Certifications</h1>
        <Link href="/dashboard/certifications/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Add
        </Link>
      </div>
      <CertificationList items={items} />
    </div>
  );
}