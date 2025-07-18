import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';
import { AddRoomPage } from '../../pages/AddRoomPage';
import { config } from '../config';

test('Add a new valid room type', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const admin = new AdminPage(page);
  const add = new AddRoomPage(page);

  // Given I am on the homepage
  await home.goto();

  // And I click on the Admin link
  await home.clickAdminLink();

  // Wait for navigation to login page
  await page.waitForURL(/\/admin/);
  await login.usernameInput.waitFor({ state: 'visible' });

  // And I enter username and password
  await login.login(config.auth.username, config.auth.password);

  // When I fill Room #
  await add.fillRoomNumber('202');

  // And I select Type from the drop-down list
  await add.selectRoomType('Double Room');

  // And I select Accessible = true from the drop-down list
  await add.selectAccessible(true);

  // And I fill the Price
  await add.fillPrice('200');

  // And I check WiFi, TV, and Views checkboxes
  await add.checkAmenities(['wifi', 'tv', 'views']);

  // And I click on Create button
  await add.clickCreate();

  // Then the new room type should appear in the Rooms list
  await expect(add.roomsList).toContainText('Double Room');

  // When I click on Restful Booker Platform Demo link
  await home.clickDemoLink();

  // And I scroll down to Our Rooms section
  await home.scrollToOurRooms();

  // Then I should see a new room in the Our Rooms section
  await expect(home.page.locator('section[data-room-type="double"]')).toBeVisible();
});
