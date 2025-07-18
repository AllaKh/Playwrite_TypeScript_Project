import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { config } from '../config';

test.describe('Failed admin login with missing or wrong password', () => {
  const passwords = ['', 'wrongpassword'];

  for (const password of passwords) {
    test(`Login attempt with password "${password === '' ? '[blank]' : password}"`, async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);

      // Given I am on the homepage
      await homePage.navigateToHome();

      // And I click on the Admin link to go to login page
      await homePage.clickAdminLink();

      // When I enter username and password to log in
      await loginPage.login(config.auth.username, password);

      // Then I should see an error message
      const loginError = page.locator('#root-container > div > div > div > div > div.col-sm-8 > div > div.card-body > div');
      await expect(loginError).toBeVisible(); // Verifying the visibility of the error message
    });
  }
});
