import { test, expect } from '@playwright/test';

/**
 * Scenario: Ensure the Auth Swagger UI is accessible.
 */
test('Auth Swagger UI should return 200', async ({ request }) => {
  const res = await request.get('https://automationintesting.online/auth/swagger-ui/index.html');
  expect(res.status()).toBe(200);
});
