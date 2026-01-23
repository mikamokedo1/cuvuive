"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [progress, setProgress] = useState<ProgressState>({
    completedGroups: [],
    completedLessons: {},
  });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (groupId: string, lessonId: string) => {
    setProgress((prev) => {
      const groupLessons = prev.completedLessons[groupId] || [];
      if (groupLessons.includes(lessonId)) return prev;

      const newGroupLessons = [...groupLessons, lessonId];
      const newCompletedLessons = { ...prev.completedLessons, [groupId]: newGroupLessons };

      // Check if group is fully complete (Hardcoded logic for now: 3 lessons per group)
      // Ideally this config should be passed in or central.
      // For MVP, if we complete lesson 3, group is done.
      const isGroupDone = newGroupLessons.length >= 4;
      // Note: This assumes lessons are completed in order and we just count them or specific IDs.
      // Let's rely on specific lesson IDs being present for now.

      let newCompletedGroups = prev.completedGroups;
      if (isGroupDone && !prev.completedGroups.includes(groupId)) {
        newCompletedGroups = [...prev.completedGroups, groupId];
      }

      return {
        completedGroups: newCompletedGroups,
        completedLessons: newCompletedLessons,
      };
    });
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
