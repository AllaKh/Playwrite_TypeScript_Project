# Playwright_TypeScript_Project – README

## Overview

This project demonstrates an automated and manual test suite for the demo application using **Playwright** and **TypeScript**.
```
[https://automationintesting.online/](https://automationintesting.online)
[https://automationintesting.online/auth/swagger-ui/index.html](https://automationintesting.online/auth/swagger-ui/index.html)
[https://automationintesting.online/report/swagger-ui/index.html](https://automationintesting.online/report/swagger-ui/index.html)
[https://automationintesting.online/room/swagger-ui/index.html](https://automationintesting.online/room/swagger-ui/index.html)
```
The tests cover:
- Manual test cases (API & UI) written in **Gherkin format**
- Automated API & UI tests using **Playwright** with **TypeScript**
- Structured Page Object Model for maintainability
- Clear assertions and error handling
- Coverage matrix and bug reports

---


# Playwright TypeScript Automation Tests

This repository contains end-to-end UI and API tests for [AutomationInTesting.online](https://automationintesting.online) using **Playwright** and **TypeScript**.

The tests cover:

* Admin login functionality (valid/invalid credentials)
* Room reservation flow with random dates
* Verification of bookings in the admin report
* API validations (Auth, Room, Report)

## Technologies Used

* **Node.js v18+ / TypeScript**
* **Playwright**
* **JSON** configuration and test data
* **Page Object Model (POM)**
* **Gherkin-style manual test cases**

## Project Structure

```
Playwright_TypeScript_Project
│
├─ pages/
│   ├─ api/
│   │   ├─ AuthApi.ts
│   │   ├─ BaseApiClient.ts
│   │   ├─ ReportApi.ts
│   │   └─ RoomApi.ts
│   │
│   ├─ ui/
│       ├─ AddRoomPage.ts
│       ├─ AdminPage.ts
│       ├─ BasePage.ts
│       ├─ BookRoomPage.ts
│       ├─ ContactPage.ts
│       ├─ HomePage.ts
│       ├─ LoginPage.ts
│       ├─ MessagesPage.ts
│       └─ ReportPage.ts
│
├─ tests/
│   ├─ apiPaths.ts
│   ├─ bookingPayloads.json
│   ├─ config.ts
│   ├─ roomconfig.ts
│   │
│   ├─ api/
│   │   ├─ authApi.spec.ts
│   │   ├─ reportApi.spec.ts
│   │   └─ roomApi.spec.ts
│   │
│   └─ ui/
│       ├─ addRoom.spec.ts
│       ├─ bookRoomValid.spec.ts
│       ├─ loginNegative.spec.ts
│       └─ loginValid.spec.ts
│
├─ Playwright_TypeScript_Project.iml
├─ READ.md
└─ playwright.config.ts
```

## Prerequisites

1. Node.js v18+ - [Download Node.js](https://nodejs.org/en/download/)
2. npm (comes with Node.js)
3. Install project dependencies:  
   npm install

## Running Tests

1. Run all tests:  
   npx playwright test

2. Run only UI tests:  
   npx playwright test tests/ui

3. Run only API tests:  
   npx playwright test tests/api

## Admin Portal Credentials

* Username: admin
* Password: password

## Project Highlights

* Modular code using Page Object Model (POM)
* Randomized date generation for bookings
* Data-driven test support via JSON payloads
* Coverage matrix and strategy included
* Found and documented functional bugs

## Manual Files

| File | Description |
|------|-------------|
| manual/api-tests.feature | Manual API tests in Gherkin format |
| manual/ui-tests.feature  | Manual UI tests in Gherkin format |
| manual/bugs.md           | Bug descriptions with repro steps |
| manual/coverage-matrix.md| Test coverage matrix and strategy |

## Notes / Known Behavior

* First login uses credentials from config.ts
* Invalid login tests read passwords from bookingPayloads.json (or similar payload)
* Tests wait for network idle state to ensure pages are fully loaded
* Selectors are hardcoded for admin links, front page link, and room cards, but POM ensures maintainability

## Test Flow Summary

1. **UI Tests**
    * Admin login with valid and invalid credentials
    * Navigate to room, generate random check-in/check-out dates
    * Fill booking form from `bookingPayloads.json`
    * Verify booking appears in admin report
    * Logout

2. **API Tests**
    * Auth API validations
    * Room API operations
    * Report API validations

## Running a Specific Test File

npx playwright test tests/ui/bookRoomValid.spec.ts

Or run by test name filter:  
npx playwright test --grep "Book a Suite room with valid data"