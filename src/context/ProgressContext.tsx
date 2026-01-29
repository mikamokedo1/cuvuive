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
  isGroupUnlocked: (groupId: string) => boolean;
  isLessonUnlocked: (groupId: string, lessonId: string) => boolean;
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

  // Fetch progress from Supabase
  useEffect(() => {
    if (!user) {
      setIsLoaded(true);
      return;
    }

    // Set loading to false while fetching from Supabase
    setIsLoaded(false);

    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from("progress")
          .select("course_id, group_id, lesson_id")
          .eq("user_id", user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          setAllProgress((prev) => {
            const newAllProgress = { ...prev };

            data.forEach((row) => {
              const courseId = row.course_id || "learn-numbers"; // Default if null
              const groupId = row.group_id;
              const lessonId = row.lesson_id;

              if (!newAllProgress[courseId]) {
                newAllProgress[courseId] = { completedGroups: [], completedLessons: {} };
              }

              const courseProgress = newAllProgress[courseId];

              // Helper to safely add lesson
              if (!courseProgress.completedLessons[groupId]) {
                courseProgress.completedLessons[groupId] = [];
              }
              if (!courseProgress.completedLessons[groupId].includes(lessonId)) {
                courseProgress.completedLessons[groupId].push(lessonId);
              }
            });

            // Re-calculate completed groups for ALL courses
            Object.keys(newAllProgress).forEach((courseId) => {
              const courseProgress = newAllProgress[courseId];
              const newCompletedGroups = [...courseProgress.completedGroups];

              Object.keys(courseProgress.completedLessons).forEach((groupId) => {
                // Hardcoded rule: 4 lessons needed per group
                if (courseProgress.completedLessons[groupId].length >= 4) {
                  if (!newCompletedGroups.includes(groupId)) {
                    newCompletedGroups.push(groupId);
                  }
                }
              });
              courseProgress.completedGroups = newCompletedGroups;
            });

            return newAllProgress;
          });
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchProgress();
  }, [user, supabase]);

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
      const isGroupDone = newGroupLessons.length >= 4;

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

  const isGroupUnlocked = (groupId: string) => {
    // Legacy support: checks 'learn-numbers' progress
    if (groupId === "group1") return true;
    if (groupId === "group2") return progress.completedGroups.includes("group1");
    if (groupId === "group3") return progress.completedGroups.includes("group2");
    return false;
  };

  // Helper for Profile Page to calculate stats
  const getCourseProgress = (courseId: string) => {
    return allProgress[courseId];
  };

  const isLessonUnlocked = (groupId: string, lessonId: string) => {
    // Lesson logic:
    if (!isGroupUnlocked(groupId)) return false;

    const completedInGroup = progress.completedLessons[groupId] || [];

    // If lesson is already completed, it is effectively unlocked (can replay)
    if (completedInGroup.includes(lessonId)) return true;

    // Assuming lessonId format "lesson1", "lesson2", "lesson3" for simplicity across groups
    if (lessonId === "lesson1") return true;
    if (lessonId === "lesson2") return completedInGroup.includes("lesson1");
    if (lessonId === "lesson3") return completedInGroup.includes("lesson2");
    if (lessonId === "lesson4") return completedInGroup.includes("lesson3");

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
