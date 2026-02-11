"use client";

import { useState, useEffect } from "react";
import { AnimalData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { CardFlip, Card } from "@/components/games/CardFlip";

interface AnimalMemoryLessonProps {
  animals: AnimalData[];
  onComplete: () => void;
  pairsCount?: number; // Number of unique animals to use (default 6)
}

export function AnimalMemoryLesson({ animals, onComplete, pairsCount = 6 }: AnimalMemoryLessonProps) {
  const { speak } = useTextToSpeech();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
    speak("Lật thẻ để tìm cặp động vật giống nhau!");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animals]);

  const initializeGame = () => {
    // Pick random animals for the game
    const shuffledAnimals = [...animals].sort(() => Math.random() - 0.5);
    const selectedAnimals = shuffledAnimals.slice(0, Math.min(pairsCount, animals.length));

    // Create pairs
    const cardPairs: Card[] = [];
    selectedAnimals.forEach((animal, index) => {
      cardPairs.push({
        id: `${animal.id}-a-${index}`,
        data: animal,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: `${animal.id}-b-${index}`,
        data: animal,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  const handleCardClick = (cardId: string) => {
    // Ignore if locked, already flipped, or matched
    if (isLocked) return;
    playButtonSound();
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Ignore if already flipped 2 cards
    if (flippedCards.length >= 2) return;

    // Flip the card
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));

    // Speak animal name
    speak(card.data.name);

    // Check for match when 2 cards are flipped
    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.data.id === secondCard.data.id) {
        // Match found!
        setTimeout(() => {
          speak("Đúng rồi!");
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c)));
          setMatchedPairs((prev) => {
            const newCount = prev + 1;
            // Check win condition
            if (newCount >= Math.min(pairsCount, animals.length)) {
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
        // No match - flip back
        setTimeout(() => {
          speak("Thử lại nhé");
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c)));
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const totalPairs = Math.min(pairsCount, animals.length);

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
