"use client";

// Note data with staff positions
// staffPosition: 0 = below staff (ledger line), increasing = higher on staff
// Even numbers = on lines, odd numbers = in spaces
export interface NoteData {
  note: string; // e.g. "C"
  label: string; // e.g. "Đồ"
  freq: number;
  color: string; // tailwind bg class
  textColor: string; // tailwind text class
  staffPosition: number; // position on the 5-line staff (0=C below, 1=D, 2=E on line1, etc.)
  emoji: string;
}

export const NOTES: NoteData[] = [
  { note: "C", label: "Đồ", freq: 261.63, color: "bg-red-500", textColor: "text-red-500", staffPosition: 0, emoji: "🌟" },
  { note: "D", label: "Rê", freq: 293.66, color: "bg-orange-500", textColor: "text-orange-500", staffPosition: 1, emoji: "🌈" },
  { note: "E", label: "Mi", freq: 329.63, color: "bg-yellow-500", textColor: "text-yellow-500", staffPosition: 2, emoji: "🦋" },
  { note: "F", label: "Fa", freq: 349.23, color: "bg-green-500", textColor: "text-green-500", staffPosition: 3, emoji: "🐸" },
  { note: "G", label: "Sol", freq: 392.0, color: "bg-blue-500", textColor: "text-blue-500", staffPosition: 4, emoji: "🐬" },
  { note: "A", label: "La", freq: 440.0, color: "bg-indigo-500", textColor: "text-indigo-500", staffPosition: 5, emoji: "🦄" },
  { note: "B", label: "Si", freq: 493.88, color: "bg-purple-500", textColor: "text-purple-500", staffPosition: 6, emoji: "🎀" },
  { note: "C2", label: "Đố", freq: 523.25, color: "bg-pink-500", textColor: "text-pink-500", staffPosition: 7, emoji: "👑" },
];

// Group configs
export const BASIC_NOTES = NOTES.slice(0, 4); // Đồ, Rê, Mi, Fa
export const ADVANCED_NOTES = NOTES.slice(4, 8); // Sol, La, Si, Đố
export const ALL_NOTES = NOTES;

export function getGroupNotes(groupId: string): NoteData[] {
  switch (groupId) {
    case "basic-notes":
      return BASIC_NOTES;
    case "advanced-notes":
      return ADVANCED_NOTES;
    case "practice":
      return ALL_NOTES;
    default:
      return ALL_NOTES;
  }
}

// Shuffle array utility
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
