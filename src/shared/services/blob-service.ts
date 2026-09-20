import "server-only";

import { put, del } from "@vercel/blob";

export async function uploadFile(file: File, folder: string) {
  if (!file || file.size === 0) return null;

  const blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return blob.url;
}

export async function deleteFile(url: string) {
  await del(url);
}