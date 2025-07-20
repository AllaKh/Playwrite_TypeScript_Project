import { test, expect } from '@playwright/test';
import { format } from 'date-fns';
import { BasePage } from '../../pages/ui/BasePage';
import { HomePage } from '../../pages/ui/HomePage';
import { LoginPage } from '../../pages/ui/LoginPage';
import { AdminPage } from '../../pages/ui/AdminPage';
import { BookRoomPage } from '../../pages/ui/BookRoomPage';
import { MessagesPage } from '../../pages/ui/MessagesPage';
import { ReportPage } from '../../pages/ui/ReportPage';
import bookingData from '../bookingPayloads.json' assert { type: 'json' };
import { config } from '../config.js';

test('Book a double room with valid data', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const admin = new AdminPage(page);
  const book = new BookRoomPage(page);
  const basePage = new BasePage(page);

  // Given I am on the homepage
  await home.navigateToHome();

  // Wait for Admin link to be visible
  await home.adminLink.waitFor({ state: 'visible' });

  // And I click on the Admin link
  await home.clickAdminLink();

  // When I enter username and password to log in
  await login.login(config.auth.username, config.auth.password);

  // And I navigate back to the homepage using the Front Page link
  const homeLink = page.locator('#frontPageLink');
  await homeLink.click();

  // Then I should be redirected to the homepage
  if (await page.url() === basePage.adminpage) {
    // Sometimes it remains on /admin/rooms, click again
    await homeLink.click();
  }
  await expect(page).toHaveURL(basePage.homepage);
  await expect(page.locator('text=Home')).toBeVisible();

  // Scroll down
  await home.scrollToOneThird();

  // Wait for the heading to be visible
  const roomsHeading = page.locator('#rooms > div > div.row.g-4 > div:nth-child(3) > div > div.card-body > h5');
  await roomsHeading.waitFor({ state: 'visible' });
  await expect(roomsHeading).toBeVisible();

  // When I click on Book now button in the "Suite" room section
  const bookNowButton = page.locator('#rooms > div > div.row.g-4 > div:nth-child(3) > div > div.card-footer.bg-white.d-flex.justify-content-between.align-items-center > a');
  await bookNowButton.click()

  // Scroll up
  await home.scrollToTop();

  // Then I should see the "Suite" Room details
  const suiteRoomTitle = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-8.mb-4.mb-lg-0 > div:nth-child(1) > h1');
  await suiteRoomTitle.waitFor({ state: 'visible' });

  // When I navigate to the booking details section (Suite room sidebar)
  const bookingSection = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > h2');
  await bookingSection.waitFor({ state: 'visible' });

  // Generate random date offset between 0 and 9
  const offset = Math.floor(Math.random() * 10);
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + offset);

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 1);

  const URL_FMT = 'yyyy-MM-dd';
  const formattedCheckIn = format(checkInDate, URL_FMT);
  const formattedCheckOut = format(checkOutDate, URL_FMT);

  const roomId = 3;
  const bookingUrl = `https://automationintesting.online/reservation/${roomId}?checkin=${formattedCheckIn}&checkout=${formattedCheckOut}`;

  // Navigate directly with check-in and check-out via URL
  await page.goto(bookingUrl);

  // Scroll to reveal the sidebar if needed
  await home.scrollToOneThird();

  // And I click on Reserve Now button
  const reserveNowButton = page.locator('#root-container form button.btn-primary');
  await reserveNowButton.waitFor({ state: 'visible' });
  await reserveNowButton.click();

  // Scroll up
  await home.scrollToTop();

  // Then the credentials form modal should appear
  const bookingFormHeader = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > h2');
  await expect(bookingFormHeader).toHaveText('Book This Room');

  // Then I should see the credentials form
  const firstNameInput = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > div.input-group.mb-3.room-booking-form > input');
  const lastNameInput = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > div:nth-child(2) > input');
  const emailInput = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > div:nth-child(3) > input');
  const phoneInput = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > div:nth-child(4) > input');

  const reserveNowBtn = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > button.btn.btn-primary.w-100.mb-3');

  // When I fill in valid user data
  const data = bookingData.validJohn;
  await firstNameInput.fill(data.firstname);
  await lastNameInput.fill(data.lastname);
  await emailInput.fill(data.email);
  await phoneInput.fill(data.phone);

  // And I submit the booking
  await reserveNowBtn.click();

  // Then I should see the booking confirmation
  const confirmationMessage = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > h2');
  await expect(confirmationMessage).toHaveText('Booking Confirmed');

  // Wait for Admin link to be visible again
  await home.adminLink.waitFor({ state: 'visible' });

  // When I click on the Admin link
  await home.clickAdminLink();

  // When I enter username and password to log in
  await login.login(config.auth.username, config.auth.password);

  // When I click on the Report link to navigate to the Report page
  await page.locator('#reportLink').click();

  // Then I should be redirected to the Report page
  await expect(page).toHaveURL(/.*\/admin\/report/);
  await expect(page.locator('#reportLink')).toBeVisible();

  // And I should see my booking in the report list
  const reportPage = new ReportPage(page);
  const bookingFullName = `${data.firstname} ${data.lastname}`;
  const checkInDay = new Date(formattedCheckIn).getDate();

  await reportPage.expectBookingEntry(bookingFullName, checkInDay);

  // When I click on the Messages link to go to the Messages page
  const messagesLink = page.locator('text=Messages');
  await messagesLink.waitFor({ state: 'visible' });
  await messagesLink.click();

  // Then I should be redirected to the Messages page
  await expect(page).toHaveURL(/.*\/admin\/message/);
  await expect(page.locator('text=Messages')).toBeVisible();

  // When I click on the Messages link
  await admin.clickMessages();

  // Then I should be redirected to the Messages page
  await expect(page).toHaveURL(/\/admin\/message[s]?/);

  // And I should see the last message in the Name column matching my full name
  const fullName = `${data.firstname} ${data.lastname}`;
  const messagesPage = new MessagesPage(page);

  // When I click on the message with my full name (last matching)
  await messagesPage.clickLastMessageByFullName(fullName);

  // Then I should see message details with correct From: field
  await messagesPage.expectFromFieldToMatch(fullName);

  // When I click on the Close button
  await messagesPage.closeMessageModal();

  // Then message details must be closed and message marked as read
  await messagesPage.expectMessageClosedAndMarkedRead(data.firstname);
});
