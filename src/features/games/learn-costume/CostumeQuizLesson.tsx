import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { CostumeData } from "./constants";
import { playButtonSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { FeedbackType } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2">Trang phục này của nước nào?</h2>
        <div className="h-2 w-48 bg-slate-100 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(wins / requiredWins) * 100}%` }}
          />
        </div>
      </div>

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

          let buttonClass =
            "bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50";
          let icon = null;

          if (feedback !== null) {
            if (isCorrect) {
              buttonClass = "bg-green-100 border-2 border-green-500 text-green-700";
              icon = <Check className="w-5 h-5 text-green-600 mr-2 shrink-0" />;
            } else if (isSelected) {
              buttonClass = "bg-red-100 border-2 border-red-500 text-red-700";
              icon = <X className="w-5 h-5 text-red-600 mr-2 shrink-0" />;
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={feedback !== null}
              className={`p-4 rounded-2xl font-bold text-lg md:text-xl transition-all shadow-sm active:scale-95 flex items-center justify-center min-h-[80px] ${buttonClass}`}
            >
              {icon}
              <span className="text-center">{option}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback === "correct" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="bg-green-500 text-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
              <Check className="w-12 h-12" />
              <span className="text-3xl font-bold">Chính xác!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
