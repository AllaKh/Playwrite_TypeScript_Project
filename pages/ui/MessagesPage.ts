import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MessagesPage extends BasePage {
readonly messageElements: Locator;
readonly fromParagraph: Locator;
readonly closeModalButton: Locator;
readonly messageDetailsModal: Locator;

constructor(page: Page) {
    super(page);
    this.messageElements = page.locator('[id^="message"]');
    this.fromParagraph = page.locator(
      'body > div.ReactModalPortal > div > div > div > div:nth-child(1) > div.col-10 > p'
    );
    this.closeModalButton = page.locator(
      'body > div.ReactModalPortal > div > div > div > div:nth-child(5) > div > button'
    );
    this.messageDetailsModal = page.locator('body > div.ReactModalPortal > div > div');
  }

  async waitForMessages(timeout = 15000) {
    await this.messageElements.first().waitFor({ state: 'visible', timeout });
  }

  async clickLastMessageByFullName(fullName: string): Promise<void> {
    await this.waitForMessages();
    const count = await this.messageElements.count();
    if (count === 0) {
      throw new Error('No message elements found with id starting "message"');
    }

    for (let i = count - 1; i >= 0; i--) {
      const nameCell = this.messageElements.nth(i).locator('div.col-sm-2 > p');
      const nameText = (await nameCell.innerText()).trim();
      if (nameText === fullName) {
        await this.messageElements.nth(i).click();
        return;
      }
    }

    throw new Error(`No matching message found with name: ${fullName}`);
  }

  async expectFromFieldToMatch(fullName: string): Promise<void> {
    await expect(async () => {
      const text = await this.fromParagraph.innerText();
      const actualName = text.replace(/^From:\s*/, '').trim();
      if (actualName !== fullName) {
        throw new Error(`Expected name "${fullName}" but got "${actualName}"`);
      }
    }).toPass({ timeout: 15000 });
  }

  async closeMessageModal(): Promise<void> {
    await this.closeModalButton.click();
  }

  async expectMessageClosedAndMarkedRead(firstName: string): Promise<void> {
  const lastMessage = this.messageElements.last().locator('div.col-sm-2 > p');
  await expect(lastMessage).not.toHaveCSS('font-weight', '700');
  }
}
