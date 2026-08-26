"use client";

import { useActionState } from "react";
import type { Education, EducationFormState } from "../types";

export function EducationForm({
  initial,
  action,
}: {
  initial?: Education;
  action: (state: EducationFormState, formData: FormData) => Promise<EducationFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <Field label="Title" name="title" defaultValue={initial?.title} required />
      <Field label="Institution" name="institution" defaultValue={initial?.institution} required />
      <Field label="Date label" name="dateLabel" defaultValue={initial?.dateLabel} required />
      <label className="flex flex-col gap-1 text-sm">
        Summary
        <textarea name="summary" defaultValue={initial?.summary ?? ""} rows={3} className="border p-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Bullets (satu poin per baris)
        <textarea
          name="bullets"
          defaultValue={initial?.bullets?.join("\n")}
          rows={7}
          className="border p-2"
        />
      </label>
      <Field label="Order" name="order" type="number" defaultValue={String(initial?.order ?? 0)} />
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <input name={name} type={type} defaultValue={defaultValue} required={required} className="border p-2" />
    </label>
  );
}