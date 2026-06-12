import {
  getDashboardStatsAction,
  getCategoryAnalysisAction,
  getLessonSuggestionsAction,
} from "@/libs/actions/dashboard";
import { getCourses } from "@/libs/actions/courses";
import { getUserDbAction, getUserWeeklyActivityAction } from "@/libs/actions/user";
import { ParentDashboardView } from "@/features/parent-dashboard/ParentDashboardView";

export default async function ParentDashboardPage() {
  const [todayStats, yesterdayStats, weekStats, monthStats, categoryAnalysis, suggestions, courses, userDb, activeDays] =
    await Promise.all([
      getDashboardStatsAction("today"),
      getDashboardStatsAction("yesterday"),
      getDashboardStatsAction("week"),
      getDashboardStatsAction("month"),
      getCategoryAnalysisAction(),
      getLessonSuggestionsAction(),
      getCourses(),
      getUserDbAction(),
      getUserWeeklyActivityAction(),
    ]);

  const currentStreak = userDb?.currentStreak || 0;

  return (
    <ParentDashboardView
      todayStats={todayStats}
      yesterdayStats={yesterdayStats}
      weekStats={weekStats}
      monthStats={monthStats}
      categoryAnalysis={categoryAnalysis}
      suggestions={suggestions}
      courses={courses}
      currentStreak={currentStreak}
      activeDays={activeDays}
    />
  );
}

