import { prisma } from "@/shared/lib/prisma";
import { Hero } from "@/features/landing/components/hero";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await prisma.profile.findFirst();

  const socials = [
    profile?.instagram && { label: "Instagram", href: profile.instagram },
    profile?.github && { label: "GitHub", href: profile.github },
    profile?.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile?.whatsapp && { label: "WhatsApp", href: profile.whatsapp },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <main>
      <Hero
        greeting={profile?.greeting ?? "Hello, I'm"}
        name={profile?.name ?? "Dinda Atikah Ghaisani"}
        tagline={profile?.tagline ?? "A creative designer & developer."}
        photoUrl={profile?.photoUrl}
        socials={socials}
      />
    </main>
  );
}