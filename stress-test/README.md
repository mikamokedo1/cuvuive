# 🔥 K6 Stress Test Suite — Cú Thông Minh

Bộ stress test cho https://cuthongminh.com/ sử dụng [k6](https://k6.io/).

## Cài đặt k6

```bash
# macOS
brew install k6
```

## Các loại test

| Script | Mục đích | Users | Thời gian |
|---|---|---|---|
| `smoke-test.js` | Kiểm tra nhanh server hoạt động | 3 VUs | 30s |
| `load-test.js` | Test 100 users đồng thời | 10 → 100 VUs | ~6 phút |
| `stress-test.js` | Tìm giới hạn server | 50 → 200 VUs | ~10 phút |
| `spike-test.js` | Traffic đột ngột (viral) | 5 → 100 VUs | ~5 phút |

## Cách chạy

### Bước 1: Smoke test (luôn chạy trước)
```bash
k6 run stress-test/smoke-test.js
```

### Bước 2: Load test (chạy mục tiêu 100 users)
```bash
k6 run stress-test/load-test.js
```

### Bước 3: Stress test (tìm breaking point)
```bash
# ⚠️ Chỉ chạy ngoài giờ cao điểm!
k6 run stress-test/stress-test.js
```

### Bước 4: Spike test (mô phỏng viral)
```bash
# ⚠️ Chỉ chạy ngoài giờ cao điểm!
k6 run stress-test/spike-test.js
```

## Xuất kết quả ra JSON (phân tích sau)

```bash
k6 run --out json=results.json stress-test/load-test.js
```

## Xuất kết quả HTML (dashboard)

```bash
K6_WEB_DASHBOARD=true k6 run stress-test/load-test.js
```

## Thresholds (Ngưỡng đạt/fail)

| Metric | Load Test | Stress Test |
|---|---|---|
| Response time (p95) | < 3s | < 5s |
| Error rate | < 5% | < 10% |
| RPS | > 10 | - |

## ⚠️ Lưu ý Production

1. **Chạy smoke test trước** — đảm bảo server OK trước khi tăng tải
2. **Chạy ngoài giờ cao điểm** — 2-5am Việt Nam
3. **Theo dõi server metrics** — CPU, RAM, Supabase connections
4. **Ramp up từ từ** — Không bao giờ nhảy thẳng lên 100 users
5. **Có kế hoạch rollback** — Sẵn sàng dừng test nếu server quá tải
