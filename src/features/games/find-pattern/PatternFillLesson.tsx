"use client";

import { useState, useEffect, useRef } from "react";
import { PatternDef, buildSequence, generateDistractors, PatternItem, pickRandomPatterns } from "./constants";
import { PatternShape } from "./PatternShape";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";

interface PatternFillLessonProps {
  groupId: string;
  onComplete: () => void;
  requiredWins?: number;
}

export function PatternFillLesson({ groupId, onComplete, requiredWins = 6 }: PatternFillLessonProps) {
  const { speak } = useTextToSpeech();
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [displaySequence, setDisplaySequence] = useState<(PatternItem | null)[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<PatternItem | null>(null);
  const [gapIndex, setGapIndex] = useState(0);
  const [options, setOptions] = useState<PatternItem[]>([]);
  const prevPatternRef = useRef<string | null>(null);

  const generateQuestion = () => {
    const patterns = pickRandomPatterns(groupId, 1, prevPatternRef.current ? [prevPatternRef.current] : []);
    if (patterns.length === 0) return;

    const pattern = patterns[0];
    prevPatternRef.current = pattern.id;

    const fullSeq = buildSequence(pattern);
    // Place the gap somewhere in the middle (not first or last)
    const gapPos = Math.floor(Math.random() * (fullSeq.length - 2)) + 1;
    const answer = fullSeq[gapPos];

    // Create display with gap
    const display: (PatternItem | null)[] = fullSeq.map((item, i) => (i === gapPos ? null : item));

    setDisplaySequence(display);
    setCorrectAnswer(answer);
    setGapIndex(gapPos);

    // Generate options
    const distractors = generateDistractors(answer, groupId, 3);
    const allOptions = [answer, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setFeedback(null);

    setTimeout(() => {
      speak("Chỗ trống cần hình gì?");
    }, 500);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const handleOptionClick = (selected: PatternItem) => {
    if (feedback === "correct" || !correctAnswer) return;
    playButtonSound();

    if (selected.shape === correctAnswer.shape && selected.color.code === correctAnswer.color.code) {
      speak("Đúng rồi! Tuyệt vời!");
      setFeedback("correct");
      // Fill in the gap
      setDisplaySequence((prev) => prev.map((item, i) => (i === gapIndex ? correctAnswer : item)));
      playWinEffect(500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 1500);
    } else {
      speak("Sai rồi, thử lại nhé!");
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!correctAnswer) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Pattern sequence with gap */}
      <div className="bg-white rounded-3xl shadow-xl border-4 border-orange-200 p-6 md:p-8 w-full">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {displaySequence.map((item, i) => (
            <div key={i} className="transition-all duration-300">
              {item ? (
                <PatternShape shape={item.shape} color={item.color.code} size={48} />
              ) : (
                <div
                  className={`transition-all duration-500 ${feedback === "correct" ? "scale-110" : "animate-bounce"}`}
                >
                  <PatternShape
                    shape={correctAnswer.shape}
                    color={correctAnswer.color.code}
                    size={48}
                    isPlaceholder={feedback !== "correct"}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center justify-center gap-6 md:gap-10">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(option)}
            className={`
              p-4 md:p-6 rounded-2xl border-4 bg-white shadow-lg
              transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer
              ${
                feedback === "correct" &&
                option.shape === correctAnswer.shape &&
                option.color.code === correctAnswer.color.code
                  ? "border-green-500 bg-green-50 scale-110"
                  : feedback === "wrong"
                    ? "border-gray-200 opacity-50"
                    : "border-gray-200 hover:border-orange-400"
              }
            `}
          >
            <PatternShape shape={option.shape} color={option.color.code} size={56} />
          </button>
        ))}
      </div>
    </div>
  );
}
