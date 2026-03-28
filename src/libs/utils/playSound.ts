let audioContext: AudioContext | null = null;
const audioBuffers = new Map<string, AudioBuffer>();

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
    __audioContext?: AudioContext | null;
  }
}

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  // If the context was closed (e.g. by speech recognition to release the
  // audio session on iOS Safari), we need to create a fresh one.
  if (audioContext && audioContext.state === "closed") {
    audioContext = null;
  }
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
      // Expose on window so speech recognition can close it before using the microphone
      // (iOS Safari requires exclusive audio session access)
      window.__audioContext = audioContext;
    }
  }
  return audioContext;
};

export const preloadSound = async (path: string) => {
  if (typeof window === "undefined") return;
  if (audioBuffers.has(path)) return;

  try {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const ctx = getAudioContext();
    if (ctx) {
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      audioBuffers.set(path, audioBuffer);
    }
  } catch (error) {
    console.error(`Error preloading sound ${path}:`, error);
  }
};

// Preload common sounds in the browser
if (typeof window !== "undefined") {
  preloadSound("/sounds/ting.mp3");
  preloadSound("/sounds/correct.mp3");
  preloadSound("/sounds/wrong.mp3");
}

export const playSound = (path: string, volumn = 0.5) => {
  if (typeof window === "undefined") return;

  const ctx = getAudioContext();
  if (!ctx) {
    // Fallback if Web Audio API is completely unavailable
    const audio = new Audio(path);
    audio.volume = volumn;
    audio.play().catch((e) => {
      if (e.name !== "NotAllowedError") {
        console.error("Error playing sound:", e);
      }
    });
    return;
  }

  // If the sound isn't preloaded, fallback and trigger a preload for next time
  if (!audioBuffers.has(path)) {
    const audio = new Audio(path);
    audio.volume = volumn;
    audio.play().catch((e) => {
      if (e.name !== "NotAllowedError") {
        console.error("Error playing sound:", e);
      }
    });
    preloadSound(path);
    return;
  }

  // Resume context if it was suspended (required for Safari after user interaction)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const source = ctx.createBufferSource();
  source.buffer = audioBuffers.get(path)!;

  const gainNode = ctx.createGain();
  gainNode.gain.value = volumn;

  source.connect(gainNode);
  gainNode.connect(ctx.destination);

  source.start(0);
};

export const playButtonSound = () => {
  playSound("/sounds/ting.mp3");
};

export const playCorrectSound = () => {
  playSound("/sounds/correct.mp3");
};

export const playWrongSound = () => {
  playSound("/sounds/wrong.mp3");
};
