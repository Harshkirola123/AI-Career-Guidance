import { industries } from "@/data/industries";
import EditProfileForm from "./_components/profile";

export default async function ProfilePage() {
  return (
    <main>
      <EditProfileForm industries={industries} />
    </main>
  );
}
