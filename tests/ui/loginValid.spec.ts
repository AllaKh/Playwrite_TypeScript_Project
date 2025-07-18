import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminPage } from '../../pages/AdminPage.js';
import { config } from '../config.js';

test('Successful admin login/logout and links validation', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const admin = new AdminPage(page);

  // Given I am on the homepage
  await home.open();

  // And I click on the Admin link
  await expect(home.adminLink).toBeVisible({ timeout: 10000 });
  await home.clickAdminLink();

  // Then I should be on /admin (login page)
  await page.waitForURL(/\/admin/, { timeout: 10000 });

  // And I enter username and password
  await login.login(config.auth.username, config.auth.password);

  // Then I should be redirected to the admin dashboard (logout button visible)
  await expect(admin.logoutButton).toBeVisible({ timeout: 10000 });

  // And I should see the Report link
  await expect(admin.reportLink).toBeVisible({ timeout: 10000 });

  // When I click on the Report link
  await admin.clickReport();

  // Then I should be redirected to the Report page with calendar
  await page.waitForURL(/report/, { timeout: 10000 });
  await expect(page.locator('.calendar')).toBeVisible();

  // When I click on the Next link
  await admin.clickNext();
  await expect(page.locator('.calendar')).toBeVisible();

  // When I click on the Today link
  await admin.clickToday();
  await expect(page.locator('.calendar')).toBeVisible();

  // When I click on the Back link
  await admin.clickBack();
  await expect(page.locator('.calendar')).toBeVisible();

  // When I click on the Branding link
  await admin.clickBranding();

  // Then I should be redirected to the Branding page with B&B details
  await page.waitForURL(/branding/, { timeout: 10000 });
  await expect(page.locator('text=Bed & Breakfast')).toBeVisible();

  // Now test both homepage links
  for (const linkName of ['Restful Booker Platform Demo', 'Front Page']) {
    // When I click on that homepage link
    if (linkName === 'Restful Booker Platform Demo') {
      await home.clickDemoLink();
    } else {
      await home.clickFrontLink();
    }
    // Then I should be redirected to the homepage
    await page.waitForURL(/\/$/, { timeout: 10000 });

    // And admin dashboard again
    await home.clickAdminLink();
    await page.waitForURL(/\/admin/, { timeout: 10000 });

    // When I click on Logout link
    await expect(admin.logoutButton).toBeVisible({ timeout: 10000 });
    await admin.logoutButton.click();

    // Then I should be redirected to the homepage
    await page.waitForURL(/\/$/, { timeout: 10000 });

    // When I click on the Admin link again
    await expect(home.adminLink).toBeVisible({ timeout: 10000 });
    await home.clickAdminLink();

    // Then I should be redirected to the Login page
    await page.waitForURL(/\/admin/, { timeout: 10000 });
  }
});
