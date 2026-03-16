import confetti from "canvas-confetti";
import { playSound } from "./playSound";
const SoundYes = "https://assets.cuthongminh.com/games/common/sounds/yes.mp3";

export const playWinEffect = (delay: number) => {
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#22c55e", "#ffffff"],
    });
    playSound(SoundYes);
  }, delay);
};
