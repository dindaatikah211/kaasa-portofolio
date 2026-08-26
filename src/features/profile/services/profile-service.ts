"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ProfileFormState } from "../types";

export async function getProfile() {
  return prisma.profile.findFirst();
}

export async function saveProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const data = {
    name: String(formData.get("name")),
    greeting: String(formData.get("greeting")),
    tagline: String(formData.get("tagline")),
    aboutText: String(formData.get("aboutText")),
    cvUrl: String(formData.get("cvUrl") || "") || null,
    instagram: String(formData.get("instagram") || "") || null,
    github: String(formData.get("github") || "") || null,
    linkedin: String(formData.get("linkedin") || "") || null,
    whatsapp: String(formData.get("whatsapp") || "") || null,
    photoUrl: String(formData.get("photoUrl") || "") || null,
  };

  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/dashboard/profile");

  return { success: true };
}