"use server";

import { prisma } from "@/shared/lib/prisma";
import { uploadFile } from "@/shared/services/blob-service";
import { revalidatePath } from "next/cache";
import type { ProfileFormState } from "../types";

export async function getProfile() {
  return prisma.profile.findFirst();
}

export async function saveProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const existing = await prisma.profile.findFirst();

  const cvFile = formData.get("cvFile") as File | null;
  const photoFile = formData.get("photoFile") as File | null;
  const galleryFiles = formData.getAll("galleryFiles") as File[];

  const cvUrl = cvFile && cvFile.size > 0 ? await uploadFile(cvFile, "cv") : existing?.cvUrl ?? null;
  const photoUrl = photoFile && photoFile.size > 0 ? await uploadFile(photoFile, "photo") : existing?.photoUrl ?? null;

  const newGalleryUrls: string[] = [];
  for (const file of galleryFiles) {
    if (file && file.size > 0) {
      const url = await uploadFile(file, "gallery");
      if (url) newGalleryUrls.push(url);
    }
  }
  const galleryUrls = [...(existing?.galleryUrls ?? []), ...newGalleryUrls];

  const data = {
    name: String(formData.get("name")),
    greeting: String(formData.get("greeting")),
    tagline: String(formData.get("tagline")),
    aboutText: String(formData.get("aboutText")),
    instagram: String(formData.get("instagram") || "") || null,
    github: String(formData.get("github") || "") || null,
    linkedin: String(formData.get("linkedin") || "") || null,
    whatsapp: String(formData.get("whatsapp") || "") || null,
    cvUrl,
    photoUrl,
    galleryUrls,
  };

  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/dashboard/profile");

  return { success: true };
}