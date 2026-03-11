"use client";

import { ToneWord } from "./constants";
import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";

interface ToneSpeakLessonProps {
  words: ToneWord[];
  onComplete: () => void;
}

const toneNames: Record<string, string> = {
  ngang: "ngang",
  sac: "sắc",
  huyen: "huyền",
  hoi: "hỏi",
  nga: "ngã",
  nang: "nặng",
};

const toneMarks: Record<string, string> = {
  ngang: "",
  sac: "´",
  huyen: "`",
  hoi: "?",
  nga: "~",
  nang: ".",
};

export function ToneSpeakLesson({ words, onComplete }: ToneSpeakLessonProps) {
  // Dynamically create the tone intro item from the first word's tone
  const firstWord = words[0];
  const toneName = toneNames[firstWord?.tone] || "";
  const toneMark = toneMarks[firstWord?.tone] || "";

  const introItem: ToneWord = {
    id: `dau_${firstWord?.tone}`,
    name: `Dấu ${toneName.charAt(0).toUpperCase() + toneName.slice(1)}`,
    spelling: `Dấu ${toneName}`,
    baseWord: "",
    tone: firstWord?.tone || "sac",
    toneSymbol: toneMark,
    image: firstWord?.image || words[0]?.image,
    textRepresent: toneMark,
  };

  const allEntities = [introItem, ...words];

  return (
    <SpeakPraticeLayout
      entities={allEntities.map((word) => ({
        ...word,
        name: word.spelling,
        acceptedAnswer: word.name,
      }))}
      onComplete={onComplete}
    />
  );
}
