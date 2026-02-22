// Central data definition for numbers 0-20, used by learn-numbers group4/group5
import { ThingImages } from "@/libs/constants/thingImages";
import { NUMBER_NAMES_VI } from "@/libs/constants/numberPaths2";

export interface NumberItem {
  number: number;
  title: string; // e.g. "Số 0", "Số 10"
  nameVi: string; // e.g. "Không", "Mười"
  thingImageIndex: number; // Index into ThingImages (cycled)
}

/**
 * Build number data for a given number.
 * ThingImages are cycled (mod 9) for numbers beyond 9.
 */
export function getNumberItem(n: number): NumberItem {
  return {
    number: n,
    title: `Số ${n}`,
    nameVi: NUMBER_NAMES_VI[n] ?? `${n}`,
    thingImageIndex: n === 0 ? 0 : (n - 1) % ThingImages.length,
  };
}

/**
 * Get a ThingImage for a given number (cycled for numbers > 9)
 */
export function getThingImage(n: number) {
  const index = n === 0 ? 0 : (n - 1) % ThingImages.length;
  return ThingImages[index];
}

// Groups configuration for learn-numbers group4/group5
export const NUMBER2_GROUPS: Record<string, { title: string; numbers: number[] }> = {
  group1: { title: "Số 0", numbers: [0] },
  group2: { title: "Số 10-12", numbers: [10, 11, 12] },
  group3: { title: "Số 13-16", numbers: [13, 14, 15, 16] },
  group4: { title: "Số 17-20", numbers: [17, 18, 19, 20] },
  group5: { title: "Luyện tập", numbers: [0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
};
