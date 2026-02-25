"use client";

import { useState, useEffect } from "react";
import { EntityData } from "@/types/game";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { CardFlip, Card } from "@/components/games/CardFlip";

interface FlowerMemoryLessonProps {
  flowers: EntityData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function FlowerMemoryLesson({ flowers, onComplete, pairsCount = 6 }: FlowerMemoryLessonProps) {
  const { speak } = useTextToSpeech();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    initializeGame();
    // Vietnamese translation: "Flip the cards to find matching pairs!"
    speak("Lật thẻ để tìm cặp giống nhau!");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowers]);

  const initializeGame = () => {
    const shuffledFlowers = [...flowers].sort(() => Math.random() - 0.5);
    const selectedFlowers = shuffledFlowers.slice(0, Math.min(pairsCount, flowers.length));

    const cardPairs: Card[] = [];
    selectedFlowers.forEach((flower, index) => {
      cardPairs.push({
        id: `${flower.id}-a-${index}`,
        data: flower,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: `${flower.id}-b-${index}`,
        data: flower,
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
            if (newCount >= Math.min(pairsCount, flowers.length)) {
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

  const totalPairs = Math.min(pairsCount, flowers.length);

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

          return <CardFlip key={card.id} card={card} isRevealed={isRevealed} handleCardClick={handleCardClick} />;
        })}
      </div>
    </div>
  );
}
