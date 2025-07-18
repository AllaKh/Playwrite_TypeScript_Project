import { Page } from '@playwright/test';

export class AddRoomPage {
constructor(public page: Page) {}

  get roomNumber() { return this.page.locator('input[name="roomNumber"]'); }
  get typeSelect() { return this.page.locator('select[name="type"]'); }
  get accessibleSelect() { return this.page.locator('select[name="accessible"]'); }
  get price() { return this.page.locator('input[name="price"]'); }
  get wifi() { return this.page.getByLabel('wifi'); }
  get tv() { return this.page.getByLabel('tv'); }
  get views() { return this.page.getByLabel('views'); }
  get createButton() { return this.page.getByRole('button', { name: 'Create' }); }
  get roomsList() { return this.page.locator('.rooms-list'); }

  async fillRoomNumber(num: string) {
    await this.roomNumber.fill(num);
  }

  async selectType(type: string) {
    await this.typeSelect.selectOption(type);
  }

  async selectAccessible(val: boolean) {
    await this.accessibleSelect.selectOption(val ? 'true' : 'false');
  }

  async fillPrice(val: string) {
    await this.price.fill(val);
  }

  async toggleAmenities(amenities: string[]) {
    for (const a of amenities) {
      const checkbox = this.page.getByLabel(a);
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }
  }

  async clickCreate() {
    await this.createButton.waitFor({ state: 'visible' });
    await this.createButton.click();
  }
}
