"use client";

import { usePlayTimer } from "@/context/PlayTimerContext";
import { ParentalChallengeModal } from "./ParentalChallengeModal";

export function PlayTimerListener() {
  const { showChallenge, onChallengeSuccess } = usePlayTimer();

  return <ParentalChallengeModal isOpen={showChallenge} onSuccess={onChallengeSuccess} />;
}
