import { test, expect } from '@playwright/test';

test.describe('Game Lessons & Permissions', () => {
  test('Hiển thị Login Paywall khi người lạ click vào Game Premium (line-connect Group 2)', async ({ page }) => {
    // 1. Vào trang danh sách Nhóm (Groups) của game Nối Điểm (Line Connect)
    await page.goto('/games/line-connect');

    // Mặc định game sẽ load 3 nhóm, trong đó Group 2 (Nối điểm vừa) và Group 3 (khó) là Premium
    // Đợi Group 1 (Nối điểm dễ - Free) hiển thị để đảm bảo trang đã load
    await expect(page.locator('h3', { hasText: 'Nối điểm dễ' })).toBeVisible();

    // 2. Tìm Group 2 (Premium)
    const premiumGroupCard = page.locator('h3', { hasText: 'Nối điểm vừa' }).locator('xpath=./..');
    
    // Đảm bảo có cục hình chiếc khóa (Lock Overlay) trên Group 2
    await expect(premiumGroupCard.locator('img[alt="Premium"]')).toBeVisible();

    // 3. Click vào Group 2
    await premiumGroupCard.click({ force: true });

    // 4. Kiểm tra Modal Paywall (Loại Đăng Nhập) hiện lên
    // Phải có chữ "Đăng nhập để tiếp tục" và 2 nút "Đăng nhập" / "Đăng ký miễn phí"
    // Cần timeout dài xíu vì useUser() có thể đang gọi API fetch premium info từ server
    const paywallModal = page.locator('.fixed.inset-0.z-50', { hasText: 'Đăng nhập để tiếp tục' });
    await expect(paywallModal).toBeVisible({ timeout: 15000 });
    
    const loginBtn = paywallModal.locator('button', { hasText: 'Đăng nhập' });
    await expect(loginBtn).toBeVisible();

    // Click nút Close (X) để đóng modal
    await paywallModal.locator('button').first().click();
    await expect(paywallModal).not.toBeVisible();
  });
});
