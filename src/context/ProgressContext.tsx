"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { createClient } from "@/libs/supabase/client";

interface ProgressState {
  completedGroups: string[];
  completedLessons: Record<string, string[]>; // groupId -> [lessonIds]
}

interface ProgressContextType {
  progress: ProgressState;
  markLessonComplete: (groupId: string, lessonId: string) => void;
  isGroupUnlocked: (groupId: string) => boolean;
  isLessonUnlocked: (groupId: string, lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = "number-game-progress";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const supabase = createClient();

  const [progress, setProgress] = useState<ProgressState>({
    completedGroups: [],
    completedLessons: {},
  });

  // Load from local storage (initial load)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Fetch progress from Supabase when user logs in
  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase.from("progress").select("group_id, lesson_id").eq("user_id", user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          // Merge with local state or overwrite?
          // Strategy: Merge DB data into local state.
          // DB is truth, but we keep local if it has more (e.g. offline play).
          // Actually, let's rebuild the state from DB data + local backup?
          // For simplicity, let's just use DB data + existing local state merged.

          setProgress((prev) => {
            const newCompletedLessons = { ...prev.completedLessons };

            data.forEach((row) => {
              const groupId = row.group_id;
              const lessonId = row.lesson_id;

              if (!newCompletedLessons[groupId]) {
                newCompletedLessons[groupId] = [];
              }
              if (!newCompletedLessons[groupId].includes(lessonId)) {
                newCompletedLessons[groupId].push(lessonId);
              }
            });

            // Re-calculate completed groups based on new lessons
            // This logic duplicates the one in markLessonComplete.
            // Ideally should be a helper.
            const newCompletedGroups = [...prev.completedGroups];

            Object.keys(newCompletedLessons).forEach((groupId) => {
              // Hardcoded rule: 4 lessons needed per group (lesson1..lesson4)
              // Or just check if lesson4 is present?
              // Let's stick to the rule: if we have 4 lessons, group is done.
              if (newCompletedLessons[groupId].length >= 4) {
                if (!newCompletedGroups.includes(groupId)) {
                  newCompletedGroups.push(groupId);
                }
              }
            });

            return {
              completedGroups: newCompletedGroups,
              completedLessons: newCompletedLessons,
            };
          });
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [user, supabase]);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = async (groupId: string, lessonId: string) => {
    // 1. Optimistic update
    setProgress((prev) => {
      const groupLessons = prev.completedLessons[groupId] || [];
      if (groupLessons.includes(lessonId)) return prev;

      const newGroupLessons = [...groupLessons, lessonId];
      const newCompletedLessons = { ...prev.completedLessons, [groupId]: newGroupLessons };

      // Check if group is fully complete
      const isGroupDone = newGroupLessons.length >= 4;

      let newCompletedGroups = prev.completedGroups;
      if (isGroupDone && !prev.completedGroups.includes(groupId)) {
        newCompletedGroups = [...prev.completedGroups, groupId];
      }

      return {
        completedGroups: newCompletedGroups,
        completedLessons: newCompletedLessons,
      };
    });

    // 2. Sync to Supabase if logged in
    if (user) {
      try {
        // Check if already exists to avoid unique constraint violation if exists?
        // Our schema doesn't have unique constraint on (user_id, lesson_id).
        // It uses a random UUID PK.
        // So simple insert will duplicate if we run it multiple times.
        // We should check existence first or assume `markLessonComplete` only runs on *new* completion.
        // But `markLessonComplete` might be called multiple times.
        // Better to check existence.

        const { data: existing } = await supabase
          .from("progress")
          .select("id")
          .eq("user_id", user.id)
          .eq("group_id", groupId)
          .eq("lesson_id", lessonId)
          .single();

        if (!existing) {
          await supabase.from("progress").insert({
            user_id: user.id,
            group_id: groupId,
            lesson_id: lessonId,
            completed_at: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("Error syncing progress to Supabase:", error);
        // We don't rollback optimistic update because local progress is still valid.
      }
    }
  };

  const isGroupUnlocked = (groupId: string) => {
    // Group logic:
    // "1-3" (id: 'group1') -> Always unlocked
    // "4-6" (id: 'group2') -> Locked until 'group1' is in completedGroups
    // "7-9" (id: 'group3') -> Locked until 'group2' is in completedGroups
    if (groupId === "group1") return true;
    if (groupId === "group2") return progress.completedGroups.includes("group1");
    if (groupId === "group3") return progress.completedGroups.includes("group2");
    return false;
  };

  const isLessonUnlocked = (groupId: string, lessonId: string) => {
    // Lesson logic:
    // Lesson 1 -> Unlocked if Group is unlocked
    // Lesson 2 -> Unlocked if Lesson 1 is complete
    // Lesson 3 -> Unlocked if Lesson 2 is complete
    if (!isGroupUnlocked(groupId)) return false;

    const completedInGroup = progress.completedLessons[groupId] || [];

    // Assuming lessonId format "lesson1", "lesson2", "lesson3" for simplicity across groups
    if (lessonId === "lesson1") return true;
    if (lessonId === "lesson2") return completedInGroup.includes("lesson1");
    if (lessonId === "lesson3") return completedInGroup.includes("lesson2");
    if (lessonId === "lesson4") return completedInGroup.includes("lesson3");

    return false;
  };

  return (
    <ProgressContext.Provider value={{ progress, markLessonComplete, isGroupUnlocked, isLessonUnlocked }}>
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
