import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function SettingsPage() {
  return <div className="space-y-6"><h1 className="section-title">Cài đặt</h1><div className="grid gap-6 md:grid-cols-2"><ProfileForm /><AvatarUpload /></div></div>;
}
