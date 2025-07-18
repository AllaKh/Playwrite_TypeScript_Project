import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
protected page: Page;

constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async scrollToElement(locator: Locator): Promise<void> {
    const elementHandle = await locator.elementHandle();
    if (elementHandle) {
      await this.page.evaluate((el) => {
        el.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
      }, elementHandle);
    }
  }
}
