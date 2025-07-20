import { Page, Locator } from '@playwright/test';

export class AdminPage {
readonly page: Page;

readonly reportLink: Locator;
readonly nextLink: Locator;
readonly todayLink: Locator;
readonly backLink: Locator;
readonly brandingLink: Locator;
readonly logoutButton: Locator;
readonly messagesLink: Locator;
readonly bookingList: Locator;
readonly messageList: Locator;
readonly messageDetails: Locator;

constructor(page: Page) {
    this.page = page;

    this.reportLink = page.getByRole('link', { name: 'Report' });
    this.nextLink = page.getByRole('link', { name: 'Next' });
    this.todayLink = page.getByRole('link', { name: 'Today' });
    this.backLink = page.getByRole('link', { name: 'Back' });
    this.brandingLink = page.getByRole('link', { name: 'Branding' });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });  // <-- исправлено, теперь logoutButton
    this.messagesLink = page.getByRole('link', { name: 'Messages' });
    this.bookingList = page.locator('.booking-list');
    this.messageList = page.locator('.message-item');
    this.messageDetails = page.locator('.message-details');
  }

  async clickReport() { await this.reportLink.click(); }
  async clickNext() { await this.nextLink.click(); }
  async clickToday() { await this.todayLink.click(); }
  async clickBack() { await this.backLink.click(); }
  async clickBranding() { await this.brandingLink.click(); }
  async clickLogout() { await this.logoutButton.click(); }
  async clickMessages() { await this.messagesLink.click(); }
  async clickMessage(user: string) {
    await this.page.locator(`.message-item:has-text("${user}")`).click();
  }
  async closeMessage() {
    await this.page.getByRole('button', { name: 'Close' }).click();
  }
}
