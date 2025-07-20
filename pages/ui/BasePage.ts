import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
protected page: Page;
readonly homepage: string = 'https://automationintesting.online/';
readonly adminpage: string = 'https://automationintesting.online/admin/rooms';

constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToOneThird(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollBy(0, document.body.scrollHeight / 3);
    });
  }
}
