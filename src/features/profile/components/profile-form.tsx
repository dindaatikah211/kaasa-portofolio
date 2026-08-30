"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { saveProfile } from "../services/profile-service";
import type { Profile } from "@prisma/client";

const MAX_FILE_SIZE_MB = 5;

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction, pending] = useActionState(saveProfile, {});
  const [cvError, setCvError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  function validateFile(
    e: React.ChangeEvent<HTMLInputElement>,
    setError: (msg: string | null) => void
  ) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setError(null);
      return;
    }
    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB. "${file.name}" adalah ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
        e.target.value = "";
        return;
      }
    }
    setError(null);
  }

  const hasError = !!cvError || !!photoError || !!galleryError;

  return (
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

      <label className="flex flex-col gap-1 text-sm">
        Foto profil (maks {MAX_FILE_SIZE_MB}MB)
        <input
          type="file"
          name="photoFile"
          accept="image/*"
          onChange={(e) => validateFile(e, setPhotoError)}
        />
        {photoError && <p className="text-sm text-red-500">{photoError}</p>}
        {profile?.photoUrl && (
          <Image src={profile.photoUrl} alt="Current" width={128} height={128} className="mt-2 object-cover" />
        )}
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Galeri foto (bisa pilih beberapa sekaligus, maks {MAX_FILE_SIZE_MB}MB per file, ditambahkan ke galeri yang sudah ada)
        <input
          type="file"
          name="galleryFiles"
          accept="image/*"
          multiple
          onChange={(e) => validateFile(e, setGalleryError)}
        />
        {galleryError && <p className="text-sm text-red-500">{galleryError}</p>}
        {profile?.galleryUrls && profile.galleryUrls.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.galleryUrls.map((url) => (
              <Image key={url} src={url} alt="Gallery" width={80} height={80} className="rounded object-cover" />
            ))}
          </div>
        )}
        
      </label>

      <Field label="Instagram" name="instagram" defaultValue={profile?.instagram ?? ""} />
      <Field label="GitHub" name="github" defaultValue={profile?.github ?? ""} />
      <Field label="LinkedIn" name="linkedin" defaultValue={profile?.linkedin ?? ""} />
      <Field label="WhatsApp" name="whatsapp" defaultValue={profile?.whatsapp ?? ""} />

      {state.success && <p className="text-sm text-green-600">Tersimpan</p>}
      <button type="submit" disabled={pending || hasError}>
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
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