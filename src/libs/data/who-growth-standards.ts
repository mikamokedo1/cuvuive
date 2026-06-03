/**
 * WHO Child Growth Standards (0–96 months)
 *
 * Source: WHO Multicentre Growth Reference Study Group
 * https://www.who.int/tools/child-growth-standards/standards
 *
 * Percentiles: 3rd, 15th, 50th (median), 85th, 97th
 * Data covers birth (month 0) through 96 months (8 years).
 */

export interface GrowthDataPoint {
  /** Age in months */
  month: number;
  /** 3rd percentile */
  p3: number;
  /** 15th percentile */
  p15: number;
  /** 50th percentile (median) */
  p50: number;
  /** 85th percentile */
  p85: number;
  /** 97th percentile */
  p97: number;
}

// ─── Weight-for-Age (kg) ─────────────────────────────────────────────

export const WEIGHT_BOYS: GrowthDataPoint[] = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
  { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8 },
  { month: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1 },
  { month: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
  { month: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7 },
  { month: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3 },
  { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
  { month: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.2, p97: 10.3 },
  { month: 8, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.7 },
  { month: 9, p3: 7.1, p15: 7.9, p50: 8.9, p85: 9.9, p97: 11.0 },
  { month: 10, p3: 7.4, p15: 8.2, p50: 9.2, p85: 10.2, p97: 11.4 },
  { month: 11, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.7 },
  { month: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 },
  { month: 15, p3: 8.3, p15: 9.2, p50: 10.3, p85: 11.5, p97: 12.8 },
  { month: 18, p3: 8.8, p15: 9.8, p50: 10.9, p85: 12.2, p97: 13.7 },
  { month: 21, p3: 9.3, p15: 10.3, p50: 11.5, p85: 12.9, p97: 14.5 },
  { month: 24, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.3 },
  { month: 30, p3: 10.5, p15: 11.8, p50: 13.3, p85: 15.0, p97: 16.9 },
  { month: 36, p3: 11.3, p15: 12.7, p50: 14.3, p85: 16.2, p97: 18.3 },
  { month: 42, p3: 12.0, p15: 13.5, p50: 15.3, p85: 17.4, p97: 19.7 },
  { month: 48, p3: 12.7, p15: 14.3, p50: 16.3, p85: 18.6, p97: 21.2 },
  { month: 54, p3: 13.4, p15: 15.1, p50: 17.3, p85: 19.8, p97: 22.7 },
  { month: 60, p3: 14.1, p15: 15.9, p50: 18.3, p85: 21.0, p97: 24.2 },
  { month: 66, p3: 14.9, p15: 16.8, p50: 19.3, p85: 22.2, p97: 25.8 },
  { month: 72, p3: 15.7, p15: 17.7, p50: 20.5, p85: 23.6, p97: 27.5 },
  { month: 78, p3: 16.4, p15: 18.6, p50: 21.6, p85: 25.0, p97: 29.2 },
  { month: 84, p3: 17.2, p15: 19.5, p50: 22.8, p85: 26.5, p97: 31.1 },
  { month: 90, p3: 18.0, p15: 20.5, p50: 24.0, p85: 28.0, p97: 33.0 },
  { month: 96, p3: 18.8, p15: 21.5, p50: 25.3, p85: 29.6, p97: 35.0 },
];

export const WEIGHT_GIRLS: GrowthDataPoint[] = [
  { month: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
  { month: 1, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5 },
  { month: 2, p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6 },
  { month: 3, p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5 },
  { month: 4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.2 },
  { month: 5, p3: 5.4, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.8 },
  { month: 6, p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
  { month: 7, p3: 6.0, p15: 6.8, p50: 7.6, p85: 8.6, p97: 9.8 },
  { month: 8, p3: 6.3, p15: 7.0, p50: 7.9, p85: 9.0, p97: 10.2 },
  { month: 9, p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.5 },
  { month: 10, p3: 6.7, p15: 7.5, p50: 8.5, p85: 9.6, p97: 10.9 },
  { month: 11, p3: 6.9, p15: 7.7, p50: 8.7, p85: 9.9, p97: 11.2 },
  { month: 12, p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.5 },
  { month: 15, p3: 7.6, p15: 8.5, p50: 9.6, p85: 10.9, p97: 12.4 },
  { month: 18, p3: 8.1, p15: 9.1, p50: 10.2, p85: 11.6, p97: 13.2 },
  { month: 21, p3: 8.6, p15: 9.6, p50: 10.9, p85: 12.4, p97: 14.2 },
  { month: 24, p3: 9.0, p15: 10.2, p50: 11.5, p85: 13.1, p97: 15.0 },
  { month: 30, p3: 9.9, p15: 11.2, p50: 12.7, p85: 14.5, p97: 16.7 },
  { month: 36, p3: 10.8, p15: 12.2, p50: 13.9, p85: 15.9, p97: 18.3 },
  { month: 42, p3: 11.6, p15: 13.1, p50: 15.0, p85: 17.2, p97: 19.9 },
  { month: 48, p3: 12.3, p15: 14.0, p50: 16.1, p85: 18.5, p97: 21.5 },
  { month: 54, p3: 13.1, p15: 14.9, p50: 17.2, p85: 19.9, p97: 23.2 },
  { month: 60, p3: 13.7, p15: 15.8, p50: 18.2, p85: 21.2, p97: 24.9 },
  { month: 66, p3: 14.5, p15: 16.7, p50: 19.4, p85: 22.6, p97: 26.6 },
  { month: 72, p3: 15.3, p15: 17.6, p50: 20.6, p85: 24.0, p97: 28.5 },
  { month: 78, p3: 16.0, p15: 18.6, p50: 21.8, p85: 25.5, p97: 30.4 },
  { month: 84, p3: 16.8, p15: 19.6, p50: 23.1, p85: 27.1, p97: 32.4 },
  { month: 90, p3: 17.6, p15: 20.6, p50: 24.4, p85: 28.7, p97: 34.5 },
  { month: 96, p3: 18.4, p15: 21.7, p50: 25.8, p85: 30.5, p97: 36.8 },
];

// ─── Height/Length-for-Age (cm) ──────────────────────────────────────

export const HEIGHT_BOYS: GrowthDataPoint[] = [
  { month: 0, p3: 46.1, p15: 47.9, p50: 49.9, p85: 51.8, p97: 53.7 },
  { month: 1, p3: 50.8, p15: 52.8, p50: 54.7, p85: 56.7, p97: 58.6 },
  { month: 2, p3: 54.4, p15: 56.4, p50: 58.4, p85: 60.4, p97: 62.4 },
  { month: 3, p3: 57.3, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.5 },
  { month: 4, p3: 59.7, p15: 61.8, p50: 63.9, p85: 66.0, p97: 68.0 },
  { month: 5, p3: 61.7, p15: 63.8, p50: 65.9, p85: 68.0, p97: 70.1 },
  { month: 6, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.9 },
  { month: 7, p3: 64.8, p15: 67.0, p50: 69.2, p85: 71.3, p97: 73.5 },
  { month: 8, p3: 66.2, p15: 68.4, p50: 70.6, p85: 72.8, p97: 75.0 },
  { month: 9, p3: 67.5, p15: 69.7, p50: 72.0, p85: 74.2, p97: 76.5 },
  { month: 10, p3: 68.7, p15: 71.0, p50: 73.3, p85: 75.6, p97: 77.9 },
  { month: 11, p3: 69.9, p15: 72.2, p50: 74.5, p85: 76.9, p97: 79.2 },
  { month: 12, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
  { month: 15, p3: 74.1, p15: 76.6, p50: 79.1, p85: 81.7, p97: 84.2 },
  { month: 18, p3: 76.9, p15: 79.6, p50: 82.3, p85: 85.0, p97: 87.7 },
  { month: 21, p3: 79.4, p15: 82.3, p50: 85.1, p85: 88.0, p97: 90.9 },
  { month: 24, p3: 81.7, p15: 84.8, p50: 87.8, p85: 90.9, p97: 93.9 },
  { month: 30, p3: 85.7, p15: 89.0, p50: 92.4, p85: 95.7, p97: 99.1 },
  { month: 36, p3: 89.0, p15: 92.7, p50: 96.1, p85: 99.6, p97: 103.3 },
  { month: 42, p3: 92.1, p15: 95.9, p50: 99.7, p85: 103.5, p97: 107.2 },
  { month: 48, p3: 94.9, p15: 99.0, p50: 103.3, p85: 107.4, p97: 111.1 },
  { month: 54, p3: 97.6, p15: 101.8, p50: 106.2, p85: 110.7, p97: 114.8 },
  { month: 60, p3: 100.2, p15: 104.7, p50: 109.2, p85: 113.6, p97: 118.0 },
  { month: 66, p3: 102.8, p15: 107.4, p50: 112.0, p85: 116.6, p97: 121.2 },
  { month: 72, p3: 105.3, p15: 110.0, p50: 114.8, p85: 119.6, p97: 124.3 },
  { month: 78, p3: 107.6, p15: 112.5, p50: 117.5, p85: 122.4, p97: 127.3 },
  { month: 84, p3: 109.9, p15: 115.0, p50: 120.1, p85: 125.2, p97: 130.3 },
  { month: 90, p3: 112.2, p15: 117.4, p50: 122.7, p85: 128.0, p97: 133.2 },
  { month: 96, p3: 114.4, p15: 119.8, p50: 125.3, p85: 130.7, p97: 136.1 },
];

export const HEIGHT_GIRLS: GrowthDataPoint[] = [
  { month: 0, p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9 },
  { month: 1, p3: 49.8, p15: 51.7, p50: 53.7, p85: 55.6, p97: 57.6 },
  { month: 2, p3: 53.0, p15: 55.0, p50: 57.1, p85: 59.1, p97: 61.1 },
  { month: 3, p3: 55.6, p15: 57.7, p50: 59.8, p85: 61.9, p97: 64.0 },
  { month: 4, p3: 57.8, p15: 59.9, p50: 62.1, p85: 64.3, p97: 66.4 },
  { month: 5, p3: 59.6, p15: 61.8, p50: 64.0, p85: 66.2, p97: 68.5 },
  { month: 6, p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3 },
  { month: 7, p3: 62.7, p15: 65.0, p50: 67.3, p85: 69.6, p97: 71.9 },
  { month: 8, p3: 64.0, p15: 66.4, p50: 68.7, p85: 71.1, p97: 73.5 },
  { month: 9, p3: 65.3, p15: 67.7, p50: 70.1, p85: 72.6, p97: 75.0 },
  { month: 10, p3: 66.5, p15: 69.0, p50: 71.5, p85: 73.9, p97: 76.4 },
  { month: 11, p3: 67.7, p15: 70.3, p50: 72.8, p85: 75.3, p97: 77.8 },
  { month: 12, p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2 },
  { month: 15, p3: 72.0, p15: 74.8, p50: 77.5, p85: 80.2, p97: 83.0 },
  { month: 18, p3: 74.9, p15: 77.8, p50: 80.7, p85: 83.6, p97: 86.5 },
  { month: 21, p3: 77.5, p15: 80.6, p50: 83.7, p85: 86.7, p97: 89.8 },
  { month: 24, p3: 80.0, p15: 83.2, p50: 86.4, p85: 89.6, p97: 92.9 },
  { month: 30, p3: 84.3, p15: 87.7, p50: 91.2, p85: 94.7, p97: 98.1 },
  { month: 36, p3: 87.7, p15: 91.4, p50: 95.1, p85: 98.8, p97: 102.5 },
  { month: 42, p3: 90.8, p15: 94.8, p50: 98.8, p85: 102.7, p97: 106.7 },
  { month: 48, p3: 93.9, p15: 98.0, p50: 102.2, p85: 106.4, p97: 110.6 },
  { month: 54, p3: 96.7, p15: 101.0, p50: 105.6, p85: 110.0, p97: 114.4 },
  { month: 60, p3: 99.5, p15: 104.0, p50: 108.8, p85: 113.5, p97: 118.0 },
  { month: 66, p3: 102.2, p15: 106.9, p50: 111.9, p85: 116.9, p97: 121.6 },
  { month: 72, p3: 104.8, p15: 109.7, p50: 115.0, p85: 120.2, p97: 125.1 },
  { month: 78, p3: 107.3, p15: 112.4, p50: 117.9, p85: 123.4, p97: 128.5 },
  { month: 84, p3: 109.7, p15: 115.1, p50: 120.8, p85: 126.6, p97: 131.8 },
  { month: 90, p3: 112.1, p15: 117.7, p50: 123.7, p85: 129.7, p97: 135.1 },
  { month: 96, p3: 114.4, p15: 120.3, p50: 126.6, p85: 132.8, p97: 138.3 },
];

// ─── BMI-for-Age (kg/m², ≥24 months) ────────────────────────────────

export const BMI_BOYS: GrowthDataPoint[] = [
  { month: 24, p3: 13.9, p15: 14.7, p50: 15.7, p85: 16.9, p97: 18.2 },
  { month: 30, p3: 13.7, p15: 14.4, p50: 15.5, p85: 16.6, p97: 17.9 },
  { month: 36, p3: 13.5, p15: 14.2, p50: 15.3, p85: 16.4, p97: 17.7 },
  { month: 42, p3: 13.3, p15: 14.1, p50: 15.1, p85: 16.3, p97: 17.6 },
  { month: 48, p3: 13.2, p15: 13.9, p50: 15.0, p85: 16.2, p97: 17.5 },
  { month: 54, p3: 13.1, p15: 13.8, p50: 14.9, p85: 16.1, p97: 17.5 },
  { month: 60, p3: 13.0, p15: 13.8, p50: 14.8, p85: 16.1, p97: 17.6 },
  { month: 66, p3: 13.0, p15: 13.7, p50: 14.8, p85: 16.1, p97: 17.6 },
  { month: 72, p3: 13.0, p15: 13.7, p50: 14.8, p85: 16.2, p97: 17.8 },
  { month: 78, p3: 13.0, p15: 13.7, p50: 14.9, p85: 16.3, p97: 17.9 },
  { month: 84, p3: 13.0, p15: 13.8, p50: 14.9, p85: 16.4, p97: 18.1 },
  { month: 90, p3: 13.1, p15: 13.9, p50: 15.0, p85: 16.5, p97: 18.3 },
  { month: 96, p3: 13.1, p15: 13.9, p50: 15.1, p85: 16.7, p97: 18.6 },
];

export const BMI_GIRLS: GrowthDataPoint[] = [
  { month: 24, p3: 13.6, p15: 14.4, p50: 15.4, p85: 16.7, p97: 18.1 },
  { month: 30, p3: 13.4, p15: 14.1, p50: 15.2, p85: 16.4, p97: 17.8 },
  { month: 36, p3: 13.2, p15: 13.9, p50: 15.0, p85: 16.2, p97: 17.6 },
  { month: 42, p3: 13.0, p15: 13.8, p50: 14.8, p85: 16.1, p97: 17.5 },
  { month: 48, p3: 12.9, p15: 13.7, p50: 14.7, p85: 16.0, p97: 17.5 },
  { month: 54, p3: 12.8, p15: 13.6, p50: 14.6, p85: 16.0, p97: 17.5 },
  { month: 60, p3: 12.7, p15: 13.5, p50: 14.6, p85: 15.9, p97: 17.5 },
  { month: 66, p3: 12.7, p15: 13.5, p50: 14.6, p85: 16.0, p97: 17.6 },
  { month: 72, p3: 12.7, p15: 13.5, p50: 14.6, p85: 16.1, p97: 17.7 },
  { month: 78, p3: 12.7, p15: 13.5, p50: 14.7, p85: 16.1, p97: 17.9 },
  { month: 84, p3: 12.7, p15: 13.6, p50: 14.7, p85: 16.3, p97: 18.1 },
  { month: 90, p3: 12.8, p15: 13.6, p50: 14.8, p85: 16.4, p97: 18.3 },
  { month: 96, p3: 12.8, p15: 13.7, p50: 14.9, p85: 16.6, p97: 18.6 },
];

// ─── Helpers ─────────────────────────────────────────────────────────

export type Gender = "boy" | "girl";
export type Metric = "weight" | "height" | "bmi";

export function getDataset(metric: Metric, gender: Gender): GrowthDataPoint[] {
  const map = {
    weight: { boy: WEIGHT_BOYS, girl: WEIGHT_GIRLS },
    height: { boy: HEIGHT_BOYS, girl: HEIGHT_GIRLS },
    bmi: { boy: BMI_BOYS, girl: BMI_GIRLS },
  };
  return map[metric][gender];
}

/**
 * Interpolate a value at a given month from the dataset.
 * Handles months between data points using linear interpolation.
 */
export function interpolate(
  data: GrowthDataPoint[],
  month: number,
  percentile: "p3" | "p15" | "p50" | "p85" | "p97",
): number | null {
  if (month < data[0].month || month > data[data.length - 1].month) return null;

  const exact = data.find((d) => d.month === month);
  if (exact) return exact[percentile];

  // Find surrounding data points
  let lower = data[0];
  let upper = data[data.length - 1];
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].month <= month && data[i + 1].month >= month) {
      lower = data[i];
      upper = data[i + 1];
      break;
    }
  }

  const ratio = (month - lower.month) / (upper.month - lower.month);
  return Number((lower[percentile] + ratio * (upper[percentile] - lower[percentile])).toFixed(1));
}

/**
 * Determine which percentile band a value falls into.
 * Returns a label and color for display.
 */
export function getPercentileBand(
  data: GrowthDataPoint[],
  month: number,
  value: number,
): { label: string; color: string; description: string } {
  const p3 = interpolate(data, month, "p3");
  const p15 = interpolate(data, month, "p15");
  const p50 = interpolate(data, month, "p50");
  const p85 = interpolate(data, month, "p85");
  const p97 = interpolate(data, month, "p97");

  if (p3 === null || p15 === null || p50 === null || p85 === null || p97 === null) {
    return { label: "Không xác định", color: "gray", description: "Tuổi ngoài phạm vi dữ liệu." };
  }

  if (value < p3) {
    return {
      label: "Dưới chuẩn",
      color: "red",
      description: "Chỉ số của bé thấp hơn 97% trẻ cùng tuổi. Nên tham khảo ý kiến bác sĩ.",
    };
  }
  if (value < p15) {
    return {
      label: "Thấp hơn trung bình",
      color: "orange",
      description: "Chỉ số của bé nằm trong khoảng thấp. Cần theo dõi và bổ sung dinh dưỡng.",
    };
  }
  if (value <= p85) {
    return {
      label: "Bình thường",
      color: "green",
      description: "Chỉ số của bé nằm trong khoảng bình thường, phát triển tốt!",
    };
  }
  if (value <= p97) {
    return {
      label: "Cao hơn trung bình",
      color: "orange",
      description: "Chỉ số của bé cao hơn trung bình. Cần theo dõi chế độ dinh dưỡng.",
    };
  }
  return {
    label: "Trên chuẩn",
    color: "red",
    description: "Chỉ số của bé vượt 97% trẻ cùng tuổi. Nên tham khảo ý kiến bác sĩ.",
  };
}

/**
 * Format months into readable Vietnamese age string.
 */
export function formatAge(months: number): string {
  if (months < 1) return "Sơ sinh";
  if (months < 12) return `${months} tháng tuổi`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) return `${years} tuổi`;
  return `${years} tuổi ${remainingMonths} tháng`;
}
