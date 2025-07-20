// https://automationintesting.online/auth/swagger-ui/index.html
// https://automationintesting.online/report/swagger-ui/index.html
// https://automationintesting.online/room/swagger-ui/index.html
import { test, expect } from '@playwright/test';

/**
 * Scenario: Ensure the Auth Swagger UI is accessible.
 */
test('Auth Swagger UI should return 200', async ({ request }) => {
  const res = await request.get('https://automationintesting.online/auth/swagger-ui/index.html');
  expect(res.status()).toBe(200);
  const res1 = await request.get('https://automationintesting.online/report/swagger-ui/index.html');
  expect(res1.status()).toBe(200);
  const res2 = await request.get('https://automationintesting.online/room/swagger-ui/index.html');
  expect(res2.status()).toBe(200);
});
