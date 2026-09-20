export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sage-dark)" }}>
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl">{title}</h2>
    </div>
  );
}