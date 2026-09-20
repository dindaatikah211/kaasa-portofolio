import { Sparkle } from "./sparkle";

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal mb-10 text-center">
      <p className="mb-2 flex items-center justify-center gap-1.5 text-sm font-medium text-ink/60">
        <Sparkle className="h-3 w-3 text-red" />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl text-red sm:text-5xl">{title}</h2>
    </div>
  );
}