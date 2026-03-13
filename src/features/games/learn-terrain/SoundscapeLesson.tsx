"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { EntityData } from "@/types/game";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";
import { getRandomItem } from "@/libs/utils/randomQuestion";

const LoudSpeaker = "https://assets.cuthongminh.com/games/loud-speaker.webp";

// Soundscape descriptions mapped to terrain IDs
const SOUND_HINTS: Record<string, string> = {
  mountain: "Gió thổi vi vu trên đỉnh cao...",
  hill: "Tiếng chim hót trên đồi cỏ xanh...",
  plain: "Tiếng gió thổi qua cánh đồng rộng thơm mùi lúa...",
  plateau: "Gió lạnh thổi trên vùng đất cao bằng phẳng...",
  valley: "Tiếng suối chảy róc rách giữa hai ngọn núi...",
  desert: "Gió cát thổi vi vu trong nắng nóng...",
  savanna: "Sư tử gầm vang trên đồng cỏ châu Phi rộng lớn...",
  ocean: "Sóng biển vỗ rì rào, rì rào...",
  river: "Nước chảy róc rách, róc rách không ngừng...",
  lake: "Mặt nước yên tĩnh, lăn tăn gợn sóng nhẹ...",
  waterfall: "Nước đổ ào ào từ trên cao xuống!",
  island: "Sóng biển bao quanh, chim hải âu kêu...",
  swamp: "Ếch kêu ộp ộp, nước lầy lội sục sôi...",
  volcano: "Tiếng đất rung, magma sôi sùng sục!",
  glacier: "Băng kẽo kẹt, gió lạnh rít qua...",
  cave: "Tiếng vọng âm u, nước nhỏ tích tách...",
  canyon: "Gió thổi vang vọng qua khe sâu hun hút...",
  forest: "Chim hót líu lo, lá xào xạc khắp nơi...",
  beach: "Sóng biển rì rào, cát trắng mịn màng...",
};

interface SoundscapeLessonProps {
  terrains: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function SoundscapeLesson({ terrains, onComplete, requiredWins = 6 }: SoundscapeLessonProps) {
  const { speak } = useTextToSpeech();
  const [target, setTarget] = useState<EntityData | null>(null);
  const prevTargetRef = useRef<EntityData | null>(null);
  const [options, setOptions] = useState<EntityData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedOption, setSelectedOption] = useState<EntityData | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const generateQuestion = useCallback(() => {
    const newTarget = getRandomItem(terrains, prevTargetRef.current);
    prevTargetRef.current = newTarget;

    // Get 2 random distractors
    const distractors = terrains
      .filter((t) => t.id !== newTarget.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    setOptions([newTarget, ...distractors].sort(() => Math.random() - 0.5));
    setTarget(newTarget);
    setFeedback(null);
    setSelectedOption(null);
    setIsRevealing(false);

    // Auto speak the sound hint
    setTimeout(() => {
      const hint = SOUND_HINTS[newTarget.id] || `Âm thanh của ${newTarget.name}`;
      speak(hint);
    }, 800);
  }, [terrains, speak]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const playSoundHint = () => {
    if (target) {
      const hint = SOUND_HINTS[target.id] || `Âm thanh của ${target.name}`;
      speak(hint);
    }
  };

  const handleOptionClick = (option: EntityData) => {
    if (!target || feedback === "correct") return;

    playButtonSound();
    setSelectedOption(option);

    if (option.id === target.id) {
      setFeedback("correct");
      setIsRevealing(true);
      speak(`Đúng rồi! Đây là âm thanh của ${target.name}!`);
      playWinEffect(500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 2500);
    } else {
      setFeedback("wrong");
      speak("Chưa đúng");

      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  if (!target) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Sound visualizer / speaker section */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Animated sound waves */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          {/* Pulse rings */}
          <div
            className="absolute inset-0 rounded-full bg-blue-200/30 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div
            className="absolute inset-2 rounded-full bg-blue-300/30 animate-ping"
            style={{ animationDuration: "2s", animationDelay: "0.5s" }}
          />

          {/* Center speaker button */}
          <button
            onClick={playSoundHint}
            className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <Image width={48} height={40} src={LoudSpeaker} alt="Nghe âm thanh" className="w-10 h-8 md:w-12 md:h-10" />
          </button>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-700 text-center">🎵 Đây là âm thanh ở đâu?</h2>

      {/* Options */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
        {options.map((option) => {
          const isSelected = selectedOption?.id === option.id;
          const isCorrect = option.id === target.id;

          let borderClass = "border-white hover:border-blue-400 hover:scale-105";
          if (feedback === "correct" && isCorrect) {
            borderClass = "border-green-500 scale-110 shadow-green-200 ring-4 ring-green-200";
          } else if (feedback === "wrong" && isSelected) {
            borderClass = "border-red-400 animate-shake";
          } else if (feedback === "wrong" && !isSelected) {
            borderClass = "opacity-50";
          }

          return (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`relative flex flex-col items-center gap-2 p-3 md:p-2 rounded-3xl bg-white shadow-lg border-4 cursor-pointer transition-all duration-300 active:scale-95 ${borderClass}`}
            >
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-contain rounded-xl"
                  sizes="(max-width: 640px) 80px, 128px"
                />
              </div>

              {/* Correct indicator */}
              {feedback === "correct" && isCorrect && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg shadow-md animate-bounce">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Revealed terrain when correct */}
      {isRevealing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4 animate-bounce-in">
            <div className="relative w-40 h-40">
              <Image src={target.image} alt={target.name} fill className="object-contain" />
            </div>
            <h3 className="text-2xl font-black text-green-600">{target.name}</h3>
            <p className="text-gray-600 text-center text-sm">{SOUND_HINTS[target.id]}</p>
            <div className="text-4xl">🎉</div>
          </div>
        </div>
      )}
    </div>
  );
}
