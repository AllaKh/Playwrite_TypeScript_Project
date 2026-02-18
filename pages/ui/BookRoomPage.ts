import { Page } from '@playwright/test';
import { format } from 'date-fns';

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

  /**
   * ================= RANDOM DATES =================
   * Same logic as Python:
   * offset 0–9 days from today
   * stay duration = 1 day
   */
  generateRandomDates(): { checkIn: string; checkOut: string } {
    const offset = Math.floor(Math.random() * 10); // 0–9

    const checkInDate = new Date();
    checkInDate.setDate(checkInDate.getDate() + offset);

    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    const DATE_FORMAT = 'yyyy-MM-dd';

    return {
      checkIn: format(checkInDate, DATE_FORMAT),
      checkOut: format(checkOutDate, DATE_FORMAT),
    };
  }

  /**
   * Navigate directly to reservation URL with dates
   */
  async goToRoomWithDates(roomId: number, checkIn: string, checkOut: string) {
    const url = `https://automationintesting.online/reservation/${roomId}?checkin=${checkIn}&checkout=${checkOut}`;
    await this.page.goto(url);
  }

  async selectDates(start: string, end: string) {
    await this.checkin.fill(start);
    await this.checkout.fill(end);
  }

  async clickReserve() {
    await this.reserveButton.waitFor({ state: 'visible' });
    await this.reserveButton.click();
  }

  async fillCredentials(data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    depositpaid: boolean;
  }) {
    await this.firstname.fill(data.firstname);
    await this.lastname.fill(data.lastname);
    await this.email.fill(data.email);
    await this.phone.fill(data.phone);

    const isChecked = await this.deposit.isChecked();
    if (data.depositpaid !== isChecked) {
      data.depositpaid ? await this.deposit.check() : await this.deposit.uncheck();
    }
  }

  async submitBooking() {
    await this.submitButton.waitFor({ state: 'visible' });
    await this.submitButton.click();
  }
}
