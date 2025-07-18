import { Page, Locator } from '@playwright/test';

export class LoginPage {
readonly page: Page;
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly loginButton: Locator;

constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 1000 });
    await this.usernameInput.fill(user);

    await this.passwordInput.waitFor({ state: 'visible', timeout: 1000 });
    await this.passwordInput.fill(pass);

    await this.loginButton.waitFor({ state: 'visible', timeout: 1000 }); // FIXED
    await this.loginButton.click();
  }
}
