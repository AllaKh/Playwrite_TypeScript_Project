import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { config } from '../config.js';

test.describe('Failed admin login with missing or wrong password', () => {
  const passwords = ['', 'wrongpassword'];

  for (const password of passwords) {
    test(`Login attempt with password "${password === '' ? '[blank]' : password}"`, async ({ page }) => {
      const home = new HomePage(page);
      const login = new LoginPage(page);

      // Given I am on the homepage
      await home.goto();

      // Wait for Admin link to be visible
      await home.adminLink.waitFor({ state: 'visible' });

      // When I click on the Admin link
      await home.clickAdminLink();

      // Wait for username input to appear
      await login.usernameInput.waitFor({ state: 'visible' });

      // When I enter username and password
      await login.login(config.auth.username, password);

      // Then I should see an error message
      await expect(login.loginError).toBeVisible();
    });
  }
});
