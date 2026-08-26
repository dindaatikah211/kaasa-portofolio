"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { OrganizationFormState } from "../types";

function parseBullets(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function getOrganizations() {
  return prisma.organization.findMany({ orderBy: { order: "asc" } });
}

export async function getOrganization(id: string) {
  return prisma.organization.findUnique({ where: { id } });
}

export async function createOrganization(
  _prevState: OrganizationFormState,
  formData: FormData
): Promise<OrganizationFormState> {
  await prisma.organization.create({
    data: {
      title: String(formData.get("title")),
      role: String(formData.get("role")),
      dateLabel: String(formData.get("dateLabel")),
      colorTag: String(formData.get("colorTag") || "pink"),
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/organization");
  redirect("/dashboard/organization");
}

export async function updateOrganization(
  id: string,
  _prevState: OrganizationFormState,
  formData: FormData
): Promise<OrganizationFormState> {
  await prisma.organization.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      role: String(formData.get("role")),
      dateLabel: String(formData.get("dateLabel")),
      colorTag: String(formData.get("colorTag") || "pink"),
      order: Number(formData.get("order") || 0),
      bullets: parseBullets(String(formData.get("bullets") || "")),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/organization");
  redirect("/dashboard/organization");
}

export async function deleteOrganization(id: string) {
  await prisma.organization.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/organization");
}