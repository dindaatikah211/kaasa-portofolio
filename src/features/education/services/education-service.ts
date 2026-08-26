"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { EducationFormState } from "../types";

function parseBullets(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function getEducations() {
  return prisma.education.findMany({ orderBy: { order: "asc" } });
}

export async function getEducation(id: string) {
  return prisma.education.findUnique({ where: { id } });
}

export async function createEducation(
  _prevState: EducationFormState,
  formData: FormData
): Promise<EducationFormState> {
  await prisma.education.create({
    data: {
      title: String(formData.get("title")),
      institution: String(formData.get("institution")),
      dateLabel: String(formData.get("dateLabel")),
      summary: String(formData.get("summary") || "") || null,
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/education");
  redirect("/dashboard/education");
}

export async function updateEducation(
  id: string,
  _prevState: EducationFormState,
  formData: FormData
): Promise<EducationFormState> {
  await prisma.education.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      institution: String(formData.get("institution")),
      dateLabel: String(formData.get("dateLabel")),
      summary: String(formData.get("summary") || "") || null,
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/education");
  redirect("/dashboard/education");
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/education");
}