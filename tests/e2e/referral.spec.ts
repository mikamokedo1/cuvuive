import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Referral Tracker Validation', () => {

  test('Lưu mã Referral từ URL param vào LocalStorage', async ({ page }) => {
    // Truy cập URL có chứa ?ref=...
    await page.goto('/?ref=DEMO123');

    // Chờ trang tải xong (ít nhất là logo xuất hiện) với timeout dài do Next.js compile
    await expect(page.locator('text=Cú Thông Minh').first()).toBeVisible({ timeout: 20000 });

    // Lấy giá trị từ Local Storage
    const refCode = await page.evaluate(() => window.localStorage.getItem('referral_code'));
    
    // Đảm bảo mã giới thiệu đã được lưu (chữ HOA theo đúng logic ReferralTracker)
    expect(refCode).toBe('DEMO123');
  });

  test('Middleware tự động chuyển hướng truy cập /earn khi chưa đăng nhập', async ({ page }) => {
    // Truy cập /earn khi chưa kết nối phiên bản quyền Server
    await page.goto('/earn');

    // Middleware sẽ redirect thẳng tới /auth/login
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('h1', { hasText: 'Đăng Nhập' })).toBeVisible({ timeout: 10000 });
  });

});
