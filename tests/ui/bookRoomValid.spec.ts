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

  // Click on the #frontPageLink before logging out
  const frontPageLink = page.locator('#frontPageLink');
  await frontPageLink.click();

  // Then I should be redirected to the homepage
  await expect(page).toHaveURL('https://automationintesting.online/');
  await expect(page.locator('text=Home')).toBeVisible();

  // Find "Our Rooms" section and scroll down to it explicitly
  const roomsHeading = page.locator("#rooms > div > div.text-center.mb-5 > h2");

  // Scroll explicitly to the element
  await scrollToElement(page, roomsHeading);

  // Wait for the element to be visible after scroll
  await roomsHeading.waitFor({ state: 'visible', timeout: 5000 });
  await expect(roomsHeading).toBeVisible();

  // Click on Double Room
  const doubleRoom = page.locator("#rooms > div > div.row.g-4 > div:nth-child(2) > div > div.card-body > h5");
  await doubleRoom.click();

  // Wait for Double Room page to load
  const doubleRoomTitle = page.locator("#root-container > div > div.container.my-5 > div > div.col-lg-8.mb-4.mb-lg-0 > div:nth-child(1) > h1");

  // Wait for the element to be visible
  await doubleRoomTitle.waitFor({ state: 'visible', timeout: 10000 });

  // Now, find and click the "Book This Room" button
  const bookThisRoomButton = page.locator("#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > h2");
  await bookThisRoomButton.click();

  // Wait for the reservation form to be visible
  const reservationForm = page.locator("#doReservation");
  await reservationForm.waitFor({ state: 'visible' });

  // Click on the reservation form button
  await reservationForm.click();

  // Then I should be redirected to the reservation page
  await expect(page).toHaveURL(/\/book/);

  // Continue with booking process as usual
  await book.selectDates(data.bookingdates.checkin, data.bookingdates.checkout);
  await book.clickReserveNow();
  await expect(book.credentialsForm).toBeVisible();
  await book.fillCredentials({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    depositpaid: data.depositpaid,
  });
  await book.submitBooking();
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

// Function to scroll to the target element
async function scrollToElement(page, element) {
  // Find scrollable elements on the page
  const scrollableElements = await page.evaluate(() => {
    let scrollableElements = [];
    document.querySelectorAll('*').forEach((el) => {
      const style = window.getComputedStyle(el);
      if (el.scrollHeight > el.clientHeight && (style.overflow === 'auto' || style.overflow === 'scroll')) {
        scrollableElements.push(el);
      }
    });
    return scrollableElements;
  });

  console.log('Found scrollable elements:', scrollableElements.length);

  // If there are scrollable elements, scroll the first one
  if (scrollableElements.length > 0) {
    const scrollElement = scrollableElements[0]; // Scroll the first found element
    await page.evaluate((el) => {
      el.scrollTop = el.scrollHeight;  // Scroll to the bottom of the element
    }, scrollElement);
  }

  // Scroll to the specific target element
  await element.scrollIntoViewIfNeeded();
}
