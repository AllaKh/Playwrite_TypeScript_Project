import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddRoomPage extends BasePage {
constructor(page: Page) {
    super(page);
  }

  async clickReportLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Report' }).click();
  }

  async clickNextLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Next' }).click();
  }

  async clickTodayLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Today' }).click();
  }

  async clickBackLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Back' }).click();
  }

  async clickBrandingLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Branding' }).click();
  }

  async clickHomeLinkByText(linkText: string): Promise<void> {
    await this.page.getByRole('link', { name: linkText }).click();
  }

  async clickLogout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }
}
