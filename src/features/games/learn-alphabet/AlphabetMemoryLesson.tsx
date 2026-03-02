"use client";

import { useState, useEffect } from "react";
import { LetterData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import Image from "next/image";

interface AlphabetMemoryCard {
  id: string;
  data: LetterData;
  isFlipped: boolean;
  isMatched: boolean;
}

interface AlphabetMemoryLessonProps {
  letters: LetterData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function AlphabetMemoryLesson({ letters, onComplete, pairsCount = 6 }: AlphabetMemoryLessonProps) {
  const { speak } = useTextToSpeech();
  const [cards, setCards] = useState<AlphabetMemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    initializeGame();
    speak("Lật thẻ để tìm cặp chữ cái giống nhau!");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letters]);

  const initializeGame = () => {
    const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
    const selectedLetters = shuffledLetters.slice(0, Math.min(pairsCount, letters.length));

    const cardPairs: AlphabetMemoryCard[] = [];
    selectedLetters.forEach((letter, index) => {
      cardPairs.push({
        id: `${letter.id}-a-${index}`,
        data: letter,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: `${letter.id}-b-${index}`,
        data: letter,
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  const handleCardClick = (cardId: string) => {
    if (isLocked) return;
    playButtonSound();
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedCards.length >= 2) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));

    speak(card.data.name);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.data.id === secondCard.data.id) {
        setTimeout(() => {
          speak("Đúng rồi!");
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c)));
          setMatchedPairs((prev) => {
            const newCount = prev + 1;
            if (newCount >= Math.min(pairsCount, letters.length)) {
              setTimeout(() => {
                speak("Tuyệt vời! Bạn đã hoàn thành!");
                playWinEffect(1000);
                setTimeout(onComplete, 2000);
              }, 500);
            }
            return newCount;
          });
          setFlippedCards([]);
          setIsLocked(false);
        }, 600);
      } else {
        setTimeout(() => {
          speak("Thử lại nhé");
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c)));
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const totalPairs = Math.min(pairsCount, letters.length);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Progress & Stats */}
      <div className="flex items-center gap-6 text-lg font-bold">
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
          Cặp: {matchedPairs}/{totalPairs}
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">Lượt: {moves}</div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl">
        {cards.map((card) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                relative w-full aspect-square rounded-2xl cursor-pointer
                transition-all duration-300 transform preserve-3d
                ${isRevealed ? "rotate-y-180" : "hover:scale-105"}
                ${card.isMatched ? "opacity-60 scale-95" : ""}
              `}
            >
              {/* Card Back (hidden state) */}
              {!isRevealed && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">?</span>
                </div>
              )}

              {/* Card Front (revealed state) - shows letter + image */}
              {isRevealed && (
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border-2 border-orange-200 flex flex-col items-center justify-center gap-1 p-2">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-purple-500 leading-none">
                    {card.data.letter}
                  </span>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image src={card.data.image} alt={card.data.word} fill className="object-contain" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
