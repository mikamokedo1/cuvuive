// =============================================================================
// K6 Stress Test — Shared Configuration
// Website: https://cuthongminh.com/
// =============================================================================

export const BASE_URL = "https://cuthongminh.com";

// --- Page URLs to test ---

export const BLOG_SLUGS = [
  "am-nhac-cho-tre-mam-non",
  "an-toan-giao-thong-cho-be",
  "be-3-tuoi-nen-hoc-gi",
  "be-4-tuoi-nen-hoc-gi",
  "be-5-tuoi-can-biet-nhung-gi",
  "cach-day-be-hoc-so",
  "day-be-hoc-bang-chu-cai-tai-nha",
  "day-be-nhan-biet-trai-cay-rau-cu",
  "day-be-tu-duy-logic",
  "giao-duc-som-la-gi",
  "hoc-bang-chu-cai-tieng-viet",
  "hoc-mau-sac",
  "hoc-phuong-tien-giao-thong",
  "kham-pha-the-gioi-dong-vat",
  "loi-ich-tro-choi-tri-tue",
  "day-tre-tap-doc-som",
  "day-be-ve-tranh-don-gian",
  "day-be-yeu-dong-vat",
  "hoc-xem-dong-ho",
  "mau-sac-cho-tre-mau-giao",
];

export const GAME_PAGES = [
  "/games",
  "/games/learn-alphabet",
  "/games/learn-animal",
  "/games/learn-color",
  "/games/learn-numbers",
  "/games/learn-shape",
  "/games/learn-fruit",
  "/games/learn-body",
  "/games/learn-emotion",
  "/games/learn-clock",
  "/games/learn-traffic",
  "/games/learn-vehicle",
  "/games/learn-weather",
  "/games/learn-food",
  "/games/learn-occupation",
  "/games/find-differences",
  "/games/find-pattern",
  "/games/compare-quantity",
  "/games/learn-math",
  "/games/odd-one-out",
  "/games/mini-piano",
  "/games/mix-color",
  "/games/maze-runner",
  "/games/paint-picture",
  "/games/learn-word",
];

export const STATIC_PAGES = [
  "/",
  "/about-us",
  "/blogs",
  "/games",
  "/feedback",
  "/earn",
];

// --- Thresholds ---
export const DEFAULT_THRESHOLDS = {
  http_req_duration: ["p(95)<3000", "p(99)<5000"], // 95% requests < 3s, 99% < 5s
  http_req_failed: ["rate<0.05"],                   // <5% error rate
  http_reqs: ["rate>10"],                            // at least 10 RPS
};

// --- Helper: pick random item ---
export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
