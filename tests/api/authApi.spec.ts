import { test, expect } from '@playwright/test';
import { AuthApi } from '../../pages/api/AuthApi';
import { config } from '../config';
import { apiPaths } from '../apiPaths';

test.describe('Auth API Tests', () => {
  let authApi: AuthApi;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
  });

  test('Full auth API flow: login, validate, logout, revalidate', async ({ page }) => {
    // Step 1: Login via Swagger UI
    await page.goto(apiPaths.auth.login);

    // Click "Try it out" button to open the request UI
    const tryItOutButton = page.locator('#operations-auth-controller-createToken > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out > button');
    await tryItOutButton.click();

    // Fill in the login data (username and password from config)
    const payloadInput = page.locator('#operations-auth-controller-createToken > div.no-margin > div > div.opblock-section > div.opblock-section.opblock-section-request-body > div.opblock-description-wrapper > div > div > div > textarea');
    const loginPayload = JSON.stringify({
      username: config.auth.username,
      password: config.auth.password
    });
    await payloadInput.fill(loginPayload);

    // Click "Execute" to make the login request
    const executeButton = page.locator('#operations-auth-controller-createToken > div.no-margin > div > div.execute-wrapper > button');
    await executeButton.click();

    // Check the response code
    const responseCode = await page.locator('#post_login_responses > tbody > tr > td.response-col_status');
    expect(await responseCode.innerText()).toBe('200');

    // Extract and validate the token from the response body
    const responseBody = await page.locator('#operations-auth-controller-createToken > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    const loginBody = await responseBody.innerText();
    const token = loginBody.trim();  // Assuming the token is returned directly
    expect(token).toBeTruthy();

    // Step 2: Validate Token
    await page.goto(apiPaths.auth.validateToken);

    const tryItOutButtonValidateToken = page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out');
    await tryItOutButtonValidateToken.click();

    // Fill the token into the input
    const tokenInputValidate = page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.opblock-section > div.opblock-section.opblock-section-request-body > div.opblock-description-wrapper > div > div > div > textarea');
    await tokenInputValidate.fill(token);

    // Click "Execute" to validate the token
    const executeButtonValidateToken = page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.execute-wrapper > button');
    await executeButtonValidateToken.click();

    // Check the response code
    const responseCodeValidateToken = await page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status');
    expect(await responseCodeValidateToken.innerText()).toBe('200');

    // Validate the token validity
    const responseBodyValidateToken = await page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBodyValidateToken.innerText()).toContain('valid:true');

    // Step 3: Logout
    await page.goto(apiPaths.auth.logout);

    const tryItOutButtonLogout = page.locator('#operations-auth-controller-clearToken > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out');
    await tryItOutButtonLogout.click();

    // Fill the token into the logout input
    const tokenInputLogout = page.locator('#operations-auth-controller-clearToken > div.no-margin > div > div.opblock-section > div.opblock-section.opblock-section-request-body > div.opblock-description-wrapper > div > div > div > textarea');
    await tokenInputLogout.fill(token);

    // Click "Execute" to logout
    const executeButtonLogout = page.locator('#operations-auth-controller-clearToken > div.no-margin > div > div.execute-wrapper > button');
    await executeButtonLogout.click();

    // Check the response code for logout
    const responseCodeLogout = await page.locator('#operations-auth-controller-clearToken > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status');
    expect(await responseCodeLogout.innerText()).toBe('200');

    // Step 4: Validate Token after Logout (should be invalid)
    await page.goto(apiPaths.auth.validateToken);

    const tryItOutButtonPostLogoutValidation = page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out');
    await tryItOutButtonPostLogoutValidation.click();

    // Fill the token into the validation input again
    await tokenInputValidate.fill(token);

    // Click "Execute" to validate the token post-logout
    await executeButtonValidateToken.click();

    // Check the response code
    const responseCodePostLogoutValidation = await page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status');
    expect(await responseCodePostLogoutValidation.innerText()).toBe('200');

    // Validate that the token is no longer valid
    const responseBodyPostLogoutValidation = await page.locator('#operations-auth-controller-validateToken > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBodyPostLogoutValidation.innerText()).toContain('valid:false');
  });
});
