import { test, expect } from '@playwright/test';
import { AuthApi } from '../../pages/api/AuthApi';
import { ReportApi } from '../../pages/api/ReportApi';
import { config } from '../../tests/config';

test.describe('Report API Tests', () => {
  let authApi: AuthApi;
  let reportApi: ReportApi;
  let token: string;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    reportApi = new ReportApi(request);

    // Log in to get the token
    const loginResponse = await authApi.login(config.auth.username, config.auth.password);
    const loginBody = await loginResponse.json();
    token = loginBody.token;
  });

  test('Get all room reports and get report by ID with token', async () => {
    // Get all room reports with authorization
    const allReportsResponse = await reportApi.getReportsWithToken(token);
    expect(allReportsResponse.status()).toBe(200);

    // Get specific room report by ID (101) with authorization
    const reportByIdResponse = await reportApi.getReportByRoomIdWithToken(101, token);
    expect([200, 404]).toContain(reportByIdResponse.status());
  });
});
