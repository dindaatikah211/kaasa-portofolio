import { notFound } from "next/navigation";
import { CertificationForm } from "@/features/certification/components/certification-form";
import { getCertification, updateCertification } from "@/features/certification/services/certification-service";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getCertification(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit certification</h1>
      <CertificationForm initial={item} action={updateCertification.bind(null, id)} />
    </div>
  );
}