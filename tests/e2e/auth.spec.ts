import { test, expect } from '@playwright/test';

// Phải chạy serial vì parallel Next dev server timeout rớt hết Login module
test.describe.configure({ mode: 'serial' });

test.describe('Authentication Flow Validation', () => {

  test.describe('Login Module', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/auth/login');
    });

    test('Lỗi Form: Hiện báo đỏ khi điền trống hoặc sai định dạng', async ({ page }) => {
      // Nhấn Đăng nhập ngay mà không điền gì
      await page.locator('button[type="submit"]', { hasText: 'Đăng Nhập' }).click();

      // Kiểm tra thông báo bắt lỗi cho 2 input
      await expect(page.locator('text=Vui lòng nhập email')).toBeVisible();
      await expect(page.locator('text=Vui lòng nhập mật khẩu')).toBeVisible();

      // Nhập sai định dạng email
      await page.locator('input[id="email"]').fill('sai_dinh_dang');
      // Nhập mật khẩu dưới 6 ký tự
      await page.locator('input[id="password"]').fill('123');
      
      await page.locator('button[type="submit"]', { hasText: 'Đăng Nhập' }).click();

      // Phải báo lỗi validation từ Yup / Formik
      await expect(page.locator('text=Email không hợp lệ')).toBeVisible();
      await expect(page.locator('text=Mật khẩu phải có ít nhất 6 ký tự')).toBeVisible();
    });

    test('Hiển thị Lỗi Server (Mock) từ Supabase khi sai pass/email', async ({ page }) => {
      // Mock API của Supabase Auth để trả về lỗi "Invalid login credentials" (400)
      await page.route('**/auth/v1/token*', async (route) => {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            error: "invalid_grant",
            error_description: "Invalid login credentials"
          })
        });
      });

      // Điền email/pass hợp lệ để qua cửa ải Formik (yup schema)
      await page.locator('input[id="email"]').fill('test@cuthongminh.com');
      await page.locator('input[id="password"]').fill('mot_pass_that_dai');
      await page.locator('button[type="submit"]', { hasText: 'Đăng Nhập' }).click();

      // Chữ trong MAP_ERROR "Email hoặc mật khẩu không chính xác" phải hiện ra
      await expect(page.locator('text=Email hoặc mật khẩu không chính xác')).toBeVisible();
    });

    test('Tính năng con mắt (Toggle Password Visibility)', async ({ page }) => {
      const passwordInput = page.locator('input[id="password"]');
      
      // Mặc định type là password
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await passwordInput.fill('BiMat123');
      
      // Ấn nút show => trở thành text
      await page.locator('form').locator('button', { has: page.locator('svg.w-6.h-6') }).click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
    });

    test('Link chuyển hướng qua trang Đăng Ký hoạt động', async ({ page }) => {
      await page.getByRole('link', { name: 'Đăng ký' }).click();
      await expect(page).toHaveURL(/\/auth\/sign-up/);
      await expect(page.locator('h1', { hasText: 'Đăng Ký' })).toBeVisible();
    });
  });

  test.describe('Signup Module', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/auth/sign-up');
    });

    test('Lỗi Form: Hiện báo đỏ khi điền trống hoặc sai định dạng', async ({ page }) => {
      await page.locator('button[type="submit"]', { hasText: 'Tạo Tài Khoản' }).click();
      await expect(page.locator('text=Vui lòng nhập email')).toBeVisible();
      await expect(page.locator('text=Vui lòng nhập mật khẩu')).toBeVisible();
    });

    test('Hiển thị Lỗi Server (Mock) khi trùng Email', async ({ page }) => {
      // Mock API của Supabase trả về "User already registered" (400)
      await page.route('**/auth/v1/signup*', async (route) => {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            error_description: "User already registered",
            error: "user_already_exists",
            msg: "User already registered",
            message: "User already registered"
          })
        });
      });

      await page.locator('input[id="email"]').fill('da_co_chudq@gmail.com');
      await page.locator('input[id="password"]').fill('pass_an_toan');
      await page.locator('button[type="submit"]', { hasText: 'Tạo Tài Khoản' }).click();

      // Kiểm tra ánh xạ từ Error = "Email đã được đăng ký"
      await expect(page.locator('text=Email đã được đăng ký')).toBeVisible({ timeout: 10000 });
    });
  });
});
