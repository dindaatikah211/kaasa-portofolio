import type { ReactNode } from "react";

export function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="col-span-full text-center text-sm italic text-ink/50">{children}</p>;
}