import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class RoomsOverviewPage extends BasePage {
constructor(page: Page) {
    super(page);
  }

  async scrollToRooms() {
    const roomsHeader = this.page.locator('h2', { hasText: 'Our Rooms' });
    await roomsHeader.scrollIntoViewIfNeeded();
  }
}
