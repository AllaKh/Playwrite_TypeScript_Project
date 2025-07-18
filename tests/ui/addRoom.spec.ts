import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { AddRoomPage } from '../../pages/AddRoomPage';
import { config } from '../../tests/config';

test('Add a new valid room type and verify it is shown in Our Rooms section', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const adminDashboard = new AddRoomPage(page);

  // Given I am on the homepage
  await homePage.navigateToHome();

  // And I click on the Admin link to go to login page
  await homePage.clickAdminLink();

  // When I enter username and password to log in
  await loginPage.login(config.auth.username, config.auth.password);

  // Then I should be redirected to the admin dashboard
  await expect(page).toHaveURL(/.*\/admin\/rooms/);
  await expect(page.locator('text=Rooms')).toBeVisible();

  // When I fill Room #
  await adminDashboard.fillRoomNumber('202');

  // And I select Type from the drop-down list
  await adminDashboard.selectRoomType('Double');

  // And I select Accessible = true from the drop-down list
  await adminDashboard.selectAccessibility('true');

  // And I fill the Price
  await adminDashboard.fillPrice('150');

  // And I check WiFi, TV, and Views radiobuttons
  await adminDashboard.checkWiFi();
  await adminDashboard.checkTV();
  await adminDashboard.checkViews();

  // And I click on Create button
  await adminDashboard.clickCreateButton();

  // Then the new room type should appear in the Rooms list
  await expect(page.locator('#roomName')).toHaveValue('');

  // When I click on the #frontPageLink before logging out
  const frontPageLink = page.locator('#frontPageLink');
  await frontPageLink.click();

  // Then I should be redirected to the homepage
  await expect(page).toHaveURL('https://automationintesting.online/');
  await expect(page.locator('text=Home')).toBeVisible();

  // And I scroll down to Our Rooms section
  await homePage.scrollToOurRoomsSection();

  // Then I should see a new room in the Our Rooms section
  const newRoomCard = page.locator('.room-info').filter({ hasText: 'Room 202' });
  await expect(newRoomCard).toBeVisible();
});
