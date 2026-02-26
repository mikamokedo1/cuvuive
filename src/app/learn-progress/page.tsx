import { getCourses } from "@/libs/actions/courses";
import { ProfileView } from "@/features/profile/ProfileView";
import { getUserDbAction, getUserWeeklyActivityAction } from "@/libs/actions/user";

export default async function ProfilePage() {
  const courses = await getCourses();

  const [userDb, activeDays] = await Promise.all([getUserDbAction(), getUserWeeklyActivityAction()]);

  const currentStreak = userDb?.currentStreak || 0;

  return <ProfileView courses={courses} currentStreak={currentStreak} activeDays={activeDays} />;
}
