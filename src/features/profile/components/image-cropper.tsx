"use client";

import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

const ASPECT_OPTIONS = [
  { label: "1:1", value: 1 },
  { label: "3:4", value: 3 / 4 },
  { label: "4:3", value: 4 / 3 },
  { label: "9:16", value: 9 / 16 },
  { label: "16:9", value: 16 / 9 },
];

type Props = {
  file: File;
  aspect: number;
  allowAspectChange?: boolean;
  progress?: string;
  onCancel: () => void;
  onSkip: () => void;
  onDone: (file: File) => void;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Gagal memuat gambar"));
    img.src = src;
  });
}

async function getCroppedFile(src: string, area: Area, original: File): Promise<File> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(area.width);
  canvas.height = Math.round(area.height);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia");

  ctx.drawImage(
    img,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const mime = ["image/png", "image/webp"].includes(original.type) ? original.type : "image/jpeg";
  const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, 0.92));
  if (!blob) throw new Error("Gagal membuat hasil crop");

  const baseName = original.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}.${ext}`, { type: mime });
}

export function ImageCropper({
  file,
  aspect: initialAspect,
  allowAspectChange = false,
  progress,
  onCancel,
  onSkip,
  onDone,
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(initialAspect);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // setSrc dipanggil di dalam callback FileReader, bukan langsung di badan effect
  useEffect(() => {
    let cancelled = false;
    const reader = new FileReader();
    reader.onload = () => {
      if (!cancelled) setSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    return () => {
      cancelled = true;
      reader.abort();
    };
  }, [file]);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setArea(areaPixels);
  }, []);

  async function handleSave() {
    if (!src || !area) return;
    setBusy(true);
    setError(null);
    try {
      onDone(await getCroppedFile(src, area, file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal crop gambar");
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="flex w-full max-w-lg flex-col gap-3 rounded bg-white p-4 text-sm text-black">
        <div className="flex items-center justify-between">
          <p className="font-medium">Crop gambar {progress && `(${progress})`}</p>
          <p className="max-w-[50%] truncate text-xs text-gray-500">{file.name}</p>
        </div>

        <div className="relative h-80 w-full overflow-hidden rounded bg-gray-900">
          {src && (
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <label className="flex items-center gap-2 text-xs">
          Zoom
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1"
          />
        </label>

        {allowAspectChange && (
          <div className="flex items-center gap-2 text-xs">
            Rasio
            {ASPECT_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setAspect(opt.value)}
                className={`rounded border px-2 py-1 ${
                  aspect === opt.value ? "bg-black text-white" : ""
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} disabled={busy} className="rounded border px-3 py-1.5">
            Batal
          </button>
          <button type="button" onClick={onSkip} disabled={busy} className="rounded border px-3 py-1.5">
            Pakai asli
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={busy || !area}
            className="rounded bg-black px-3 py-1.5 text-white disabled:opacity-50"
          >
            {busy ? "Memproses..." : "Crop"}
          </button>
        </div>
      </div>
    </div>
  );
}