import { test, expect } from '@playwright/test';
import { AuthApi } from '../../pages/api/AuthApi';
import { config } from '../config';

test.describe('Auth API Tests', () => {
  let authApi: AuthApi;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
  });

  test('Full auth API flow: login, validate, logout, revalidate', async () => {
    // Login
    const loginResponse = await authApi.login(config.auth.username, config.auth.password);
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    expect(loginBody).toHaveProperty('token');
    const token = loginBody.token;

    // Validate token
    const validateResponse = await authApi.validateToken(token);
    expect(validateResponse.status()).toBe(200);
    const validateBody = await validateResponse.json();
    expect(validateBody.valid).toBe(true);

    // Logout
    const logoutResponse = await authApi.logout();
    expect(logoutResponse.status()).toBe(200);

    // Validate token again after logout
    const postLogoutValidation = await authApi.validateToken(token);
    expect(postLogoutValidation.status()).toBe(200);
    const postLogoutBody = await postLogoutValidation.json();
    expect(postLogoutBody.valid).toBe(false);
  });
});
