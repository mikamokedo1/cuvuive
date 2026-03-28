import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Profile Settings Validation', () => {

  test('Middleware chặn truy cập /settings khi chưa Đăng nhập', async ({ page }) => {
    // Truy cập /settings khi chưa đăng nhập
    await page.goto('/settings');

    // Middleware sẽ redirect tự động và URL phải chứa auth/login
    await expect(page).toHaveURL(/\/auth\/login/);
    
    // Yêu cầu đăng nhập hiển thị
    await expect(page.locator('h1', { hasText: 'Đăng Nhập' })).toBeVisible({ timeout: 10000 });
  });

});
