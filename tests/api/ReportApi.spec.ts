import { test, expect } from '@playwright/test';
import { ReportApi } from '../../pages/ReportApi';

test.describe('Report API Tests', () => {
  let reportApi: ReportApi;

  test.beforeEach(async ({ request }) => {
    reportApi = new ReportApi(request);
  });

  test('Get all room reports returns 200', async () => {
    const res = await reportApi.getAllReports();
    expect(res.status()).toBe(200);
  });

  test('Get specific report returns 200 if exists', async () => {
    const res = await reportApi.getReportById(1); // assumes room ID 1 exists
    expect([200, 404]).toContain(res.status());
  });
});