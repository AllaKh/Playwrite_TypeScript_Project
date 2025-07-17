import { test, expect } from '@playwright/test';
import { AuthApi } from '../../pages/AuthApi';
import { credentials } from '../config';

test.describe('Auth API Tests', () => {
  let authApi: AuthApi;
  let token: string;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
  });

  test('Login returns 200 and token is present', async () => {
    const response = await authApi.login(credentials.username, credentials.password);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    token = body.token;
  });

  test('Validate token returns 200 and valid=true', async () => {
    const response = await authApi.validateToken(token);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.valid).toBe(true);
  });

  test('Logout returns 200', async () => {
    const response = await authApi.logout();
    expect(response.status()).toBe(200);
  });

  test('Validate token after logout returns 200 and valid=false', async () => {
    const response = await authApi.validateToken(token);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.valid).toBe(false);
  });
});
