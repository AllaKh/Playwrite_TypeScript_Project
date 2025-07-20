import { test, expect } from '@playwright/test';
import { AuthApi } from '../../pages/api/AuthApi';
import { ReportApi } from '../../pages/api/ReportApi';
import { config } from '../../tests/config';
import { apiPaths } from '../apiPaths';

test.describe('Report API Tests', () => {
  let authApi: AuthApi;
  let reportApi: ReportApi;
  let token: string;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    reportApi = new ReportApi(request);

    // Log in to get the token
    const loginResponse = await authApi.login(config.auth.username, config.auth.password);
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    token = loginBody.token;
  });

  test('Booking report: Get bookings by token and by room ID', async ({ page }) => {
    // Step 1: Get specific room report by room ID
    const roomReportButton = page.locator('#operations-report-controller-getSpecificRoomReport > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out > button');
    await roomReportButton.click();

    // Input room ID (e.g., 101)
    const roomIdInput = page.locator('#operations-report-controller-getSpecificRoomReport > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    await roomIdInput.fill('101');  // Room ID

    // Execute the request
    const executeButton = page.locator('#operations-report-controller-getSpecificRoomReport > div.no-margin > div > div.execute-wrapper > button');
    await executeButton.click();

    // Check the response status
    const responseCode = await page.locator('#get_room__id__responses > tbody > tr > td.response-col_status');
    expect(await responseCode.innerText()).toBe('200');

    // Validate the response body
    const responseBody = await page.locator('#operations-report-controller-getSpecificRoomReport > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBody.innerText()).toContain('101');

    // Step 2: Get all room reports by token
    const allRoomsButton = page.locator('#operations-report-controller-getAllRoomReports > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out > button');
    await allRoomsButton.click();

    // Input room ID for all rooms report (e.g., 101)
    const allRoomIdInput = page.locator('#operations-report-controller-getAllRoomReports > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    await allRoomIdInput.fill('101');  // Room ID

    // Execute the request for all rooms
    const allRoomsExecuteButton = page.locator('#operations-report-controller-getAllRoomReports > div.no-margin > div > div.execute-wrapper > button');
    await allRoomsExecuteButton.click();

    // Check the response code for all rooms report
    const allRoomsResponseCode = await page.locator('#get__responses > tbody > tr > td.response-col_status');
    expect(await allRoomsResponseCode.innerText()).toBe('200');

    // Validate the response body for all rooms
    const allRoomsResponseBody = await page.locator('#Fl\/o7L0\= > div > div > pre > code > span:nth-child(13)');
    expect(await allRoomsResponseBody.innerText()).toContain('101');
  });
});
