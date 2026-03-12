import { StaticImageData } from "next/image";

export interface EntityData {
  id: string;
  name: string;
  image: string | StaticImageData;
  category?: string;
  textRepresent?: string;
  acceptedAnswers?: string[]; // Alternative answers for speech recognition
}

export type FeedbackType = "correct" | "wrong" | null;
