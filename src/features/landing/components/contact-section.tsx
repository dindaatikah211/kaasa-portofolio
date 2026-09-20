import { Section } from "./section";
import { SocialLinks } from "./social-links";
import type { SocialLink } from "../types";

export function ContactSection({ socials }: { socials: SocialLink[] }) {
  return (
    <Section id="contact" tone="cream" eyebrow="Say hello" title="Contact">
      <SocialLinks socials={socials} className="reveal justify-center" />
    </Section>
  );
}