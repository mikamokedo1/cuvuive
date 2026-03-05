import { useState, useEffect } from "react";
import Image from "next/image";
import { CostumeData } from "./constants";
import { playButtonSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";

interface CostumeMemoryLessonProps {
  costumes: CostumeData[];
  onComplete: () => void;
  pairsCount?: number; // How many pairs to show
}

interface CardType {
  id: string; // Unique ID for the card instance
  costumeId: string; // The ID of the costume it represents
  content: string | undefined; // Image URL or Text to display
  type: "image" | "text"; // Type of content
  isFlipped: boolean;
  isMatched: boolean;
}

export function CostumeMemoryLesson({ costumes, onComplete, pairsCount = 6 }: CostumeMemoryLessonProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    // Select pairsCount random costumes
    const shuffledCostumes = [...costumes].sort(() => 0.5 - Math.random()).slice(0, pairsCount);

    // Create a pair for each costume: one image, one text (name + country)
    const newCards: CardType[] = [];
    shuffledCostumes.forEach((costume) => {
      newCards.push({
        id: `${costume.id}-img`,
        costumeId: costume.id,
        content: costume.image ? (costume.image as any).src : "", // Need string for image source or handle static import
        type: "image",
        isFlipped: false,
        isMatched: false,
      });
      newCards.push({
        id: `${costume.id}-txt`,
        costumeId: costume.id,
        content: `${costume.name}\n(${costume.category})`,
        type: "text",
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle the cards
    newCards.sort(() => 0.5 - Math.random());
    setCards(newCards);
  }, [costumes, pairsCount]);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    playButtonSound();

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlippedCards;

      if (cards[firstIndex].costumeId === cards[secondIndex].costumeId) {
        // Match
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setIsLocked(false);
          setMatches((m) => m + 1);
          playWinEffect(0);

          if (matches + 1 === pairsCount) {
            setTimeout(onComplete, 1500);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 h-full py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700">Tìm cặp giống nhau</h2>
        <p className="text-slate-500 mt-2">Ghép trang phục với tên của chúng</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className="relative aspect-square cursor-pointer preserve-3d transition-transform duration-500"
            style={{
              transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "rotateY(0)",
            }}
          >
            {/* Front of card (Hidden, showing ? mark) */}
            <div
              className={`absolute inset-0 backface-hidden bg-white rounded-xl md:rounded-2xl shadow-sm border-2 md:border-4 border-indigo-100 flex items-center justify-center ${
                card.isMatched ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
            >
              <span className="text-2xl md:text-4xl text-indigo-300 font-bold">?</span>
            </div>

            {/* Back of card (Revealed content) */}
            <div
              className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(79,70,229,0.1)] border-2 md:border-4 flex items-center justify-center overflow-hidden
              ${card.isMatched ? "bg-green-50 border-green-200" : "bg-white border-indigo-200"}`}
            >
              {card.type === "image" ? (
                <div className="relative w-full h-full p-2 md:p-4">
                  {/* use next/image component for the source from memory */}
                  <Image
                    src={costumes.find((c) => c.id === card.costumeId)?.image!}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="25vw"
                  />
                </div>
              ) : (
                <div className="text-center p-2">
                  <span className="text-sm md:text-lg font-bold text-slate-700 leading-tight whitespace-pre-line block">
                    {card.content}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
