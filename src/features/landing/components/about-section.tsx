import { Section } from "./section";

export function AboutSection({ aboutText, cvUrl }: { aboutText: string; cvUrl?: string | null }) {
  return (
    <Section id="about" tone="cream" eyebrow="Get to know me" title="About">
      <div className="reveal mx-auto max-w-2xl text-center">
        <p className="leading-relaxed text-ink/70">{aboutText}</p>
        {cvUrl && (
          <a
            href={cvUrl}
            target="_blank"
            className="mt-6 inline-block rounded-full bg-red px-6 py-2.5 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5"
          >
            Download CV
          </a>
        )}
      </div>
    </Section>
  );
}