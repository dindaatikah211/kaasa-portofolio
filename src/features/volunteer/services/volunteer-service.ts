"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { VolunteerFormState } from "../types";

function parseBullets(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function getVolunteers() {
  return prisma.volunteer.findMany({ orderBy: { order: "asc" } });
}

export async function getVolunteer(id: string) {
  return prisma.volunteer.findUnique({ where: { id } });
}

export async function createVolunteer(
  _prevState: VolunteerFormState,
  formData: FormData
): Promise<VolunteerFormState> {
  await prisma.volunteer.create({
    data: {
      title: String(formData.get("title")),
      company: String(formData.get("company")),
      dateLabel: String(formData.get("dateLabel")),
      colorTag: String(formData.get("colorTag") || "green"),
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/volunteer");
  redirect("/dashboard/volunteer");
}

export async function updateVolunteer(
  id: string,
  _prevState: VolunteerFormState,
  formData: FormData
): Promise<VolunteerFormState> {
  await prisma.volunteer.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      company: String(formData.get("company")),
      dateLabel: String(formData.get("dateLabel")),
      colorTag: String(formData.get("colorTag") || "green"),
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/volunteer");
  redirect("/dashboard/volunteer");
}

export async function deleteVolunteer(id: string) {
  await prisma.volunteer.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/volunteer");
}