"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "./UserContext";
import { createClient } from "@/libs/supabase/client";
import { generateUUID } from "@/libs/utils/uuid";
import {
  createEmptyProgressState,
  getCourseProgress as readCourseProgress,
  isGroupUnlockedForCourse,
  isLessonUnlockedForCourse,
  type ProgressState,
  withDerivedCompletedGroups,
} from "@/libs/course-catalog";

interface ProgressContextType {
  allProgress: Record<string, ProgressState>;
  lastPlayedCourseId: string | null;
  getCourseProgress: (courseId: string) => ProgressState;
  markLessonComplete: (courseId: string, groupId: string, lessonId: string) => void;
  isGroupUnlocked: (courseId: string, groupId: string) => boolean;
  isLessonUnlocked: (courseId: string, groupId: string, lessonId: string) => boolean;
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  if (!supabaseRef.current) {
    supabaseRef.current = createClient();
  }
  const supabase = supabaseRef.current;
  const latestProgressRef = useRef<Record<string, ProgressState>>({});

  const [allProgress, setAllProgress] = useState<Record<string, ProgressState>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastPlayedCourseId, setLastPlayedCourseId] = useState<string | null>(null);

  const userId = user?.id;

  useEffect(() => {
    latestProgressRef.current = allProgress;
  }, [allProgress]);

  useEffect(() => {
    let cancelled = false;

    const fetchProgress = async () => {
      if (!userId) {
        setAllProgress({});
        setLastPlayedCourseId(null);
        if (!cancelled) setIsLoaded(true);
        return;
      }

      const anonymousProgress = { ...latestProgressRef.current };

      try {
        const [progressResult, lastPlayedResult] = await Promise.all([
          supabase.from("progress").select("course_id, group_id, lesson_id").eq("user_id", userId),
          supabase
            .from("progress")
            .select("course_id")
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);

        if (cancelled) return;

        const { data, error } = progressResult;
        if (error) throw error;

        const freshProgress: Record<string, ProgressState> = {};

        data?.forEach((row) => {
          if (!row.course_id) return;

          if (!freshProgress[row.course_id]) {
            freshProgress[row.course_id] = createEmptyProgressState();
          }

          const courseProgress = freshProgress[row.course_id];
          if (!courseProgress.completedLessons[row.group_id]) {
            courseProgress.completedLessons[row.group_id] = [];
          }
          if (!courseProgress.completedLessons[row.group_id].includes(row.lesson_id)) {
            courseProgress.completedLessons[row.group_id].push(row.lesson_id);
          }
        });

        const recordsToSync: { courseId: string; groupId: string; lessonId: string }[] = [];

        Object.entries(anonymousProgress).forEach(([courseId, anonymousCourseProgress]) => {
          Object.entries(anonymousCourseProgress.completedLessons).forEach(([groupId, lessonIds]) => {
            if (!freshProgress[courseId]) {
              freshProgress[courseId] = createEmptyProgressState();
            }

            if (!freshProgress[courseId].completedLessons[groupId]) {
              freshProgress[courseId].completedLessons[groupId] = [];
            }

            lessonIds.forEach((lessonId) => {
              if (!freshProgress[courseId].completedLessons[groupId].includes(lessonId)) {
                freshProgress[courseId].completedLessons[groupId].push(lessonId);
                recordsToSync.push({ courseId, groupId, lessonId });
              }
            });
          });
        });

        setAllProgress(freshProgress);

        if (recordsToSync.length > 0) {
          const rows = recordsToSync.map((record) => ({
            id: generateUUID(),
            user_id: userId,
            course_id: record.courseId,
            group_id: record.groupId,
            lesson_id: record.lessonId,
            completed_at: new Date().toISOString(),
            score: 100,
          }));

          supabase
            .from("progress")
            .insert(rows)
            .then(({ error: syncError }) => {
              if (syncError) console.error("Error syncing anonymous progress:", syncError);
            });
        }

        setLastPlayedCourseId(lastPlayedResult.data?.course_id ?? null);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    };

    fetchProgress();

    return () => {
      cancelled = true;
    };
  }, [supabase, userId]);

  const allProgressWithGroups = useMemo(() => withDerivedCompletedGroups(allProgress), [allProgress]);

  const getCourseProgress = useCallback(
    (courseId: string) => readCourseProgress(allProgressWithGroups, courseId),
    [allProgressWithGroups],
  );

  const markLessonComplete = useCallback(
    async (courseId: string, groupId: string, lessonId: string) => {
      setLastPlayedCourseId(courseId);

      setAllProgress((previousProgress) => {
        const previousCourse = previousProgress[courseId] ?? createEmptyProgressState();
        const completedLessons = previousCourse.completedLessons[groupId] ?? [];

        if (completedLessons.includes(lessonId)) {
          return previousProgress;
        }

        return {
          ...previousProgress,
          [courseId]: {
            ...previousCourse,
            completedLessons: {
              ...previousCourse.completedLessons,
              [groupId]: [...completedLessons, lessonId],
            },
          },
        };
      });

      if (!user) return;

      try {
        const { data: existing, error: selectError } = await supabase
          .from("progress")
          .select("id")
          .eq("user_id", user.id)
          .eq("course_id", courseId)
          .eq("group_id", groupId)
          .eq("lesson_id", lessonId)
          .maybeSingle();

        if (selectError && selectError.code !== "PGRST116") {
          console.error("Error checking progress:", selectError);
          return;
        }

        if (!existing) {
          const { error: insertError } = await supabase.from("progress").insert({
            id: generateUUID(),
            user_id: user.id,
            course_id: courseId,
            group_id: groupId,
            lesson_id: lessonId,
            completed_at: new Date().toISOString(),
            score: 100,
          });

          if (insertError) {
            console.error("Error saving progress:", insertError);
          }
        }
      } catch (error) {
        console.error("Error syncing progress to Supabase:", error);
      }
    },
    [supabase, user],
  );

  const isGroupUnlocked = useCallback(
    (courseId: string, groupId: string) => isGroupUnlockedForCourse(courseId, groupId, allProgress),
    [allProgress],
  );

  const isLessonUnlocked = useCallback(
    (courseId: string, groupId: string, lessonId: string) =>
      isLessonUnlockedForCourse(courseId, groupId, lessonId, allProgress),
    [allProgress],
  );

  const contextValue = useMemo(
    () => ({
      allProgress: allProgressWithGroups,
      lastPlayedCourseId,
      getCourseProgress,
      markLessonComplete,
      isGroupUnlocked,
      isLessonUnlocked,
      isLoaded,
    }),
    [allProgressWithGroups, getCourseProgress, isGroupUnlocked, isLessonUnlocked, isLoaded, lastPlayedCourseId, markLessonComplete],
  );

  return <ProgressContext.Provider value={contextValue}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
