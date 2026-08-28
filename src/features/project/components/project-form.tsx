"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { PROJECT_CATEGORIES } from "../constants";
import type { Project, ProjectFormState } from "../types";

const MAX_FILE_SIZE_MB = 5;

export function ProjectForm({
  initial,
  action,
}: {
  initial?: Project;
  action: (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
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
      setFileError(`Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB.`);
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
        Description
        <textarea name="description" defaultValue={initial?.description ?? ""} rows={4} className="border p-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Category
        <select name="category" defaultValue={initial?.category ?? "DEVELOPMENT"} className="border p-2">
          {PROJECT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Subcategory (khusus Design Graphic, opsional)
        <input
          name="subcategory"
          defaultValue={initial?.subcategory ?? ""}
          className="border p-2"
          placeholder="Product Design / Event Design / Social Media Design / Others Design"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Image (maks {MAX_FILE_SIZE_MB}MB)
        <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} />
        {fileError && <p className="text-sm text-red-500">{fileError}</p>}
        {initial?.imageUrl && (
          <Image src={initial.imageUrl} alt={initial.title} width={160} height={120} className="mt-2 object-cover" />
        )}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Link
          <input name="link" defaultValue={initial?.link ?? ""} className="border p-2" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Link label
          <input name="linkLabel" defaultValue={initial?.linkLabel ?? "See"} className="border p-2" />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Secondary link (opsional)
          <input name="secondaryLink" defaultValue={initial?.secondaryLink ?? ""} className="border p-2" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Secondary label
          <input name="secondaryLabel" defaultValue={initial?.secondaryLabel ?? ""} className="border p-2" />
        </label>
      </div>
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