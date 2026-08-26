import { getProfile } from "@/features/profile/services/profile-service";
import { ProfileForm } from "@/features/profile/components/profile-form";

export default async function ProfileDashboardPage() {
  const profile = await getProfile();
  return <ProfileForm profile={profile} />;
}