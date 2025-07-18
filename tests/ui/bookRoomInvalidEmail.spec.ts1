import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { BookRoomPage } from '../../pages/BookRoomPage.js';
import bookingData from '../../data/bookingPayloads.json' assert { type: 'json' };

test.describe('Create booking with missing or invalid email', () => {
  const emails = [
    '',
    ' ',
    '0123456789abc',
    'abc@a.c',
    'john.with.any.family@ex.com'
  ];

  for (const email of emails) {
    test(`Booking fails with email: "${email}"`, async ({ page }) => {
      const home = new HomePage(page);
      const book = new BookRoomPage(page);
      const data = bookingData.validJane;

      // Given I am on the homepage
      await home.open();

      // Wait for Our Rooms section to be visible
      await home.roomsHeading.waitFor({ state: 'visible' });

      // And I scroll down to Our Rooms section
      await home.scrollToOurRooms();

      // When I click on Book now button in Double room section
      await home.clickBookNow('Double');

      // Then I should be redirected to the booking page
      await expect(page).toHaveURL(/\/book/);

      // When I select available dates
      await book.selectDates(data.bookingdates.checkin, data.bookingdates.checkout);

      // And I click on Reserve now button
      await book.clickReserveNow();

      // Then The credentials form should appear
      await expect(book.credentialsForm).toBeVisible();

      // When I fill the credentials form with invalid email
      await book.fillCredentials({
        firstname: data.firstname,
        lastname: data.lastname,
        email: email,
        phone: data.phone,
        depositpaid: data.depositpaid,
      });

      // And I submit the form
      await book.submit();

      // Then I should see validation error for email
      await expect(book.emailError).toBeVisible();
    });
  }
});
