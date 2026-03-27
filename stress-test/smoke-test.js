// =============================================================================
// K6 Smoke Test — Quick sanity check (1-5 users)
// Mục đích: Kiểm tra nhanh server có hoạt động bình thường không
// Chạy: k6 run stress-test/smoke-test.js
// =============================================================================

import http from "k6/http";
import { check, sleep } from "k6";
import { BASE_URL, STATIC_PAGES, BLOG_SLUGS, GAME_PAGES, randomItem } from "./k6-config.js";

export const options = {
  vus: 3,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<3000"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  // Test homepage
  let res = http.get(`${BASE_URL}/`);
  check(res, {
    "homepage status 200": (r) => r.status === 200,
    "homepage load < 3s": (r) => r.timings.duration < 3000,
  });
  sleep(1);

  // Test a random blog
  const slug = randomItem(BLOG_SLUGS);
  res = http.get(`${BASE_URL}/blogs/${slug}`);
  check(res, {
    "blog status 200": (r) => r.status === 200,
    "blog load < 3s": (r) => r.timings.duration < 3000,
  });
  sleep(1);

  // Test a random game page
  const game = randomItem(GAME_PAGES);
  res = http.get(`${BASE_URL}${game}`);
  check(res, {
    "game status 200": (r) => r.status === 200,
    "game load < 3s": (r) => r.timings.duration < 3000,
  });
  sleep(1);
}
