"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import type { Certification, CertificationFormState } from "../types";

const MAX_FILE_SIZE_MB = 5;

export function CertificationForm({
  initial,
  action,
}: {
  initial?: Certification;
  action: (state: CertificationFormState, formData: FormData) => Promise<CertificationFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setFileError(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB. File kamu ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
      e.target.value = "";
    } else {
      setFileError(null);
    }
  }

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Title
        <input name="title" defaultValue={initial?.title} required className="border p-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Image (maks {MAX_FILE_SIZE_MB}MB)
        <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} />
        {fileError && <p className="text-sm text-red-500">{fileError}</p>}
        {initial?.imageUrl && (
          <Image src={initial.imageUrl} alt={initial.title} width={160} height={120} className="mt-2 object-cover" />
        )}
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Color tag
        <select name="colorTag" defaultValue={initial?.colorTag ?? "pink"} className="border p-2">
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Order
        <input name="order" type="number" defaultValue={String(initial?.order ?? 0)} className="border p-2" />
      </label>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending || !!fileError}>
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}