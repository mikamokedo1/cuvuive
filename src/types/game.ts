import { StaticImageData } from "next/image";

export interface EntityData {
  id: string;
  name: string;
  image: StaticImageData;
  category?: string;
  textRepresent?: string;
  acceptedAnswer?: string; // If set, speech recognition matches against this instead of name
}

export type FeedbackType = "correct" | "wrong" | null;
