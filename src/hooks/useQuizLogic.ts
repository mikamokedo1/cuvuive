"use client";

import { useState, useRef } from "react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { FeedbackType } from "@/types/game";

interface UseQuizLogicOptions {
  correctAnswer: number;
  onComplete: () => void;
  onNextQuestion: () => void;
  correctMessage?: string;
  wrongMessage?: string;
  requiredWins?: number;
}

export function useQuizLogic({
  correctAnswer,
  onComplete,
  onNextQuestion,
  correctMessage = "Đúng rồi",
  wrongMessage = "Sai rồi, thử lại nhé",
  requiredWins = 8,
}: UseQuizLogicOptions) {
  const { speak } = useTextToSpeech();
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const completedRef = useRef(false);

  const handleChoice = (choice: number) => {
    if (feedback) return;

    if (choice === correctAnswer) {
      speak(correctMessage);
      setFeedback("correct");
      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      if (newCount >= requiredWins) {
        if (!completedRef.current) {
          completedRef.current = true;
          playWinEffect(500);
          setTimeout(onComplete, 1200);
        }
      } else {
        setTimeout(() => {
          setFeedback(null);
          onNextQuestion();
        }, 1500);
      }
    } else {
      speak(wrongMessage);
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const resetFeedback = () => setFeedback(null);

  return { feedback, correctCount, handleChoice, resetFeedback };
}
