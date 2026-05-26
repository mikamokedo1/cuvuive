"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { WordData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import Loading from "@/components/common/Loading";
import { LoudSpeaker } from "@/libs/constants/game-assets";
import { FeedbackType } from "@/types/game";

interface WordListeningLessonProps {
  words: WordData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function WordListeningLesson({ words, onComplete, requiredWins = 15 }: WordListeningLessonProps) {
  const { speak } = useTextToSpeech();
  const [target, setTarget] = useState<WordData | null>(null);
  const prevTargetRef = useRef<WordData | null>(null);
  const [options, setOptions] = useState<WordData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [showImage, setShowImage] = useState(false);

  const generateQuestion = () => {
    if (!words || words.length === 0) return;

    const newTarget = getRandomItem(words, prevTargetRef.current);
    prevTargetRef.current = newTarget;

    // Distractors
    let distractorPool = words.filter((w) => w.id !== newTarget.id);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    const uniqueDistractors = distractorPool.slice(0, 2);
    const newOptions = [newTarget, ...uniqueDistractors].sort(() => Math.random() - 0.5);

    setTarget(newTarget);
    setOptions(newOptions);
    setFeedback(null);
    setShowImage(false);

    setTimeout(() => {
      speak(newTarget.name);
    }, 500);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const handleOptionClick = (selected: WordData) => {
    if (!target) return;
    if (feedback === "correct") return;

    playButtonSound();

    if (selected.id === target.id) {
      setFeedback("correct");
      setShowImage(true);
      playWinEffect(500);
      speak(`Đúng rồi, ${target.name}`);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 2500); // Wait longer to see the image
    } else {
      setFeedback("wrong");
      speak("Chưa đúng rồi");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!target) return <Loading />;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
      {/* Audio Button / Image Reveal */}
      <div
        onClick={() => speak(target.name)}
        className={`relative w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center p-8 bg-white rounded-[3rem] border-4 shadow-2xl transition-all duration-300 cursor-pointer
          ${
            feedback === "correct"
              ? "border-emerald-400 bg-emerald-50 shadow-emerald-100 scale-105"
              : "border-blue-400 hover:scale-105"
          }
      `}
      >
        {showImage && target.image ? (
          <div className="relative w-32 h-32 md:w-48 md:h-48 animate-in zoom-in duration-500">
            <Image src={target.image} alt={target.name} fill className="object-contain" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Image
              width={40}
              height={40}
              src={LoudSpeaker}
              alt="Speaker"
              className="w-20 h-20 md:w-28 md:h-28 opacity-80 animate-pulse"
            />
            <span className="text-xl md:text-2xl font-bold text-gray-400 text-center">Nghe gì nào?</span>
          </div>
        )}

        {feedback === "correct" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-ping rounded-[3rem] bg-emerald-100 opacity-30" />
          </div>
        )}
      </div>

      {/* Options - Text only */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl justify-center mt-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative flex-1 py-4 md:py-6 px-6 rounded-3xl shadow-lg border-4 bg-white
              flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95
              ${feedback === "wrong" ? "opacity-50" : ""}
              ${feedback === "correct" && option.id === target.id ? "border-emerald-500 bg-emerald-50 shadow-emerald-200" : "border-gray-200"}
              ${feedback === "correct" && option.id !== target.id ? "opacity-30" : ""}
            `}
          >
            <span className="text-3xl md:text-4xl font-extrabold text-[#38BDF8] capitalize drop-shadow-sm">
              {option.name === "Em Pé" ? "Em Bé" : option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
