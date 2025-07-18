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
  await home.goto();

  // Wait for Admin link to be visible
  await home.adminLink.waitFor({ state: 'visible' });

  // And I click on the Admin link
  await home.clickAdminLink();

  // Wait for username input to appear on login page
  await login.usernameInput.waitFor({ state: 'visible' });

  // And I enter username and password
  await login.login(config.auth.username, config.auth.password);

  // Wait for Restful Booker Platform Demo link to be visible
  await home.demoLink.waitFor({ state: 'visible' });

  // And I click on Restful Booker Platform Demo link
  await home.clickDemoLink();

  // Wait for Our Rooms section to be visible
  await home.roomsHeading.waitFor({ state: 'visible' });

  // And I scroll down to Our Rooms section
  await home.scrollToOurRooms();

  // When I click on Book now button in Double room section
  await home.clickBookNow('Double');

  // Then I should be redirected to the Double room booking page
  await expect(page).toHaveURL(/\/book/);

  // When I select available dates
  await book.selectDates(data.bookingdates.checkin, data.bookingdates.checkout);

  // And I click on Reserve now button
  await book.clickReserveNow();

  // Then The credentials form should appear
  await expect(book.credentialsForm).toBeVisible();

  // When I fill the credentials form with valid data
  await book.fillCredentials({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    depositpaid: data.depositpaid,
  });

  // And I submit the form
  await book.submit();

  // Then I should see a booking confirmation modal
  await expect(book.bookingConfirmationModal).toBeVisible();

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
