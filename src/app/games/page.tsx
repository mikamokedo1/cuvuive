import { getCourses } from "@/libs/actions/courses";
import { GamesMap } from "./GamesMap";

export default async function GamesPage() {
  const courses = await getCourses();
  return <GamesMap courses={courses} />;
}
