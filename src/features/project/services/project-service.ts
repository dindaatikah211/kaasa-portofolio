"use server";

import { prisma } from "@/shared/lib/prisma";
import { uploadFile } from "@/shared/services/blob-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProjectFormState, ProjectCategory } from "../types";

export async function getProjects() {
  return prisma.project.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
}

export async function getProject(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrl = imageFile && imageFile.size > 0 ? await uploadFile(imageFile, "project") : null;

  await prisma.project.create({
    data: {
      title: String(formData.get("title")),
      description: String(formData.get("description") || "") || null,
      category: String(formData.get("category")) as ProjectCategory,
      subcategory: String(formData.get("subcategory") || "") || null,
      link: String(formData.get("link") || "") || null,
      linkLabel: String(formData.get("linkLabel") || "") || null,
      secondaryLink: String(formData.get("secondaryLink") || "") || null,
      secondaryLabel: String(formData.get("secondaryLabel") || "") || null,
      order: Number(formData.get("order") || 0),
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const existing = await prisma.project.findUnique({ where: { id } });
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0 ? await uploadFile(imageFile, "project") : existing?.imageUrl ?? null;

  await prisma.project.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      description: String(formData.get("description") || "") || null,
      category: String(formData.get("category")) as ProjectCategory,
      subcategory: String(formData.get("subcategory") || "") || null,
      link: String(formData.get("link") || "") || null,
      linkLabel: String(formData.get("linkLabel") || "") || null,
      secondaryLink: String(formData.get("secondaryLink") || "") || null,
      secondaryLabel: String(formData.get("secondaryLabel") || "") || null,
      order: Number(formData.get("order") || 0),
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
}