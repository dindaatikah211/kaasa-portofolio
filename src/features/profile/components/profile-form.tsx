"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  saveProfile,
  deleteGalleryImage,
  deletePhoto,
} from "../services/profile-service";
import { ImageCropper } from "./image-cropper";
import type { Profile } from "@prisma/client";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const NON_CROPPABLE = ["image/gif", "image/svg+xml"];

type CropField = "photo" | "gallery";

type CropJob = {
  field: CropField;
  queue: File[];
  done: File[];
  aspect: number;
  allowAspectChange: boolean;
};

function checkSizes(files: File[]): string | null {
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      return `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB. "${file.name}" adalah ${(file.size / 1024 / 1024).toFixed(1)}MB.`;
    }
  }
  return null;
}

function setInputFiles(input: HTMLInputElement, files: File[]) {
  const dt = new DataTransfer();
  files.forEach((f) => dt.items.add(f));
  input.files = dt.files;
}

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction, pending] = useActionState(saveProfile, {});
  const [cvError, setCvError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, startDelete] = useTransition();
  const [job, setJob] = useState<CropJob | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  function inputFor(field: CropField) {
    return field === "photo" ? photoInputRef.current : galleryInputRef.current;
  }

  function setErrorFor(field: CropField, message: string | null) {
    if (field === "photo") setPhotoError(message);
    else setGalleryError(message);
  }

  // Untuk file yang tidak di-crop (CV)
  function validateFile(
    e: React.ChangeEvent<HTMLInputElement>,
    setError: (msg: string | null) => void
  ) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) {
      setError(null);
      return;
    }
    const message = checkSizes(files);
    if (message) {
      setError(message);
      e.target.value = "";
      return;
    }
    setError(null);
  }

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: CropField,
    aspect: number,
    allowAspectChange: boolean
  ) {
    const input = e.target;
    const files = Array.from(input.files ?? []);
    if (files.length === 0) {
      setErrorFor(field, null);
      return;
    }

    const message = checkSizes(files);
    if (message) {
      setErrorFor(field, message);
      input.value = "";
      return;
    }
    setErrorFor(field, null);

    if (files.every((f) => NON_CROPPABLE.includes(f.type))) return;

    setJob({ field, queue: files, done: [], aspect, allowAspectChange });
  }

  function finishJob(field: CropField, result: File[]) {
    const input = inputFor(field);
    const message = checkSizes(result);
    if (message) {
      setErrorFor(field, `${message} (setelah crop)`);
      if (input) input.value = "";
    } else if (input) {
      setInputFiles(input, result);
    }
    setJob(null);
  }

  function advance(file: File) {
    if (!job) return;
    const done = [...job.done, file];

    // Lewati otomatis file yang tidak bisa di-crop
    let next = done.length;
    while (next < job.queue.length && NON_CROPPABLE.includes(job.queue[next].type)) {
      done.push(job.queue[next]);
      next++;
    }

    if (done.length >= job.queue.length) {
      finishJob(job.field, done);
    } else {
      setJob({ ...job, done });
    }
  }

  function cancelJob() {
    if (!job) return;
    const input = inputFor(job.field);
    if (input) input.value = "";
    setJob(null);
  }

  function handleDeleteGallery(url: string) {
    if (!confirm("Hapus gambar ini?")) return;
    setDeleteError(null);
    startDelete(async () => {
      const result = await deleteGalleryImage(url);
      if (result.error) setDeleteError(result.error);
    });
  }

  function handleDeletePhoto() {
    if (!confirm("Hapus foto profil?")) return;
    setDeleteError(null);
    startDelete(async () => {
      const result = await deletePhoto();
      if (result.error) setDeleteError(result.error);
    });
  }

  const hasError = !!cvError || !!photoError || !!galleryError;
  const currentFile = job ? job.queue[job.done.length] : null;

  return (
    <>
      <form action={formAction} className="flex max-w-xl flex-col gap-4">
        <Field label="Name" name="name" defaultValue={profile?.name} required />
        <Field label="Greeting" name="greeting" defaultValue={profile?.greeting} required />
        <Field label="Tagline" name="tagline" defaultValue={profile?.tagline} required />
        <TextArea label="About" name="aboutText" defaultValue={profile?.aboutText} required />

        <label className="flex flex-col gap-1 text-sm">
          CV (PDF, maks {MAX_FILE_SIZE_MB}MB)
          <input
            type="file"
            name="cvFile"
            accept="application/pdf"
            onChange={(e) => validateFile(e, setCvError)}
          />
          {cvError && <p className="text-sm text-red-500">{cvError}</p>}
          {profile?.cvUrl && (
            <a href={profile.cvUrl} target="_blank" className="text-xs underline">
              Lihat CV saat ini
            </a>
          )}
        </label>

        <div className="flex flex-col gap-1 text-sm">
          <label className="flex flex-col gap-1">
            Foto profil (maks {MAX_FILE_SIZE_MB}MB, akan di-crop 1:1)
            <input
              ref={photoInputRef}
              type="file"
              name="photoFile"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "photo", 1, false)}
            />
          </label>
          {photoError && <p className="text-sm text-red-500">{photoError}</p>}
          {profile?.photoUrl && (
            <div className="mt-2 flex items-end gap-2">
              <Image
                src={profile.photoUrl}
                alt="Current"
                width={128}
                height={128}
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleDeletePhoto}
                disabled={isDeleting}
                className="text-xs text-red-500 underline disabled:opacity-50"
              >
                Hapus foto
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <label className="flex flex-col gap-1">
            Galeri foto (bisa pilih beberapa sekaligus, maks {MAX_FILE_SIZE_MB}MB per file, ditambahkan ke galeri yang sudah ada)
            <input
              ref={galleryInputRef}
              type="file"
              name="galleryFiles"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e, "gallery", 1, true)}
            />
          </label>
          {galleryError && <p className="text-sm text-red-500">{galleryError}</p>}
          {profile?.galleryUrls && profile.galleryUrls.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.galleryUrls.map((url) => (
                <div key={url} className="relative">
                  <Image
                    src={url}
                    alt="Gallery"
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteGallery(url)}
                    disabled={isDeleting}
                    aria-label="Hapus gambar"
                    className="absolute right-1 top-1 rounded bg-red-600 px-1.5 text-xs text-white disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}

        <Field label="Instagram" name="instagram" defaultValue={profile?.instagram ?? ""} />
        <Field label="GitHub" name="github" defaultValue={profile?.github ?? ""} />
        <Field label="LinkedIn" name="linkedin" defaultValue={profile?.linkedin ?? ""} />
        <Field label="WhatsApp" name="whatsapp" defaultValue={profile?.whatsapp ?? ""} />

        {state.success && <p className="text-sm text-green-600">Tersimpan</p>}
        <button type="submit" disabled={pending || hasError || !!job}>
          {pending ? "Saving..." : "Save"}
        </button>
      </form>

      {job && currentFile && (
        <ImageCropper
          key={`${currentFile.name}-${job.done.length}`}
          file={currentFile}
          aspect={job.aspect}
          allowAspectChange={job.allowAspectChange}
          progress={job.queue.length > 1 ? `${job.done.length + 1} / ${job.queue.length}` : undefined}
          onCancel={cancelJob}
          onSkip={() => advance(currentFile)}
          onDone={advance}
        />
      )}
    </>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <input name={name} defaultValue={defaultValue ?? ""} required={required} className="border p-2" />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <textarea name={name} defaultValue={defaultValue ?? ""} required={required} rows={5} className="border p-2" />
    </label>
  );
}