import { Page } from '@playwright/test';

export class BookRoomPage {
constructor(public page: Page) {}

  get checkin() { return this.page.locator('input[name="checkin"]'); }
  get checkout() { return this.page.locator('input[name="checkout"]'); }
  get reserveButton() { return this.page.getByRole('button', { name: 'Reserve' }); }
  get credentialsForm() { return this.page.locator('form'); }
  get firstname() { return this.page.locator('input[name="firstname"]'); }
  get lastname() { return this.page.locator('input[name="lastname"]'); }
  get email() { return this.page.locator('input[name="email"]'); }
  get phone() { return this.page.locator('input[name="phone"]'); }
  get deposit() { return this.page.locator('input[name="depositpaid"]'); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }
  get bookingConfirmation() { return this.page.locator('.booking-confirmation-modal'); }
  get validationError() { return this.page.locator('.validation-error'); }

  async selectDates(start: string, end: string) {
    await this.checkin.fill(start);
    await this.checkout.fill(end);
  }

  async clickReserve() {
    await this.reserveButton.waitFor({ state: 'visible' });
    await this.reserveButton.click();
  }

  async fillCredentials(data: { firstname: string; lastname: string; email: string; phone: string; depositpaid: boolean }) {
    await this.firstname.fill(data.firstname);
    await this.lastname.fill(data.lastname);
    await this.email.fill(data.email);
    await this.phone.fill(data.phone);

    const isChecked = await this.deposit.isChecked();
    if (data.depositpaid !== isChecked) {
      if (data.depositpaid) {
        await this.deposit.check();
      } else {
        await this.deposit.uncheck();
      }
    }
  }

  async submitBooking() {
    await this.submitButton.waitFor({ state: 'visible' });
    await this.submitButton.click();
  }
}
