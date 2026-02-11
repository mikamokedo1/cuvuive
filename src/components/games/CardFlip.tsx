import Image from "next/image";

export interface Card {
  id: string;
  data: any;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardFlipProps {
  card: Card;
  isRevealed: boolean;
  handleCardClick: (id: string) => void;
}

export const CardFlip = ({ card, isRevealed, handleCardClick }: CardFlipProps) => {
  return (
    <div
      onClick={() => handleCardClick(card.id)}
      className={`
                    relative aspect-square cursor-pointer
                    ${card.isMatched ? "opacity-80" : ""}
                    ${!isRevealed ? "hover:scale-105" : ""}
                    transition-transform duration-200
                  `}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Card Front — glossy sky-blue with sparkles */}
        <div
          className="absolute inset-0 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #7DD8F5 0%, #42B4E6 40%, #3AA3D6 60%, #5DC5EE 100%)",
            border: "3px solid rgba(255,255,255,0.35)",
            boxShadow:
              "0 4px 15px rgba(66,180,230,0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* Glossy highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
              borderRadius: "14px 14px 40% 40%",
            }}
          />

          {/* Sparkle dots */}
          <div
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-pulse"
            style={{ top: "15%", left: "18%" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{ top: "25%", right: "22%", animationDelay: "0.3s" }}
          />
          <div
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"
            style={{ bottom: "30%", left: "25%", animationDelay: "0.6s" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"
            style={{ bottom: "20%", right: "18%", animationDelay: "0.9s" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{ top: "45%", left: "12%", animationDelay: "1.2s" }}
          />
          <div
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse"
            style={{ top: "35%", right: "15%", animationDelay: "0.5s" }}
          />

          {/* Question mark */}
          <span
            className="relative text-white text-4xl sm:text-5xl font-extrabold z-10"
            style={{
              textShadow: "0 2px 6px rgba(0,0,0,0.15), 0 0 12px rgba(255,255,255,0.3)",
            }}
          >
            ?
          </span>
        </div>

        {/* Card Back */}
        <div
          className={`
                        absolute inset-0 bg-white rounded-2xl shadow-lg p-2 flex flex-col items-center justify-center
                        ${card.isMatched ? "ring-4 ring-green-400 bg-green-50" : "ring-2 ring-green-300"}
                      `}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-3/4">
            <Image src={card.data.image} alt={card.data.name} fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};
