import { getCourses } from "@/libs/actions/courses";
import { ProfileView } from "@/features/profile/ProfileView";

export default async function ProfilePage() {
  const courses = await getCourses();

  return <ProfileView courses={courses} />;
}
