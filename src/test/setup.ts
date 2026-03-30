import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

// Setting up environment variables that might be required by the webhook
process.env.PAYMENT_WEBHOOK_SECRET = 'test_secret';

// Provide a custom fetch mock if we need global mocking
global.fetch = vi.fn();

// Clean up mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
