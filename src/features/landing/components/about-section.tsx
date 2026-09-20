export function AboutSection({ aboutText, cvUrl }: { aboutText: string; cvUrl?: string | null }) {
  return (
    <section id="about" className="px-6 py-24 sm:px-16" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sage-dark)" }}>
          Get to know me
        </p>
        <h2 className="font-display text-4xl">About</h2>
        <p className="mt-6 leading-relaxed text-[var(--ink)]/70">{aboutText}</p>
        {cvUrl && (
          <a
            href={cvUrl}
            target="_blank"
            className="mt-6 inline-block rounded-full px-6 py-2.5 text-sm font-medium text-white"
            style={{ background: "var(--pink)" }}
          >
            Download CV
          </a>
        )}
      </div>
    </section>
  );
}