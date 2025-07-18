import { Page, Locator } from '@playwright/test';

export class AdminPage {
constructor(private page: Page) {}

  get reportLink() { return this.page.getByRole('link', { name: 'Report' }); }
  get nextLink() { return this.page.getByRole('link', { name: 'Next' }); }
  get todayLink() { return this.page.getByRole('link', { name: 'Today' }); }
  get backLink() { return this.page.getByRole('link', { name: 'Back' }); }
  get brandingLink() { return this.page.getByRole('link', { name: 'Branding' }); }
  get logoutLink() { return this.page.getByRole('link', { name: 'Logout' }); }
  get messagesLink() { return this.page.getByRole('link', { name: 'Messages' }); }
  get bookingList() { return this.page.locator('.booking-list'); }
  get messageList() { return this.page.locator('.message-item'); }
  get messageDetails() { return this.page.locator('.message-details'); }

  async clickReport() { await this.reportLink.click(); }
  async clickNext() { await this.nextLink.click(); }
  async clickToday() { await this.todayLink.click(); }
  async clickBack() { await this.backLink.click(); }
  async clickBranding() { await this.brandingLink.click(); }
  async clickLogout() { await this.logoutLink.click(); }
  async clickMessages() { await this.messagesLink.click(); }
  async clickMessage(user: string) { await this.page.locator(`.message-item:has-text("${user}")`).click(); }
  async closeMessage() { await this.page.getByRole('button', { name: 'Close' }).click(); }
}
