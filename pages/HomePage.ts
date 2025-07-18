import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
readonly adminLink: Locator;

constructor(page: Page) {
    super(page);
    // Update locator to select the specific link with href="/admin" instead of "Admin" name
    this.adminLink = page.locator('a.nav-link[href="/admin"]');
  }

  // Navigate to the homepage
  async navigateToHome(): Promise<void> {
    await this.page.goto('/');
  }

  // Click on the Admin link
  async clickAdminLink(): Promise<void> {
    await this.adminLink.click();
  }

  async scrollToOurRoomsSection(): Promise<void> {
    await this.page.locator('#rooms').scrollIntoViewIfNeeded();
  }
}