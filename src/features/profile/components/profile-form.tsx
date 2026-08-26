"use client";

import Image from "next/image";
import { useActionState } from "react";
import { saveProfile } from "../services/profile-service";
import type { Profile } from "@prisma/client";

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction, pending] = useActionState(saveProfile, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <Field label="Name" name="name" defaultValue={profile?.name} required />
      <Field label="Greeting" name="greeting" defaultValue={profile?.greeting} required />
      <Field label="Tagline" name="tagline" defaultValue={profile?.tagline} required />
      <TextArea label="About" name="aboutText" defaultValue={profile?.aboutText} required />

      <label className="flex flex-col gap-1 text-sm">
        CV (PDF)
        <input type="file" name="cvFile" accept="application/pdf" />
        {profile?.cvUrl && (
          <a href={profile.cvUrl} target="_blank" className="text-xs underline">
            Lihat CV saat ini
          </a>
        )}
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Foto profil
        <input type="file" name="photoFile" accept="image/*" />
        {profile?.photoUrl && (
          <Image src={profile.photoUrl} alt="Current" width={128} height={128} className="mt-2 object-cover" />
        )}
      </label>

      <Field label="Instagram" name="instagram" defaultValue={profile?.instagram ?? ""} />
      <Field label="GitHub" name="github" defaultValue={profile?.github ?? ""} />
      <Field label="LinkedIn" name="linkedin" defaultValue={profile?.linkedin ?? ""} />
      <Field label="WhatsApp" name="whatsapp" defaultValue={profile?.whatsapp ?? ""} />

      {state.success && <p className="text-sm text-green-600">Tersimpan</p>}
      <button type="submit" disabled={pending}>
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