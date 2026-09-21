"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { FaSearchPlus, FaTimes } from "react-icons/fa";

export function ImagePreview({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Preview ${alt}`}
        className="group absolute inset-0 cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-red opacity-0 transition-opacity group-hover:opacity-100">
          <FaSearchPlus size={12} />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex animate-preview flex-col items-center justify-center gap-3 bg-ink/85 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close preview"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink transition-transform hover:scale-110"
            >
              <FaTimes size={14} />
            </button>
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1200}
              unoptimized
              onClick={(e) => e.stopPropagation()}
              className="h-auto max-h-[80vh] w-auto max-w-full rounded-2xl object-contain"
            />
            <p className="text-center text-sm text-cream">{alt}</p>
          </div>,
          document.body
        )}
    </>
  );
}