export const playSound = (path: string, volumn = 0.5) => {
  const audio = new Audio(path);
  audio.volume = volumn;
  audio.play().catch((e) => {
    if (e.name !== "NotAllowedError") {
      console.error("Error playing sound:", e);
    }
  });
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
