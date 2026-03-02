"use client";

import { useState, useEffect, useRef } from "react";
import { PatternDef, buildSequence, generateDistractors, PatternItem, pickRandomPatterns } from "./constants";
import { PatternShape } from "./PatternShape";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";

interface PatternQuizLessonProps {
  groupId: string;
  onComplete: () => void;
  requiredWins?: number;
}

export function PatternQuizLesson({ groupId, onComplete, requiredWins = 6 }: PatternQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [currentPattern, setCurrentPattern] = useState<PatternDef | null>(null);
  const [displaySequence, setDisplaySequence] = useState<PatternItem[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<PatternItem | null>(null);
  const [options, setOptions] = useState<PatternItem[]>([]);
  const prevPatternRef = useRef<string | null>(null);

  const generateQuestion = () => {
    const patterns = pickRandomPatterns(groupId, 1, prevPatternRef.current ? [prevPatternRef.current] : []);
    if (patterns.length === 0) return;

    const pattern = patterns[0];
    prevPatternRef.current = pattern.id;
    setCurrentPattern(pattern);

    const fullSeq = buildSequence(pattern);
    // Show all but the last item, kid must pick the last
    const visible = fullSeq.slice(0, fullSeq.length - 1);
    const answer = fullSeq[fullSeq.length - 1];

    setDisplaySequence(visible);
    setCorrectAnswer(answer);

    // Generate options: correct + 2 distractors
    const distractors = generateDistractors(answer, groupId, 3);
    console.log(distractors);
    const allOptions = [answer, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setFeedback(null);

    setTimeout(() => {
      speak("Phần tiếp theo là gì?");
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
      speak("Đúng rồi! Giỏi lắm!");
      setFeedback("correct");
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
  console.log(options);
  if (!currentPattern || !correctAnswer) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Pattern sequence with missing last item */}
      <div className="bg-white rounded-3xl shadow-xl border-4 border-blue-200 p-6 md:p-8 w-full">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {displaySequence.map((item, i) => (
            <PatternShape key={i} shape={item.shape} color={item.color.code} size={48} />
          ))}
          {/* The missing piece */}
          <div className={`transition-all duration-500 ${feedback === "correct" ? "scale-110" : "animate-bounce"}`}>
            <PatternShape
              shape={correctAnswer.shape}
              color={correctAnswer.color.code}
              size={48}
              isPlaceholder={feedback !== "correct"}
            />
          </div>
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
                    : "border-gray-200 hover:border-blue-400"
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
