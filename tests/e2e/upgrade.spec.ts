import { test, expect } from '@playwright/test';

test.describe('Upgrade Page', () => {
  test('Render upgrade page structure correctly', async ({ page }) => {
    await page.goto('/upgrade');
    
    await expect(page.locator('h1', { hasText: 'Mở Khóa Toàn Bộ' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Premium Trọn Đời' })).toBeVisible();
    await expect(page.locator('s', { hasText: '399.000đ' })).toBeVisible();
    await expect(page.locator('button', { hasText: '299.000 VND' })).toBeVisible();
  });

  test('Clicking upgrade without login opens the login paywall', async ({ page }) => {
    await page.goto('/upgrade');

    await page.locator('button', { hasText: '299.000 VND' }).click();

    await expect(page.locator('h2', { hasText: 'Đăng nhập để tiếp tục' })).toBeVisible();
  });
});
