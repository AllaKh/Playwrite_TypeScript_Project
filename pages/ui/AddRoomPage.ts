import { Page } from '@playwright/test';

export class AddRoomPage {
constructor(private readonly page: Page) {}

  async fillRoomNumber(roomNumber: string): Promise<void> {
    await this.page.fill('#roomName', roomNumber);
  }

  async selectRoomType(type: string): Promise<void> {
    await this.page.selectOption('#type', type);
  }

  async selectAccessibility(option: string): Promise<void> {
    await this.page.selectOption('#accessible', option);
  }

  async fillPrice(price: string): Promise<void> {
    await this.page.fill('#roomPrice', price);
  }

  async checkWiFi(): Promise<void> {
    await this.page.check('#wifiCheckbox');
  }

  async checkTV(): Promise<void> {
    await this.page.check('#tvCheckbox');
  }

  async checkViews(): Promise<void> {
    await this.page.check('#viewsCheckbox');
  }

  async clickCreateButton(): Promise<void> {
    await this.page.click('#createRoom');
  }

  async clickHomeLinkByText(linkText: string): Promise<void> {
    await this.page.getByRole('link', { name: linkText }).click();
  }
}
