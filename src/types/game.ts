import { StaticImageData } from "next/image";

export interface EntityData {
  id: string;
  name: string;
  image: StaticImageData;
  category?: string;
}

export type FeedbackType = "correct" | "wrong" | null;
