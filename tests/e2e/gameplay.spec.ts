import { test, expect } from '@playwright/test';

// Phải chạy serial vì parallel Next dev server timeout rớt hết 
test.describe.configure({ mode: 'serial' });

test.describe('Gameplay & Parental Controls', () => {

  test('Core Gameplay Flow: Play and complete a free lesson', async ({ page }) => {
    // Navigate to a free lesson directly
    await page.goto('/games/learn-numbers/group1/lesson/lesson1');

    // Wait for the number "1" to appear in the large display font
    // Number 1
    const nextBtn = page.locator('button:has(svg.lucide-arrow-right)');

    // Ensure it shows exactly "1"
    await expect(page.getByText('1', { exact: true })).toBeVisible();

    // Next to Number 2
    await nextBtn.click({ force: true });
    await expect(page.getByText('2', { exact: true })).toBeVisible();

    // Next to Number 3
    await nextBtn.click({ force: true });
    await expect(page.getByText('3', { exact: true })).toBeVisible();

    // Number 3 is the last number in start=1, end=3 range. So the next button is now a checkmark.
    const checkBtn = page.locator('button:has(svg.lucide-check)');
    await expect(checkBtn).toBeVisible();
    await checkBtn.click({ force: true });

    // Verify Completion Modal appears
    const completionModal = page.getByRole('heading', { name: 'Hoàn thành bài học!' });
    await expect(completionModal).toBeVisible({ timeout: 10000 });

    // Click "Chuyển tiếp"
    const continueBtn = page.locator('button', { hasText: 'Chuyển tiếp' });
    await continueBtn.click({ force: true });

    // Verify it navigates to the next lesson automatically
    // Need a longer timeout because Next.js dev server compiles the route on the first hit
    await expect(page).toHaveURL(/\/games\/learn-numbers\/group1\/lesson\/lesson2/, { timeout: 20000 });
  });

});
