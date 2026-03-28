import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {

  test('Shows QR and Bank info when payment status is pending', async ({ page }) => {
    // Intercept the API call that the Checkout Content component makes
    await page.route('**/api/orders/999/status', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'pending',
          amount: 500000,
          cartCode: 'SEVQR999'
        })
      });
    });

    await page.goto('/upgrade/checkout?orderId=999');

    // Wait for the UI elements
    await expect(page.locator('text=Thanh Toán Quét Mã QR')).toBeVisible();
    await expect(page.locator('text=500.000 VND')).toBeVisible();
    await expect(page.locator('text=SEVQR999')).toBeVisible();
    
    // The pulsing pending status text should be visible
    await expect(page.locator('text=Đang chờ thanh toán...')).toBeVisible();
  });

  test('Shows Success UI dynamically when payment status changes to paid', async ({ page }) => {
    let callCount = 0;
    
    // Mock the polling to switch status after the first call
    await page.route('**/api/orders/1000/status', async (route) => {
      callCount++;
      if (callCount <= 1) {
        // First load is pending
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'pending', amount: 500000, cartCode: 'SEVQR1000' })
        });
      } else {
        // The subsequent poll (after 5 seconds in UI logic) returns paid
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'paid', amount: 500000, cartCode: 'SEVQR1000' })
        });
      }
    });

    await page.goto('/upgrade/checkout?orderId=1000');

    // Initially standard pending view
    await expect(page.locator('text=Thanh Toán Quét Mã QR')).toBeVisible();
    
    // Within 7 seconds (accounting for 5s setInterval + network mock), it should change to Success UI.
    // The "Thanh toán thành công!" text will appear.
    await expect(page.locator('text=Thanh toán thành công!')).toBeVisible({ timeout: 9000 });
    
    // Check if the confirmation action button is available
    await expect(page.locator('button', { hasText: 'Bắt Đầu Học Ngay' })).toBeVisible();
  });
});
