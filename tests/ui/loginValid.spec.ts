import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/ui/BasePage';
import { HomePage } from '../../pages/ui/HomePage';
import { LoginPage } from '../../pages/ui/LoginPage';
import { AddRoomPage } from '../../pages/ui/AddRoomPage';
import { config } from '../../tests/config';

test.describe('Admin login/logout and full navigation flow', () => {

  // Scenario: Admin login/logout and full navigation flow with homepage and login cycle
  test('Admin login/logout and full navigation flow with homepage and login cycle', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const adminDashboard = new AddRoomPage(page);
    const basePage = new BasePage(page);

  // Given I am on the homepage
  await homePage.navigateToHome();

  // And I click on the Admin link to go to login page
  await homePage.clickAdminLink();

  // When I enter username and password to log in
  await loginPage.login(config.auth.username, config.auth.password);

  // Then I should be redirected to the admin dashboard
  await expect(page).toHaveURL(/.*\/admin\/rooms/);
  await expect(page.locator('text=Rooms')).toBeVisible();

  // When I navigate back to the homepage using the first link
  const homeLink = page.locator('#root-container > div > nav > div > a');
  await homeLink.click();

  // Then I should be redirected to the homepage
  await expect(page).toHaveURL(basePage.homepage);
  await expect(page.locator('text=Home')).toBeVisible();

  // When I click on the Admin link
    await homePage.clickAdminLink();

  // Then I should be redirected to the admin dashboard
  await expect(page).toHaveURL(/.*\/admin\/rooms/);
  await expect(page.locator('text=Rooms')).toBeVisible();

  // When I click on the #frontPageLink before logging out
  const frontPageLink = page.locator('#frontPageLink');
  await frontPageLink.click();

  // Then I should be redirected to the homepage
  await expect(page).toHaveURL(basePage.homepage);
  await expect(page.locator('text=Home')).toBeVisible();

  // When I navigate back to the admin dashboard
  await homePage.clickAdminLink();

  // Then I should be redirected to the admin dashboard
  await expect(page).toHaveURL(/.*\/admin\/rooms/);
  await expect(page.locator('text=Rooms')).toBeVisible();

  // When I click on the logout button to log out
  const logoutButton = page.locator('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > button');
  await logoutButton.click();

  // Then I should be redirected to the homepage
  await expect(page).toHaveURL(basePage.homepage);
  await expect(page.locator('text=Home')).toBeVisible();

  // And I click on the Admin link to go to login page
  await homePage.clickAdminLink();
  });
});