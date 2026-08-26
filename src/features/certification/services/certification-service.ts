"use server";

import { prisma } from "@/shared/lib/prisma";
import { uploadFile } from "@/shared/services/blob-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CertificationFormState } from "../types";

export async function getCertifications() {
  return prisma.certification.findMany({ orderBy: { order: "asc" } });
}

export async function getCertification(id: string) {
  return prisma.certification.findUnique({ where: { id } });
}

export async function createCertification(
  _prevState: CertificationFormState,
  formData: FormData
): Promise<CertificationFormState> {
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrl = imageFile && imageFile.size > 0 ? await uploadFile(imageFile, "certification") : null;

  await prisma.certification.create({
    data: {
      title: String(formData.get("title")),
      colorTag: String(formData.get("colorTag") || "pink"),
      order: Number(formData.get("order") || 0),
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/certifications");
  redirect("/dashboard/certifications");
}

export async function updateCertification(
  id: string,
  _prevState: CertificationFormState,
  formData: FormData
): Promise<CertificationFormState> {
  const existing = await prisma.certification.findUnique({ where: { id } });
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0 ? await uploadFile(imageFile, "certification") : existing?.imageUrl ?? null;

  await prisma.certification.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      colorTag: String(formData.get("colorTag") || "pink"),
      order: Number(formData.get("order") || 0),
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/certifications");
  redirect("/dashboard/certifications");
}

export async function deleteCertification(id: string) {
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/certifications");
}