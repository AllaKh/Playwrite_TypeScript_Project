// Scenario: Book a suite room with valid data
test('Book a suite room with valid data', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const admin = new AdminPage(page);
  const book = new BookRoomPage(page);

  const data = bookingData.validJohn;

  // Given I am on the homepage
  await home.navigateToHome();
  await home.adminLink.waitFor({ state: 'visible' });

  // And I click on the Admin link
  await home.clickAdminLink();

  // And I enter username "admin" and password "password"
  await login.login(config.auth.username, config.auth.password);

  // And I click the login button
  await login.clickLoginButton();

  // And I click on Restful Booker Platform Demo link
  const demoLink = page.locator('#frontPageLink');
  await demoLink.click();

  // And I scroll down to Our Rooms section
#  const ourRoomsHeading = page.locator('#location > div > div.text-center.mb-5 > h2');
#  await ourRoomsHeading.scrollIntoViewIfNeeded();
  await expect(ourRoomsHeading).toBeVisible();

  // When I click on Book now button in Suite room section
  const suiteRoom = page.locator('#rooms > div > div.row.g-4 > div:nth-child(3)');
  await suiteRoom.getByText('Book now').click();

  // Then I should be redirected to the Suite room booking page
  const suiteHeading = page.locator('#root-container h1');
  await expect(suiteHeading).toHaveText(/Suite/i);

  // When I select available dates in the Book This Room section
  await book.selectDates(data.bookingdates.checkin, data.bookingdates.checkout);

  // And I click on Reserve now button
  await book.clickReserveNow();

  // Then The credentials form modal should appear
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
  await book.submitBooking();

  // Then I should see a booking confirmation modal
  await expect(book.bookingConfirmation).toBeVisible();

  // When I click on Return home button
  const returnHomeBtn = page.locator('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > a');
  await returnHomeBtn.click();

  // Then I should be redirected to the home page
  await expect(page).toHaveURL('https://automationintesting.online/');
  await expect(page.locator('text=Home')).toBeVisible();

  // When I click on the Admin link
  await home.adminLink.waitFor({ state: 'visible' });
  await home.clickAdminLink();

  // And I clcik on the Report link
  await admin.reportLink.waitFor({ state: 'visible' });
  await admin.clickReport();

  // Then I should see my booking in the appropriate date
  await expect(admin.bookingList).toContainText(data.firstname);

  // When I clcik on the Messages link
  await admin.messagesLink.waitFor({ state: 'visible' });
  await admin.clickMessages();

  // Then I should be redirected to the Messages page
  await expect(page).toHaveURL(/\/admin\/messages/);

  // And I should see message with my username and subject
  await expect(admin.messageList).toContainText(data.firstname);

  // When I clcik on the message with my username and subject
  await admin.clickMessage(data.firstname);

  // Then the message details modal should appear with valid information
  await expect(admin.messageDetails).toBeVisible();

  // When I clcik on the Close button
  await admin.closeMessageDetails();

  // Then the message details page must be closed and this message must appears as read
  await expect(admin.messageDetails).toBeHidden();
  await expect(admin.messageList.locator('.read')).toContainText(data.firstname);
});
