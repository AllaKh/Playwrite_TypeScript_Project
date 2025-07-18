import { Page, Locator } from '@playwright/test';

export class LoginPage {
readonly page: Page;
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly loginButton: Locator;
readonly loginError: Locator;

constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    // Исправил: добавил loginError как Locator с правильным селектором
    this.loginError = page.locator('.error'); // <== Проверь селектор, замени на твой, если нужен другой
  }

  async login(user: string, pass: string) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(user);

    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(pass);

    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }
}
