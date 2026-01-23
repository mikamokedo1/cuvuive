"use client";

import Image from "next/image";
import PlayIcon from "@/assets/games/common/play.webp";
import { playButtonSound } from "@/libs/utils/playSound";

export type PlayButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PlayButton: React.FC<PlayButtonProps> = ({ onClick, onMouseEnter }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playButtonSound();
    onClick?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playButtonSound();
    onMouseEnter?.(e);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className="w-26 relative h-20 cursor-pointer animate-scale"
    >
      <Image src={PlayIcon} alt="play-icon" fill />
    </button>
  );
};

export default PlayButton;
