import { Page, Locator } from '@playwright/test';

export class ReportPage {
readonly page: Page;
readonly events: Locator;

constructor(page: Page) {
    this.page = page;
    this.events = page.locator('.rbc-event-content');
  }

  async expectBookingEntry(fullName: string, checkInDateDay: string | number): Promise<void> {
    const normalizedName = fullName.trim().toLowerCase();
    const expectedDay = String(checkInDateDay).padStart(2, '0');

    await this.page.waitForSelector('.rbc-event-content', { timeout: 5000 });

    const count = await this.events.count();
    if (count === 0) {
      throw new Error('No booking events found on the report page.');
    }

    for (let i = 0; i < count; i++) {
      const event = this.events.nth(i);
      const title = (await event.getAttribute('title')) || '';
      const namePart = title.split(' - ')[0].trim().toLowerCase();

      if (namePart === normalizedName) {
        const dayCells = await event.locator('xpath=ancestor::div[contains(@class,"rbc-row-content")]//div[contains(@class,"rbc-date-cell") and .//button]').all();

        for (const cell of dayCells) {
          const dayText = (await cell.locator('button').textContent())?.trim() || '';
          if (dayText === expectedDay) {
            return;
          }
        }
      }
    }

    throw new Error(`Booking entry with name "${fullName}" and check-in day "${expectedDay}" not found.`);
  }
}
