"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ExperienceFormState } from "../types";

function parseBullets(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function getExperiences() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getExperience(id: string) {
  return prisma.experience.findUnique({ where: { id } });
}

export async function createExperience(
  _prevState: ExperienceFormState,
  formData: FormData
): Promise<ExperienceFormState> {
  await prisma.experience.create({
    data: {
      title: String(formData.get("title")),
      company: String(formData.get("company")),
      dateLabel: String(formData.get("dateLabel")),
      colorTag: String(formData.get("colorTag") || "pink"),
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/experience");
  redirect("/dashboard/experience");
}

export async function updateExperience(
  id: string,
  _prevState: ExperienceFormState,
  formData: FormData
): Promise<ExperienceFormState> {
  await prisma.experience.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      company: String(formData.get("company")),
      dateLabel: String(formData.get("dateLabel")),
      colorTag: String(formData.get("colorTag") || "pink"),
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/experience");
  redirect("/dashboard/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/experience");
}