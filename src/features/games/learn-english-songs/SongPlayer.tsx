"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Song } from "./constants";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from "lucide-react";

interface SongPlayerProps {
  song: Song;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}

export function SongPlayer({ song, onNext, onPrev, onComplete }: SongPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentLyric = [...song.lyrics]
    .reverse()
    .find((l) => currentTime >= l.time)?.text || "";

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onComplete();
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-xl border-4 border-orange-100">
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Song Info & Image */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-8 border-orange-50 shadow-inner group">
          <Image
            src={song.imageUrl}
            alt={song.title}
            fill
            className={`object-cover transition-transform duration-[10s] linear ${isPlaying ? "rotate-[360deg] scale-110" : ""}`}
            style={{ animationIterationCount: "infinite" }}
            sizes="(max-width: 640px) 192px, 256px"
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
               <Music className="w-16 h-16 text-white/50" />
            </div>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-black text-orange-600 drop-shadow-sm">{song.title}</h2>
          <p className="text-gray-500 font-medium italic">Tiếng Anh thiếu nhi</p>
        </div>
      </div>

      {/* Lyrics Display */}
      <div className="w-full h-24 flex items-center justify-center text-center p-4 bg-orange-50 rounded-2xl border-2 border-orange-100 relative overflow-hidden">
        <div className="absolute top-2 left-4">
           <Volume2 className="w-4 h-4 text-orange-300" />
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800 animate-in fade-in slide-in-from-bottom-2 duration-500" key={currentLyric}>
          {currentLyric || "Chuẩn bị..."}
        </p>
      </div>

      {/* Controls */}
      <div className="w-full space-y-4">
        {/* Progress Bar */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              setCurrentTime(time);
              if (audioRef.current) audioRef.current.currentTime = time;
            }}
            className="w-full h-3 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={onPrev}
            className="p-3 rounded-full hover:bg-gray-100 text-gray-400 transition-all active:scale-90"
          >
            <SkipBack className="w-8 h-8" />
          </button>

          <button
            onClick={togglePlay}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 transition-all hover:scale-110 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 fill-current" />
            ) : (
              <Play className="w-10 h-10 fill-current ml-1" />
            )}
          </button>

          <button
            onClick={onNext}
            className="p-3 rounded-full hover:bg-gray-100 text-gray-400 transition-all active:scale-90"
          >
            <SkipForward className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
