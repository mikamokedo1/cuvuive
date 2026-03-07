import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { CostumeData } from "./constants";
import { playButtonSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { FeedbackType } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface CostumeQuizLessonProps {
  costumes: CostumeData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function CostumeQuizLesson({ costumes, onComplete, requiredWins = 6 }: CostumeQuizLessonProps) {
  const [currentCostume, setCurrentCostume] = useState<CostumeData | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [wins, setWins] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (currentCostume) {
      speak(`Trang phục ${currentCostume.name} là của nước nào`);
    }
  }, [currentCostume, speak]);

  const generateQuestion = useCallback(() => {
    // Select a random costume
    const randomCostume = costumes[Math.floor(Math.random() * costumes.length)];
    setCurrentCostume(randomCostume);

    // Get the correct category (country)
    const correctAnswer = randomCostume.category!;

    // Select 3 other random, distinct categories
    const allCategories = Array.from(new Set(costumes.map((c) => c.category!).filter((cat) => cat !== correctAnswer)));

    // Shuffle and pick 3
    const shuffledCategories = [...allCategories].sort(() => 0.5 - Math.random());
    const wrongOptions = shuffledCategories.slice(0, 3);

    // Combine and shuffle options
    const allOptions = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());
    setOptions(allOptions);

    setFeedback(null);
    setSelectedAnswer(null);
  }, [costumes]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (answer: string) => {
    if (feedback !== null || !currentCostume) return;

    setSelectedAnswer(answer);

    if (answer === currentCostume.category) {
      setFeedback("correct");
      playWinEffect(0);
      const newWins = wins + 1;
      setWins(newWins);

      if (newWins >= requiredWins) {
        setTimeout(onComplete, 1500);
      } else {
        setTimeout(generateQuestion, 1500);
      }
    } else {
      setFeedback("wrong");
      playButtonSound();
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  if (!currentCostume) return null;

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 h-full py-8 text-black">
      <div className="w-48 h-64 md:w-64 md:h-80 relative mb-8">
        <div className="absolute inset-0 bg-white rounded-2xl shadow-sm border-4 border-indigo-100 overflow-hidden flex flex-col">
          <div className="flex-1 relative bg-[#F8FAFC] p-4 flex items-center justify-center">
            <Image src={currentCostume.image} alt={currentCostume.name} fill className="object-contain p-2" priority />
          </div>
          <div className="h-12 bg-white flex items-center justify-center px-2 text-center border-t-2 border-indigo-50">
            <h3 className="text-base font-bold text-slate-700">{currentCostume.name}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentCostume.category;

          // Find the corresponding costume to grab its flag
          const optionCostume = costumes.find((c) => c.category === option);

          let buttonClass =
            "bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50";

          if (feedback === "correct" && isCorrect) {
            buttonClass = "bg-green-100 border-2 border-green-500 text-green-700";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={feedback !== null}
              className={`px-4 py-3 rounded-2xl font-bold text-lg md:text-xl transition-all shadow-sm active:scale-95 flex flex-col items-center justify-center gap-2 min-h-[100px] ${buttonClass}`}
            >
              {optionCostume?.flag && (
                <div className="relative w-12 h-8 rounded shrink-0 overflow-hidden shadow-sm border border-slate-200">
                  <Image src={optionCostume.flag} alt={`${option} flag`} fill className="object-cover" />
                </div>
              )}
              <span className="text-center text-sm md:text-base">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
