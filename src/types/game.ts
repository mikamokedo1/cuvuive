import { StaticImageData } from "next/image";

export interface EntityData {
  id: string;
  name: string;
  image: string | StaticImageData;
  category?: string;
  pronounce?: string;
  textRepresent?: string;
  acceptedAnswers?: string[]; // Alternative answers for speech recognition
}

export type FeedbackType = "correct" | "wrong" | null;

export interface ScenarioQuestion {
  id: string;
  situationText: string;
  image: string | StaticImageData;
  options: { id: string; text: string; emoji: string }[];
  correctOptionId: string;
  explanation: string;
  category: string;
}
