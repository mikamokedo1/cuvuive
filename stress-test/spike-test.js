// =============================================================================
// K6 Spike Test — Traffic đột ngột (mô phỏng viral)
// Mục đích: Xem server phản ứng thế nào khi traffic tăng đột ngột
// Ví dụ: Bài post Facebook viral → 100 users ập vào cùng lúc
// ⚠️ CẢNH BÁO: Chỉ chạy ngoài giờ cao điểm
// Chạy: k6 run stress-test/spike-test.js
// =============================================================================

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";
import {
  BASE_URL,
  BLOG_SLUGS,
  GAME_PAGES,
  STATIC_PAGES,
  randomItem,
} from "./k6-config.js";

const errorRate = new Rate("error_rate");
const spikeResponseTime = new Trend("spike_response_time", true);

export const options = {
  stages: [
    { duration: "10s", target: 5 },    // Baseline: 5 users bình thường
    { duration: "1m", target: 5 },     // Hold baseline 1 phút
    { duration: "10s", target: 100 },  // 💥 SPIKE! 5 → 100 users trong 10 giây
    { duration: "2m", target: 100 },   // Hold spike 2 phút
    { duration: "10s", target: 5 },    // Giảm nhanh lại 5 users
    { duration: "1m", target: 5 },     // Recovery — server hồi phục?
    { duration: "10s", target: 0 },    // Kết thúc
  ],
  thresholds: {
    error_rate: ["rate<0.15"],                        // cho phép 15% error khi spike
    http_req_duration: ["p(95)<8000"],                // tolerant: 8s khi spike
    http_req_failed: ["rate<0.15"],
  },
};

export default function () {
  // Mô phỏng: user click vào link từ Facebook → vào blog hoặc game

  const entryPoint = Math.random();

  if (entryPoint < 0.5) {
    // 50%: Vào blog trực tiếp (shared link trên Facebook)
    const slug = randomItem(BLOG_SLUGS);
    const res = http.get(`${BASE_URL}/blogs/${slug}`);
    const ok = check(res, {
      "blog status ok": (r) => r.status === 200,
      "blog load < 8s": (r) => r.timings.duration < 8000,
    });
    errorRate.add(!ok);
    spikeResponseTime.add(res.timings.duration);
  } else if (entryPoint < 0.8) {
    // 30%: Vào homepage rồi browse
    let res = http.get(`${BASE_URL}/`);
    let ok = check(res, {
      "homepage ok": (r) => r.status === 200,
    });
    errorRate.add(!ok);
    spikeResponseTime.add(res.timings.duration);
    sleep(1);

    // Click vào games
    const game = randomItem(GAME_PAGES);
    res = http.get(`${BASE_URL}${game}`);
    ok = check(res, {
      "game ok": (r) => r.status === 200,
    });
    errorRate.add(!ok);
    spikeResponseTime.add(res.timings.duration);
  } else {
    // 20%: Vào game trực tiếp
    const game = randomItem(GAME_PAGES);
    const res = http.get(`${BASE_URL}${game}`);
    const ok = check(res, {
      "direct game ok": (r) => r.status === 200,
    });
    errorRate.add(!ok);
    spikeResponseTime.add(res.timings.duration);
  }

  sleep(Math.random() * 2 + 0.5); // 0.5-2.5s think time
}
