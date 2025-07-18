// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
readonly page: Page;
readonly adminLink: Locator;
readonly demoLink: Locator;
readonly frontLink: Locator;
readonly roomsHeading: Locator;

constructor(page: Page) {
    this.page = page;
    // Сделаем точное совпадение по имени ссылки "Admin", чтобы не было конфликта с "Admin panel"
    this.adminLink = page.getByRole('link', { name: 'Admin', exact: true });
    this.demoLink = page.getByRole('link', { name: 'Restful Booker Platform Demo' });
    this.frontLink = page.getByRole('link', { name: 'Front Page' });
    this.roomsHeading = page.getByRole('heading', { name: 'Our Rooms' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickAdminLink() {
    // Убедимся, что ссылка видна перед кликом
    await this.adminLink.waitFor({ state: 'visible' });
    await this.adminLink.click();
  }

  async clickDemoLink() {
    await this.demoLink.waitFor({ state: 'visible' });
    await this.demoLink.click();
  }

  async clickFrontLink() {
    await this.frontLink.waitFor({ state: 'visible' });
    await this.frontLink.click();
  }

  async scrollToOurRooms() {
    const box = await this.roomsHeading.boundingBox();
    if (box) {
      // Scroll to "Our Rooms" heading with slight offset
      await this.page.evaluate(({ y }) => window.scrollTo(0, y - 100), { y: box.y });
    } else {
      await this.roomsHeading.scrollIntoViewIfNeeded();
    }
  }

  // Method to click "Book now" button near the specified room type
  async clickBookNow(roomType: string) {
    // Поиск секции с roomType, затем кнопки Book now внутри нее
    const roomSection = this.page.locator(`section:has-text("${roomType}")`);
    const bookNowButton = roomSection.getByRole('button', { name: 'Book now' });
    await bookNowButton.waitFor({ state: 'visible' });
    await bookNowButton.click();
  }
}
