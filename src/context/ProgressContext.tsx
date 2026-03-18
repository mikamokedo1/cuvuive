"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "./UserContext";
import { createClient } from "@/libs/supabase/client";
import { generateUUID } from "@/libs/utils/uuid";
import { COURSES } from "@/libs/constants/courses";

interface ProgressState {
  completedGroups: string[];
  completedLessons: Record<string, string[]>; // groupId -> [lessonIds]
}

interface ProgressContextType {
  progress: ProgressState;
  allProgress: Record<string, ProgressState>;
  courseStructure: Record<string, Record<string, number>>;
  lastPlayedCourseId: string | null;
  markLessonComplete: (groupId: string, lessonId: string, courseId?: string) => void;
  isGroupUnlocked: (groupId: string, courseId?: string) => boolean;
  isLessonUnlocked: (groupId: string, lessonId: string, courseId?: string) => boolean;
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;

  const [allProgress, setAllProgress] = useState<Record<string, ProgressState>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastPlayedCourseId, setLastPlayedCourseId] = useState<string | null>(null);

  const userId = user?.id;

  const [courseStructure, setCourseStructure] = useState<Record<string, Record<string, number>>>({});

  // Keep a ref to allProgress so the effect always reads the latest value
  // (the effect depends only on [userId], so allProgress in the closure would be stale)
  const allProgressRef = useRef(allProgress);
  allProgressRef.current = allProgress;

  // Fetch course structure and user progress in parallel
  useEffect(() => {
    let cancelled = false;

    const fetchStructureAndProgress = async () => {
      if (!userId) {
        // User logged out or anonymous — reset progress to prevent data leaking
        setAllProgress({});
        setLastPlayedCourseId(null);

        // Still need structure even without user
        try {
          const { getCourseStructureAction } = await import("@/libs/actions/courses");
          const data = await getCourseStructureAction();

          if (cancelled) return;

          const structure: Record<string, Record<string, number>> = {};
          data.forEach((row) => {
            const cId = row.courseId;
            const gSlug = row.groupSlug; // use slug to match allProgress keys
            if (!structure[cId]) structure[cId] = {};
            if (!structure[cId][gSlug]) structure[cId][gSlug] = 0;
            structure[cId][gSlug]++;
          });
          setCourseStructure(structure);
        } catch (err) {
          console.error("Error fetching course structure:", err);
        }
        if (!cancelled) setIsLoaded(true);
        return;
      }

      // Deep-copy anonymous progress using ref to get the LATEST value
      // (not the stale closure value from when userId changed)
      const anonymousProgress: Record<string, ProgressState> = {};
      const currentProgress = allProgressRef.current;
      Object.keys(currentProgress).forEach((courseId) => {
        const cp = currentProgress[courseId];
        anonymousProgress[courseId] = {
          completedGroups: [...cp.completedGroups],
          completedLessons: Object.fromEntries(
            Object.entries(cp.completedLessons).map(([gid, lessons]) => [gid, [...lessons]])
          ),
        };
      });

      try {
        // Run structure, progress, and last-played fetches in parallel
        const [structureResult, progressResult, lastPlayedResult] = await Promise.all([
          import("@/libs/actions/courses").then(async (mod) => {
            const data = await mod.getCourseStructureAction();
            const structure: Record<string, Record<string, number>> = {};
            data.forEach((row) => {
              const cId = row.courseId;
              const gSlug = row.groupSlug; // use slug to match allProgress keys
              if (!structure[cId]) structure[cId] = {};
              if (!structure[cId][gSlug]) structure[cId][gSlug] = 0;
              structure[cId][gSlug]++;
            });
            return structure;
          }),
          supabase.from("progress").select("course_id, group_id, lesson_id").eq("user_id", userId),
          supabase
            .from("progress")
            .select("course_id")
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);

        // Don't bail here — always let the merge complete so progress data is correct

        setCourseStructure(structureResult);

        const { data, error } = progressResult;
        if (error) throw error;

        // Build fresh progress from Supabase data
        const freshProgress: Record<string, ProgressState> = {};

        if (data && data.length > 0) {
          data.forEach((row) => {
            const courseId = row.course_id || "learn-numbers";
            const groupId = row.group_id;
            const lessonId = row.lesson_id;

            if (!freshProgress[courseId]) {
              freshProgress[courseId] = { completedGroups: [], completedLessons: {} };
            }

            const courseProgress = freshProgress[courseId];

            if (!courseProgress.completedLessons[groupId]) {
              courseProgress.completedLessons[groupId] = [];
            }
            if (!courseProgress.completedLessons[groupId].includes(lessonId)) {
              courseProgress.completedLessons[groupId].push(lessonId);
            }
          });
        }

        // Merge anonymous progress into fresh Supabase data (preserve lessons completed before login)
        const recordsToSync: { courseId: string; groupId: string; lessonId: string }[] = [];

        Object.keys(anonymousProgress).forEach((courseId) => {
          const anonCourse = anonymousProgress[courseId];
          if (!anonCourse?.completedLessons) return;

          if (!freshProgress[courseId]) {
            freshProgress[courseId] = { completedGroups: [], completedLessons: {} };
          }

          Object.keys(anonCourse.completedLessons).forEach((groupId) => {
            const anonLessons = anonCourse.completedLessons[groupId] || [];
            if (!freshProgress[courseId].completedLessons[groupId]) {
              freshProgress[courseId].completedLessons[groupId] = [];
            }

            anonLessons.forEach((lessonId) => {
              if (!freshProgress[courseId].completedLessons[groupId].includes(lessonId)) {
                freshProgress[courseId].completedLessons[groupId].push(lessonId);
                recordsToSync.push({ courseId, groupId, lessonId });
              }
            });
          });
        });

        setAllProgress(freshProgress);

        // Sync anonymous progress records to Supabase in background (fire-and-forget)
        if (recordsToSync.length > 0) {
          const rows = recordsToSync.map((r) => ({
            id: generateUUID(),
            user_id: userId,
            course_id: r.courseId,
            group_id: r.groupId,
            lesson_id: r.lessonId,
            completed_at: new Date().toISOString(),
          }));
          supabase
            .from("progress")
            .insert(rows)
            .then(({ error: syncError }) => {
              if (syncError) console.error("Error syncing anonymous progress:", syncError);
            });
        }

        // Set last played course
        if (lastPlayedResult.data?.course_id) {
          setLastPlayedCourseId(lastPlayedResult.data.course_id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    };

    fetchStructureAndProgress();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Derive completedGroups from allProgress + courseStructure (no state mutation needed)
  const derivedCompletedGroups = useMemo(() => {
    const result: Record<string, string[]> = {};

    Object.keys(allProgress).forEach((courseId) => {
      const courseProgress = allProgress[courseId];
      const courseStruct = courseStructure[courseId] || {};
      const completed: string[] = [];

      Object.keys(courseProgress.completedLessons).forEach((groupId) => {
        const completedCount = courseProgress.completedLessons[groupId].length;

        let requiredCount = courseStruct[groupId];
        if (requiredCount === undefined) {
          const course = COURSES.find((c) => c.id === courseId);
          const group = course?.groups.find((g) => g.id === groupId);
          requiredCount = group?.lessons.length || 3;
        }

        if (completedCount > 0 && completedCount >= requiredCount) {
          completed.push(groupId);
        }
      });

      result[courseId] = completed;
    });

    return result;
  }, [allProgress, courseStructure]);

  // Merge derived completedGroups back into allProgress for backward compatibility
  // This ensures external consumers (e.g., `allProgress["learn-animal"].completedGroups`) still work
  const allProgressWithGroups = useMemo(() => {
    const result: Record<string, ProgressState> = {};
    Object.keys(allProgress).forEach((courseId) => {
      result[courseId] = {
        completedLessons: allProgress[courseId].completedLessons,
        completedGroups: derivedCompletedGroups[courseId] || [],
      };
    });
    return result;
  }, [allProgress, derivedCompletedGroups]);

  // Derived legacy state for backward compatibility uses the merged version
  const progressWithGroups = allProgressWithGroups["learn-numbers"] || {
    completedGroups: [],
    completedLessons: {},
  };

  const markLessonComplete = useCallback(
    async (groupId: string, lessonId: string, courseId: string = "learn-numbers") => {
      // Optimistically update last played course
      setLastPlayedCourseId(courseId);

      // 1. Optimistic update — only update completedLessons, groups are derived automatically
      setAllProgress((prevAll) => {
        const prevCourse = prevAll[courseId] || { completedGroups: [], completedLessons: {} };

        const groupLessons = prevCourse.completedLessons[groupId] || [];
        if (groupLessons.includes(lessonId)) return prevAll;

        const newGroupLessons = [...groupLessons, lessonId];
        const newCompletedLessons = { ...prevCourse.completedLessons, [groupId]: newGroupLessons };

        return {
          ...prevAll,
          [courseId]: {
            ...prevCourse,
            completedLessons: newCompletedLessons,
          },
        };
      });

      // 2. Sync to Supabase if logged in
      if (user) {
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
            });

            if (insertError) {
              console.error("Error saving progress:", insertError);
            }
          }
        } catch (error) {
          console.error("Error syncing progress to Supabase:", error);
          // We don't rollback optimistic update because local progress is still valid.
        }
      }
    },
    [user, supabase],
  );

  const isGroupUnlocked = useCallback(
    (groupId: string, courseId: string = "learn-numbers") => {
      const course = COURSES.find((c) => c.id === courseId);
      if (!course) return true; // Default to unlocked if course not found in constants

      const groupIndex = course.groups.findIndex((g) => g.id === groupId);
      if (groupIndex === 0) return true; // First group is always unlocked
      if (groupIndex === -1) return false; // Group not found in this course

      const prevGroupId = course.groups[groupIndex - 1].id;
      const completedGroups = derivedCompletedGroups[courseId] || [];
      return completedGroups.includes(prevGroupId);
    },
    [derivedCompletedGroups],
  );

  const isLessonUnlocked = useCallback(
    (groupId: string, lessonId: string, courseId: string = "learn-numbers") => {
      if (!isGroupUnlocked(groupId, courseId)) return false;

      const course = COURSES.find((c) => c.id === courseId);
      if (!course) return true;

      const group = course.groups.find((g) => g.id === groupId);
      if (!group) return false;

      const lessonIndex = group.lessons.findIndex((l) => l.id === lessonId);
      if (lessonIndex === 0) return true; // First lesson in group is always unlocked
      if (lessonIndex === -1) return false; // Lesson not found in this group

      const courseProgress = allProgress[courseId] || { completedLessons: {} };
      const completedInGroup = courseProgress.completedLessons[groupId] || [];

      // If lesson is already completed, it is effectively unlocked
      if (completedInGroup.includes(lessonId)) return true;

      const prevLessonId = group.lessons[lessonIndex - 1].id;
      return completedInGroup.includes(prevLessonId);
    },
    [allProgress, isGroupUnlocked],
  );

  const contextValue = useMemo(
    () => ({
      progress: progressWithGroups,
      allProgress: allProgressWithGroups,
      courseStructure,
      lastPlayedCourseId,
      markLessonComplete,
      isGroupUnlocked,
      isLessonUnlocked,
      isLoaded,
    }),
    [
      progressWithGroups,
      allProgressWithGroups,
      courseStructure,
      lastPlayedCourseId,
      markLessonComplete,
      isGroupUnlocked,
      isLessonUnlocked,
      isLoaded,
    ],
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
