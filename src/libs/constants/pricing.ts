/** Code of the only plan on sale. Its row is created by src/db/migrations/lifetime_plan.sql. */
export const PREMIUM_PLAN_CODE = "lifetime";

/** Amount shown to customers. Must match `plans.price` of the lifetime row, which is what gets charged. */
export const PREMIUM_PRICE = 299_000;

/** Struck-through price shown next to PREMIUM_PRICE. */
export const PREMIUM_LIST_PRICE = 399_000;

/** The lifetime plan runs for 1200 months, while older plans ran for at most 12. */
const LIFETIME_THRESHOLD_YEARS = 50;

export function isLifetimeEndDate(endDate: Date | string): boolean {
  const threshold = new Date();
  threshold.setFullYear(threshold.getFullYear() + LIFETIME_THRESHOLD_YEARS);
  return new Date(endDate) > threshold;
}
