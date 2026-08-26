import { CertificationForm } from "@/features/certification/components/certification-form";
import { createCertification } from "@/features/certification/services/certification-service";

export default function NewCertificationPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add certification</h1>
      <CertificationForm action={createCertification} />
    </div>
  );
}