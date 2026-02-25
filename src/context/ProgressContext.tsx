"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "./UserContext";
import { createClient } from "@/libs/supabase/client";
import { generateUUID } from "@/libs/utils/uuid";

interface ProgressState {
  completedGroups: string[];
  completedLessons: Record<string, string[]>; // groupId -> [lessonIds]
}

interface ProgressContextType {
  progress: ProgressState;
  allProgress: Record<string, ProgressState>;
  markLessonComplete: (groupId: string, lessonId: string, courseId?: string) => void;
  isGroupUnlocked: (groupId: string, courseId?: string) => boolean;
  isLessonUnlocked: (groupId: string, lessonId: string, courseId?: string) => boolean;
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = "number-game-progress";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;

  const [allProgress, setAllProgress] = useState<Record<string, ProgressState>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const userId = user?.id;

  // Load from local storage ONLY for anonymous users
  useEffect(() => {
    if (userId) {
      // Logged-in user: reset state so we don't carry over another user's localStorage data.
      // The Supabase fetch effect below will populate with the correct user's data.
      setAllProgress({});
      return;
    }

    // Anonymous user: load from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration check: if old format (direct ProgressState), wrap it
        if (parsed.completedLessons && !parsed["learn-numbers"]) {
          setAllProgress({ "learn-numbers": parsed });
        } else {
          setAllProgress(parsed);
        }
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    } else {
      setAllProgress({});
    }
    setIsLoaded(true);
  }, [userId]);

  const [courseStructure, setCourseStructure] = useState<Record<string, Record<string, number>>>({});

  // Fetch course structure and user progress in parallel
  useEffect(() => {
    const fetchStructureAndProgress = async () => {
      if (!userId) {
        // Still need structure even without user
        try {
          const { getCourseStructureAction } = await import("@/libs/actions/courses");
          const data = await getCourseStructureAction();

          const structure: Record<string, Record<string, number>> = {};
          data.forEach((row) => {
            const cId = row.courseId;
            const gId = row.groupId;
            if (!structure[cId]) structure[cId] = {};
            if (!structure[cId][gId]) structure[cId][gId] = 0;
            structure[cId][gId]++;
          });
          setCourseStructure(structure);
        } catch (err) {
          console.error("Error fetching course structure:", err);
        }
        setIsLoaded(true);
        return;
      }

      setIsLoaded(false);

      try {
        // Run both fetches in parallel
        const [structureResult, progressResult] = await Promise.all([
          import("@/libs/actions/courses").then(async (mod) => {
            const data = await mod.getCourseStructureAction();
            const structure: Record<string, Record<string, number>> = {};
            data.forEach((row) => {
              const cId = row.courseId;
              const gId = row.groupId;
              if (!structure[cId]) structure[cId] = {};
              if (!structure[cId][gId]) structure[cId][gId] = 0;
              structure[cId][gId]++;
            });
            return structure;
          }),
          supabase.from("progress").select("course_id, group_id, lesson_id").eq("user_id", userId),
        ]);

        setCourseStructure(structureResult);

        const { data, error } = progressResult;
        if (error) throw error;

        // REPLACE state entirely with Supabase data (don't merge with localStorage)
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

        setAllProgress(freshProgress);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchStructureAndProgress();
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
        const requiredCount = courseStruct[groupId] || 3;

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

  // Save to local storage ONLY for anonymous users
  useEffect(() => {
    if (!userId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    }
  }, [allProgress, userId]);

  const markLessonComplete = async (groupId: string, lessonId: string, courseId: string = "learn-numbers") => {
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
  };

  const isGroupUnlocked = (groupId: string, courseId: string = "learn-numbers") => {
    // Use derived completed groups
    const completedGroups = derivedCompletedGroups[courseId] || [];

    // Generic check for groupN pattern
    const match = groupId.match(/^group(\d+)$/);
    if (match) {
      const groupNum = parseInt(match[1], 10);
      // group1 is always unlocked
      if (groupNum === 1) return true;

      // groupN requires group(N-1) to be completed
      const prevGroupId = `group${groupNum - 1}`;
      return completedGroups.includes(prevGroupId);
    }

    // Fallback for non-standard IDs
    return false;
  };

  const isLessonUnlocked = (groupId: string, lessonId: string, courseId: string = "learn-numbers") => {
    // Lesson logic:
    // Pass courseId to isGroupUnlocked
    if (!isGroupUnlocked(groupId, courseId)) return false;

    const courseProgress = allProgress[courseId] || { completedLessons: {} };
    const completedInGroup = courseProgress.completedLessons[groupId] || [];

    // If lesson is already completed, it is effectively unlocked (can replay)
    if (completedInGroup.includes(lessonId)) return true;

    // Generic check for lessonN pattern
    const match = lessonId.match(/^lesson(\d+)$/);
    if (match) {
      const lessonNum = parseInt(match[1], 10);
      // lesson1 is always unlocked (if group is unlocked)
      if (lessonNum === 1) return true;

      // lessonN requires lesson(N-1) to be completed
      const prevLessonId = `lesson${lessonNum - 1}`;
      return completedInGroup.includes(prevLessonId);
    }

    return false;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress: progressWithGroups,
        allProgress: allProgressWithGroups,
        markLessonComplete,
        isGroupUnlocked,
        isLessonUnlocked,
        isLoaded,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
