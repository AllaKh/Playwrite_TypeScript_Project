import { BasePage } from './BasePage';

/**
* ContactPage handles filling out and submitting the contact form.
*/
export class ContactPage extends BasePage {
readonly nameInput = this.page.locator('#name');
readonly emailInput = this.page.locator('#email');
readonly phoneInput = this.page.locator('#phone');
readonly subjectInput = this.page.locator('#subject');
readonly descriptionInput = this.page.locator('#description');
readonly submitButton = this.page.locator('#submitContact');
readonly successMessage = this.page.locator('.contact');

async fillContactForm(name: string, email: string, phone: string, subject: string, description: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.subjectInput.fill(subject);
    await this.descriptionInput.fill(description);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
