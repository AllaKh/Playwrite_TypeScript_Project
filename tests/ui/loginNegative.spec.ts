import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/ui/HomePage';
import { LoginPage } from '../../pages/ui/LoginPage';
import { config } from '../config';

test.describe('Failed admin login with invalid passwords', () => {
  test('All invalid password attempts should show error message', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    for (const password of config.invalidPasswords) {
      // Given I am on the homepage
      await homePage.navigateToHome();

      // And I click on the Admin link to go to login page
      await homePage.clickAdminLink();

      // When I enter valid username and an invalid password
      await loginPage.login(config.auth.username, password);

      // Then I should see an error message
      const loginError = page.locator(
        '#root-container > div > div > div > div > div.col-sm-8 > div > div.card-body > div'
      );
      await expect(loginError, `Expected error message for password: "${password || '[blank]'}"`).toBeVisible();

      // Reload page to reset login form before next attempt
      await page.reload();
    }
  });
});