"use client";

import { useState, useEffect } from "react";
import { ZONES } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { EntityData } from "@/types/game";
import { FeedbackType } from "@/types/game";

interface VehicleSortLessonProps {
  vehicles: EntityData[];
  onComplete: () => void;
  requiredCorrect?: number;
}

export function VehicleSortLesson({ vehicles, onComplete, requiredCorrect = 8 }: VehicleSortLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentVehicle, setCurrentVehicle] = useState<EntityData | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [remainingVehicles, setRemainingVehicles] = useState<EntityData[]>([]);

  // Initialize game
  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles]);

  const initializeGame = () => {
    // Shuffle and pick vehicles
    const shuffled = [...vehicles].sort(() => Math.random() - 0.5);
    setRemainingVehicles(shuffled.slice(1));
    setCurrentVehicle(shuffled[0]);
    setScore(0);
    setFeedback(null);
    setSelectedZone(null);

    setTimeout(() => {
      speak("Xe này đi ở đâu? Kéo thả vào đúng vị trí nhé!");
    }, 500);
  };

  const handleZoneClick = (zoneId: string) => {
    if (!currentVehicle || feedback === "correct") return;

    setSelectedZone(zoneId);

    if (currentVehicle.category === zoneId) {
      // Correct!
      setFeedback("correct");
      speak(`Đúng rồi! ${currentVehicle.name} đi trên ${getZoneName(zoneId)}`);
      playWinEffect(500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= requiredCorrect) {
          speak("Tuyệt vời! Bạn đã hoàn thành!");
          setTimeout(onComplete, 1500);
        } else if (remainingVehicles.length > 0) {
          // Next vehicle
          setCurrentVehicle(remainingVehicles[0]);
          setRemainingVehicles((prev) => prev.slice(1));
          setFeedback(null);
          setSelectedZone(null);
        } else {
          // All vehicles sorted, complete
          speak("Tuyệt vời! Bạn đã hoàn thành!");
          setTimeout(onComplete, 1500);
        }
      }, 1500);
    } else {
      // Wrong!
      setFeedback("wrong");
      speak("Sai rồi, thử lại nhé!");
      setTimeout(() => {
        setFeedback(null);
        setSelectedZone(null);
      }, 1000);
    }
  };

  const getZoneName = (category: string) => {
    switch (category) {
      case "land":
        return "đường bộ";
      case "water":
        return "đường thủy";
      case "air":
        return "bầu trời";
    }
  };

  const getZoneColor = (zoneId: string) => {
    switch (zoneId) {
      case "land":
        return "from-green-400 to-green-600";
      case "water":
        return "from-blue-400 to-blue-600";
      case "air":
        return "from-purple-400 to-purple-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getZoneHoverColor = (zoneId: string) => {
    switch (zoneId) {
      case "land":
        return "hover:from-green-500 hover:to-green-700";
      case "water":
        return "hover:from-blue-500 hover:to-blue-700";
      case "air":
        return "hover:from-purple-500 hover:to-purple-700";
      default:
        return "hover:from-gray-500 hover:to-gray-700";
    }
  };

  if (!currentVehicle) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Current Vehicle */}
      <div
        className={`
          relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl shadow-xl
          flex items-center justify-center p-4 border-4
          transition-all duration-300
          ${feedback === "correct" ? "border-green-400 scale-110" : ""}
          ${feedback === "wrong" ? "border-red-400 animate-shake" : ""}
          ${!feedback ? "border-gray-200" : ""}
        `}
        onClick={() => speak(currentVehicle.name)}
      >
        <Image
          src={currentVehicle.image}
          alt={currentVehicle.name}
          fill
          className="object-contain p-4 hover:scale-110 transition-all duration-300 cursor-pointer"
          priority
        />
        {feedback === "correct" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-ping rounded-3xl bg-green-100 opacity-30" />
          </div>
        )}
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mt-4">
        {ZONES.map((zone) => (
          <div
            key={zone.id}
            onClick={() => handleZoneClick(zone.id as string)}
            className={`
              flex flex-col items-center justify-center gap-2 p-6 rounded-2xl cursor-pointer hover:scale-110 transition-all duration-300
              ${feedback === "wrong" ? "opacity-50" : ""}
            `}
          >
            <div className="relative w-48 h-48">
              <Image src={zone.image} alt={zone.name} fill className="object-contain rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
