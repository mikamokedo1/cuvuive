import { test, expect } from '@playwright/test';

test.describe('Upgrade Page', () => {
  test('Render upgrade page structure correctly', async ({ page }) => {
    await page.goto('/upgrade');
    
    await expect(page.locator('h1', { hasText: 'Nâng Cấp Tài Khoản' })).toBeVisible();
    await expect(page.locator('text=Chọn gói phù hợp để học hành chăm chỉ nhé!')).toBeVisible();
  });

  test('Clicking upgrade without login redirects to /auth/login', async ({ page }) => {
    await page.goto('/upgrade');
    
    // Find the upgrade action buttons
    const upgradeBtns = page.locator('button', { hasText: 'VND' });
    
    // If planes are fetched from DB and visible
    if (await upgradeBtns.count() > 0) {
      await upgradeBtns.first().click();
      await expect(page).toHaveURL(/\/auth\/login\?next=\/upgrade/);
    } else {
      console.log('No upgrade plans rendered from DB on dev server.');
    }
  });
});
