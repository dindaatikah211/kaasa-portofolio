"use client";

import { useActionState } from "react";
import type { Skill, SkillFormState } from "../types";

export function SkillForm({
  initial,
  action,
}: {
  initial?: Skill;
  action: (state: SkillFormState, formData: FormData) => Promise<SkillFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input name="name" defaultValue={initial?.name} required className="border p-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Category
        <select name="category" defaultValue={initial?.category ?? "FRONTEND"} className="border p-2">
          <option value="FRONTEND">Frontend</option>
          <option value="BACKEND">Backend</option>
          <option value="DESIGN">Design</option>
          <option value="TOOLS">Tools</option>
          <option value="SOFT_SKILLS">Soft Skills</option>
          <option value="LANGUAGES">Languages</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Order
        <input name="order" type="number" defaultValue={String(initial?.order ?? 0)} className="border p-2" />
      </label>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}