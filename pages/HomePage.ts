import { Page, Locator } from '@playwright/test';

export class HomePage {
readonly page: Page;
readonly url = 'https://automationintesting.online/';

// Locator for the "Admin" link
readonly adminLink: Locator;

constructor(page: Page) {
    this.page = page;
    // Locator for the "Admin" link
    this.adminLink = this.page.locator('a', { hasText: 'Admin' });
  }

  /**
   * Opens the home page.
   */
  async open() {
    await this.page.goto(this.url);
  }

  /**
   * Navigates to the room reservation page for the specified room type and dates.
   * @param roomType - Type of room ('single', 'double', 'suite')
   * @param checkIn - Check-in date (format: yyyy-mm-dd)
   * @param checkOut - Check-out date (format: yyyy-mm-dd)
   */
  async goToRoom(roomType: 'single' | 'double' | 'suite', checkIn: string, checkOut: string) {
    let roomId: string;
    switch (roomType.toLowerCase()) {
      case 'single':
        roomId = '1';
        break;
      case 'double':
        roomId = '2';
        break;
      case 'suite':
        roomId = '3';
        break;
      default:
        throw new Error(`Invalid room type: ${roomType}`);
    }
    const url = `https://automationintesting.online/reservation/${roomId}?checkin=${checkIn}&checkout=${checkOut}`;
    await this.page.goto(url);
  }

  /**
   * Navigates directly to the admin page.
   */
  async goToAdminPage() {
    await this.page.goto('https://automationintesting.online/admin');
  }

  /**
   * Clicks the "Admin" link on the page.
   */
  async clickAdminLink() {
    await this.adminLink.click();
  }

  /**
   * Scrolls smoothly to a section by its HTML id attribute.
   * @param sectionId - The id of the section to scroll to (e.g., 'rooms', 'booking', 'location', 'contact')
   */
  async scrollToSection(sectionId: string) {
    await this.page.evaluate((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        throw new Error(`Section with id "${id}" not found`);
      }
    }, sectionId);

    // Wait until the section is visible
    await this.page.waitForSelector(`#${sectionId}`, { state: 'visible' });
  }

  /**
   * Scrolls to the 'rooms' section.
   */
  async goToRooms() {
    await this.scrollToSection('rooms');
  }

  /**
   * Scrolls to the 'booking' section.
   */
  async goToBooking() {
    await this.scrollToSection('booking');
  }

  /**
   * Scrolls to the 'location' section.
   */
  async goToLocation() {
    await this.scrollToSection('location');
  }

  /**
   * Scrolls to the 'contact' section.
   */
  async goToContact() {
    await this.scrollToSection('contact');
  }
}
