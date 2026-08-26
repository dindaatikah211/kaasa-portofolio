"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SkillFormState } from "../types";
import type { SkillCategory } from "@prisma/client";

export async function getSkills() {
  return prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
}

export async function getSkill(id: string) {
  return prisma.skill.findUnique({ where: { id } });
}

export async function createSkill(
  _prevState: SkillFormState,
  formData: FormData
): Promise<SkillFormState> {
  await prisma.skill.create({
    data: {
      name: String(formData.get("name")),
      category: String(formData.get("category")) as SkillCategory,
      order: Number(formData.get("order") || 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/skills");
  redirect("/dashboard/skills");
}

export async function updateSkill(
  id: string,
  _prevState: SkillFormState,
  formData: FormData
): Promise<SkillFormState> {
  await prisma.skill.update({
    where: { id },
    data: {
      name: String(formData.get("name")),
      category: String(formData.get("category")) as SkillCategory,
      order: Number(formData.get("order") || 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/skills");
  redirect("/dashboard/skills");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/skills");
}