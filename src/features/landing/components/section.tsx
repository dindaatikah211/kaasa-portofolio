import type { ReactNode } from "react";
import { SectionHeading } from "./section-heading";

const TONES = {
  cream: "bg-cream",
  blush: "bg-blush",
};

export function Section({
  id,
  tone,
  eyebrow,
  title,
  children,
}: {
  id: string;
  tone: keyof typeof TONES;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${TONES[tone]} scroll-mt-16 px-6 py-24 sm:px-16`}>
      <SectionHeading eyebrow={eyebrow} title={title} />
      {children}
    </section>
  );
}