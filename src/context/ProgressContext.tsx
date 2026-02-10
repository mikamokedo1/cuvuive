"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
  const supabase = createClient();

  const [allProgress, setAllProgress] = useState<Record<string, ProgressState>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Derived legacy state for backward compatibility (default to learn-numbers)
  const progress = allProgress["learn-numbers"] || {
    completedGroups: [],
    completedLessons: {},
  };

  // Load from local storage (initial load)
  useEffect(() => {
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
    }
    // Even if no saved progress, we are "loaded" from local storage perspective
    if (!user) {
      setIsLoaded(true);
    }
  }, [user]);

  const [courseStructure, setCourseStructure] = useState<Record<string, Record<string, number>>>({});

  // Fetch course structure and user progress in parallel
  useEffect(() => {
    const fetchStructureAndProgress = async () => {
      if (!user) {
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
          supabase.from("progress").select("course_id, group_id, lesson_id").eq("user_id", user.id),
        ]);

        setCourseStructure(structureResult);

        const { data, error } = progressResult;
        if (error) throw error;

        if (data && data.length > 0) {
          setAllProgress((prev) => {
            const newAllProgress = { ...prev };

            data.forEach((row) => {
              const courseId = row.course_id || "learn-numbers";
              const groupId = row.group_id;
              const lessonId = row.lesson_id;

              if (!newAllProgress[courseId]) {
                newAllProgress[courseId] = { completedGroups: [], completedLessons: {} };
              }

              const courseProgress = newAllProgress[courseId];

              if (!courseProgress.completedLessons[groupId]) {
                courseProgress.completedLessons[groupId] = [];
              }
              if (!courseProgress.completedLessons[groupId].includes(lessonId)) {
                courseProgress.completedLessons[groupId].push(lessonId);
              }
            });

            return newAllProgress;
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchStructureAndProgress();
  }, [user, supabase]);

  // Re-calculate completed groups whenever 'allProgress' (lessons) OR 'courseStructure' changes
  // This ensures that even if structure loads AFTER progress, we update the groups status.
  useEffect(() => {
    setAllProgress((prevAll) => {
      const newAll = { ...prevAll };
      let changed = false;

      Object.keys(newAll).forEach((courseId) => {
        const courseProgress = newAll[courseId];
        const courseStruct = courseStructure[courseId] || {};

        const newCompletedGroups: string[] = [];

        Object.keys(courseProgress.completedLessons).forEach((groupId) => {
          const completedCount = courseProgress.completedLessons[groupId].length;
          // For learn-shape: group1 and group2 have 4 lessons, group3 has 3
          // For learn-color: all groups have 3 lessons
          // For other courses: default to 4 lessons
          // Use database structure first, default to 3 if not loaded
          const requiredCount = courseStruct[groupId] || 3;

          if (completedCount > 0 && completedCount >= requiredCount) {
            newCompletedGroups.push(groupId);
          }
        });

        // Simple array compare to see if changed
        const isSame =
          newCompletedGroups.length === courseProgress.completedGroups.length &&
          newCompletedGroups.every((g) => courseProgress.completedGroups.includes(g));

        if (!isSame) {
          courseProgress.completedGroups = newCompletedGroups;
          changed = true;
        }
      });

      return changed ? newAll : prevAll;
    });
  }, [courseStructure, allProgress]);
  // Wait, modifying allProgress in useEffect dependent on allProgress is a loop.
  // We should split "Lessons State" and "Groups Status (Derived)".
  // But for now, to fit in current structure:
  // We can just rely on the fact that we ONLY update if 'changed' is true.
  // But 'prevAll' in setAllProgress is fresh.

  // Actually, simpler approach: Update the logic inside 'markLessonComplete' and the initial fetch
  // to use courseStructure. To handle the "structure loads later" case, we can just trigger a recalc.

  // Let's perform the recalc in the same useEffect we added or a new safe one.
  // Ideally, 'completedGroups' should be derived data, not state.
  // But refactoring that might be too big.

  // Let's stick to updating the calculations in the places they happen, fetching structure first.

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  }, [allProgress]);

  const markLessonComplete = async (groupId: string, lessonId: string, courseId: string = "learn-numbers") => {
    // 1. Optimistic update
    setAllProgress((prevAll) => {
      const prevCourse = prevAll[courseId] || { completedGroups: [], completedLessons: {} };

      const groupLessons = prevCourse.completedLessons[groupId] || [];
      if (groupLessons.includes(lessonId)) return prevAll;

      const newGroupLessons = [...groupLessons, lessonId];
      const newCompletedLessons = { ...prevCourse.completedLessons, [groupId]: newGroupLessons };

      // Check if group is fully complete
      const courseStruct = courseStructure[courseId] || {};
      // For learn-shape: group1 and group2 have 4 lessons, group3 has 3
      // For learn-color: all groups have 3 lessons
      // For other courses: default to 4 lessons
      // Use database structure first, default to 3 if not loaded
      const requiredLessons = courseStruct[groupId] || 3;
      const isGroupDone = newGroupLessons.length >= requiredLessons;

      let newCompletedGroups = prevCourse.completedGroups;
      if (isGroupDone && !prevCourse.completedGroups.includes(groupId)) {
        newCompletedGroups = [...prevCourse.completedGroups, groupId];
      }

      return {
        ...prevAll,
        [courseId]: {
          completedGroups: newCompletedGroups,
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
    // Check specific course progress
    const courseProgress = allProgress[courseId] || { completedGroups: [] };

    // Generic check for groupN pattern
    const match = groupId.match(/^group(\d+)$/);
    if (match) {
      const groupNum = parseInt(match[1], 10);
      // group1 is always unlocked
      if (groupNum === 1) return true;

      // groupN requires group(N-1) to be completed
      const prevGroupId = `group${groupNum - 1}`;
      return courseProgress.completedGroups.includes(prevGroupId);
    }

    // Fallback for non-standard IDs (default to locked unless explicitly handled or is first)
    // If you have named groups like "intro", "advanced", you would add specific logic here.
    return false;
  };

  // Helper for Profile Page to calculate stats
  const getCourseProgress = (courseId: string) => {
    return allProgress[courseId];
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
      value={{ progress, allProgress, markLessonComplete, isGroupUnlocked, isLessonUnlocked, isLoaded }}
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
