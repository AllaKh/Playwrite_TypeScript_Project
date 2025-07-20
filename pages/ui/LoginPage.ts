import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
constructor(page: Page) {
    super(page);
  }

  // Logs into the application using the provided username and password
  async login(username: string, password: string): Promise<void> {
    // Fill the username field with the provided username
    await this.page.locator('label[for="username"]').fill(username);

    // Fill the password field with the provided password
    await this.page.locator('label[for="password"]').fill(password);

    // Locate the login button by its ID
    const loginButton: Locator = this.page.locator('#doLogin');

    // Wait for the login button to be visible
    await loginButton.waitFor({ state: 'visible' });

    // Click the login button to submit the form
    await loginButton.click();
  }

  // Clicks on the Branding link to navigate to the Branding page
  async clickBrandingLink(): Promise<void> {
    const brandingLink: Locator = this.page.locator('#brandingLink');

    // Wait for the Branding link to be visible
    await brandingLink.waitFor({ state: 'visible' });

    // Click the Branding link
    await brandingLink.click();
  }

  // Clicks on the Report link to navigate to the Report page
  async clickReportLink(): Promise<void> {
    const reportLink: Locator = this.page.locator('#navbarSupportedContent > ul.navbar-nav.mr-auto > li:nth-child(4) > a');

    // Wait for the Report link to be visible
    await reportLink.waitFor({ state: 'visible' });

    // Click the Report link
    await reportLink.click();
  }

  // Clicks on the Front Page link to navigate to the home page
  async clickFrontPageLink(): Promise<void> {
    const frontPageLink: Locator = this.page.locator('#root-container > div > nav > div > a');

    // Wait for the Front Page link to be visible
    await frontPageLink.waitFor({ state: 'visible' });

    // Click the Front Page link
    await frontPageLink.click();
  }

  // Clicks on the Logout button to log out of the application
  async clickLogoutButton(): Promise<void> {
    const logoutButton: Locator = this.page.locator('#navbarSupportedContent > ul.navbar-nav.ms-auto > li:nth-child(2) > button');

    // Wait for the Logout button to be visible
    await logoutButton.waitFor({ state: 'visible' });

    // Click the Logout button
    await logoutButton.click();
  }

  // Waits for the calendar to be visible on the page
  async waitForCalendar(): Promise<void> {
    const calendarLocator: Locator = this.page.locator('#reportLink');

    // Wait for the calendar to be visible within 10 seconds
    await calendarLocator.waitFor({ state: 'visible', timeout: 10000 });

    // Ensure the calendar is visible on the page
    await expect(calendarLocator).toBeVisible();
  }

  // Clicks the "Next" button on the calendar to go to the next date range
  async clickNextLink(): Promise<void> {
    const nextButton: Locator = this.page.locator('#root-container > div > div > div > div > div.rbc-toolbar > span:nth-child(1) > button:nth-child(3)');

    // Wait for the "Next" button to be visible
    await nextButton.waitFor({ state: 'visible' });

    // Click the "Next" button
    await nextButton.click();
  }

  // Clicks the "Today" button on the calendar to return to today's date
  async clickTodayLink(): Promise<void> {
    const todayButton: Locator = this.page.locator('#root-container > div > div > div > div > div.rbc-toolbar > span:nth-child(1) > button:nth-child(1)');

    // Wait for the "Today" button to be visible
    await todayButton.waitFor({ state: 'visible' });

    // Click the "Today" button
    await todayButton.click();
  }

  // Clicks the "Back" button on the calendar to go to the previous date range
  async clickBackLink(): Promise<void> {
    const backButton: Locator = this.page.locator('#root-container > div > div > div > div > div.rbc-toolbar > span:nth-child(1) > button:nth-child(2)');

    // Wait for the "Back" button to be visible
    await backButton.waitFor({ state: 'visible' });

    // Click the "Back" button
    await backButton.click();
  }
}
