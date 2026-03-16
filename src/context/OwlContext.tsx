"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HOME_SOUND, MAP_PATHNAME_TO_SOUND, MAP_PATHNAME_TO_TEXT } from "./owlMaps";

interface OwlContextType {
  sound: string;
  setSound: (sound: string) => void;
  isHappy: boolean;
  setIsHappy: (happy: boolean) => void;
  textSpeak: string;
  setTextSpeak: (textSpeak: string) => void;
}

const OwlContext = createContext<OwlContextType | undefined>(undefined);

export const OwlProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [sound, setSound] = useState<string>(HOME_SOUND);
  const [textSpeak, setTextSpeak] = useState<string>(
    MAP_PATHNAME_TO_TEXT[pathname as keyof typeof MAP_PATHNAME_TO_TEXT],
  );
  const [isHappy, setIsHappy] = useState<boolean>(true);

  useEffect(() => {
    const sound = MAP_PATHNAME_TO_SOUND[pathname as keyof typeof MAP_PATHNAME_TO_SOUND];
    if (sound) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSound(sound);
    } else {
      setSound(HOME_SOUND);
    }

    const text = MAP_PATHNAME_TO_TEXT[pathname as keyof typeof MAP_PATHNAME_TO_TEXT];
    if (text) {
      setTextSpeak(text);
    } else {
      setTextSpeak("");
    }
  }, [pathname]);

  const contextValue = useMemo(
    () => ({ sound, setSound, isHappy, setIsHappy, textSpeak, setTextSpeak }),
    [sound, isHappy, textSpeak],
  );

  return <OwlContext.Provider value={contextValue}>{children}</OwlContext.Provider>;
};

export const useOwl = () => {
  const context = useContext(OwlContext);
  if (!context) {
    throw new Error("useOwl must be used within an OwlProvider");
  }
  return context;
};

