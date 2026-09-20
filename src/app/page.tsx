import { prisma } from "@/shared/lib/prisma";
import { Hero } from "@/features/landing/components/hero";
import { AboutSection } from "@/features/landing/components/about-section";
import { TimelineList } from "@/features/landing/components/timeline-list";
import { SectionHeading } from "@/features/landing/components/section-heading";
import { SkillsSection } from "@/features/landing/components/skills-section";
import { ProjectsSection } from "@/features/landing/components/projects-section";
import { CertificationsSection } from "@/features/landing/components/certifications-section";
import { ContactSection } from "@/features/landing/components/contact-section";
import type { SocialLink } from "@/features/landing/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, experience, education, organization, volunteer, skills, projects, certifications] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.organization.findMany({ orderBy: { order: "asc" } }),
      prisma.volunteer.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.certification.findMany({ orderBy: { order: "asc" } }),
    ]);

  const socials = [
    profile?.instagram && { label: "Instagram", href: profile.instagram },
    profile?.github && { label: "GitHub", href: profile.github },
    profile?.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile?.whatsapp && { label: "WhatsApp", href: profile.whatsapp },
  ].filter(Boolean) as SocialLink[];

  return (
    <main>
      <Hero
        greeting={profile?.greeting ?? "Hello, I'm"}
        name={profile?.name ?? "Dinda Atikah Ghaisani"}
        tagline={profile?.tagline ?? "A creative designer & developer."}
        photoUrl={profile?.photoUrl}
        galleryUrls={profile?.galleryUrls ?? []}
        socials={socials}
      />

      <AboutSection aboutText={profile?.aboutText ?? ""} cvUrl={profile?.cvUrl} />

      <section id="experience" className="px-6 py-24 sm:px-16" style={{ background: "var(--blush)" }}>
        <SectionHeading eyebrow="Track record" title="Experience" />
        <TimelineList
          items={experience.map((e) => ({
            id: e.id,
            title: e.title,
            subtitle: e.company,
            dateLabel: e.dateLabel,
            bullets: e.bullets,
          }))}
        />
      </section>

      <section id="education" className="px-6 py-24 sm:px-16" style={{ background: "var(--cream)" }}>
        <SectionHeading eyebrow="Background" title="Education" />
        <TimelineList
          items={education.map((e) => ({
            id: e.id,
            title: e.title,
            subtitle: e.institution,
            dateLabel: e.dateLabel,
            bullets: e.bullets,
          }))}
        />
      </section>

      <section id="organization" className="px-6 py-24 sm:px-16" style={{ background: "var(--blush)" }}>
        <SectionHeading eyebrow="Beyond class" title="Organization" />
        <TimelineList
          items={organization.map((o) => ({
            id: o.id,
            title: o.title,
            subtitle: o.role,
            dateLabel: o.dateLabel,
            bullets: o.bullets,
          }))}
        />
      </section>

      <section id="volunteer" className="px-6 py-24 sm:px-16" style={{ background: "var(--cream)" }}>
        <SectionHeading eyebrow="Giving back" title="Volunteer" />
        <TimelineList
          items={volunteer.map((v) => ({
            id: v.id,
            title: v.title,
            subtitle: v.company,
            dateLabel: v.dateLabel,
            bullets: v.bullets,
          }))}
        />
      </section>

      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <CertificationsSection items={certifications} />
      <ContactSection socials={socials} />

      <footer className="px-6 py-8 text-center text-xs text-[var(--ink)]/50">
        © {new Date().getFullYear()} Dinda Atikah Ghaisani. All rights reserved.
      </footer>
    </main>
  );
}