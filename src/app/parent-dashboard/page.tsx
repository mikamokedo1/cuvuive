import {
  getDashboardStatsAction,
  getCategoryAnalysisAction,
  getLessonSuggestionsAction,
} from "@/libs/actions/dashboard";
import { ParentDashboardView } from "@/features/parent-dashboard/ParentDashboardView";

export default async function ParentDashboardPage() {
  const [todayStats, yesterdayStats, weekStats, monthStats, categoryAnalysis, suggestions] = await Promise.all([
    getDashboardStatsAction("today"),
    getDashboardStatsAction("yesterday"),
    getDashboardStatsAction("week"),
    getDashboardStatsAction("month"),
    getCategoryAnalysisAction(),
    getLessonSuggestionsAction(),
  ]);

  return (
    <ParentDashboardView
      todayStats={todayStats}
      yesterdayStats={yesterdayStats}
      weekStats={weekStats}
      monthStats={monthStats}
      categoryAnalysis={categoryAnalysis}
      suggestions={suggestions}
    />
  );
}
