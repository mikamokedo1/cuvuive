import LogoGroup1 from "@/assets/games/learn-clock/logo-analog.png";
import LogoGroup2 from "@/assets/games/learn-clock/logo-digital.png";

export const GROUPS = [
  {
    id: "group1",
    title: "Đồng hồ kim",
    description: "Học xem đồng hồ kim vặn kim xoay",
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Đồng hồ điện tử",
    description: "Học xem đồng hồ số kỹ thuật số",
    logo: LogoGroup2,
    variant: "orange" as const,
  },
];

export interface TimeScenario {
  hours: number;
  minutes: number;
}

// Generate random time (hours 1-12, minutes 0 or 30)
export const generateRandomTime = (exclude?: TimeScenario): TimeScenario => {
  let h, m;
  do {
    h = Math.floor(Math.random() * 12) + 1; // 1 to 12
    m = Math.random() > 0.5 ? 0 : 30;
  } while (exclude && h === exclude.hours && m === exclude.minutes);
  return { hours: h, minutes: m };
};

export const generateOptions = (correct: TimeScenario, count: number = 3): TimeScenario[] => {
  const options = [correct];
  while (options.length < count) {
    const next = generateRandomTime();
    if (!options.some((o) => o.hours === next.hours && o.minutes === next.minutes)) {
      options.push(next);
    }
  }
  return options.sort(() => Math.random() - 0.5); // Shuffle
};

export const timeToText = (hours: number, minutes: number) => {
  if (minutes === 0) return `${hours} giờ đúng`;
  if (minutes === 30) return `${hours} giờ rưỡi`;
  return `${hours} giờ ${minutes} phút`;
};
