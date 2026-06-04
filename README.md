This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📧 Email Marketing & Báo Cáo Học Tập Tuần

Dự án tích hợp **Brevo API v3** để gửi email báo cáo tiến độ học tập hàng tuần cho phụ huynh. Để tối ưu hóa giới hạn 300 email/ngày của gói Brevo Free, hệ thống áp dụng thuật toán **Daily Rolling Cohorts** chia đều người dùng thành 7 nhóm gửi rải rác từ Thứ 2 đến Chủ Nhật.

### 1. Cấu hình Biến Môi Trường (Env Variables)

Thêm các biến sau vào file cấu hình môi trường của VPS (`.env`):

```bash
# Brevo Email Configuration
BREVO_API_KEY="your-brevo-api-key"
BREVO_FROM_EMAIL="Cú Thông Minh <noreply@cuthongminh.com>"

# Mã bí mật bảo mật cho Cron Job (Tự đặt chuỗi ngẫu nhiên dài)
CRON_SECRET="your-cron-secret-key"
```

### 2. Thiết lập Cron Job trên VPS (Chạy Hàng Ngày)

API endpoint gửi email báo cáo: `/api/cron/weekly-report` (Method `GET`).
Vì ứng dụng chạy Docker trên VPS, anh cần thiết lập một Cron Job trên VPS để kích hoạt API này **hàng ngày** vào lúc 9:00 sáng (giờ Việt Nam).

1. Mở cấu hình cron trên VPS:
   ```bash
   crontab -e
   ```

2. Thêm dòng cấu hình sau (chạy mỗi ngày lúc 9:00 sáng):
   ```bash
   0 9 * * * curl -X GET -H "Authorization: Bearer <CRON_SECRET_CỦA_ANH>" https://cuthongminh.com/api/cron/weekly-report
   ```

*Lưu ý: Thay thế `<CRON_SECRET_CỦA_ANH>` bằng đúng giá trị `CRON_SECRET` anh đã cấu hình ở bước 1.*
