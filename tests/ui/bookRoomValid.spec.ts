// ✅ uses scrollToElement properly

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminPage } from '../../pages/AdminPage.js';
import { BookRoomPage } from '../../pages/BookRoomPage.js';
import bookingData from '../../data/bookingPayloads.json' assert { type: 'json' };
import { config } from '../config.js';

test('Book a double room with valid data', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const admin = new AdminPage(page);
  const book = new BookRoomPage(page);

  const data = bookingData.validJohn;

  // Given I am on the homepage
  await home.navigateToHome();

  // Wait for Admin link to be visible
  await home.adminLink.waitFor({ state: 'visible' });

  // And I click on the Admin link
  await home.clickAdminLink();

  // When I enter username and password to log in
  await login.login(config.auth.username, config.auth.password);

  // When I navigate back to the homepage using the first link
  const homeLink = page.locator('#frontPageLink');
  await homeLink.click();

  // Then I should be redirected to the homepage
  if (await page.url() === 'https://automationintesting.online/admin/rooms') {
    // Sometimes it remains on /admin/rooms, click again
    await homeLink.click();
  }
  await expect(page).toHaveURL('https://automationintesting.online/');
  await expect(page.locator('text=Home')).toBeVisible();

  // Scroll down until the Rooms section heading is visible
  const roomsHeading = page.locator('#rooms > div > div.text-center.mb-5 > h2');
  await home.scrollToElement(roomsHeading);

  // Wait for the heading to be visible
  await roomsHeading.waitFor({ state: 'visible' });
  await expect(roomsHeading).toBeVisible();

  // When I click on Double Room
  const doubleRoom = page.locator('#rooms > div > div.row.g-4 > div:nth-child(2) h5');
  await doubleRoom.click();

  // Then I should see the Double Room details
  const doubleRoomTitle = page.locator('#root-container h1');
  await doubleRoomTitle.waitFor({ state: 'visible' });

  // When I click the "Book This Room" button
  const bookThisRoomButton = page.locator('#root-container h2:text("Book This Room")');
  await bookThisRoomButton.click();

  // Then I should see the reservation form
  const reservationForm = page.locator('#doReservation');
  await reservationForm.waitFor({ state: 'visible' });

  // And I click on the reservation form button
  await reservationForm.click();

  // Then I should be redirected to the reservation page
  await expect(page).toHaveURL(/\/book/);

  // And I fill in booking dates
  await book.selectDates(data.bookingdates.checkin, data.bookingdates.checkout);

  // And I click Reserve Now
  await book.clickReserveNow();

  // Then I should see the credentials form
  await expect(book.credentialsForm).toBeVisible();

  // When I fill in valid user data
  await book.fillCredentials({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    depositpaid: data.depositpaid,
  });

  // And I submit the booking
  await book.submitBooking();

  // Then I should see the booking confirmation
  await expect(book.bookingConfirmation).toBeVisible();

  // Wait for Admin link to be visible again
  await home.adminLink.waitFor({ state: 'visible' });

  // When I click on the Admin link
  await home.clickAdminLink();

  // Wait for Report link to be visible
  await admin.reportLink.waitFor({ state: 'visible' });

  // And I click on the Report link
  await admin.clickReport();

  // Then I should see my booking in the report list
  await expect(admin.bookingList).toContainText(data.firstname);

  // Scroll down to Location section
  const locationHeading = page.locator('#location > div > div.text-center.mb-5 > h2');
  await admin.scrollToElement(locationHeading);
  await expect(locationHeading).toBeVisible();

  // Wait for Messages link to be visible
  await admin.messagesLink.waitFor({ state: 'visible' });

  // When I click on the Messages link
  await admin.clickMessages();

  // Then I should be redirected to the Messages page
  await expect(page).toHaveURL(/\/admin\/messages/);

  // And I should see message with my username
  await expect(admin.messageList).toContainText(data.firstname);

  // When I click on the message with my username
  await admin.clickMessage(data.firstname);

  // Then I should see message details
  await expect(admin.messageDetails).toBeVisible();

  // When I click on the Close button
  await admin.closeMessageDetails();

  // Then message details must be closed and message marked as read
  await expect(admin.messageDetails).toBeHidden();
  await expect(admin.messageList.locator('.read')).toContainText(data.firstname);
});
